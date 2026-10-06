import { connectDB } from "@/lib/mongodb";
import { Contribution } from "@/lib/models";
import { requireAdmin, jsonError } from "@/lib/auth";

export async function PATCH(req, { params }) {
  try {
    requireAdmin();
    await connectDB();
    const { reason } = await req.json();
    const contribution = await Contribution.findByIdAndUpdate(params.id, { status: "rejected", note: reason || "" }, { new: true });
    return Response.json({ message: "Da tu choi", contribution });
  } catch (err) { return jsonError(err); }
}
