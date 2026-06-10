"use client";

import { useState } from "react";

export default function DeleteUserButton({ userId, onDeleted }) {
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);

  async function handleDelete() {
    setDeleting(true);
    setError(null);

    try {
      const res = await fetch(`/api/users/${userId}`, { method: "DELETE" });

      if (!res.ok) {
        throw new Error(`The server said no (status ${res.status}).`);
      }

      onDeleted(userId);
    } catch (err) {
      setError(err.message);
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="flex flex-col items-center gap-2">
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      )}

      <button
        type="button"
        onClick={handleDelete}
        disabled={deleting}
        className="rounded-full border border-zinc-300 px-4 py-1.5 text-sm font-medium text-zinc-700 transition hover:border-red-300 hover:text-red-600 disabled:opacity-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-red-800 dark:hover:text-red-400"
      >
        {deleting ? "Removing…" : "Remove"}
      </button>
    </div>
  );
}
