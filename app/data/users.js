// This is your pretend "database": a plain array that lives in the server's
// memory. Your Route Handler will read from it (GET) and push to it (POST).
//
// Because it lives in memory, it resets every time the dev server restarts, and
// in production each serverless instance gets its own copy. That is fine for
// this lab. Swapping it for a real database is the bonus at the end.
//
// The frontend NEVER imports this file. It only ever talks to /api/users.

export const users = [
  {
    id: "1",
    name: "Ada Lovelace",
    imageUrl: "https://i.pravatar.cc/150?img=5",
    description: "Wrote the first algorithm meant for a machine. Big fan of loops.",
  },
  {
    id: "2",
    name: "Alan Turing",
    imageUrl: "https://i.pravatar.cc/150?img=12",
    description: "Asked whether machines can think. Broke codes for a living.",
  },
  {
    id: "3",
    name: "Grace Hopper",
    imageUrl: "https://i.pravatar.cc/150?img=32",
    description: "Found an actual moth in a computer. Coined the word 'debugging'.",
  },
];
