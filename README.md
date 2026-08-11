# 🏡 Nivasa — Full-Stack Property Rental Platform

**Nivasa** is a full-stack property rental and listing platform inspired by applications such as Airbnb. Users can explore properties, create and manage listings, upload property images, leave reviews, view locations on an interactive map, and make bookings with date-conflict detection.

🌐 **Live Demo:** https://mynivasa.onrender.com
💻 **GitHub:** https://github.com/Supritnaik01/Nivasa-Major-Project

---

## ✨ Features

### 🔐 Authentication & Authorization

* User registration and login
* Logout functionality
* Session-based authentication using Passport.js
* Persistent sessions using MongoDB
* Protected routes for authenticated users
* Owner-based authorization for listings
* Author-based authorization for reviews
* User-based authorization for bookings

### 🏠 Property Listings

* View all available properties
* View individual property details
* Create new property listings
* Edit existing listings
* Delete owned listings
* Property categories and amenities
* Price per night
* Property descriptions and locations
* Owner information

### 🔎 Listing Categories

Users can filter properties using categories such as:

* Rooms
* Apartments
* Villas
* Beach
* Mountains
* City
* Farms
* Camping
* Swimming Pool
* AC
* Metro
* Parking

### 🖼️ Image Uploads

* Multiple property images
* Image upload using Multer
* Cloudinary integration for cloud image storage
* Images are stored externally instead of directly in MongoDB

### 🗺️ Interactive Maps

* Property coordinates stored with listings
* Interactive maps using Leaflet
* OpenStreetMap integration
* Displays the property's location on the listing details page

### ⭐ Reviews & Ratings

* Authenticated users can submit reviews
* Rating system from 1–5
* Review authors can delete their own reviews
* Reviews are associated with both users and listings
* Review cleanup when a listing is deleted

### 📅 Booking System

* Users can book properties
* Check-in and check-out dates
* Automatic number-of-nights calculation
* Automatic total-price calculation
* Server-side booking validation
* Prevents overlapping bookings for the same property
* Users can view their bookings
* Booking cancellation support

### ⚠️ Validation & Error Handling

* Joi-based server-side request validation
* Mongoose schema validation
* Custom error handling
* Flash messages for user feedback
* Protected routes and authorization middleware

---

## 🛠️ Tech Stack

### Frontend

* HTML5
* CSS3
* JavaScript
* Bootstrap
* EJS
* EJS-Mate

### Backend

* Node.js
* Express.js
* RESTful routing
* MVC architecture

### Database

* MongoDB
* MongoDB Atlas
* Mongoose

### Authentication

* Passport.js
* Passport Local
* Passport Local Mongoose
* Express Session
* Connect-Mongo

### Cloud & APIs

* Cloudinary — Image storage
* Multer — File uploads
* Leaflet — Interactive maps
* OpenStreetMap — Map data

### Validation

* Joi
* Mongoose validation

### Deployment

* Render

---

## 🏗️ Project Architecture

Nivasa follows an MVC-inspired architecture to separate application responsibilities.

```text
Nivasa
│
├── controllers/
│   ├── booking.js
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── models/
│   ├── booking.js
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── routes/
│   ├── bookingRoute.js
│   ├── listingRoute.js
│   ├── myBookingRoute.js
│   ├── reviewRoute.js
│   └── userRoute.js
│
├── views/
│   ├── layouts/
│   ├── listings/
│   ├── users/
│   └── includes/
│
├── public/
│   ├── css/
│   └── js/
│
├── utils/
│   ├── ExpressError.js
│   └── wrapAsync.js
│
├── middleware.js
├── schema.js
├── cloudConfig.js
├── app.js
├── package.json
└── README.md
```

---

## 🔄 Application Flow

```text
                    ┌───────────────┐
                    │     User      │
                    └───────┬───────┘
                            │
                            ▼
                    ┌───────────────┐
                    │   Express.js  │
                    └───────┬───────┘
                            │
                            ▼
                    ┌───────────────┐
                    │    Routes     │
                    └───────┬───────┘
                            │
                            ▼
                    ┌───────────────┐
                    │  Middleware   │
                    │ Auth/Validate │
                    └───────┬───────┘
                            │
                            ▼
                    ┌───────────────┐
                    │ Controllers   │
                    └───────┬───────┘
                            │
                            ▼
                    ┌───────────────┐
                    │    Models     │
                    │   Mongoose    │
                    └───────┬───────┘
                            │
                            ▼
                    ┌───────────────┐
                    │    MongoDB    │
                    └───────────────┘
```

---

## 🗄️ Database Design

Nivasa uses MongoDB with Mongoose schemas.

### User

```text
User
├── username
├── email
├── password
└── ...
```

### Listing

```text
Listing
├── title
├── description
├── image
├── price
├── location
├── country
├── coordinates
├── categories
├── owner → User
├── reviews → Review[]
└── ...
```

### Review

```text
Review
├── comment
├── rating
├── author → User
└── ...
```

### Booking

```text
Booking
├── checkIn
├── checkOut
├── totalPrice
├── status
├── listing → Listing
├── user → User
└── ...
```

### Entity Relationships

```text
             ┌──────────┐
             │   User   │
             └────┬─────┘
                  │
        ┌─────────┼─────────┐
        │         │         │
        ▼         ▼         ▼
     Listings   Reviews   Bookings
        │         │         │
        └────┬────┘         │
             │              │
             ▼              │
         ┌─────────┐        │
         │ Listing │◄───────┘
         └─────────┘
```

---

## 📅 Booking Conflict Detection

Nivasa checks whether an existing booking overlaps with the requested dates before creating a new booking.

The overlap condition is conceptually:

```text
Existing Check-in < New Check-out
AND
Existing Check-out > New Check-in
```

This prevents multiple users from booking the same property for overlapping dates.

The total booking price is calculated based on:

```text
Number of Nights × Price per Night
```

---

## 🔒 Security & Authorization

Nivasa implements multiple layers of protection:

* Authentication using Passport.js
* Session-based login
* Persistent sessions using MongoDB
* Protected routes
* Listing ownership verification
* Review author verification
* Booking ownership verification
* Server-side Joi validation
* Mongoose validation
* Environment variables for sensitive configuration
* HTTP-only session cookies

---

## ☁️ Cloudinary Image Architecture

Property images are not stored directly inside MongoDB.

```text
User
  │
  │ Upload Image
  ▼
Multer
  │
  ▼
Cloudinary
  │
  │ Image URL
  ▼
MongoDB
```

MongoDB stores the image information/URL while Cloudinary handles the actual image storage.

---

## 🗺️ Map Architecture

Nivasa uses **Leaflet** with **OpenStreetMap**.

```text
Listing
   │
   ├── latitude
   └── longitude
          │
          ▼
      Leaflet Map
          │
          ▼
   OpenStreetMap
```

Each listing can display its location using its stored coordinates.

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Supritnaik01/Nivasa-Major-Project.git
```

### 2. Navigate into the project

```bash
cd Nivasa-Major-Project
```

### 3. Install dependencies

```bash
npm install
```

### 4. Create environment variables

Create a `.env` file in the root directory:

```env
ATLASDB_URL=your_mongodb_connection_string
SECRET=your_session_secret

CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
```

Use the variable names expected by the current application configuration.

### 5. Start the application

```bash
node app.js
```

For development, if you have Nodemon installed:

```bash
nodemon app.js
```

The application will be available at:

```text
http://localhost:8080
```

---

## 📦 Main Dependencies

Some of the major packages used in the project include:

```text
express
mongoose
ejs
ejs-mate
passport
passport-local
passport-local-mongoose
express-session
connect-mongo
connect-flash
joi
multer
multer-storage-cloudinary
cloudinary
method-override
dotenv
leaflet
```

---

## 🌐 Deployment

The application is deployed using **Render**.

### Live Application

https://mynivasa.onrender.com

### Main Pages

```text
/
├── /listings
├── /listings/:id
├── /listings/new
├── /listings/:id/edit
├── /login
├── /signup
└── /myBookings
```

---

## 📸 Screenshots

Add screenshots of the major pages here.

Recommended screenshots:

1. Homepage
2. Listings page
3. Listing details
4. Create listing
5. Login/signup
6. Booking page
7. My bookings
8. Map
9. Reviews

Example:

```markdown
![Nivasa Listings](./screenshots/listings.png)
```

---

## 🧪 Testing

Automated testing is currently not implemented.

Future testing can cover:

* User authentication
* Listing CRUD
* Authorization
* Review CRUD
* Booking validation
* Booking conflict detection
* Image uploads
* API/request validation

---

## 🔮 Future Improvements

Potential improvements for future versions:

* 🔎 Advanced property search
* 💰 Price-range filtering
* 📅 Interactive availability calendar
* 💳 Online payments using Razorpay
* 📧 Booking confirmation emails
* ⭐ Verified reviews from users with completed bookings
* 📊 User dashboard
* 🔔 Booking notifications
* 🧪 Automated unit/integration tests
* 🚦 API rate limiting
* ⚡ Improved image optimization
* 📱 Further mobile UI improvements
* 🔐 Additional security hardening

---

## 🎯 Learning Outcomes

Building Nivasa helped me gain practical experience with:

* Full-stack web development
* Node.js and Express.js
* MVC architecture
* RESTful routing
* MongoDB and Mongoose
* Authentication and authorization
* Session management
* Server-side validation
* File uploads
* Cloudinary integration
* Interactive maps
* Database relationships
* Booking and date-conflict logic
* Error handling
* Git and GitHub
* Cloud deployment

---

## 👨‍💻 Author

**Suprit Naik**

Computer Science Engineering Student

GitHub:
https://github.com/Supritnaik01

---

## ⭐ Acknowledgements

This project was developed as a full-stack web development project to understand how real-world web applications are designed, implemented, secured, and deployed.

If you found the project useful, consider giving the repository a ⭐.
