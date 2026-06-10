"use client";

import { useEffect, useState } from "react";
import UserCard from "./components/UserCard";
import AddUserForm from "./components/AddUserForm";

// The whole frontend lives here, and it is finished. It loads the user list
// from GET /api/users on first paint, and adds new ones through the form, which
// POSTs to /api/users. Right now both of those calls hit a route that does not
// exist, so the list cannot load. Your job is to build that route.

export default function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadUsers() {
      try {
        const res = await fetch("/api/users");
        if (!res.ok) {
          throw new Error(`The API answered with status ${res.status}.`);
        }
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadUsers();
  }, []);

  // When the form creates a user, drop it straight into state so the new card
  // appears instantly, no refetch needed.
  function handleCreated(newUser) {
    setUsers((current) => [...current, newUser]);
  }

  function handleDeleted(id) {
    setUsers((current) => current.filter((user) => user.id !== id));
  }

  return (
    <div className="min-h-full bg-zinc-50 px-6 py-16 dark:bg-black">
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-10">
        <header className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            The Team Directory
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Everyone who has signed up so far. Add yourself below.
          </p>
        </header>

        <div className="grid gap-10 lg:grid-cols-[340px_1fr]">
          <AddUserForm onCreated={handleCreated} />

          <section>
            {loading && (
              <p className="text-zinc-500 dark:text-zinc-400">Loading users…</p>
            )}

            {error && !loading && (
              <div className="rounded-2xl border border-amber-300 bg-amber-50 p-6 text-amber-900 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-200">
                <p className="font-semibold">Could not load the users.</p>
                <p className="mt-1 text-sm">
                  {error} Have you built the API at{" "}
                  <code className="font-mono">app/api/users/route.js</code> yet?
                  That is the whole point of this lab.
                </p>
              </div>
            )}

            {!loading && !error && users.length === 0 && (
              <p className="text-zinc-500 dark:text-zinc-400">
                No users yet. Add the first one with the form.
              </p>
            )}

            {!loading && !error && users.length > 0 && (
              <div className="grid gap-6 sm:grid-cols-2">
                {users.map((user) => (
                  <UserCard
                    key={user.id}
                    user={user}
                    onDeleted={handleDeleted}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
