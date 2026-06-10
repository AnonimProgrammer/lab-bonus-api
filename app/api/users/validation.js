export function validateUserInput(body) {
  const name = (body.name || "").trim();
  const imageUrl = (body.imageUrl || "").trim();
  const description = (body.description || "").trim();

  if (!name || !imageUrl || !description) {
    return { error: "Name, image URL, and description are required." };
  }

  try {
    new URL(imageUrl);
  } catch {
    return { error: "Image URL must be a valid URL." };
  }

  return { name, imageUrl, description };
}
