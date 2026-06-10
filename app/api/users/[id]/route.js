import { users } from "@/app/data/users";

export async function DELETE(_request, { params }) {
  const { id } = await params;
  const index = users.findIndex((user) => user.id === id);

  if (index === -1) {
    return Response.json({ error: "User not found." }, { status: 404 });
  }

  users.splice(index, 1);
  return new Response(null, { status: 204 });
}
