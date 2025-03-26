# MongoDB Integration Setup

This document provides instructions on how to set up and use the MongoDB integration for storing registered accounts in the AI Learning Platform.

## Prerequisites

- MongoDB Atlas account or a local MongoDB server
- Node.js and npm installed

## Setup Instructions

1. **Create a MongoDB Database**

   - If using MongoDB Atlas:
     - Sign up or log in to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
     - Create a new project
     - Build a new cluster (the free tier is sufficient for development)
     - Once the cluster is created, click on "Connect"
     - Choose "Connect your application"
     - Copy the connection string

   - If using a local MongoDB server:
     - Make sure MongoDB is installed and running
     - Create a new database for the application

2. **Configure Environment Variables**

   - Copy the `.env.local.example` file to `.env.local`
   - Replace the `DATABASE_URL` value with your MongoDB connection string
   - Make sure to update the username, password, and database name in the connection string

   Example:
   ```
   DATABASE_URL="mongodb+srv://username:password@cluster0.mongodb.net/ai-learning-platform?retryWrites=true&w=majority"
   ```

3. **Install Dependencies**

   ```bash
   npm install
   ```

4. **Generate Prisma Client**

   ```bash
   npx prisma generate
   ```

5. **Start the Development Server**

   ```bash
   npm run dev
   ```

## Testing the MongoDB Connection

1. Visit `/api/test-db` in your browser or use a tool like Postman to make a GET request to this endpoint.
2. If the connection is successful, you should see a JSON response with a success message and the number of users in the database.

## Features

- **Dual Database Support**: The application currently supports both Prisma with SQLite and MongoDB to facilitate a smooth transition.
- **User Registration**: Users can register with email and password, which are stored in both databases.
- **Authentication**: NextAuth.js is configured to authenticate users from either database.
- **Profile Management**: Users can view and update their profile information.
- **Admin Dashboard**: Administrators can view all registered users.

## Database Schema

The MongoDB schema includes the following collections:

- **Users**: Stores user account information
- **Accounts**: Stores OAuth account information
- **Sessions**: Stores user sessions
- **VerificationTokens**: Stores email verification tokens
- **Tests**: Stores test information
- **Questions**: Stores test questions
- **TestResults**: Stores user test results
- **Resources**: Stores learning resources
- **Bookmarks**: Stores user bookmarks
- **Comments**: Stores user comments

## Migrating from SQLite to MongoDB

The application is designed to work with both databases simultaneously during the transition period. New users are created in both databases, and authentication checks both databases.

To complete the migration:

1. Export data from SQLite using Prisma
2. Import data into MongoDB
3. Update the application to use only MongoDB
4. Remove SQLite-specific code

## Troubleshooting

- **Connection Issues**: Make sure your IP address is whitelisted in MongoDB Atlas Network Access settings.
- **Authentication Errors**: Check that your username and password in the connection string are correct and URL-encoded.
- **Database Not Found**: Ensure the database name in the connection string exists or will be created automatically.

## Additional Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/docs/)
- [NextAuth.js Documentation](https://next-auth.js.org/)