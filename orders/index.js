'use strict';

const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const crypto = require('crypto');
const SequelizeModel = require('./src/Sequelize');
const {ORDER_PORT, ORDER_HOST, PAYMENT_PORT, PAYMENT_HOST} = require('./src/Common/Constants');
const Order = require('./src/Controllers/Order');
const Payment = require('./src/Controllers/Payment');

(async () => {
  /**
   * connect to database
   */
  const sequelize = new SequelizeModel();
  await sequelize.connect();

  /**
   * Order Application
   */
  const orderApp = express();
  orderApp.use(bodyParser.urlencoded({ extended: true }));
  orderApp.use(bodyParser.json());
  orderApp.use(cookieParser());
  orderApp.use(cors())
  
  const OrderService = new Order(sequelize.database);
  orderApp.get('/', (req, res) => {
    res.send('Hello World');
  });

  /**
   * GET Order by id 
   * url parameter ?id= is requited.
   */
  orderApp.get('/order/get', async (req, res) => {
    try{
      const {id} = req.query;

      const order = await OrderService.getOrderById(id);

      res.send(order);
    }catch(error){
      console.log("error : ", error);
      return res.send({error: error.message});
    }
  });


  /**
   * GET Order by id 
   * url parameter ?id= is requited.
   */
  orderApp.get('/order/list', async (req, res) => {
    try{
      const orders = await OrderService.getOrders();

      res.send(orders);
    }catch(error){
      console.log("error : ", error);
      return res.send({error: error.message});
    }
  });


  /**
   * POST 
   * Create order
   * body: name is required
   */
  orderApp.post('/order/create', async (req, res) => {
    try{
      const inputs = req.body;
      
      const order = await OrderService.createOrder(inputs);

      res.send(order);
    }catch(error){
      console.log("error : ", error);
      return res.send({error: error.message});
    }
  });

  /**
   * POST
   * Cancel Order
   * body: id is required
   */
  orderApp.post('/order/cancel', async (req, res) => {
    try{
      const {id} = req.body;
      
      const order = await OrderService.cancelOrderById(id);

      res.send(order);
    }catch(error){
      console.log("error : ", error);
      return res.send({error: error.message});
    }
  });

  orderApp.listen(ORDER_PORT, ORDER_HOST);
  console.log(`Running on http://${ORDER_HOST}:${ORDER_PORT}`);


  /**
   * Payment Application
   */
  const paymentApp = express();
  paymentApp.use(bodyParser.urlencoded({ extended: true }));
  paymentApp.use(bodyParser.json());
  paymentApp.use(cookieParser());

  const PaymentService = new Payment();

  paymentApp.get('/', (req, res) => {
    res.send('Hello World');
  });

  paymentApp.post('/payment/verify', async (req, res) => {
    try{
      const {token, order} = req.body;
      
      const payment = await PaymentService.verifyPayment(order, token);

      res.send(payment);
    }catch(error){
      console.log("error : ", error);
      return res.send({error: error.message});
    }
  });

  paymentApp.listen(PAYMENT_PORT, PAYMENT_HOST);
  console.log(`Running on http://${PAYMENT_HOST}:${PAYMENT_PORT}`);
})();