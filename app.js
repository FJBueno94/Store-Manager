const express = require('express');
const bodyParser = require('body-parser');

require('express-async-errors');

const products = require('./controllers/products');
const errorMiddleware = require('./middlewares/error');
const validate = require('./middlewares/validate');
const sales = require('./controllers/sales');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', products.getAll);
app.get('/products/:id', products.findById);
app.post('/products', validate.validateProduct, products.createProduct);
app.put('/products/:id', validate.validateProduct, products.updateProduct);
app.delete('/products/:id', products.deleteProduct);
app.post('/sales', validate.validateSale, sales.createSale);

app.use(errorMiddleware);

// 'teste'

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;