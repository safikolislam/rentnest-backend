🏠 RentNest Backend

A RESTful backend API for a rental property marketplace where Tenants can browse and request rental properties, Landlords can manage properties and rental requests, and Admins can manage users, properties, rentals, and categories.

🔗 Project Links

Resource

Link

GitHub Repository

https://github.com/safikolislam/rentnest-backend

Live API

https://rentnest-backend-chi.vercel.app/

Postman API Documentation

https://documenter.getpostman.com/view/45368212/2sBYAys8sr

Live API

https://rentnest-backend-chi.vercel.app/

The root endpoint returns:

rentnest server is running



🚀 Features

👤 Tenant

Register and login as a Tenant

Browse rental properties

View property details

Search/filter available properties

Submit rental requests

View own rental requests

View rental request details

Make payment after rental approval

View payment history

View payment details

Create reviews after a completed rental

🏠 Landlord

Register and login as a Landlord

Create rental property listings

Update own property listings

Delete own property listings

View rental requests for owned properties

Approve or reject rental requests

View rental request details

👨‍💼 Admin

Login as Admin

View all users

Ban/unban users

View all properties

View all rental requests

Create property categories

Manage platform data

💳 Payment

Stripe payment integration

Create Stripe payment session

Stripe webhook/payment confirmation

View authenticated user's payments

View individual payment details

Payment status tracking

⭐ Reviews

Tenant can create a review

Public property reviews can be viewed by property ID

🛠️ Tech Stack

Backend

Node.js

Express.js

TypeScript

PostgreSQL

Prisma ORM

JWT Authentication

bcryptjs

Cookie Parser

Stripe

CORS

HTTP Status

Development & Deployment

tsx

tsup

Vercel

👥 User Roles & Permissions

Role

Main Permissions

Tenant

Browse properties, create rental requests, make payments, create reviews

Landlord

Create/manage properties, view requests, approve/reject requests

Admin

Manage users, properties, rentals and categories

Authentication and role-based authorization are applied to protected routes.

🔐 Authentication

Register

POST /api/auth/register

Creates a new Tenant or Landlord account.

Login

POST /api/auth/login

Authenticates a user and returns access/refresh tokens.

Authentication tokens are also handled using HTTP cookies.

My Profile

GET /api/auth/me

Returns the currently authenticated user's profile.

Allowed roles: Tenant, Landlord, Admin.

📚 API Documentation

Complete API requests, parameters, request bodies and responses are available in the Postman documentation.

📮 Postman Documentation

👉 https://documenter.getpostman.com/view/45368212/2sBYAys8sr

The Postman documentation should be used as the primary reference for testing the API.

📡 API Endpoints

Base URL:

https://rentnest-backend-chi.vercel.app

🔑 Authentication

Method

Endpoint

Access

Description

POST

/api/auth/register

Public

Register Tenant/Landlord

POST

/api/auth/login

Public

Login

GET

/api/auth/me

Authenticated

Get current profile

🏷️ Categories

Method

Endpoint

Access

Description

POST

/api/categories

Admin

Create category

GET

/api/categories

Public

Get all categories

🏘️ Properties

Method

Endpoint

Access

Description

POST

/api/properties

Landlord

Create property

GET

/api/properties

Public

Get all properties

GET

/api/properties/:id

Public

Get single property

Landlord Property Management

Method

Endpoint

Access

Description

POST

/api/landlord/properties

Landlord

Create property

PUT

/api/landlord/properties/:id

Landlord

Update property

DELETE

/api/landlord/properties/:id

Landlord

Delete property

The project currently exposes property creation through both /api/properties and /api/landlord/properties.

📋 Rental Requests

Method

Endpoint

Access

Description

POST

/api/rentals

Tenant

Create rental request

GET

/api/rentals

Tenant

Get tenant's rental requests

GET

/api/rentals/:id

Tenant/Landlord

Get rental request details

GET

/api/landlord/requests

Landlord

Get landlord rental requests

PATCH

/api/landlord/requests/:id

Landlord

Approve/reject rental request

Rental Request Flow

PENDING
   │
   ├── Landlord approves
   │        ↓
   │     APPROVED
   │        ↓
   │     PAYMENT
   │        ↓
   │      ACTIVE
   │        ↓
   │    COMPLETED
   │
   └── Landlord rejects
            ↓
         REJECTED

💳 Payments - Stripe

The project uses Stripe for real payment processing as required by the assignment.

Method

Endpoint

Access

Description

POST

/api/payments/create

Tenant

Create Stripe payment session

POST

/api/payments/confirm

Stripe Webhook

Handle Stripe webhook/confirmation

GET

/api/payments

Authenticated

Get user's payments

GET

/api/payments/:id

Authenticated

Get payment details

Payment Flow

Rental Request
      ↓
Landlord Approval
      ↓
Approved
      ↓
Create Stripe Payment Session
      ↓
Stripe Payment
      ↓
Webhook / Confirmation
      ↓
Payment Status Updated

⭐ Reviews

Method

Endpoint

Access

Description

POST

/api/reviews

Tenant

Create property review

GET

/api/reviews/:propertyId

Public

Get property reviews

👨‍💼 Admin API

Method

Endpoint

Access

Description

GET

/api/admin/users

Admin

Get all users

PATCH

/api/admin/users/:id

Admin

Update user status

GET

/api/admin/properties

Admin

Get all properties

GET

/api/admin/rentals

Admin

Get all rental requests

🗄️ Database

The application uses PostgreSQL with Prisma ORM.

Main database entities include:

Users

Properties

Categories

Rental Requests

Payments

Reviews

The relationships support:

User
 ├── Tenant
 │    ├── Rental Requests
 │    ├── Payments
 │    └── Reviews
 │
 └── Landlord
      ├── Properties
      └── Rental Requests

Category
   ↓
Properties

Rental Request
   ↓
Payment

🛡️ Validation & Error Handling

The application includes:

Request input validation

Authentication and authorization checks

Prisma validation error handling

Duplicate record handling

Foreign-key constraint error handling

Missing-record handling

Database connection error handling

404 route handling

Global error handling middleware

Example validation response:

{
  "success": false,
  "message": "Validation failed",
  "errorDetails": []
}

Example not-found response:

{
  "message": "Route not found",
  "path": "/invalid-route",
  "date": "..."
}

⚙️ Environment Variables

Create a .env file based on .env.example.

Example:

PORT=5000
DATABASE_URL="your_postgresql_database_url"

APP_URL="your_application_url"

BCRYPT_SALT_ROUNDS=10

JWT_ACCESS_SECRET="your_access_secret"
JWT_REFRESH_SECRET="your_refresh_secret"

JWT_ACCESS_EXPIRES_IN="1d"
JWT_REFRESH_EXPIRES_IN="7d"

STRIPE_SECRET_KEY="your_stripe_secret_key"

Never commit the real .env file or Stripe secret key to GitHub.

📥 Installation & Setup

1. Clone Repository

git clone https://github.com/safikolislam/rentnest-backend.git

cd rentnest-backend

2. Install Dependencies

npm install

3. Configure Environment Variables

Create:

.env

and add the required environment variables.

4. Generate Prisma Client

npx prisma generate

5. Run Database Migration

npx prisma migrate dev

6. Seed Database

npx prisma db seed

7. Start Development Server

npm run dev

8. Build for Production

npm run build

9. Start Production Server

npm start

📁 Project Structure

rentnest-backend/
│
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
│
├── src/
│   ├── generated/
│   ├── lib/
│   ├── middlewares/
│   ├── modules/
│   │   ├── admin/
│   │   ├── auth/
│   │   ├── category/
│   │   ├── payment/
│   │   ├── property/
│   │   ├── rentalRequest/
│   │   └── review/
│   │
│   ├── utils/
│   ├── app.ts
│   └── server.ts
│
├── .env.example
├── package.json
├── prisma7.config.ts
├── tsconfig.json
├── tsup.config.ts
└── vercel.json

☁️ Deployment

The backend is deployed on Vercel.

Live Backend

https://rentnest-backend-chi.vercel.app/

Repository

https://github.com/safikolislam/rentnest-backend

🧪 API Testing

The API can be tested using:

Postman

Thunder Client

Any REST API client

Recommended testing order

1. Register Tenant/Landlord
        ↓
2. Login
        ↓
3. Get Profile
        ↓
4. Create/View Categories
        ↓
5. Create Property as Landlord
        ↓
6. Browse Properties as Public/Tenant
        ↓
7. Create Rental Request as Tenant
        ↓
8. Approve Request as Landlord
        ↓
9. Create Stripe Payment
        ↓
10. Verify Payment
        ↓
11. Create Review
        ↓
12. Test Admin APIs

Postman

Complete API documentation:

https://documenter.getpostman.com/view/45368212/2sBYAys8sr

👨‍💻 Author

Md Safikol Islam

GitHub

https://github.com/safikolislam

Project Repository

https://github.com/safikolislam/rentnest-backend