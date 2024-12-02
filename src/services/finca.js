
 
export const getFinca = async () => {
  const resp= await fetch('http://localhost:4000/finca');
  const {body} = await resp.json();
  return body;
 }


export const getFincaById = async (id) => {
  const resp = await fetch(`http://localhost:4000/finca/${id}`);
  const {body} = await resp.json();
  return body;
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
  if (resp.status === 200) {
    return { status: 200 };
  } else {
    return Promise.reject('Failed to create record');
  }
}

export const deleteFinca = async (id) => {
  const resp = await fetch(`http://localhost:4000/finca/${id}`, {
    method: 'DELETE'
  });
  console.log('melo')
  return resp
}
