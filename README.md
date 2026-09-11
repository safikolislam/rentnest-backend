# RentNest 

Backend API for a rental property marketplace where Landlords can list properties, and Tenants can browse, submit rental requests, and make payments.

## Tech Stack
- Node.js + Express
- TypeScript
- PostgreSQL + Prisma
- JWT Authentication
- Stripe Payment Integration

## Features
- Role-based authentication (Tenant, Landlord, Admin)
- Property listing with category, filtering
- Rental request workflow (Pending → Approved/Rejected → Active → Completed)
- Stripe payment integration
- Review system
- Admin panel for user/property/rental management

## Setup Instructions

1. Clone the repository
   \`\`\`bash
   git clone https://github.com/safikolislam/rentnest-backend.git
   cd rentnest-backend
   \`\`\`

2. Install dependencies
   \`\`\`bash
   npm install
   \`\`\`

3. Create a `.env` file (see `.env.example`)

4. Run migrations
   \`\`\`bash
   npx prisma migrate dev
   \`\`\`



5. Start the server
   \`\`\`bash
   npm run dev
   \`\`\`

## Admin Credentials
- Email: admin@rentnest.com
- Password: 223344556677


## API Documentation
[Postman Documentation](https://documenter.getpostman.com/view/45368212/2sBYAys8sr)