// Seed data — fixed values so grading results are always the same.
// Run with: npm run seed
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Clean tables and restart ids at 1, so requests.http always
  // matches the data — even after re-seeding
  await prisma.$executeRaw`TRUNCATE "Order", "Product", "Customer" RESTART IDENTITY CASCADE`;

  const customers = await prisma.customer.createManyAndReturn({
    data: [
      { name: 'Heng Sokha', email: 'sokha@example.com', phone: '012345678' },
      { name: 'Chan Mealea', email: 'mealea@example.com', phone: '098765432' },
      { name: 'Kim Rachana', email: 'rachana@example.com', phone: null },
      { name: 'Long Panha', email: 'panha@example.com', phone: '011223344' },
    ],
  });

  const products = await prisma.product.createManyAndReturn({
    data: [
      { name: 'Instant Noodles Box', price: 1, stock: 50 },
      { name: 'Jasmine Rice 5kg', price: 8, stock: 20 },
      { name: 'Coca-Cola 6-Pack', price: 6, stock: 30 },
      { name: 'Cooking Oil 1L', price: 4, stock: 15 },
      { name: 'Palm Sugar 1kg', price: 3, stock: 0 },
    ],
  });

  const [sokha, mealea, rachana, panha] = customers;
  const [noodles, rice, coca, oil] = products;

  const day = 24 * 60 * 60 * 1000;
  const daysAgo = (n) => new Date(Date.now() - n * day);

  // Orders (stock above is the stock AFTER these orders;
  // the CANCELLED order already had its stock restored):
  // Instant Noodles: qty 10 PAID + qty 5 PENDING
  // Jasmine Rice: qty 2 PAID
  // Coca-Cola: qty 3 CANCELLED (stock restored)
  // Cooking Oil: qty 1 PENDING
  // Palm Sugar: no orders (sold out earlier, never restocked)
  await prisma.order.createMany({
    data: [
      { customerId: sokha.id, productId: noodles.id, quantity: 10, totalPrice: 10, status: 'PAID', orderDate: daysAgo(9) },
      { customerId: mealea.id, productId: noodles.id, quantity: 5, totalPrice: 5, status: 'PENDING', orderDate: daysAgo(6) },
      { customerId: rachana.id, productId: rice.id, quantity: 2, totalPrice: 16, status: 'PAID', orderDate: daysAgo(5) },
      { customerId: mealea.id, productId: coca.id, quantity: 3, totalPrice: 18, status: 'CANCELLED', orderDate: daysAgo(3) },
      { customerId: panha.id, productId: oil.id, quantity: 1, totalPrice: 4, status: 'PENDING', orderDate: daysAgo(1) },
    ],
  });

  console.log('Seed done: 4 customers, 5 products, 5 orders');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
