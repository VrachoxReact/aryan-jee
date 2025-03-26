import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";
import dbConnect from "./mongoose";
import User from "@/models/User";

// Export auth options for use in other parts of the application
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Connect to MongoDB
        await dbConnect();

        // First try to find user in MongoDB
        const mongoUser = await User.findOne({ email: credentials.email });
        
        if (mongoUser && mongoUser.password) {
          // Use the comparePassword method from the User model
          const isPasswordValid = await mongoUser.comparePassword(credentials.password);
          
          if (isPasswordValid) {
            return {
              id: mongoUser._id.toString(),
              email: mongoUser.email,
              name: mongoUser.name,
              image: mongoUser.image,
              role: mongoUser.role,
            };
          }
        }

        // Fallback to Prisma during transition
        const prismaUser = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!prismaUser || !prismaUser.password) {
          return null;
        }

        const isPrismaPasswordValid = await bcrypt.compare(
          credentials.password,
          prismaUser.password
        );

        if (!isPrismaPasswordValid) {
          return null;
        }

        return {
          id: prismaUser.id,
          email: prismaUser.email,
          name: prismaUser.name,
          image: prismaUser.image,
          role: prismaUser.role,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    signOut: "/",
    error: "/login",
    newUser: "/dashboard",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
};