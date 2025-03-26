import { NextResponse } from "next/server"
import bcrypt from "bcrypt"
import prisma from "@/lib/prisma"
import dbConnect from "@/lib/mongoose"
import User from "@/models/User"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, name, password } = body

    if (!email || !name || !password) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      )
    }

    // Connect to MongoDB using Mongoose
    await dbConnect();

    // Check if email already exists in MongoDB
    const existingMongoUser = await User.findOne({ email });
    if (existingMongoUser) {
      return NextResponse.json(
        { message: "Email already in use" },
        { status: 400 }
      )
    }

    // Also check in Prisma (during transition period)
    const existingPrismaUser = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (existingPrismaUser) {
      return NextResponse.json(
        { message: "Email already in use" },
        { status: 400 }
      )
    }

    // Create user in MongoDB using Mongoose
    const mongoUser = await User.create({
      email,
      name,
      password, // Password will be hashed by the pre-save hook
    });

    // Also create user in Prisma (during transition period)
    const hashedPassword = await bcrypt.hash(password, 10)
    const prismaUser = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    })

    // Remove password from response
    const userResponse = {
      id: mongoUser._id.toString(),
      email: mongoUser.email,
      name: mongoUser.name,
      role: mongoUser.role,
      createdAt: mongoUser.createdAt,
    };

    return NextResponse.json(
      {
        message: "User created successfully",
        user: userResponse,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json(
      { message: "An error occurred during registration" },
      { status: 500 }
    )
  }
}