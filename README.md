# stylize-ai-fashion-platform
🏆 2nd Place EXPO'24 — AI-powered fashion retail platform with virtual try-on (OpenCV), personalized recommendations, and seller inventory management. Built with PERN Stack + Flutter.

Full Video Preview:
https://youtu.be/C_GZ-OTTN_E?si=gQ6SZ_hzhpMalWpb

🛍️ STYLIZE — AI-Powered Fashion Shopping Platform

📖 About
Stylize is a comprehensive e-commerce web and mobile application that transforms the fashion retail industry by providing a personalized, AI-driven shopping experience for both customers and retailers.
The platform bridges the gap between consumers and brands by combining computer vision, augmented reality virtual try-on, and personalized AI recommendations — all in one unified ecosystem.

Built by Fatima Usman & Mehmil Mirza | COMSATS University Islamabad | BS Software Engineering 2020–2024
Supervised by Dr. Zulfiqar Ali

🎯 Problem It Solves
Traditional fashion e-commerce suffers from:

❌ No personalized size or style recommendations
❌ High return/exchange rates due to poor fit
❌ No virtual try-on before purchasing
❌ Poor inventory management for retailers
❌ No cross-brand mix and match capability

Stylize solves all of these in a single platform for both buyers and sellers.

✨ Key Features
👤 For Customers (Mobile App — Flutter)
FeatureDescription:
🧠 AI Recommendations:  Personalized product suggestions based on style quiz + body measurements
👗 Virtual Try-On: fitting room using OpenCV body scanning (360° rotation)
🎨 Mix & Match Studio" Combine clothing from different brands to create complete outfits
📏 Smart Size Guide: Input measurements → get exact size recommendations per brand
🛒 Wishlist & Cart: Save items, receive sale notifications, manage purchases
🔍 Brand Discovery: Browse registered brands with curated catalogs
🔔 Personalized Notifications: Alerts on wishlist items going on sale

🏪 For Retailers (Web App — PERN)
FeatureDescription:
📦 Digital Catalog: Full inventory management — add, edit, disable products
📊 Analytics & Reports: Sales trends, revenue, stock performance dashboards
📋 Orders Management: Process, approve, cancel, and track all orders
🔮 Sales Predictor: AI-driven stock insights to prevent over/understocking
🏷️ Brand Management: Dedicated brand page with product listings

🔐 For Admins
Manage buyer and retailer accounts
Monitor platform earnings
Restrict/suspend user accounts
Configure payment and banking details

🏗️ System Architecture
┌─────────────────────────────────────────────────────────┐
│                    STYLIZE PLATFORM                      │
├──────────────────┬──────────────────┬───────────────────┤
│   MOBILE APP     │    WEB APP       │   ADMIN PANEL     │
│   (Flutter)      │    (React.js)    │   (React.js)      │
│   - Customers    │    - Retailers   │   - Admins        │
│   - Virtual      │    - Inventory   │   - User Mgmt     │
│     Try-On       │    - Analytics   │   - Earnings      │
└────────┬─────────┴────────┬─────────┴────────┬──────────┘
         │                  │                  │
         └──────────────────┼──────────────────┘
                            │
              ┌─────────────▼──────────────┐
              │      Node.js / Express.js   │
              │         REST API Layer      │
              └─────────────┬──────────────┘
                            │
         ┌──────────────────┼──────────────────┐
         │                  │                  │
    ┌────▼────┐       ┌─────▼────┐      ┌──────▼─────┐
    │PostgreSQL│       │ OpenCV   │      │  File      │
    │  (Main  │       │ (CV   │      │  Storage   │
    │   DB)   │       │  Engine) │      │  (Images)  │
    └─────────┘       └──────────┘      └────────────┘

🛠️ Tech Stack
Frontend & Mobile
Web Frontend: React.js (v18.2.0)

Mobile Application: Flutter (v3.13.7)

Backend & Database
Server-side: Node.js + Express.js (v19.0)

Database: PostgreSQL (v16)

Specialized Engineering
Computer Vision / AR: OpenCV (v4.5.4)

Design & Development Tools
UI/UX Design: Figma (v104.4.0)

Version Control: GitHub (v2.9.0)

Project Management: Trello (v5.17.1)

Integrated Development Environment (IDE): VS Code (v1.60.2)

Getting Started — Run Locally
Prerequisites
Make sure you have the following installed:
Node.js v19+
PostgreSQL v16
Flutter SDK v3.13.7
Git

1. Clone the Repository
bashgit clone https://github.com/fatima-usman/stylize-ai-fashion-platform.git
cd stylize-ai-fashion-platform

3. Set Up the Backend
bashcd backend
npm install
Create a .env file in /backend:
envPORT=5000
DATABASE_URL=postgresql://username:password@localhost:5432/stylize_db
JWT_SECRET=your_jwt_secret_key
Run database migrations:
bashnpx sequelize db:migrate
Start the server:
bashnpm start

4. Set Up the Web Frontend (React)
bashcd ../frontend
npm install
npm start
App runs at http://localhost:3000

5. Set Up the Mobile App (Flutter)
bashcd ../mobile
flutter pub get
flutter run

Documentation
Full project documentation is available in the /docs folder:
📋 Project Scope Document
📐 Software Requirements Specification (SRS)
🎨 UI Mockups & Wireframes


🏆 Awards & Recognition
2nd Place — EXPO'24, COMSATS ILC (Islamabad)
Competed against all final-year engineering teams across the university
Recognized for innovation in AI-driven fashion retail.

📬 Contact
  Fatima Usman
📧 fatimaausman8@gmail.com
🔗 linkedin.com/in/fatima-usman022
