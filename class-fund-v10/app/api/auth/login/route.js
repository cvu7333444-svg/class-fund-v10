// Ví dụ chuẩn trong app/api/auth/login/route.js
res.cookies.set("token", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/", // <-- CỰC KỲ QUAN TRỌNG: Giúp cookie có hiệu lực trên toàn bộ tên miền
  maxAge: 60 * 60 * 24 * 7, // 7 ngày
});

// Chống cache Vercel Edge cho api xác thực
res.headers.set("Cache-Control", "no-store, max-age=0");