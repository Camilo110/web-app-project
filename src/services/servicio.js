import API from "../config";
import { getHeadersAutorization } from '../utils/getHeaders.js';

export const getServicio = async () => {
  const resp = await fetch(`${API}/servicio`,{
    headers: getHeadersAutorization()}
  );
  const { body } = await resp.json();
  return body;
}

export const getServicioById = async (id) => {
  const resp = await fetch (`${API}/servicio/${id}`,{
    headers: getHeadersAutorization()}
  );
  const { body } = await resp.json();
  const servicio = body;
  return servicio;
}

export const getServicioByIdRes = async (id) => {
  const resp = await fetch (`${API}/servicio/res/${id}`,{
    headers: getHeadersAutorization()}
  );
  if (resp.status === 200) {
    const { body } = await resp.json();
    return body;
  }
}

export const getAllServicioWithInseminacion = async () => {
  const resp = await fetch (`${API}/servicio/InseminacionOmonta`,{
    headers: getHeadersAutorization()}
  );
  if (resp.status === 200) {
    const { body } = await resp.json();
    return body;
  }
  return [];
}

export const getServicioWithInseminacionById = async (id) => {
  const resp = await fetch (`${API}/servicio/InseminacionOmonta/${id}`,{
    headers: getHeadersAutorization()}
  );
  if (resp.status === 200) {
    const { body } = await resp.json();
    return body;
  }
}

export const getServicioWithInseminacionByIdRes = async (id) => {
  const resp = await fetch (`${API}/servicio/res/InseminacionOmonta/${id}`,{
    headers: getHeadersAutorization()}
  );
  if (resp.status === 200) {
    const { body } = await resp.json();
    return body;
  }
}

export const getAllSecado = async () => {
  const resp = await fetch (`${API}/servicio/secado`,{
    headers: getHeadersAutorization()}
  );
  if (resp.status === 200) {
    const { body } = await resp.json();
    return body;
  }
  return [];
}

export const getSecadoByIdRes = async (id) => {
  const resp = await fetch (`${API}/servicio/res/secado/${id}`,{
    headers: getHeadersAutorization()}
  );
  if (resp.status === 200){
    const { body } = await resp.json();
    return body;
  }
}

export const updateServicio = async (id, body) => {
  console.log('body', body)
  const resp = await fetch(`${API}/servicio/${id}`, {
    method: 'PUT',
    headers: getHeadersAutorization(),
    body: JSON.stringify(body)
  });
  return resp
}

export const createServicio = async (body) => {
  const resp = await fetch(`${API}/servicio`, {
    method: 'POST',
    headers: getHeadersAutorization(),
    body: JSON.stringify(body)
  });
  if (resp.status === 200) {
    return true;
  }else{
    return Promise.reject('Failed to create record');
  }
}

export const deleteServicio = async (id) => {
  const resp = await fetch(`${API}/servicio/${id}`,{
    headers: getHeadersAutorization()}, {
    method: 'DELETE'
  });
  return resp
}

