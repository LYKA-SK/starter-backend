const prisma = require('../prisma');

async function listProducts(search) {
  return prisma.product.findMany({
    where: search
      ? { name: { contains: search, mode: 'insensitive' } }
      : undefined,
    orderBy: { id: 'asc' },
  });
}

async function getSalesReport() {
  return prisma.$queryRaw`
    SELECT
      p."id"          AS "id",
      p."name"        AS "name",
      COALESCE(SUM(o."quantity"), 0)::int    AS "quantitySold",
      COALESCE(SUM(o."totalPrice"), 0)::int  AS "moneyEarned"
    FROM "Product" p
    LEFT JOIN "Order" o
      ON o."productId" = p."id"
      AND o."status" <> 'CANCELLED'
    GROUP BY p."id", p."name"
    ORDER BY "quantitySold" DESC, p."id" ASC
  `;
}

module.exports = { listProducts, getSalesReport };