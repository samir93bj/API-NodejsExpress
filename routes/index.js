const express = require('express');
const router = express.Router();

const productRouter = require('./products.router');
const userRouter = require('./users.router');
const categoryRouter = require('./categories.router');
const orderRouter = require('./orders.router');
const customerRouter = require('./customer.router');

function routerApi (app){
  app.use('/api/v1', router);
  router.use('/products',productRouter);
  router.use('/users',userRouter);
  router.use('/categories',categoryRouter);
  router.use('/orders',orderRouter);
  router.use('/customers',customerRouter);
}

module.exports = routerApi;
