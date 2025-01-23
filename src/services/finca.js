import API from "../config";
import { getHeadersAutorization } from '../utils/getHeaders.js';
 
export const getFinca = async () => {
  const resp= await fetch(`${API}/finca`,{
    headers: getHeadersAutorization()}
  );
  const {body} = await resp.json();
  return body;
 }


export const getFincaById = async (id) => {
  const resp = await fetch(`${API}/finca/${id}`, {
    headers: getHeadersAutorization()}
  );
  const {body} = await resp.json();
  return body;
}

export const updateFinca = async (id, bodys) => {
  console.log(bodys, "BODY")
  const resp = await fetch(`${API}/finca/${id}`, {
    method: 'PUT', 
    headers: getHeadersAutorization(),
    body: JSON.stringify(bodys)
  });
  const {body} = await resp.json();
  return body;
}

export const createFinca = async (res) => {
  const resp = await fetch(`${API}/finca`, {
    method: 'POST',
    headers: getHeadersAutorization(),
    body: JSON.stringify(res)
  });
  if (resp.status === 200) {
    return { status: 200 };
  } else {
    return Promise.reject('Failed to create record');
  }
}

export const deleteFinca = async (id) => {
  const resp = await fetch(`${API}/finca/${id}`, {
    method: 'DELETE',
    headers: getHeadersAutorization()
  });
  console.log('melo')
  return resp
}
