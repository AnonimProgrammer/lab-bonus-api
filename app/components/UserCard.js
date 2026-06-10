// A presentational card for one user. No state, no logic, just looks.
// It receives a single `user` and draws it. Leave it alone unless you want to
// restyle.

export default function UserCard({ user }) {
  return (
    <article className="flex flex-col items-center gap-3 rounded-2xl border border-zinc-200 bg-white p-6 text-center shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
      {/* A plain <img> on purpose: users paste arbitrary URLs, and next/image
          would need every host whitelisted in next.config.mjs. */}
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
    </article>
  );
}
