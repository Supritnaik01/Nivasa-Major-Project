# Nivasa

An Airbnb-inspired property listing and booking platform built with modern web technologies. Discover, list, and book unique accommodations worldwide.

![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![Express](https://img.shields.io/badge/Express-5.2-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-9.6-green)
![License](https://img.shields.io/badge/License-MIT-yellow)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- **User Authentication** - Secure signup/login with Passport.js
- **Property Listings** - Browse and search properties with detailed information
- **Interactive Maps** - View property locations with Leaflet.js using OpenStreetMap tiles
- **Image Management** - Upload multiple property images with Cloudinary integration
- **Reviews & Ratings** - Leave and view reviews for properties with star ratings
- **User Profiles** - Manage listings and bookings from personal dashboard
- **Responsive UI** - Bootstrap 5 framework for mobile-first design
- **Icon Library** - Font Awesome icons throughout the application
- **Form Validation** - Server-side validation using Joi with client-side feedback
- **Session Management** - Secure session handling with express-session
- **Flash Messages** - User feedback with connect-flash notifications
- **Error Handling** - Comprehensive error handling and logging
- **Geolocation** - Display properties on interactive maps with coordinates

## 🛠️ Tech Stack

**Backend:**
- **Runtime**: Node.js
- **Framework**: Express.js 5.2
- **Template Engine**: EJS with EJS-Mate for layouts
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: Passport.js with Local Strategy
- **File Upload**: Multer with Cloudinary storage
- **Validation**: Joi schema validation
- **Session**: express-session

**Frontend:**
- **CSS Framework**: Bootstrap 5 - responsive and mobile-first UI
- **Icons**: Font Awesome - comprehensive icon library
- **Styling**: CSS3 with custom stylesheets
- **Templating**: EJS for server-side rendering

**Mapping:**
- **Mapping Library**: Leaflet.js - lightweight interactive maps
- **Map Tiles**: OpenStreetMap (OSM) - free, open-source mapping data
- **Geolocation**: Native browser Geolocation API for location services

**Additional Libraries:**
- **dotenv**: Environment variable management
- **method-override**: HTTP method override for REST operations
- **connect-flash**: Flash message support
- **nodemon**: Development auto-restart

**Cloud Services:**
- **Cloudinary**: Image hosting and optimization
- **OpenStreetMap**: Free tile-based mapping service

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18.0 or higher)
- npm or yarn package manager
- MongoDB (local or MongoDB Atlas account)
- Cloudinary account for image uploads
- Git

## 🚀 Installation

1. **Clone the repository:**
```bash
git clone https://github.com/Supritnaik01/Nivasa-Major-Project.git
cd Nivasa-Major-Project
```

2. **Install dependencies:**
```bash
npm install
```

3. **Create a `.env` file** in the root directory:
```bash
cp .env.example .env
```


## 📂 Project Structure

```
Nivasa/
│ 
├── controllers/
│   ├── listing.js
│   ├── review.js
│   └── user.js
│ 
├── models/
│   ├── listing.js          # Property listing schema
│   ├── review.js           # Review schema
│   └── user.js             # User schema
│ 
├── public/
│   ├── assets/             # Static images
│   ├── css/                # Stylesheets
│   ├── js/                 # Client-side scripts
│ 
├── routes/
│   ├── listingsRoutes.js   # Listing routes
│   ├── reviewsRoutes.js    # Review routes
│   └── usersRoutes.js      # User authentication routes
│ 
├── utils/
│   ├── ExpressError.js     #Error Handing
│   ├── wrapAsync.js        #wrap async
│ 
├── views/
│   ├── includes/           # includes templates
│   ├── layouts/            # layouts templates
│   ├── listings/           # listings templates
│   └── users/              # users templates
│
├── cloudeConfig.js         # Cloudinary configuration
├── middleware.js           #middlewares       
├── .env                    # Environment variables (create this)
├── .gitignore              # Git ignore rules
├── app.js                  # Main application file
├── package.json            # Dependencies and scripts
└── README.md               # Project documentation
```

## 🎯 Running the Application

### Development Mode
```bash
npm run dev
```
The application will start on `http://localhost:3000` with auto-reload on file changes.

### Production Mode
```bash
npm start
```


## 🔧 Configuration Details

### Cloudinary Setup
1. Create a Cloudinary account at https://cloudinary.com
2. Get your Cloud Name, API Key, and API Secret
3. Add them to your `.env` file
4. The app uses `multer-storage-cloudinary` for direct cloud uploads

### Passport Authentication
- Uses Local strategy with username/password
- Passwords are hashed using bcrypt (via passport-local-mongoose)
- Sessions are stored and managed by express-session

### Validation
- Server-side validation using Joi for all form submissions
- Form data validated before database operations

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👨‍💻 Author

**Suprit Naik**
- GitHub: [@Supritnaik01](https://github.com/Supritnaik01)
- Email: suprit@example.com

## 🙏 Acknowledgments

- Express.js and Mongoose communities
- Cloudinary for image hosting and optimization
- Passport.js for authentication
- EJS for templating
- Bootstrap 5 for responsive UI framework
- Font Awesome for comprehensive icon library
- Leaflet.js for interactive mapping
- OpenStreetMap for free mapping tiles and data

## 📞 Support

For issues and questions, please open an issue on the [GitHub repository](https://github.com/Supritnaik01/Nivasa-Major-Project/issues).

---

**Last Updated**: June 2026
**Version**: 1.0.0