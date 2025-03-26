import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/mongoose";
import User from "@/models/User";
import prisma from "@/lib/prisma";

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }
    
    const userId = (session.user as any).id;
    const body = await request.json();
    const { name } = body;
    
    if (!name) {
      return NextResponse.json(
        { message: "Name is required" },
        { status: 400 }
      );
    }
    
    // Connect to MongoDB
    await dbConnect();
    
    // Update user in MongoDB
    const updatedMongoUser = await User.findByIdAndUpdate(
      userId,
      { name },
      { new: true }
    ).select("-password");
    
    if (!updatedMongoUser) {
      // Try to update in Prisma if not found in MongoDB
      const updatedPrismaUser = await prisma.user.update({
        where: { id: userId },
        data: { name },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          image: true,
        },
      });
      
      return NextResponse.json({
        message: "Profile updated successfully",
        user: updatedPrismaUser,
      });
    }
    
    return NextResponse.json({
      message: "Profile updated successfully",
      user: {
        id: updatedMongoUser._id.toString(),
        name: updatedMongoUser.name,
        email: updatedMongoUser.email,
        role: updatedMongoUser.role,
      },
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { message: "An error occurred while updating profile" },
      { status: 500 }
    );
  }
}