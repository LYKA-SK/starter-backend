# Mini Store API — C3 Practice Test (2 hours)

A small shop needs a backend API to manage products, customers, and
orders. Your job is to finish this project.
**Read the docs first:**

| Doc | What's inside |
|---|---|
| [docs/01-use-case-guideline.md](docs/01-use-case-guideline.md) | Scenario, setup steps, exam rules |
| [docs/02-erd-data-dictionary.md](docs/02-erd-data-dictionary.md) | ERD + every table and column |
| [docs/03-requirements.md](docs/03-requirements.md) | Your tasks, with points |
| [docs/04-rubric.md](docs/04-rubric.md) | Exactly how you will be graded |

## Quick start

```bash
npm install
cp .env.example .env     # then edit DATABASE_URL for your machine
```

Your tasks are marked with `TODO` in these files:

1. `prisma/schema.prisma` — S5
2. `src/repositories/*.js` — S6
3. `src/services/order.service.js` — S7

Everything else (routes, controllers, error handling) already works —
you don't need to change it.

## Test your work

```bash
npm run dev        # start the server
npm run seed       # reset the test data anytime
```

Open `requests.http` (VS Code REST Client extension) — it has one request
per task with the expected result written above it.
# starter-frontend
# starter-backend
