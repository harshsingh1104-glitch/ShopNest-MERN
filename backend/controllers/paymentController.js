const Razorpay = require('razorpay');
const crypto = require('crypto');

const createOrder = async (req, res) => {
  try {
    const { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } = process.env;
    if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
      return res.status(503).json({ message: 'Razorpay is not configured on the server' });
    }

    const amount = Number(req.body.amount);
    const amountInPaise = Math.round(amount * 100);
    if (!Number.isFinite(amount) || amount <= 0 || !Number.isSafeInteger(amountInPaise)) {
      return res.status(400).json({ message: 'A valid payment amount is required' });
    }

    const instance = new Razorpay({
      key_id: RAZORPAY_KEY_ID,
      key_secret: RAZORPAY_KEY_SECRET,
    });

    const order = await instance.orders.create({
      amount: amountInPaise,
      currency: 'INR',
    });
    res.json({ ...order, key_id: RAZORPAY_KEY_ID });
  } catch (error) {
    const providerError = error.error || {};
    const message = providerError.description || error.message || 'Razorpay could not create the order';
    console.error('Razorpay order creation failed', {
      statusCode: error.statusCode || error.status,
      code: providerError.code,
      reason: providerError.reason,
      message,
    });
    res.status(502).json({ message });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const { RAZORPAY_KEY_SECRET } = process.env;
    if (!RAZORPAY_KEY_SECRET) {
      return res.status(503).json({ message: 'Razorpay is not configured on the server' });
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    if (
      typeof razorpay_order_id !== 'string' ||
      typeof razorpay_payment_id !== 'string' ||
      typeof razorpay_signature !== 'string' ||
      !/^[a-f0-9]{64}$/i.test(razorpay_signature)
    ) {
      return res.status(400).json({ message: 'Payment verification details are required' });
    }

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto.createHmac('sha256', RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest();
    const receivedSign = Buffer.from(razorpay_signature, 'hex');

    if (receivedSign.length !== expectedSign.length || !crypto.timingSafeEqual(receivedSign, expectedSign)) {
      return res.status(400).json({ message: 'Invalid payment signature' });
    }

    return res.status(200).json({ message: 'Payment verified successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createOrder, verifyPayment };
