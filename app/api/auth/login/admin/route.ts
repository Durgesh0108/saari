import prismadb from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { cookieHandler } from "@/lib/cookieHandler";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { email, password } = body;

    // Find user by email
    const user = await prismadb.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      return new NextResponse("User not found");
    }

    // Check password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return new NextResponse("Invalid credentials");
    }

    if (user.role !== "admin") {
      return new NextResponse("You Are Not Admin");
    }
    // // Generate JWT token
    const token = jwt.sign({ userId: user.id }, "secret", { expiresIn: "1h" });
    cookieHandler.set("token", token);

    // res.json({ token });
    return NextResponse.json({ user, token });
  } catch (error) {
    console.error("Login error:", error);
    return new NextResponse("Login failed");
  }
}
