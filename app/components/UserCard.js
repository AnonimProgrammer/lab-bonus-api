"use client";

import DeleteUserButton from "./DeleteUserButton";

export default function UserCard({ user, onDeleted }) {
  return (
    <article className="flex flex-col items-center gap-3 rounded-2xl border border-zinc-200 bg-white p-6 text-center shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
      <img
        src={user.imageUrl}
        alt={user.name}
        className="h-24 w-24 rounded-full object-cover ring-2 ring-zinc-100 dark:ring-zinc-800"
      />
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
        {user.name}
      </h3>
      <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">
        {user.description}
      </p>

      <DeleteUserButton userId={user.id} onDeleted={onDeleted} />
    </article>
  );
}
