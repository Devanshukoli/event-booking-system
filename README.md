# Event Booking System

## Practical Task: Event Booking System

### Objective
Develop a backend API for an Event Booking System with user registration, authentication, event management, and booking support.

## Features

### Core Functionality
- User registration and login using JWT authentication.
- Protected endpoints for event creation, update, and deletion.
- Event listing with filtering by date range and pagination.
- Booking events with real-time seat availability tracking.
- Role-based access: admins manage events, regular users view events and book.
- Swagger/OpenAPI documentation available for all API endpoints.

### Implemented Endpoints

#### Authentication
- `POST /api/auth/register`
  - Register a new user with `name`, `email`, and `password`.
  - Validates unique email and stores hashed passwords.
- `POST /api/auth/login`
  - Authenticate user credentials and return a JWT token.
  - Rate limited to protect sensitive login access.

#### Events
- `GET /api/events`
  - Fetch all events.
  - Supports filtering by date range: `?start=YYYY-MM-DD&end=YYYY-MM-DD`.
  - Supports pagination: `?page=1&limit=10`.
- `POST /api/events`
  - Create a new event. Protected endpoint for admin users.
  - Request body: `{ "name": "Event Name", "date": "2023-12-25", "capacity": 100 }`.
- `PUT /api/events/:id`
  - Update event details. Protected endpoint for admin users.
- `DELETE /api/events/:id`
  - Delete an event. Protected endpoint for admin users.
- `POST /api/events/:id/book`
  - Book seats for an event. Protected endpoint for authenticated users.
  - Real-time available seats tracking is enforced.

#### Bookings
- `GET /api/bookings`
  - Fetch bookings for the authenticated user.
  - Protected endpoint requiring a valid JWT.

### Documentation
- Swagger UI is available at: `GET /api-docs`
- API docs describe all available routes and request/response models.

## Database Design

### Users
- `id` (auto-generated)
- `name`
- `email`
- `password`
- `role` (`user` or `admin`)

### Events
- `id` (auto-generated)
- `name`
- `date`
- `capacity`
- `availableSeats`

### Bookings
- `user` (reference to Users)
- `event` (reference to Events)
- `seats`

## Technologies
- Node.js + Express
- MongoDB with Mongoose
- JWT authentication
- bcryptjs for password hashing
- express-rate-limit for login and booking protection
- Swagger UI for API documentation

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/Devanshukoli/event-booking-system.git
   cd event-booking-system
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the required environment variables, for example:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/event-booking
   JWT_SECRET=your_jwt_secret
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

5. Open the API in your browser:
   - Base API: `http://localhost:5000`
   - Swagger docs: `http://localhost:5000/api-docs`

## Notes
- Event management endpoints require an `Authorization: Bearer <token>` header.
- Admin users are required for event creation, update, and delete operations.
- This README reflects the current implementation and the original task requirements, including Swagger documentation support.
