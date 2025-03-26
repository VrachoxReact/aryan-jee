import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import User from "@/models/User";

export async function GET() {
  try {
    // Connect to MongoDB
    await dbConnect();
    
    // Count users in the database
    const userCount = await User.countDocuments();
    
    return NextResponse.json({
      status: "success",
      message: "MongoDB connection successful",
      userCount,
    });
  } catch (error) {
    console.error("Database connection error:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to connect to MongoDB",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}