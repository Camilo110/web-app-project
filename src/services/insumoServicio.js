import API from "../config";
import { getHeadersAutorization } from '../utils/getHeaders.js';

export const getInsumoServicio = async (idServicio) => {
  const resp = await fetch(`${API}/insumoServicio/servicio/${idServicio}`,{
    headers: getHeadersAutorization()}
  )
  if (resp.status === 200) {
    const {body} = await resp.json()
    return body
  }
  return []
}

export const updateInsumoServicio = async (insumo) => {
  console.log(insumo)
  const resp = await fetch(`${API}/insumoServicio`, {
    method: 'PUT',
    headers: getHeadersAutorization(),
    body: JSON.stringify(insumo)
  })
  return resp
}

export const deleteInsumoServicio = async (data) => {
  const resp = await fetch(`${API}/insumoServicio`, {
    method: 'DELETE',
    headers: getHeadersAutorization(),
    body: JSON.stringify(data)
  })
  return resp
}
