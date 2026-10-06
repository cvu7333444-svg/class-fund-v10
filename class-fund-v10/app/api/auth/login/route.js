import { connectDB } from "@/lib/mongodb";
import { User } from "@/lib/models";
import { signToken, jsonError } from "@/lib/auth";
import { NextResponse } from "next/server"; // 1. Import NextResponse chuẩn của Next.js

export async function POST(req) {
  try {
    await connectDB();
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ message: "Thiếu email hoặc mật khẩu" }, { status: 400 });
    }

    // 2. Sửa lại đoạn tìm kiếm user cho chuẩn xác
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user || !(await user.comparePassword(password))) {
      return NextResponse.json({ message: "Email hoặc mật khẩu không đúng" }, { status: 401 });
    }
    if (!user.isActive) {
      return NextResponse.json({ message: "Tài khoản đã bị khóa" }, { status: 403 });
    }

    const token = signToken(user);
    
    // 3. Dùng NextResponse.json để có sẵn thuộc tính .cookies.set()
    const res = NextResponse.json({
      success: true,
      user: { id: user._id, fullName: user.fullName, email: user.email, role: user.role, studentId: user.studentId },
    });

    res.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 3600,
      path: "/",
    });

    return res;
  } catch (err) {
    return jsonError(err);
  }
}