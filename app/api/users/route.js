import { createUser, getUsers } from "@/app/lib/users";
import { validateUserInput } from "./validation";

export async function GET() {
  try {
    const users = await getUsers();
    return Response.json(users);
  } catch (error) {
    console.error("GET /api/users failed:", error);
    return Response.json({ error: "Could not load users." }, { status: 500 });
  }
}

export async function POST(request) {
  const body = await request.json();
  const validated = validateUserInput(body);

  if ("error" in validated) {
    return Response.json({ error: validated.error }, { status: 400 });
  }

  try {
    const newUser = await createUser(validated);
    return Response.json(newUser, { status: 201 });
  } catch (error) {
    console.error("POST /api/users failed:", error);
    return Response.json({ error: "Could not create user." }, { status: 500 });
  }
}
