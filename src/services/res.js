
 
export const getRes = async () => {
  const resp= await fetch('http://localhost:4000/res');
  const {body} = await resp.json();
  return body;
 }

export const getResById = async (id) => {
const listRes = await getRes();
const res = listRes.find((res) => res.Numero === id);
console.log(res, 'RESS')
return res;
}

export const updateRes = async (id, body) => {
  const resp = await fetch(`http://localhost:4000/res/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  const {response} = await resp.json();
  return response;
}

export const createRes = async (res) => {
  const resp = await fetch('http://localhost:4000/res', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(res)
  });
  const {body} = await resp.json();
  return body;
}

export const deleteRes = async (id) => {
  const resp = await fetch(`http://localhost:4000/res/${id}`, {
    method: 'DELETE'
  });
  console.log('melo')
  const {body} = await resp.json();
  return body;
}
