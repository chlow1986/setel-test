import React, { useEffect, useRef, useState } from 'react';
import {useHistory, useParams} from 'react-router-dom';

import ClientAPI from '../common/ClientAPI';
import {ORDER_STATUS} from '../common/Constants';

const OrderCreate = ()=>{
  let { id: _id } = useParams();
  const history = useHistory();
  const formRef = useRef();
  const nameInput = useRef();
  const [order, setOrder] = useState({});

  useEffect(()=>{
    if(_id){
      const clientAPI = ClientAPI();
      clientAPI.get(`/order/get?id=${_id}`)
      .then(result=>{
        setOrder(result);
      })
      .catch(error=>{
        alert(error);
      })
    }
  }, [_id])
  
  const onSave = ()=>{
    const name = nameInput.current.value;
    const data = {name};

    const clientAPI = ClientAPI();
    clientAPI.post('/order/create', data)
    .then(result=>{
      setOrder(result);
      if(result.status !== 'C'){
        alert(result.remark);
      }else{
        alert('Order confirmed.');
      }
    })
    .catch(error=>{
      alert(error);
    })
  }

  const onClose = ()=>{
    history.push('/');
  }

  const onCancel = ()=>{
    const clientAPI = ClientAPI();
    clientAPI.post('/order/cancel', {id: order.id})
    .then(result=>{
      setOrder(result);
      alert('Order cancelled.');
    })
    .catch(error=>{
      alert(error);
    })
  }

  return (
    <div className="order-create">
      <form className="order-form" ref={formRef}>
        <div><label>ID: </label><input name="id" disabled defaultValue={order.id}/></div>
        <div><label>Name: </label><input ref={nameInput} name="name" defaultValue={order.name} disabled={order.id != null}/></div>
        <div><label>Status: </label><input name="status" defaultValue={ORDER_STATUS[order.status]} disabled/></div>
        <div><label>Remark: </label><textarea name="remark" defaultValue={order.remark} disabled/></div>
      </form>
      <div className="order-form-actions">
        <button onClick={onSave} disabled={order.id != null}>Save</button>
        <button onClick={onCancel} disabled={order.id == null || (order.id != null && order.status !== 'C')}>Cancel Order</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  )
}

export default OrderCreate;