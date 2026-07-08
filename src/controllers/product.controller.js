const productRepository = require('../repositories/product.repository');

async function listProducts(req, res, next) {
  try {
    const products = await productRepository.listProducts(req.query.search);
    res.json(products);
  } catch (err) {
    next(err);
  }
}

async function getSalesReport(req, res, next) {
  try {
    const report = await productRepository.getSalesReport();
    res.json(report);
  } catch (err) {
    next(err);
  }
}

module.exports = { listProducts, getSalesReport };
