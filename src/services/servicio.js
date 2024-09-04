
export const getServicio = async () => {
  const resp = await fetch('http://localhost:4000/servicio');
  const { body } = await resp.json();
  return body;
}

export const getServicioById = async (id) => {
  const resp = await fetch (`http://localhost:4000/servicio/${id}`);
  const { body } = await resp.json();
  const servicio = body;
  return servicio;
}

export const getServicioByIdRes = async (id) => {
  const resp = await getServicio();
  const servicio = resp.filter(servicio => servicio.ResID === id);
  return servicio;
}

export const updateServicio = async (id, body) => {
  console.log('body', body)
  const resp = await fetch(`http://localhost:4000/servicio/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  const { body: data } = await resp.json();
  return data;
}

export const createServicio = async (body) => {
  const resp = await fetch('http://localhost:4000/servicio', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  const { body: data } = await resp.json();
  return data;
}

export const deleteServicio = async (id) => {
  const resp = await fetch(`http://localhost:4000/servicio/${id}`, {
    method: 'DELETE'
  });
  const { body } = await resp.json();
  return body;
}

