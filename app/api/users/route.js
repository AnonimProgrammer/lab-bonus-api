import { users } from "@/app/data/users";
import { validateUserInput } from "./validation";

export async function GET() {
  return Response.json(users);
}

export async function POST(request) {
  const body = await request.json();
  const validated = validateUserInput(body);

  if ("error" in validated) {
    return Response.json({ error: validated.error }, { status: 400 });
  }

  const { name, imageUrl, description } = validated;
  const newUser = { id: crypto.randomUUID(), name, imageUrl, description };
  users.push(newUser);

  return Response.json(newUser, { status: 201 });
}