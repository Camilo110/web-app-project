
 
export const getRes = async () => {
const resp= await fetch('http://localhost:4000/res');
const {body} = await resp.json();
return body;
}


export const getResById = async (id) => {
  const res = await fetch(`http://localhost:4000/res/${id}`);
  const {body} = await res.json();
  return body;
}

export const getHijos = async (id) => {
  const ListHijos = await fetch(`http://localhost:4000/res/hijos/${id}`);
  if (ListHijos.status === 200) {
    const {body} = await ListHijos.json();  
    return body;
  }
}

export const updateRes = async (id, bodys) => {
  console.log(bodys, "BODY")
  const resp = await fetch(`http://localhost:4000/res/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(bodys)
  });
  const {body} = await resp.json();
  return body;
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
