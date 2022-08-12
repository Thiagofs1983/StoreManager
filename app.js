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
app.get('/products/:id', productsController.findProductById);

app.post('/products', productsController.create);

app.post('/sales', salesProductsController.addSale);

app.get('/sales', salesController.getAll);

app.use((err, req, res, _next) => {
  const { message, status } = err;
  res.status(status).json({ message });
});

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;