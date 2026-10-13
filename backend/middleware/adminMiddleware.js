const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(401).json({ message: 'Not authorized as an admin' });
  }
};

const productManager = (req, res, next) => {
  if (req.user && ['admin', 'productManager'].includes(req.user.role)) {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized to manage products' });
  }
};

module.exports = { admin, productManager };
