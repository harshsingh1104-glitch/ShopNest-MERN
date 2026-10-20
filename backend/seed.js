const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Product = require('./models/Product');
const connectDB = require('./config/db');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);
    
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@shopnest.com',
      password: hashedPassword,
      role: 'admin'
    });

    const products = [
  {
    "name": "Wireless Noise-Cancelling Headphones",
    "description": "Immersive sound with deep bass and active noise cancellation for distraction-free listening.",
    "price": 299.99,
    "category": "Electronics",
    "stock": 15,
    "imageUrl": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "ratings": 4.8,
    "numReviews": 24
  },
  {
    "name": "Minimalist Modern Chair",
    "description": "A soft and ergonomic accent chair that suits contemporary homes and workspaces.",
    "price": 150.0,
    "category": "Furniture",
    "stock": 30,
    "imageUrl": "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "ratings": 4.2,
    "numReviews": 12
  },
  {
    "name": "Professional DSLR Camera",
    "description": "Capture cinematic shots with quick autofocus, high clarity, and premium speed.",
    "price": 1199.99,
    "category": "Electronics",
    "stock": 8,
    "imageUrl": "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "ratings": 4.9,
    "numReviews": 50
  },
  {
    "name": "Classic White Sneakers",
    "description": "Everyday comfort and easy styling for casual wear and daily routines.",
    "price": 85.0,
    "category": "Clothing",
    "stock": 50,
    "imageUrl": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "ratings": 4.5,
    "numReviews": 89
  },
  {
    "name": "Smart Fitness Watch",
    "description": "Track workouts, health stats, and notifications with a premium smart design.",
    "price": 179.99,
    "category": "Electronics",
    "stock": 25,
    "imageUrl": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "ratings": 4.7,
    "numReviews": 41
  },
  {
    "name": "Premium Leather Backpack",
    "description": "Durable everyday carry with premium finish and enough room for work essentials.",
    "price": 129.5,
    "category": "Accessories",
    "stock": 18,
    "imageUrl": "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "ratings": 4.6,
    "numReviews": 33
  },
  {
    "name": "Ceramic Coffee Set",
    "description": "Minimalist ceramic mugs and accessories for a warm, cozy morning routine.",
    "price": 64.99,
    "category": "Home",
    "stock": 42,
    "imageUrl": "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "ratings": 4.4,
    "numReviews": 18
  },
  {
    "name": "Ultra HD Smart TV",
    "description": "Enjoy cinematic visuals and crisp streaming with a sleek entertainment upgrade.",
    "price": 899.0,
    "category": "Electronics",
    "stock": 12,
    "imageUrl": "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "ratings": 4.8,
    "numReviews": 57
  },
  {
    "name": "Cotton Linen Shirt",
    "description": "Lightweight and breathable shirt designed for smart casual comfort all day.",
    "price": 48.0,
    "category": "Clothing",
    "stock": 60,
    "imageUrl": "https://images.unsplash.com/photo-1517841905240-472988babdf9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "ratings": 4.3,
    "numReviews": 27
  },
  {
    "name": "Aroma Diffuser",
    "description": "Create a calm atmosphere with whisper-quiet mist and soothing scents.",
    "price": 79.99,
    "category": "Home",
    "stock": 22,
    "imageUrl": "https://images.unsplash.com/photo-1515377905703-c4788e51af15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "ratings": 4.5,
    "numReviews": 21
  },
  {
    "name": "Portable Bluetooth Speaker",
    "description": "Punchy and portable sound for travel, outdoor fun, and home listening.",
    "price": 109.99,
    "category": "Electronics",
    "stock": 28,
    "imageUrl": "https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "ratings": 4.6,
    "numReviews": 36
  },
  {
    "name": "Wooden Dining Table",
    "description": "A statement piece with natural texture, durability, and family-friendly elegance.",
    "price": 480.0,
    "category": "Furniture",
    "stock": 10,
    "imageUrl": "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "ratings": 4.7,
    "numReviews": 14
  },
  {
    "name": "Skin Glow Serum",
    "description": "Hydrating skincare with botanicals for a dewy, radiant finish.",
    "price": 59.0,
    "category": "Beauty",
    "stock": 55,
    "imageUrl": "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "ratings": 4.4,
    "numReviews": 42
  },
  {
    "name": "Running Shoes",
    "description": "Responsive support and light cushioning built for active everyday movement.",
    "price": 120.0,
    "category": "Sports",
    "stock": 35,
    "imageUrl": "https://images.unsplash.com/photo-1543508282-6319a3e2621f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "ratings": 4.6,
    "numReviews": 49
  },
  {
    "name": "Luxury Wall Clock",
    "description": "Elegant timekeeping with a premium finish for modern home interiors.",
    "price": 90.0,
    "category": "Home",
    "stock": 20,
    "imageUrl": "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "ratings": 4.3,
    "numReviews": 11
  },
  {
    "name": "Travel Organizer Kit",
    "description": "Keep travel essentials neatly packed with compact compartments and storage.",
    "price": 38.5,
    "category": "Accessories",
    "stock": 48,
    "imageUrl": "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "ratings": 4.5,
    "numReviews": 20
  },
  {
    "name": "Mechanical Keyboard",
    "description": "Premium tactile typing for work, gaming, and high-efficiency creative setups.",
    "price": 165.0,
    "category": "Electronics",
    "stock": 16,
    "imageUrl": "https://images.unsplash.com/photo-1587829741301-dc798b83add3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "ratings": 4.8,
    "numReviews": 31
  },
  {
    "name": "Foldable Laptop Stand",
    "description": "Raise your screen for better posture and all-day comfort during work.",
    "price": 44.99,
    "category": "Office",
    "stock": 52,
    "imageUrl": "https://images.unsplash.com/photo-1524758631624-e2822e304c36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "ratings": 4.4,
    "numReviews": 17
  },
  {
    "name": "Wireless Earbuds",
    "description": "Sweat-resistant sound and clear calls for workouts, commutes, and music.",
    "price": 89.99,
    "category": "Electronics",
    "stock": 40,
    "imageUrl": "https://images.unsplash.com/photo-1546435770-a3e426bf472b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "ratings": 4.7,
    "numReviews": 61
  },
  {
    "name": "Modern Accent Lamp",
    "description": "A stylish ambient lamp designed to soften and elevate any room.",
    "price": 72.0,
    "category": "Home",
    "stock": 26,
    "imageUrl": "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "ratings": 4.2,
    "numReviews": 13
  },
  {
    "name": "Organic Cotton Towel Set",
    "description": "Ultra-soft towels built for spa-like comfort and everyday daily use.",
    "price": 32.0,
    "category": "Home",
    "stock": 70,
    "imageUrl": "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "ratings": 4.3,
    "numReviews": 25
  },
  {
    "name": "Designer Sunglasses",
    "description": "Premium UV protection and polished style for bright days outdoors.",
    "price": 99.0,
    "category": "Accessories",
    "stock": 32,
    "imageUrl": "https://images.unsplash.com/photo-1577803947579-9f2a6a7e2d7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "ratings": 4.6,
    "numReviews": 28
  },
  {
    "name": "Smart Home Hub",
    "description": "Control routines, lights, and smart devices from one central hub.",
    "price": 129.99,
    "category": "Electronics",
    "stock": 18,
    "imageUrl": "https://images.unsplash.com/photo-1518770660439-4636190af475?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "ratings": 4.5,
    "numReviews": 22
  },
  {
    "name": "Premium Yoga Mat",
    "description": "Comfortable grip and stability for workouts, stretching, and yoga.",
    "price": 54.0,
    "category": "Sports",
    "stock": 45,
    "imageUrl": "https://images.unsplash.com/photo-1518611012118-696072aa579a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "ratings": 4.7,
    "numReviews": 34
  },
  {
    "name": "Everyday Leather Wallet",
    "description": "Minimal and durable carry that balances style and practicality.",
    "price": 69.5,
    "category": "Accessories",
    "stock": 27,
    "imageUrl": "https://images.unsplash.com/photo-1627123424574-724758594e93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "ratings": 4.4,
    "numReviews": 19
  },
  {
    "name": "Portable Espresso Maker",
    "description": "Brew barista-style coffee at home with a compact, caf?-inspired setup.",
    "price": 149.99,
    "category": "Home",
    "stock": 15,
    "imageUrl": "https://images.unsplash.com/photo-1460342868574-45a8a8d5d2e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "ratings": 4.8,
    "numReviews": 44
  },
  {
    "name": "Compact Blender",
    "description": "Fast smoothie and shake blending with a sleek, space-saving design.",
    "price": 67.5,
    "category": "Kitchen",
    "stock": 33,
    "imageUrl": "https://images.unsplash.com/photo-1556911220-bff31c812dba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "ratings": 4.5,
    "numReviews": 26
  },
  {
    "name": "Air Fryer Oven",
    "description": "Healthy, quick meals with rapid airflow and convenient preset controls.",
    "price": 219.99,
    "category": "Kitchen",
    "stock": 14,
    "imageUrl": "https://images.unsplash.com/photo-1585518419759-7fe2e0fbf8a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "ratings": 4.7,
    "numReviews": 38
  },
  {
    "name": "Bamboo Desk Organizer",
    "description": "Keep your workspace tidy with a natural-material design and clean look.",
    "price": 26.99,
    "category": "Office",
    "stock": 63,
    "imageUrl": "https://images.unsplash.com/photo-1497366754035-f200968a6e72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "ratings": 4.3,
    "numReviews": 16
  },
  {
    "name": "Luxury Perfume Gift Box",
    "description": "A curated fragrance set wrapped for gifting and personal elegance.",
    "price": 138.0,
    "category": "Beauty",
    "stock": 24,
    "imageUrl": "https://images.unsplash.com/photo-1523293182086-7651a899d37f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "ratings": 4.8,
    "numReviews": 32
  },
  {
    "name": "Trail Running Cap",
    "description": "Lightweight, breathable cap designed for active outdoor comfort.",
    "price": 24.5,
    "category": "Sports",
    "stock": 80,
    "imageUrl": "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "ratings": 4.4,
    "numReviews": 15
  },
  {
    "name": "Leather Journal",
    "description": "Premium journal for planning and reflecting with smooth paper quality.",
    "price": 29.99,
    "category": "Office",
    "stock": 58,
    "imageUrl": "https://images.unsplash.com/photo-1517841905240-472988babdf9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "ratings": 4.6,
    "numReviews": 23
  },
  {
    "name": "Mini Projector",
    "description": "Portable projection for movie nights, presentations, and travel viewing.",
    "price": 289.0,
    "category": "Electronics",
    "stock": 13,
    "imageUrl": "https://images.unsplash.com/photo-1516321165247-4aa89a48be28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "ratings": 4.7,
    "numReviews": 29
  },
  {
    "name": "Digital Alarm Clock",
    "description": "Wake up gently with easy bedside controls and a clear time display.",
    "price": 36.0,
    "category": "Home",
    "stock": 41,
    "imageUrl": "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "ratings": 4.2,
    "numReviews": 12
  },
  {
    "name": "Rechargeable Desk Lamp",
    "description": "Flexible lighting for focused work, reading, and late-night productivity.",
    "price": 58.0,
    "category": "Office",
    "stock": 49,
    "imageUrl": "https://images.unsplash.com/photo-1497366811353-6870744d04b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "ratings": 4.5,
    "numReviews": 18
  },
  {
    "name": "Classic Denim Jacket",
    "description": "Timeless layering essential with comfort and casual everyday appeal.",
    "price": 92.0,
    "category": "Clothing",
    "stock": 39,
    "imageUrl": "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "ratings": 4.4,
    "numReviews": 35
  },
  {
    "name": "Waterproof Travel Backpack",
    "description": "Designed for adventure with weather-ready fabric and generous storage.",
    "price": 114.99,
    "category": "Travel",
    "stock": 31,
    "imageUrl": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "ratings": 4.6,
    "numReviews": 21
  },
  {
    "name": "Smart Thermometer",
    "description": "Quick readings and smart tracking for home health monitoring.",
    "price": 49.99,
    "category": "Health",
    "stock": 46,
    "imageUrl": "https://images.unsplash.com/photo-1576091160550-2173dba999ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "ratings": 4.5,
    "numReviews": 17
  },
  {
    "name": "Wooden Coffee Table",
    "description": "A refined centerpiece with practical surfaces and natural character.",
    "price": 360.0,
    "category": "Furniture",
    "stock": 11,
    "imageUrl": "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "ratings": 4.7,
    "numReviews": 13
  },
  {
    "name": "Rechargeable LED Bulb Pack",
    "description": "Energy-saving brightness with long life for efficient home lighting.",
    "price": 21.99,
    "category": "Home",
    "stock": 110,
    "imageUrl": "https://images.unsplash.com/photo-1515377905703-c4788e51af15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "ratings": 4.3,
    "numReviews": 19
  },
  {
    "name": "Premium Watch",
    "description": "Elegant design and premium finishing for everyday polish and style.",
    "price": 429.0,
    "category": "Accessories",
    "stock": 9,
    "imageUrl": "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "ratings": 4.9,
    "numReviews": 42
  },
  {
    "name": "Massage Gun",
    "description": "Deep-tissue support for muscle recovery and daily wellness routines.",
    "price": 179.0,
    "category": "Wellness",
    "stock": 22,
    "imageUrl": "https://images.unsplash.com/photo-1515377905703-c4788e51af15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "ratings": 4.7,
    "numReviews": 24
  },
  {
    "name": "Sandal Slip-On",
    "description": "Comfortable everyday sandals with cushioned support and easy wear.",
    "price": 49.0,
    "category": "Clothing",
    "stock": 52,
    "imageUrl": "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "ratings": 4.4,
    "numReviews": 14
  },
  {
    "name": "Bluetooth Thermos Bottle",
    "description": "Keep drinks hot or cold for hours with a sleek insulated bottle.",
    "price": 34.99,
    "category": "Lifestyle",
    "stock": 91,
    "imageUrl": "https://images.unsplash.com/photo-1602143407151-7111542de6e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "ratings": 4.5,
    "numReviews": 25
  },
  {
    "name": "Cordless Vacuum Cleaner",
    "description": "Powerful cleaning for floors, corners, and everyday messes at home.",
    "price": 249.0,
    "category": "Home",
    "stock": 18,
    "imageUrl": "https://images.unsplash.com/photo-1581578731548-c64695cc6952?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "ratings": 4.8,
    "numReviews": 46
  },
  {
    "name": "Nylon Gym Bag",
    "description": "Durable and organized storage for workouts, travel, and daily gear.",
    "price": 59.0,
    "category": "Sports",
    "stock": 54,
    "imageUrl": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "ratings": 4.3,
    "numReviews": 18
  },
  {
    "name": "Electric Toothbrush",
    "description": "Advanced cleaning technology for fresher mornings and better oral care.",
    "price": 52.0,
    "category": "Health",
    "stock": 68,
    "imageUrl": "https://images.unsplash.com/photo-1584515933487-779824d29309?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "ratings": 4.6,
    "numReviews": 27
  },
  {
    "name": "Cloud Cushion Throw",
    "description": "Soft, cozy warmth that adds comfort and texture to your living space.",
    "price": 39.99,
    "category": "Home",
    "stock": 72,
    "imageUrl": "https://images.unsplash.com/photo-1517705008128-361805f42e86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "ratings": 4.4,
    "numReviews": 21
  },
  {
    "name": "Portable SSD Drive",
    "description": "Fast, compact storage for work files, media, and backups on the go.",
    "price": 119.99,
    "category": "Electronics",
    "stock": 40,
    "imageUrl": "https://images.unsplash.com/photo-1587829741301-dc798b83add3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "ratings": 4.9,
    "numReviews": 50
  },
  {
    "name": "Desk Gaming Monitor",
    "description": "High refresh display for immersive play and smooth competitive action.",
    "price": 399.0,
    "category": "Electronics",
    "stock": 11,
    "imageUrl": "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "ratings": 4.8,
    "numReviews": 34
  },
  {
    "name": "Silk Sleep Mask",
    "description": "Soft, breathable sleep support for deeper rest and better evenings.",
    "price": 19.99,
    "category": "Beauty",
    "stock": 96,
    "imageUrl": "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "ratings": 4.2,
    "numReviews": 13
  },
  {
    "name": "Portable Car Charger",
    "description": "Quick-charge devices on the go with dual-output convenience.",
    "price": 27.5,
    "category": "Accessories",
    "stock": 88,
    "imageUrl": "https://images.unsplash.com/photo-1558981806-ec527fa84c39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "ratings": 4.5,
    "numReviews": 24
  },
  {
    "name": "Glass Food Jar Set",
    "description": "Store pantry staples beautifully with airtight modern kitchen jars.",
    "price": 42.99,
    "category": "Kitchen",
    "stock": 78,
    "imageUrl": "https://images.unsplash.com/photo-1509440159596-0249088772ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "ratings": 4.4,
    "numReviews": 20
  },
  {
    "name": "Digital Picture Frame",
    "description": "Showcase favorite memories with a sleek rotating photo display.",
    "price": 99.0,
    "category": "Home",
    "stock": 26,
    "imageUrl": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "ratings": 4.6,
    "numReviews": 23
  },
  {
    "name": "Leather Belt",
    "description": "A polished everyday essential with durable hardware and lasting structure.",
    "price": 57.0,
    "category": "Accessories",
    "stock": 66,
    "imageUrl": "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "ratings": 4.3,
    "numReviews": 19
  },
  {
    "name": "Insulated Lunch Bag",
    "description": "Keep meals fresh on the go with a clean, easy-carry lunch tote.",
    "price": 31.99,
    "category": "Lifestyle",
    "stock": 84,
    "imageUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "ratings": 4.4,
    "numReviews": 22
  },
  {
    "name": "Waterproof Camera Case",
    "description": "Protect your gear during outdoor use and everyday adventures.",
    "price": 64.0,
    "category": "Accessories",
    "stock": 47,
    "imageUrl": "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "ratings": 4.5,
    "numReviews": 18
  },
  {
    "name": "Portable Projector Screen",
    "description": "Create a cinema-like setup anywhere with a foldable projection screen.",
    "price": 175.0,
    "category": "Electronics",
    "stock": 14,
    "imageUrl": "https://images.unsplash.com/photo-1516321165247-4aa89a48be28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "ratings": 4.7,
    "numReviews": 29
  },
  {
    "name": "Cotton Lounge Set",
    "description": "Relaxed home comfort designed for cozy days and easy movement.",
    "price": 74.0,
    "category": "Clothing",
    "stock": 58,
    "imageUrl": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "ratings": 4.4,
    "numReviews": 17
  },
  {
    "name": "Ceramic Vase",
    "description": "Modern decor accent with artisan-inspired form and neutral styling.",
    "price": 45.5,
    "category": "Home",
    "stock": 74,
    "imageUrl": "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "ratings": 4.3,
    "numReviews": 15
  },
  {
    "name": "Gel Memory Foam Pillow",
    "description": "Supportive nighttime comfort with contouring and pressure relief.",
    "price": 38.0,
    "category": "Home",
    "stock": 80,
    "imageUrl": "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "ratings": 4.5,
    "numReviews": 26
  },
  {
    "name": "Bluetooth Cycling Headset",
    "description": "Ride with music and calls while staying focused on the road ahead.",
    "price": 88.0,
    "category": "Sports",
    "stock": 29,
    "imageUrl": "https://images.unsplash.com/photo-1546435770-a3e426bf472b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "ratings": 4.6,
    "numReviews": 20
  },
  {
    "name": "Smart Rice Cooker",
    "description": "Perfect rice and grains with convenient presets and warm settings.",
    "price": 109.99,
    "category": "Kitchen",
    "stock": 21,
    "imageUrl": "https://images.unsplash.com/photo-1556911220-bff31c812dba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "ratings": 4.7,
    "numReviews": 31
  },
  {
    "name": "Minimalist Desk Clock",
    "description": "Clean lines and quiet design for refined modern workspaces.",
    "price": 23.99,
    "category": "Office",
    "stock": 95,
    "imageUrl": "https://images.unsplash.com/photo-1497366754035-f200968a6e72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "ratings": 4.2,
    "numReviews": 11
  },
  {
    "name": "Face Roller Set",
    "description": "A soothing at-home beauty ritual for a refreshed, glowing look.",
    "price": 18.0,
    "category": "Beauty",
    "stock": 104,
    "imageUrl": "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "ratings": 4.3,
    "numReviews": 16
  },
  {
    "name": "Portable Power Bank",
    "description": "High-capacity charging for phones, tablets, and travel essentials.",
    "price": 69.99,
    "category": "Electronics",
    "stock": 61,
    "imageUrl": "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "ratings": 4.8,
    "numReviews": 45
  },
  {
    "name": "Folding Storage Ottoman",
    "description": "Multi-use seating and storage for apartments, lounges, and compact spaces.",
    "price": 128.0,
    "category": "Furniture",
    "stock": 17,
    "imageUrl": "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "ratings": 4.6,
    "numReviews": 21
  },
  {
    "name": "Wireless Mouse",
    "description": "Sleek ergonomic control for long work sessions and daily productivity.",
    "price": 29.99,
    "category": "Office",
    "stock": 93,
    "imageUrl": "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "ratings": 4.5,
    "numReviews": 32
  },
  {
    "name": "Travel Makeup Kit",
    "description": "Compact beauty storage for flights, weekends, and quick touch-ups.",
    "price": 33.99,
    "category": "Beauty",
    "stock": 73,
    "imageUrl": "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "ratings": 4.4,
    "numReviews": 18
  },
  {
    "name": "UV Sanitizer Box",
    "description": "Disinfect small personal items with a handy all-in-one timer system.",
    "price": 83.0,
    "category": "Health",
    "stock": 39,
    "imageUrl": "https://images.unsplash.com/photo-1584515933487-779824d29309?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "ratings": 4.7,
    "numReviews": 28
  },
  {
    "name": "Linen Storage Basket",
    "description": "Natural storage for blankets, toys, and tidy home organization.",
    "price": 26.0,
    "category": "Home",
    "stock": 85,
    "imageUrl": "https://images.unsplash.com/photo-1517705008128-361805f42e86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "ratings": 4.2,
    "numReviews": 13
  },
  {
    "name": "Portable Ice Maker",
    "description": "Create fresh ice quickly for parties, gatherings, and outdoor events.",
    "price": 239.0,
    "category": "Kitchen",
    "stock": 12,
    "imageUrl": "https://images.unsplash.com/photo-1556911220-bff31c812dba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "ratings": 4.6,
    "numReviews": 24
  }
];


    await Product.insertMany(products);
    
    console.log('✅ Data Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error(`❌ Error with data import: ${error.message}`);
    process.exit(1);
  }
};

importData();
