# Nivasa — Property Rental & Booking Platform

Nivasa is a full-stack property rental and booking platform built with **Node.js, Express.js, MongoDB, Mongoose, EJS, and Bootstrap**.

The project focuses on implementing the backend workflows behind a real-world rental platform, including **authentication, authorization, property management, image uploads, reviews, geolocation, and booking conflict detection**.

## Key Engineering Work

### 1. Authentication & Authorization

* Implemented user authentication using **Passport.js** and session-based authentication.
* Protected routes that require authenticated users.
* Implemented authorization so users can modify or delete only resources they are permitted to manage.
* Integrated authentication with the application's server-rendered views.

### 2. Property Listing Management

Users can:

* Create property listings.
* Upload property images.
* Add property details such as title, description, price, location, and country.
* Edit and delete their listings.
* View available property listings and detailed property information.

The application separates listing-related responsibilities using an **MVC-based structure**, keeping routing, models, controllers, and views organized.

### 3. Booking & Conflict Detection

A key backend component of Nivasa is its booking system.

Before creating a booking, the application checks whether the requested dates overlap with an existing reservation.

The overlap condition is conceptually:

```text
existingCheckIn < requestedCheckOut
AND
existingCheckOut > requestedCheckIn
```

If an overlap exists, the booking is rejected.

This prevents multiple users from booking the same property for conflicting dates.

### 4. Reviews & Ratings

Users can submit reviews and ratings for properties.

The application:

* Associates reviews with users and listings.
* Displays reviews on property pages.
* Allows authorized users to manage their reviews.
* Maintains relationships between listings, users, and reviews through MongoDB references.

### 5. Image Upload & Cloud Storage

Property images are uploaded through the application and stored using **Cloudinary**.

The application maintains the corresponding image information with the property data in MongoDB rather than storing image files directly inside the database.

### 6. Location & Maps

Property locations are displayed using **Leaflet** with **OpenStreetMap**.

This provides an interactive map interface for viewing the geographical location associated with a property.

### 7. Server-Side Validation & Error Handling

The application validates incoming data before persisting it to the database.

It also uses centralized error-handling patterns in the Express application to handle invalid requests and application errors more consistently.

---

## Technology Stack

| Layer          | Technology                            |
| -------------- | ------------------------------------- |
| Frontend       | EJS, HTML, CSS, JavaScript, Bootstrap |
| Backend        | Node.js, Express.js                   |
| Database       | MongoDB                               |
| ODM            | Mongoose                              |
| Authentication | Passport.js                           |
| Sessions       | Express Session                       |
| Image Storage  | Cloudinary                            |
| Maps           | Leaflet, OpenStreetMap                |
| Architecture   | MVC                                   |
| Deployment     | Render                                |

---

## Application Architecture

Nivasa follows an **MVC-oriented architecture**:

```text
Nivasa
│
├── controllers/
│   ├── listings.js
│   ├── reviews.js
│   └── bookings.js
│
├── models/
│   ├── listing.js
│   ├── review.js
│   ├── user.js
│   └── booking.js
│
├── routes/
│   ├── listing.js
│   ├── review.js
│   ├── booking.js
│   └── user.js
│
├── views/
│   ├── listings/
│   ├── bookings/
│   ├── users/
│   └── layouts/
│
├── public/
│   ├── css/
│   └── js/
│
├── utils/
│
├── app.js
├── middleware.js
├── cloudConfig.js
└── package.json
```

> The file and directory names above should match the current repository structure.

---

## Data Model

The application uses MongoDB with Mongoose to model the primary entities.

### User

Stores user authentication and account information.

### Listing

Represents a property available on the platform and contains information such as:

* Title
* Description
* Price
* Location
* Country
* Images
* Owner

### Review

Represents a review associated with:

* A listing
* A user
* Rating
* Review content

### Booking

Represents a reservation associated with:

* A user
* A listing
* Check-in date
* Check-out date

The relationships between these entities are implemented using **Mongoose references**.

---

## Booking Flow

The booking workflow follows this general sequence:

```text
User selects property
        │
        ▼
Selects check-in / check-out dates
        │
        ▼
Server validates request
        │
        ▼
Check existing bookings
        │
        ├── Conflict found ──► Reject booking
        │
        ▼
No conflict
        │
        ▼
Create booking
        │
        ▼
Store booking in MongoDB
```

The important part of this workflow is that **availability is checked on the server**, rather than relying only on frontend validation.

---

## Security & Access Control

The application implements several application-level security measures:

* Session-based authentication.
* Protected routes for authenticated users.
* Authorization checks for resource ownership.
* Server-side request validation.
* Password handling through Passport Local Mongoose rather than storing plaintext passwords.
* Environment variables for sensitive configuration values.

Sensitive configuration such as database credentials and API keys should be supplied through environment variables rather than committed to the repository.

---

## Project Structure

The application separates major responsibilities across:

* **Models** — database schemas and relationships.
* **Controllers** — application/business logic.
* **Routes** — HTTP request routing.
* **Views** — server-rendered UI.
* **Middleware** — authentication, authorization, validation, and request processing.
* **Utils** — reusable application utilities.
* **Public** — client-side assets.

This separation makes individual features easier to modify and maintain.

---

## Getting Started

### Prerequisites

Make sure the following are installed:

* Node.js
* npm
* MongoDB database
* Cloudinary account

### Installation

Clone the repository:

```bash
git clone https://github.com/Supritnaik01/Nivasa-Major-Project.git
cd Nivasa-Major-Project
```

Install dependencies:

```bash
npm install
```

Create a `.env` file and provide the required environment variables used by the application, including the MongoDB connection string, session secret, and Cloudinary credentials.

Start the application:

```bash
npm start
```

The application can then be accessed through the local server configured in the project.

---

## Core Dependencies

The project uses libraries including:

* Express.js
* Mongoose
* EJS
* Passport.js
* Passport Local Mongoose
* Express Session
* Cloudinary
* Multer
* Leaflet
* Joi
* Method Override
* Connect Mongo

---

## Engineering Highlights

The main engineering challenges addressed in Nivasa include:

1. **Designing relationships between users, listings, reviews, and bookings using MongoDB references.**
2. **Implementing authentication and resource-level authorization.**
3. **Preventing overlapping property reservations through server-side date validation.**
4. **Handling image uploads and external cloud storage.**
5. **Integrating interactive maps with property data.**
6. **Structuring the Express application using MVC principles.**
7. **Validating user input before database operations.**
8. **Managing sessions and protected application workflows.**

---

## Current Limitations

Nivasa is primarily a learning and portfolio project. Some areas that could be improved further include:

* Automated unit and integration testing.
* More comprehensive API-level testing.
* Improved booking transaction/concurrency handling.
* More robust input validation and security hardening.
* Production-grade observability and logging.
* Improved frontend responsiveness and UX.
* More comprehensive deployment and CI/CD automation.

---

## Future Improvements

Potential improvements include:

* Automated testing with a dedicated test suite.
* Payment gateway integration.
* Email notifications for booking events.
* Advanced property search and filtering.
* Improved booking and availability management.
* Administrative dashboard.
* Better production monitoring and logging.
* CI/CD pipeline for automated testing and deployment.

---

## Learning Outcomes

Through Nivasa, I gained practical experience with:

* Full-stack web application development.
* Node.js and Express.js backend development.
* MongoDB data modeling with Mongoose.
* Authentication and authorization.
* Session management.
* Server-side validation.
* Cloud-based image storage.
* Geospatial map integration.
* Backend booking logic and date-range conflict detection.
* MVC application architecture.
* Deployment of a full-stack application.

---

## Author

**Suprit Naik**

GitHub: [Supritnaik01](https://github.com/Supritnaik01)

---

## License

This project is intended primarily for educational and portfolio purposes.
