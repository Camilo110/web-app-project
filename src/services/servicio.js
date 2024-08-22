
export const getServicio = async () => {
  const resp = await fetch('http://localhost:4000/servicio');
  const { body } = await resp.json();
  return body;
}

export const getServicioById = async (id) => {
  const resp = await fetch (`http://localhost:4000/servicio/${id}`);
  const { body } = await resp.json();
  const servicio = body[0];
  const Fecha = servicio.Fecha.split('T')[0];
  servicio.Fecha = Fecha;
  return servicio;
}

export const updateServicio = async (id, body) => {
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

