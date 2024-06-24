import prismadb from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      role,
      name,
      phone,

      email,
      password,
    } = body;

    
    const existingUser = await prismadb.user.findUnique({
      where: {
        email: email,
      },
    });

    // console.log("existingUser", existingUser);

    if (existingUser) {
      return new NextResponse("User already exists");
    }

    // // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // console.log("hashedPassword", hashedPassword);

    // // Create new user
    const user = await prismadb.user.create({
      data: {
        role,
        name: name,
        phoneNumber: phone,
        email: email,
        password: hashedPassword,
      },
    });
    // console.log(body);
    revalidatePath("/admin/database/");
    const token = jwt.sign({ userId: user.id }, "secret", { expiresIn: "1h" });
    return NextResponse.json({ user, token });
    // return NextResponse.json(body);
  } catch (error) {
    console.error("Registration error:", error);
    return new NextResponse("Internal server error");
  }
}
