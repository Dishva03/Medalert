# MedAlert Backend

Backend API for MedAlert - Medicine Reminder & Tracking App. Built with Node.js, Express, TypeScript, and MongoDB.

## Features

- User authentication (register, login, profile)
- Medication management (CRUD operations)
- Reminder scheduling and retrieval
- JWT-based authentication
- MongoDB database integration

## Tech Stack

- Node.js
- Express
- TypeScript
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB connection (local or Atlas)

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd medalert-backend
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables

Create a `.env` file in the root directory with the following variables:

```
PORT=5000
NODE_ENV=development
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

4. Seed the database with test data (optional)

```bash
npm run seed
```

This will create a test user and sample medications.

Test User Credentials:
- Email: test@example.com
- Password: password123

5. Start the development server

```bash
npm run dev
```

The server will start on http://localhost:5000.

## API Documentation

### Authentication

#### Register a new user

```
POST /api/auth/register
```

Request body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "token": "jwt_token"
}
```

#### Login

```
POST /api/auth/login
```

Request body:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "token": "jwt_token"
}
```

#### Get current user

```
GET /api/auth/me
```

Headers:
```
Authorization: Bearer jwt_token
```

Response:
```json
{
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@example.com"
}
```

### Medications

#### Get all medications

```
GET /api/meds
```

Headers:
```
Authorization: Bearer jwt_token
```

Response:
```json
[
  {
    "_id": "medication_id",
    "name": "Aspirin",
    "dose": "100mg",
    "schedule": ["08:00", "20:00"],
    "notes": "Take with food",
    "user": "user_id",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
]
```

#### Add a medication

```
POST /api/meds
```

Headers:
```
Authorization: Bearer jwt_token
```

Request body:
```json
{
  "name": "Aspirin",
  "dose": "100mg",
  "schedule": ["08:00", "20:00"],
  "notes": "Take with food"
}
```

Response:
```json
{
  "_id": "medication_id",
  "name": "Aspirin",
  "dose": "100mg",
  "schedule": ["08:00", "20:00"],
  "notes": "Take with food",
  "user": "user_id",
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-01T00:00:00.000Z"
}
```

#### Get a medication

```
GET /api/meds/:id
```

Headers:
```
Authorization: Bearer jwt_token
```

Response:
```json
{
  "_id": "medication_id",
  "name": "Aspirin",
  "dose": "100mg",
  "schedule": ["08:00", "20:00"],
  "notes": "Take with food",
  "user": "user_id",
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-01T00:00:00.000Z"
}
```

#### Update a medication

```
PUT /api/meds/:id
```

Headers:
```
Authorization: Bearer jwt_token
```

Request body:
```json
{
  "name": "Aspirin",
  "dose": "200mg",
  "schedule": ["08:00", "14:00", "20:00"],
  "notes": "Take with food and water"
}
```

Response:
```json
{
  "_id": "medication_id",
  "name": "Aspirin",
  "dose": "200mg",
  "schedule": ["08:00", "14:00", "20:00"],
  "notes": "Take with food and water",
  "user": "user_id",
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-01T00:00:00.000Z"
}
```

#### Delete a medication

```
DELETE /api/meds/:id
```

Headers:
```
Authorization: Bearer jwt_token
```

Response:
```json
{
  "message": "Medication removed"
}
```

### Reminders

#### Get upcoming reminders

```
GET /api/reminders/upcoming
```

Headers:
```
Authorization: Bearer jwt_token
```

Response:
```json
[
  {
    "medicationId": "medication_id",
    "medicationName": "Aspirin",
    "dose": "100mg",
    "time": "08:00",
    "nextOccurrence": "2023-01-01T08:00:00.000Z"
  }
]
```

#### Get today's reminders

```
GET /api/reminders/today
```

Headers:
```
Authorization: Bearer jwt_token
```

Response:
```json
[
  {
    "medicationId": "medication_id",
    "medicationName": "Aspirin",
    "dose": "100mg",
    "time": "08:00",
    "reminderTime": "2023-01-01T08:00:00.000Z",
    "isPast": false
  }
]
```

## Example cURL Requests

### Register a user

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
```

### Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

### Get current user

```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Add a medication

```bash
curl -X POST http://localhost:5000/api/meds \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"name":"Aspirin","dose":"100mg","schedule":["08:00","20:00"],"notes":"Take with food"}'
```

### Get all medications

```bash
curl -X GET http://localhost:5000/api/meds \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## License

MIT