export async function POST() {
  const res = Response.json({ message: "Da dang xuat" });
  res.cookies.set("token", "", { httpOnly: true, maxAge: 0, path: "/" });
  return res;
}
