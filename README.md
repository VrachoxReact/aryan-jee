# AI Test & Learning Platform for JEE

A comprehensive e-learning platform designed specifically for JEE (Joint Entrance Examination) preparation, featuring AI-powered tests, personalized learning tools, and a community-driven approach to education.

## Features

- **AI Exam & Study Mode**: Take realistic JEE practice tests with AI-generated insights and personalized feedback.
- **Custom Test Builder**: Create personalized tests focusing on specific subjects or topics.
- **Real-Time Test Experience**: Take tests with realistic time constraints and question formats.
- **User Dashboard**: Track progress, view performance analytics, and manage study materials.
- **Community Features**: Join study groups, share resources, and connect with peers.
- **Resource Integration**: Access curated study materials, video lectures, and practice questions.

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui component system
- **Authentication**: NextAuth.js for secure user authentication
- **Data Management**: React Query for API data fetching and caching
- **Database**: MongoDB for storing user accounts and application data

## Getting Started

### Prerequisites

- Node.js 16+ and npm
- Git
- MongoDB Atlas account or local MongoDB server

### Installation

1. Clone the repository
```bash
git clone https://github.com/VrachoxReact/aryan-jee.git
cd aryan-jee
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
Create a `.env.local` file in the root directory with the following variables:
```
DATABASE_URL="mongodb+srv://username:password@cluster0.mongodb.net/ai-learning-platform?retryWrites=true&w=majority"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret"
GITHUB_ID="your-github-oauth-app-id"
GITHUB_SECRET="your-github-oauth-app-secret"
GOOGLE_CLIENT_ID="your-google-oauth-app-id" 
GOOGLE_CLIENT_SECRET="your-google-oauth-app-secret"
```
Note: For development, you can generate a random NEXTAUTH_SECRET using `openssl rand -base64 32` in your terminal.

4. Generate Prisma client
```bash
npx prisma generate
```

5. Start the development server
```bash
npm run dev
```

6. Open http://localhost:3000 in your browser

## MongoDB Integration

The application uses MongoDB to store user accounts and application data. For detailed setup instructions, see [MONGODB_SETUP.md](MONGODB_SETUP.md).

Key features of the MongoDB integration:
- User registration and authentication
- Profile management
- Test data storage
- Resource management
- Community features

## Deployment

### Vercel Deployment (Recommended)

1. Push your code to GitHub
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

2. Import your project in Vercel
   - Go to [Vercel](https://vercel.com) and sign in
   - Click "New Project" and import your GitHub repository
   - Configure your environment variables
   - Click "Deploy"

### Manual Deployment

1. Build the production application
```bash
npm run build
```

2. Start the production server
```bash
npm start
```

## Error Handling & Performance Improvements

The application has been optimized with robust error handling strategies to prevent runtime errors related to data loading:

1. **Caching Mechanisms**: Both JEE test data and lecture data utilize client-side caching to minimize API calls and provide faster load times.

2. **Graceful Degradation**: All data fetching includes fallbacks to comprehensive mock data when external APIs are unavailable.

3. **Request Timeouts**: Network requests include timeout settings (5 seconds) to prevent hanging states when external resources are slow.

4. **Try-Catch Blocks**: Key pages implement comprehensive error boundary patterns using try-catch to display friendly error messages instead of crashing.

5. **Fallback UIs**: Components include loading states and error fallbacks for a smoother user experience.

6. **Optimized Data Loading**: Test pages load only necessary data for initial views to improve performance, with on-demand loading for detailed content.

## Application Structure

- `/app`: Main application pages and layouts (using Next.js App Router)
- `/components`: Reusable UI components
- `/contexts`: React context providers
- `/lib`: Utility functions, data fetching, and API clients
- `/models`: Mongoose models for MongoDB
- `/prisma`: Prisma schema and client
- `/public`: Static assets
- `/styles`: Global CSS and Tailwind configurations

## JEE Educational Data Integration

The platform integrates real JEE educational data from:
- GitHub repositories containing JEE test questions and answer keys
- Structured question banks with subject categorization
- Comprehensive mock data modeled after actual JEE test formats

## Contributing

We welcome contributions to improve the AI Test & Learning Platform. Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Radix UI](https://www.radix-ui.com/)
- [NextAuth.js](https://next-auth.js.org/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)