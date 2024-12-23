import API from "../config";

export const getServicio = async () => {
  const resp = await fetch(`${API}/servicio`);
  const { body } = await resp.json();
  return body;
}

export const getServicioById = async (id) => {
  const resp = await fetch (`${API}/servicio/${id}`);
  const { body } = await resp.json();
  const servicio = body;
  return servicio;
}

export const getServicioByIdRes = async (id) => {
  const resp = await fetch (`${API}/servicio/res/${id}`);
  if (resp.status === 200) {
    const { body } = await resp.json();
    return body;
  }
}

export const getAllServicioWithInseminacion = async () => {
  const resp = await fetch (`${API}/servicio/InseminacionOmonta`);
  if (resp.status === 200) {
    const { body } = await resp.json();
    return body;
  }
  return [];
}

export const getServicioWithInseminacionById = async (id) => {
  const resp = await fetch (`${API}/servicio/InseminacionOmonta/${id}`);
  if (resp.status === 200) {
    const { body } = await resp.json();
    return body;
  }
}

export const getServicioWithInseminacionByIdRes = async (id) => {
  const resp = await fetch (`${API}/servicio/res/InseminacionOmonta/${id}`);
  if (resp.status === 200) {
    const { body } = await resp.json();
    return body;
  }
}

export const getAllSecado = async () => {
  const resp = await fetch (`${API}/servicio/secado`);
  if (resp.status === 200) {
    const { body } = await resp.json();
    return body;
  }
  return [];
}

export const getSecadoByIdRes = async (id) => {
  const resp = await fetch (`${API}/servicio/res/secado/${id}`);
  if (resp.status === 200){
    const { body } = await resp.json();
    return body;
  }
}

export const updateServicio = async (id, body) => {
  console.log('body', body)
  const resp = await fetch(`${API}/servicio/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  return resp
}

export const createServicio = async (body) => {
  const resp = await fetch(`${API}/servicio`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  if (resp.status === 200) {
    return true;
  }else{
    return Promise.reject('Failed to create record');
  }
}

export const deleteServicio = async (id) => {
  const resp = await fetch(`${API}/servicio/${id}`, {
    method: 'DELETE'
  });
  return resp
}

