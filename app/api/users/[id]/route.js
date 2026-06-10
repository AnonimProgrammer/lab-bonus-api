import { deleteUser } from "@/app/lib/users";

export async function DELETE(_request, { params }) {
  const { id } = await params;

  try {
    const deleted = await deleteUser(id);

    if (!deleted) {
      return Response.json({ error: "User not found." }, { status: 404 });
    }

    return new Response(null, { status: 204 });
  } catch (error) {
    console.error(`DELETE /api/users/${id} failed:`, error);
    return Response.json({ error: "Could not delete user." }, { status: 500 });
  }
}
