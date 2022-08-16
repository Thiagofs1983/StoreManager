const express = require('express');
require('express-async-errors');
const productsController = require('./controllers/productsController');
const salesProductsController = require('./controllers/salesProductsController');
const salesController = require('./controllers/salesController');

const app = express();
app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', productsController.getAll);

app.post('/products', productsController.create);

app.get('/products/:id', productsController.findProductById);

app.put('/products/:id', productsController.updatePruductById);

app.delete('/products/:id', productsController.removeProductById);

app.post('/sales', salesProductsController.addSale);

app.get('/sales', salesController.getAll);

app.get('/sales/:id', salesController.getSaleById);

app.delete('/sales/:id', salesController.removeSaleById);

app.use((err, req, res, _next) => {
  const { message, status } = err;
  res.status(status).json({ message });
});

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;