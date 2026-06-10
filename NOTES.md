# Notes: my backend design log

**Live URL (Vercel):** _paste your deployed link here_

> Fill in each section as you build. Keep it short and honest. We grade the
> reasoning, not the word count. Delete these quote lines as you go.

## 1. The GET handler

- In your own words, how does a file at `app/api/users/route.js` end up
  answering requests to `/api/users`? What turned the folders into a URL?
- How did you confirm your `GET` worked *before* looking at the main page?

## 2. The POST handler

- Why do you have to `await request.json()`? What is actually arriving, and why
  can't you read it synchronously?
- Where did the new user's `id` come from, and why does each one need to be
  unique?
- Which status code did you return on success, and why that one?

## 3. The shared array

- Your `GET` and your `POST` both touch the array from `app/data/users.js`.
  Explain why they end up reading and writing the *same* array, not two copies.
- You restarted the dev server and your added users disappeared. Why? Say it in
  terms of where the data actually lived.

## 4. Validation

- What does your `POST` do when a required field is missing? What status does it
  send back, and how does the user find out?

## 5. The persistence question (and the bonus)

- If you deployed to Vercel: what happened to users you added in production, and
  why? (Hint: serverless instances.)
- If you wired a real database (Supabase or other): what changed in your Route
  Handler, and what did NOT change in the frontend? What does that tell you about
  why a clean API boundary is worth having?
- If you did not get to the database: in 2-3 sentences, what would you change to
  make the data survive a restart?
