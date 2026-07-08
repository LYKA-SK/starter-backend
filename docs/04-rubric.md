# 4. Rubric — how you will be graded

The grader clones your repo, runs `npm install`, `npm run migrate`,
`npm run seed`, starts the server, and clicks through `requests.http`
on **freshly seeded data**. Each row below is checked.

## S5 — Database (30 pts)

| # | Check | Pts |
|---|---|---|
| S5.1 | `.env.example` correct; project connects to `storedb` | 10 |
| S5.2 | `Order` model + `OrderStatus` enum match the data dictionary (types 5, relations 5, defaults 5) | 15 |
| S5.3 | `npm run migrate` and `npm run seed` run without errors | 5 |

## S6 — SQL data access (35 pts)

| # | Check | Expected on fresh seed | Pts |
|---|---|---|---|
| S6.1 | `GET /api/products` | 5 products | 5 |
| S6.1 | `GET /api/products?search=rice` | 1 product: *Jasmine Rice 5kg* | 5 |
| S6.2 | `GET /api/customers/2` | Chan Mealea with 2 orders, each with its product | 8 |
| S6.2 | `GET /api/customers/999` | 404 | 2 |
| S6.3 | `GET /api/reports/product-sales` | Noodles = 15/$15, Rice = 2/$16, Oil = 1/$4, Coca-Cola = **0/$0** (its only order is CANCELLED), Palm Sugar = **0/$0**, ordered desc | 10 |
| S6.3 | Code uses `prisma.$queryRaw` (grader reads the file) | — | 5 |

## S7 — Business logic (35 pts)

| # | Check | Expected | Pts |
|---|---|---|---|
| S7.1 | `POST /api/orders` `{customerId:3, productId:3, quantity:2}` | 201, PENDING, totalPrice $12 | 6 |
| S7.1 | Product 3 `stock` after the order | 30 → 28 | 4 |
| S7.1 | Quantity 0 | 400 | 3 |
| S7.1 | Order product 5 (stock 0) | 409 | 3 |
| S7.1 | Unknown customer / unknown product | 404 / 404 | 2 |
| S7.1 | `totalPrice` computed by server (grader reads the file) | — | 2 |
| S7.1 | Code uses `prisma.$transaction` (grader reads the file) | — | 5 |
| S7.2 | `PUT /api/orders/2/cancel` | 200, CANCELLED, product 1 stock 50 → 55 | 6 |
| S7.2 | Cancel the same order again (and order 1, which is PAID) | 409 | 2 |
| S7.2 | Unknown order | 404 | 2 |

## Also checked

- Commit history shows work step by step (at least one commit per task)
- Last push is before the deadline

**Total: 100 pts**
