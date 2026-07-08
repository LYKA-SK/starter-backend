# 1. Use Case & Guideline

## The scenario

**Toul Kork Mini-Mart** is a small family shop in Phnom Penh selling
rice, drinks, and everyday goods. Until now the owner tracked
everything in a paper notebook: which products are in stock, who
ordered what, and which orders are paid.

The shop hired your team to build the backend API. A previous
developer already set up the Express project, the routes, and part of
the database schema — **your job is to finish it** in 2 hours.

The shop's rules:

- A customer can order a product only if enough stock is available.
- The total price is always `quantity × product price` — calculated by
  the server, never sent by the client.
- A new order starts as `PENDING`; only pending orders can be
  cancelled — the stock goes back on the shelf.

## What is provided (do not change)

- Express app, routes, controllers, error handling — all working
- `Customer` and `Product` models in `prisma/schema.prisma`
- Seed data (`npm run seed`)
- `requests.http` to test every task

## What you must do

See [03-requirements.md](03-requirements.md) — tasks marked `TODO` in the
code. Only these files are yours to edit:

- `prisma/schema.prisma`
- `src/repositories/product.repository.js`
- `src/repositories/customer.repository.js`
- `src/services/order.service.js`

## Setup steps (do this first, ~10 minutes)

1. **Fork** this repository to your own GitHub account, then clone your
   fork. Name your repo `C3_<StudentID>_<YourName>`.
2. `npm install`
3. Create an empty PostgreSQL database named `storedb`
4. `cp .env.example .env` and edit `DATABASE_URL`
5. Start the server: `npm run dev` — you should see
   `Server running on http://localhost:3000`

*(Migration and seed come later — they are part of task S5.)*

> **Known editor warning:** the Prisma VS Code extension may warn that
> `url` in `schema.prisma` is "no longer supported". This project uses
> Prisma 6 where it is correct — **ignore that warning.** Trust
> `npm run migrate` and the running app instead.

## Exam rules

- Time: **2 hours**
- **Commit after each task** with a clear message (e.g. `S5 schema done`,
  `S6.1 list products`). Your commit history is part of your submission.
- **Push before time is up.** The last push time is your submission time.
- Submit your repository URL in the form given by your teacher.
- Allowed: Prisma & Express official documentation, your own notes.
- Not allowed: AI tools, chat apps, copying from classmates.
- Partial work still earns points — commit and push even unfinished tasks.
