const fetch = require('node-fetch');
const {PAYMENT_HOST, PAYMENT_PORT} = require('../Common/Constants');

class Order{
  constructor(database){
    this.database = database;
  }

  async getOrderById(id) {
    console.log("get : ", id);
    if(!id){
      throw new Error('Please provide order id.');
    }
  
    const order = await this.database.models.Order.findByPk(id);
    if(!order){
      throw new Error('Record not found. Please make sure that you have entered the correct ID.');
    }
  
    return order;
  }


  async getOrders() {
    const orders = await this.database.models.Order.findAll();
  
    return orders;
  }


  async createOrder(data) {
    const order = await this.database.models.Order.create(data);
  
    const response = await fetch(`http://${PAYMENT_HOST}:${PAYMENT_PORT}/payment/verify`, {
      method: 'POST',
      body: JSON.stringify({'token': 'password', order: order}),
      headers: {'Content-Type': 'application/json'},
      cache: 'no-store'
    });
    const payment = await response.json();
    if(payment.success === false){
      console.log("Failed : ", payment);
      order.status = 'I';
      order.remark = payment.error;
      await order.save();
    }else{
      console.log("Success : ", payment);
      order.status = 'C';
      await order.save();
      setTimeout(async ()=>{
        const updateOrder = await this.database.models.Order.findByPk(order.id);
        if(updateOrder && updateOrder.status === 'C'){
          updateOrder.status = 'D';
          updateOrder.save();
        }
      }, 10000);
    }
    
    return order;
  }


  async cancelOrderById(id) {
    const order = await this.database.models.Order.findByPk(id);
    if(!order){
      throw new Error('order not found.');
    }

    console.log("order : ", order.status);
    
    if(order.status === 'D'){
      throw new Error('Delivered order cannot be cancel.');
    }

    order.status = 'I';
    const newOrder = await order.save();
  
    return newOrder;
  }

}

module.exports = Order;