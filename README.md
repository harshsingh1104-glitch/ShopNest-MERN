<div align="center">
  <img src="https://cdn-icons-png.flaticon.com/512/3514/3514491.png" alt="ShopNest Logo" width="80" />
  <h1>ShopNest - Full-Stack MERN E-Commerce App</h1>
  <p>A professionally engineered, full-stack E-commerce platform built strictly using modern standard React (CRA) on the frontend and Express/MongoDB on the backend.</p>
</div>

---

## 🛠 Tech Stack Details

- **Frontend:** Pure React.js (`react-scripts`), Redux Toolkit (for Cart state management), AuthContext API (for JWT user sessions).
- **Backend:** Node.js, Express.js architecture mapped with middleware-based routing.
- **Database:** MongoDB (via Mongoose schemas).
- **Features:** Unified Admin Dashboard, Direct Cloudinary Content Maps, Personal User Profiles matching mapped Order Histories.
- **Payments:** Razorpay fully implemented (utilize your test metrics or placeholder).
- **Cloud Storage:** Cloudinary integration for Product image uploading securely via Multer.

---

## 🚀 Quick Start / Local Development Guide

The workspace is configured beautifully using a monorepo-friendly setup with `concurrently`, enabling you to start everything from the very root folder.

### 1️⃣ Dependencies & Environments
Make sure you have MongoDB running locally, or map it to a remote database string.

Inside the `backend/` folder, ensure your `.env` looks like this:
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/shopnest
JWT_SECRET=super_secret_key
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
OLLAMA_BASE_URL=http://127.0.0.1:11434
OLLAMA_MODEL=llama3.2:3b
```

ShopNest's floating AI shopping assistant uses Llama locally through [Ollama](https://ollama.com/). Install and start Ollama, then download the model once:
```bash
ollama pull llama3.2:3b
```
Keep Ollama running while using the chatbot. `OLLAMA_BASE_URL` and `OLLAMA_MODEL` can be changed in `backend/.env` if Ollama runs at a different address or you prefer another locally installed model. No AI API key is needed.

From the **root folder** `shopnest/`, trigger a full install across environments:
```bash
npm run build
```

### 2️⃣ Populate the Database (Seeding)
Test the platform rapidly featuring beautiful dummy products (Unsplash) and automatic `Admin` role provisioning:
```bash
npm run seed
```
> **Seed Admin Access:** Email: `admin@shopnest.com` | Password: `password123`

### 3️⃣ Run Servers Start
Run this single command at the root to bind the Backend (Port 5000) and Frontend (Port 3000) natively:
```bash
npm run dev
```

---

## ☁️ Deploy on Render

The `render.yaml` Blueprint builds the React app and serves it from the Express backend as one web service.

1. Push the project to GitHub, including `render.yaml` and the latest changes. Do not upload `backend/.env` or paste secrets into GitHub.
2. In [Render](https://dashboard.render.com), choose **New > Blueprint**, connect the GitHub repository, and apply the `render.yaml` configuration.
3. When prompted, set `MONGO_URI` to a MongoDB Atlas connection string. Render generates `JWT_SECRET` automatically.
4. Wait for the deployment to finish, then open the `onrender.com` URL Render assigns to the service and share that link.

The sample catalog is not inserted automatically. To load it into a new, empty database, run `npm run seed` from the Render Shell. **This deletes all existing users and products first**, and creates the demo admin `admin@shopnest.com` with password `password123`; change that password immediately. Do not run the seed command on a database with data you need to keep.

Checkout requires your own `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` environment variables in Render. Cloudinary and Gmail features also need their corresponding credentials configured if you use them.
Use Razorpay test-mode credentials for local testing. Keep both keys in `backend/.env` or deployment environment settings; never hard-code them in the frontend or commit them to source control. Checkout only creates an order after Razorpay payment verification succeeds.
The local Ollama setup is intended for development on a machine running the backend. For deployment, Ollama must be installed and running on a host reachable by the backend; set `OLLAMA_BASE_URL` to that service and ensure the selected `OLLAMA_MODEL` is downloaded there.

---

## 📄 Postman Documentations
This repository includes a fully-scaffolded API testing toolkit: **`ShopNest_Postman_Collection.json`**. 
Simply Import this file directly into the local Postman IDE. It features variables like `{{token}}` properly mapped to effortlessly check protected admin/user/order payloads. Happy coding!
