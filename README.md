# BONUS LAB: Build the Backend Behind the Directory

## Introduction

You joined a small team that is building a "who's who" page: a grid of people,
each with a photo, a name, and a one line description, plus a little form to add
someone new. The previous developer built the **entire frontend** and then,
right before the part that actually matters, walked out the door, they got an important offer they couldn't reject. The page is
fine. It is also completely empty, and it throws an error the moment it
loads.

Here is the twist that catches everyone the first time: there is no separate
backend server. The backend lives **inside this very same Next.js project**. The
page you see in the browser is going to fetch its data from an address served by
the same app that renders it. That is the skill this lab is about, and you will
use it constantly: **building a Route Handler**, the little backend that lives in
your Next.js app and answers requests.

You will build one address, `/api/users`, that does two jobs:

- when the browser **asks** for the users (a `GET`), it hands them back,
- when the form **sends** a new user (a `POST`), it saves it and hands it back.

That is the whole job. No database to install, no second server to run.

## The situation

Your team lead drops this in your chat:

> "The frontend is done, do not touch it, please. It already fetches from `/api/users`
> and it already POSTs the new user to `/api/users`. The problem is nobody ever
> built `/api/users`. So the page loads, asks the server for the list, gets a
> 404, and shows that yellow error box. I need you to build the thing on the
> other end of those two requests. Keep the data in memory for now, a plain
> array is completely fine, we are not wiring a database today, we'll do it in the next sprint. Just make the
> page light up: the list loads, and adding someone makes a new card appear."

Read that again. The frontend is already talking. **Nobody is listening.** Your
whole job is to build the part that listens.

## The API you are about to build

In the Next.js App Router, a backend endpoint is a file called `route.js` placed
inside the `app` directory. The folders it sits in become the URL. So a file at:

```
app/api/users/route.js
```

answers requests sent to `/api/users`. Inside that file you don't write a
server, you just **export functions named after HTTP methods**. Export a
function called `GET` and it runs on GET requests. Export one called `POST` and
it runs on POST requests. That is the entire idea.

Your `/api/users` needs to honour this contract, because it is the contract the
finished frontend already expects:

- **`GET /api/users`** returns the array of users as JSON.
- **`POST /api/users`** reads a JSON body shaped like
  `{ "name": "...", "imageUrl": "...", "description": "..." }`, creates a new
  user from it (give it an `id`), saves it, and returns the created user. A
  `201` status is the polite way to say "created."

Where do the users live? In a plain array in the server's memory. We gave you a
seeded one at `app/data/users.js`. Import it in your route, read from it for
`GET`, push onto it for `POST`.

> ⚠️ That array lives in memory, so it resets every time you restart the dev
> server, and in production every serverless instance gets its own copy. That is
> **expected** for this lab, do not try to "fix" it. Making it survive is the
> bonus at the end.

## What you will build

One file: `app/api/users/route.js`, with two exported functions.

- a `GET` that responds with the seeded users as JSON,
- a `POST` that reads the request body, builds a user object (don't forget the
  `id`), pushes it into the array, and responds with the new user.

That is it. Everything else, the page, the cards, the form, the fetch calls, is
already written and waiting for you.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Right now you will see the
form on the left and a **yellow error box** on the right complaining that it
could not load the users. That broken state is the starting line, it is supposed
to look like that, because the address it is calling does not exist yet.

Now open [http://localhost:3000/api/users](http://localhost:3000/api/users)
directly in the browser. You will get a 404. By the end of this lab, that same
URL will show you the users as raw JSON. That is how you will know your `GET`
works, **before** you even look at the pretty page.

## Heads up: this is not the Next.js in your old notes

This is Next.js 16 with the App Router and Tailwind v4. A few things that trip
people up:

- The bundled docs live in `node_modules/next/dist/docs/`. The one you want is
  the **Route Handlers** guide. Read it before you write the file. It is short.
- Route Handlers are Server code. There is **no** `'use client'` at the top of
  `route.js`, and there should not be. The frontend files are the Client
  Components, your route is not.
- You return data with the Web `Response` API. `Response.json(yourData)` is the
  short way to send JSON. To set a status code, pass a second argument:
  `Response.json(user, { status: 201 })`.
- It is `.js`, not `.ts`. There is no `tailwind.config.js` in v4.

## Your job

Work in this order. Get the smallest thing working first, then layer the next on
top.

### 1. Create the file and make `GET` work

Create `app/api/users/route.js`. Import the seeded array from
`app/data/users.js`. Export an `async function GET()` that returns that array as
JSON.

Don't open the main page yet. Open
[http://localhost:3000/api/users](http://localhost:3000/api/users) instead. When
you see the three seeded users as raw JSON in the browser, your `GET` works.
**Now** open the main page: the error box is gone and three cards are showing.

### 2. Add `POST` so the form can save

In the same file, export an `async function POST(request)`. Inside it you need
to:

- read the JSON the form sent you. The request body arrives as a stream, so you
  `await` it: `const body = await request.json()`.
- build a user object from `body.name`, `body.imageUrl`, and `body.description`,
  and give it a unique `id` (a quick one: `crypto.randomUUID()`, or
  `String(Date.now())`).
- push that object into the same array your `GET` reads from.
- return the new user as JSON, ideally with a `201` status.

Test it from the page: fill in the form, paste any image URL (try
`https://i.pravatar.cc/150?img=20`), hit **Add user**, and watch a new card
appear. Then refresh the page. Your new user is still there, because the GET now
reads it back from the array.

### 3. Be a good backend: handle a bad request

Right now, what happens if someone POSTs with no `name`? You happily save a
broken user. A real backend checks. Before you save, make sure `name`,
`imageUrl`, and `description` are all present. If something is missing, return a
helpful message with a `400` status instead of saving. The frontend already
knows how to show a server error, so this will surface in the form for free.

## 💡 Think about it

- **Why does the same array show up in both functions?** When you import
  `app/data/users.js`, that module is loaded once and its array sits in memory.
  Your `GET` reads it and your `POST` pushes to it, so they share the *same*
  array. That shared, living value is the closest thing this lab has to a
  database.
- **So why does it reset when I restart the server?** Because "memory" means
  exactly that. Stop the process, the memory is gone, and the file's array loads
  fresh again. There is no disk, no database, nothing persistent underneath. This
  is the single most important reason real apps reach for a database.
- **GET versus POST is about intent.** A `GET` asks a question and carries no
  body. A `POST` brings data along to be stored. Same URL, `/api/users`, two
  completely different jobs, split by the method name you exported. That split is
  the backbone of almost every API you will ever touch.

## How to work through this

1. Read the **Route Handlers** guide in `node_modules/next/dist/docs/`. Just the
   first screen of it tells you everything you need.
2. Build `GET` first and confirm it by visiting `/api/users` in the browser. Do
   not move on until you see JSON there.
3. Open the **Network** tab in DevTools, keep it open, and watch your own
   requests. When you hit Add user you should see a `POST` to `/api/users` with a
   JSON body and (once you finish) a `201` back.
4. Add `POST`, then add the validation.

Work like a backend developer testing their own endpoint, not like someone
guessing until the page stops being yellow.

## Styling

Nothing to do here. The page, the cards, and the form are already styled with
Tailwind. This lab is entirely about the code behind the requests.

## Checklist before you call it done

✅ Visiting `/api/users` in the browser shows the users as raw JSON.

✅ The main page loads the user cards with no yellow error box.

✅ Submitting the form adds a new card without a manual refresh.

✅ The Network tab shows a `POST` to `/api/users` with a JSON body and a `201` back.

✅ A refresh still shows users you added (until you restart the dev server).

✅ A POST missing a field is rejected with a `400`, not saved as a broken user.

✅ No errors in the browser console.

## If you finish early

- **Delete a user.** Add a `DELETE` handler. You will probably want the id in the
  URL, which means a dynamic route: `app/api/users/[id]/route.js`. Wire a small
  delete button on each card.
- **Validate harder.** Reject a name that is empty after trimming, or a
  `imageUrl` that is not really a URL.
- **The real bonus, persistence.** The in-memory array forgets everything on
  restart. Make it remember. The cleanest path is a real database: spin up a free
  **Supabase** project, create a `users` table, and have your Route Handler read
  and write there instead of the array. Any database you already know works too
  (a hosted Postgres, MongoDB Atlas, even writing to a local JSON file for the
  scrappy version). The frontend does not change at all, that is the beauty of
  having a clean API boundary: you swap what is behind `/api/users` and nobody out
  front notices.

## Key concepts to review

- **Route Handlers** in this version of Next.js: read
  `node_modules/next/dist/docs/` (the Route Handlers guide).
- **The `Request` and `Response` Web APIs**:
  [MDN: Request](https://developer.mozilla.org/en-US/docs/Web/API/Request) and
  [MDN: Response](https://developer.mozilla.org/en-US/docs/Web/API/Response).
- **Reading a JSON body** on the server: `await request.json()`.
- **HTTP methods and status codes**:
  [MDN: HTTP methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods),
  [MDN: 201 Created](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/201),
  [MDN: 400 Bad Request](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/400).

## Delivering the lab

Work in your assigned groups. When the directory fills up:

1. Fill in `NOTES.md`. We grade the *thinking*, so be honest about what tripped
   you up and what unstuck you.
2. Everyone opens a Pull Request and shares the link in the students portal.
3. Optional but encouraged: deploy to Vercel and drop the live URL in `NOTES.md`.
   Notice what happens to users you add in production, and write down *why*. That
   observation is the best possible setup for the database bonus.
