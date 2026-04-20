# 🛍️ STYLIZE — AI-Powered Fashion Shopping Platform

![STYLIZE Banner](https://via.placeholder.com/1200x400/1a1a2e/ffffff?text=STYLIZE+%7C+AI-Powered+Fashion+Platform)

> 🏆 **2nd Place — EXPO'24, COMSATS ILC** | Out of all competing engineering teams

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-19.0-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://postgresql.org/)
[![Flutter](https://img.shields.io/badge/Flutter-3.13.7-02569B?style=for-the-badge&logo=flutter&logoColor=white)](https://flutter.dev/)
[![OpenCV](https://img.shields.io/badge/OpenCV-4.5.4-5C3EE8?style=for-the-badge&logo=opencv&logoColor=white)](https://opencv.org/)
[![Express](https://img.shields.io/badge/Express.js-4.x-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)

---

## 📖 About

**Stylize** is a comprehensive e-commerce web and mobile application that transforms the fashion retail industry by providing a personalized, AI-driven shopping experience for both customers and retailers.

The platform bridges the gap between consumers and brands by combining **computer vision**, **augmented reality virtual try-on**, and **personalized AI recommendations** — all in one unified ecosystem.

> Built by **Fatima Usman** & Mehmil Mirza | COMSATS University Islamabad | BS Software Engineering 2020–2024  
> Supervised by **Dr. Zulfiqar Ali**

---

## 🎯 Problem It Solves

Traditional fashion e-commerce suffers from:
- ❌ No personalized size or style recommendations
- ❌ High return/exchange rates due to poor fit
- ❌ No virtual try-on before purchasing
- ❌ Poor inventory management for retailers
- ❌ No cross-brand mix and match capability

**Stylize solves all of these** in a single platform for both buyers and sellers.

---

## ✨ Key Features

### 👤 For Customers (Mobile App — Flutter)
| Feature | Description |
|--------|-------------|
| 🧠 **AI Recommendations** | Personalized product suggestions based on style quiz + body measurements |
| 👗 **Virtual Try-On** | AR-powered fitting room using OpenCV body scanning (360° rotation) |
| 🎨 **Mix & Match Studio** | Combine clothing from different brands to create complete outfits |
| 📏 **Smart Size Guide** | Input measurements → get exact size recommendations per brand |
| 🛒 **Wishlist & Cart** | Save items, receive sale notifications, manage purchases |
| 🔍 **Brand Discovery** | Browse registered brands with curated catalogs |
| 🔔 **Personalized Notifications** | Alerts on wishlist items going on sale |

### 🏪 For Retailers (Web App — React)
| Feature | Description |
|--------|-------------|
| 📦 **Digital Catalog** | Full inventory management — add, edit, disable products |
| 📊 **Analytics & Reports** | Sales trends, revenue, stock performance dashboards |
| 📋 **Orders Management** | Process, approve, cancel, and track all orders |
| 🔮 **Sales Predictor** | AI-driven stock insights to prevent over/understocking |
| 🏷️ **Brand Management** | Dedicated brand page with product listings |

### 🔐 For Admins
- Manage buyer and retailer accounts
- Monitor platform earnings
- Restrict/suspend user accounts
- Configure payment and banking details

---

## 🏗️ System Architecture

```
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
    │  (Main  │       │ (AR/CV   │      │  Storage   │
    │   DB)   │       │  Engine) │      │  (Images)  │
    └─────────┘       └──────────┘      └────────────┘
```

---

## 🧩 Modules Overview

| # | Module | Platform | Description |
|---|--------|----------|-------------|
| 1 | User Management | All | Registration, auth, profiles, password reset |
| 2 | Customer Profiling | Mobile | Browsing history, search, personalization |
| 3 | Brands Spectrum | Mobile | Browse and discover fashion brands |
| 4 | Payment | Mobile | Secure payment gateway integration |
| 5 | Personalized Recommendations | Mobile | Style quiz + measurement-based suggestions |
| 6 | Mix & Match Studio | Mobile | Create outfit combinations from any brand |
| 7 | Digital Catalog | Web | Retailer product and inventory management |
| 8 | Orders Management | Web | Full order lifecycle for retailers |
| 9 | Analytics & Reports | Web | Sales, revenue, inventory insights |
| 10 | Virtual Try-On | Mobile | AR-powered body scanning and clothing overlay |
| 11 | Admin Dashboard | Web | Platform-wide user and earnings management |

---

## 🛠️ Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Frontend Web | React.js | 18.2.0 |
| Mobile App | Flutter | 3.13.7 |
| Backend | Node.js + Express.js | 19.0 |
| Database | PostgreSQL | 16 |
| Computer Vision / AR | OpenCV | 4.5.4 |
| Design | Figma | 104.4.0 |
| Version Control | GitHub | 2.9.0 |
| Project Management | Trello | 5.17.1 |
| IDE | VS Code | 1.60.2 |

---

## 🚀 Getting Started — Run Locally

### Prerequisites
Make sure you have the following installed:
- Node.js v19+
- PostgreSQL v16
- Flutter SDK v3.13.7
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/fatima-usman/stylize-ai-fashion-platform.git
cd stylize-ai-fashion-platform
```

### 2. Set Up the Backend
```bash
cd backend
npm install
```

Create a `.env` file in `/backend`:
```env
PORT=5000
DATABASE_URL=postgresql://username:password@localhost:5432/stylize_db
JWT_SECRET=your_jwt_secret_key
```

Run database migrations:
```bash
npx sequelize db:migrate
```

Start the server:
```bash
npm start
```

### 3. Set Up the Web Frontend (React)
```bash
cd ../frontend
npm install
npm start
```
App runs at `http://localhost:3000`

### 4. Set Up the Mobile App (Flutter)
```bash
cd ../mobile
flutter pub get
flutter run
```

---

## 📁 Project Structure

```
stylize-ai-fashion-platform/
├── backend/                  # Node.js + Express REST API
│   ├── controllers/          # Route controllers
│   ├── models/               # PostgreSQL models
│   ├── routes/               # API routes
│   ├── middleware/           # Auth & validation
│   └── server.js
├── frontend/                 # React.js web app (Retailers + Admin)
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/            # Page-level components
│   │   └── services/         # API service layer
├── mobile/                   # Flutter mobile app (Customers)
│   ├── lib/
│   │   ├── screens/          # App screens
│   │   ├── widgets/          # Reusable widgets
│   │   └── services/         # API integration
├── docs/                     # 📄 Project Documentation
│   ├── SCOPE.pdf             # Project scope document
│   ├── SRS.pdf               # Software requirements specification
│   ├── mockups/              # UI mockups and wireframes
│   └── architecture.png      # System architecture diagram
└── README.md
```

---

## 📄 Documentation

Full project documentation is available in the `/docs` folder:

- 📋 [Project Scope Document](./docs/SCOPE.pdf)
- 📐 [Software Requirements Specification (SRS)](./docs/SRS.pdf)
- 🎨 [UI Mockups & Wireframes](./docs/mockups/)

---

## 🏆 Awards & Recognition

> **2nd Place — EXPO'24, COMSATS ILC (Islamabad)**  
> Competed against all final-year engineering teams across the university  
> Recognized for innovation in AI-driven fashion retail and AR integration

---

## 👩‍💻 Team

| Name | Role | Modules |
|------|------|---------|
| **Fatima Usman** | Full-Stack Engineer & AR Lead | Modules 1, 3, 6, 9, 11 + AR/Backend |
| Mehmil Mirza | Full-Stack Engineer | Modules 2, 4, 5, 7, 8 + AR/Backend |

**Supervisor:** Dr. Zulfiqar Ali, COMSATS University Islamabad

---

## 📬 Contact

**Fatima Usman**  
📧 fatimaausman8@gmail.com  
🔗 [linkedin.com/in/fatima-usman022](https://linkedin.com/in/fatima-usman022)  
💻 [github.com/fatima-usman](https://github.com/fatima-usman)

---

*Built with ❤️ at COMSATS University Islamabad — BS Software Engineering 2020–2024*
