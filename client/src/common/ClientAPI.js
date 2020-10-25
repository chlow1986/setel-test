const BACKEND_URL = 'http://localhost:8000';

const ClientAPI = ()=>{
  return {
    get: (url, params={})=>{
      return new Promise((resolve, reject) => {
        fetch(`${BACKEND_URL}${url}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        })
        .then(response => response.json())
        .then(data=>{
          resolve(data);
        })
        .catch(reject)
      })
    },
    post: (url, params={})=>{
      return new Promise((resolve, reject) => {
        fetch(`${BACKEND_URL}${url}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(params)
        })
        .then(response => response.json())
        .then(data=>{
          resolve(data);
        })
        .catch(reject)
      })
    }

  }
}

export default ClientAPI;