const STATUS_CODE = [{success: true}, {success: false, error: 'Invalid token.'}, {success: false, error: 'Payment declined.'}];

class Payment{
  constructor(database){
    this.database = database;
  }

  async verifyPayment(order, token) {
    if(!order){
      throw new Error('Invalid order details');
    }
    if(!token){
      throw new Error('Invalid Token')
    }else{
      const random = Math.floor(Math.random() * 5);
      const status = STATUS_CODE[random] || STATUS_CODE[0];

      return status;
    }
  }
}

module.exports = Payment;