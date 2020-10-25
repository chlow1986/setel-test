import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';

import ClientAPI from '../common/ClientAPI';
import {ORDER_STATUS} from '../common/Constants';


const OrderList = ()=>{
  const [orders, setOrders] = useState({loading: true, data: []});

  useEffect(()=>{
    const clientAPI = ClientAPI();
    clientAPI.get('/order/list')
    .then((result)=>{
      setOrders({loading: false, data: result});
    })
    .catch((error)=>{
      console.log(error);
      alert(error);
    })
  }, [])

  return (
    <div>
      <div className="order-actions">
        <Link to="/new">Create New Order</Link>
      </div>
      <table className="order-table">
        <thead><tr><td>ID</td><td>Name</td><td>Status</td><td>Remark</td></tr></thead>
        <tbody>
          {
            orders.data.length > 0
            ?
            orders.data.map(record=>{
              return (
                <tr key={record.id}>
                  <td>{record.id}</td>
                  <td><Link to={`/order/${record.id}`}>{record.name}</Link></td>
                  <td>{ORDER_STATUS[record.status]}</td>
                  <td>{record.remark}</td>
                </tr>
              )
            })
            :
            (
              orders.loading === true 
              ? <tr className="order-table-empty"><td colSpan={4}>Loading...</td></tr>
              : <tr className="order-table-empty"><td colSpan={4}>No record.</td></tr>
            )
          }
        </tbody>
      </table>
    </div>
  )
}

export default OrderList;