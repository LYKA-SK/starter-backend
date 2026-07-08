# 3. Requirements — 100 points

Suggested timing: S5 ≈ 25 min · S6 ≈ 40 min · S7 ≈ 40 min · buffer ≈ 15 min

---

## S5 — Set up the relational database (30 pts)

### S5.1 — Database & connection (10 pts)
Create an empty PostgreSQL database named `storedb`, copy
`.env.example` to `.env`, and set your `DATABASE_URL`.

### S5.2 — Complete the schema (15 pts)
In `prisma/schema.prisma`, add the **`OrderStatus` enum** and the
**`Order` model** exactly as described in
[02-erd-data-dictionary.md](02-erd-data-dictionary.md):
correct types, relations to `Customer` and `Product`, defaults for
`status` and `orderDate`.

### S5.3 — Migrate & seed (5 pts)
```bash
npm run migrate     # give the migration a name, e.g. "init"
npm run seed        # loads 4 customers, 5 products, 5 orders
```
Both must finish without errors.

> Commit: `S5 database setup done`

---

## S6 — SQL data access components (35 pts)

Implement the `TODO` functions in `src/repositories/`.
The routes and controllers already call them — you only write the data
access code.

### S6.1 — List products (10 pts) — `product.repository.js`
`GET /api/products` returns all products; `GET /api/products?search=rice`
filters by name, case-insensitive. Use Prisma Client.

### S6.2 — Customer with orders (10 pts) — `customer.repository.js`
`GET /api/customers/2` returns the customer **with their orders, and
each order's product**. Unknown id → the controller answers 404
(already done) — your function just returns `null`.

### S6.3 — Sales report (15 pts) — `product.repository.js`
`GET /api/reports/product-sales` returns every product with
`quantitySold` and `moneyEarned` from **non-CANCELLED orders only**
(0 included), ordered by `quantitySold`, biggest first.
**Must use `prisma.$queryRaw`** with JOIN + GROUP BY + SUM.
A Prisma-Client-only solution earns 0 for this task.

> Commit after each function: `S6.1 ...`, `S6.2 ...`, `S6.3 ...`

---

## S7 — Server-side business components (35 pts)

Implement the `TODO` functions in `src/services/order.service.js`.
All business rules are written above each function.

### S7.1 — Place an order (25 pts)
`POST /api/orders` with `{ "customerId": 3, "productId": 3, "quantity": 2 }`:
- 400 if quantity is not a whole number greater than 0
- 404 if customer or product does not exist
- 409 if the product does not have enough stock left
- `totalPrice` = quantity × `price` — **calculated by the
  server**, never taken from the request
- creates the order (status `PENDING` by default) **and** decreases
  `stock` by quantity in **one transaction** (`prisma.$transaction`)

### S7.2 — Cancel an order (10 pts)
`PUT /api/orders/2/cancel`:
- 404 if the order does not exist
- 409 if the order is not `PENDING` (a `PAID` order cannot be cancelled)
- sets `status = CANCELLED` and increases the product's `stock` by the
  order's quantity

> Commit: `S7.1 place order`, `S7.2 cancel order` — then **push!**

---

## How to check yourself

Every task has ready-made requests in `requests.http` with the expected
result written above it. If all requests behave as described on freshly
seeded data (`npm run seed`), you are done.
