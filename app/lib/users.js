import { createSupabaseClient } from "@/app/lib/supabase";

function toUser(row) {
  return {
    id: row.id,
    name: row.name,
    imageUrl: row.image_url,
    description: row.description,
  };
}

export async function getUsers() {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("users")
    .select("id, name, image_url, description")
    .order("created_at", { ascending: true });

  if (error) {
    throw error;
  }

  return data.map(toUser);
}

export async function createUser({ name, imageUrl, description }) {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("users")
    .insert({ name, image_url: imageUrl, description })
    .select("id, name, image_url, description")
    .single();

  if (error) {
    throw error;
  }

  return toUser(data);
}

export async function deleteUser(id) {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("users")
    .delete()
    .eq("id", id)
    .select("id")
    .maybeSingle();

  if (error) {
    throw error;
  }

  return Boolean(data);
}
