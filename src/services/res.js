import API from "../config";
 
export const getRes = async () => {
const resp= await fetch(`${API}/res`);
const {body} = await resp.json();
return body;
}


export const getResById = async (id) => {
  const res = await fetch(`${API}/res/${id}`);
  const {body} = await res.json();
  return body;
}

export const getHijos = async (id) => {
  const ListHijos = await fetch(`${API}/res/hijos/${id}`);
  if (ListHijos.status === 200) {
    const {body} = await ListHijos.json();  
    return body;
  }
}

export const updateRes = async (id, bodys) => {
  console.log(bodys, "BODY")
  const resp = await fetch(`${API}/res/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(bodys)
  });
  if (resp.status === 200) {
    return true;
  }else{
    return Promise.reject('Failed to create record');
  }
}

export const createRes = async (res) => {
  const resp = await fetch(`${API}/res`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(res)
  });
  if (resp.status === 200) {
    return true;
  }else{
    return Promise.reject('Failed to create record');
  }
}

export const getProduccionPorResFechas = async (id, startDate, endDate) => {
  const response = await fetch(`${API}/produccionIndividual/${id}/${startDate}/${endDate}`);
  return response;
}

