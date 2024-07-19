
 
export const getFinca = async () => {
  const resp= await fetch('http://localhost:4000/finca');
  const {body} = await resp.json();
  return body;
 }


export const getFincaById = async (id) => {
const listRes = await getRes();
const res = listRes.find((res) => res.Numero === id);
console.log(res, 'RESS')
return res;
}

export const updateFinca = async (id, bodys) => {
  console.log(bodys, "BODY")
  const resp = await fetch(`http://localhost:4000/finca/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(bodys)
  });
  const {body} = await resp.json();
  return body;
}

export const createFinca = async (res) => {
  const resp = await fetch('http://localhost:4000/finca', {
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
  const resp = await fetch(`http://localhost:4000/fsinca/${id}`, {
    method: 'DELETE'
  });
  console.log('melo')
  const {body} = await resp.json();
  return body;
}
