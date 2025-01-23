import API from "../config";
import { getHeadersAutorization } from '../utils/getHeaders.js';

export const getAllTransaccion = async () => {
  const resp = await fetch(`${API}/transaccion`,{
    headers: getHeadersAutorization()}
  )
  const { body } = await resp.json()
  return body
}

export const getResumen = async () => {
  const resp = await fetch(`${API}/transaccion/resumen`,{
    headers: getHeadersAutorization()}
  )
  const { body } = await resp.json()
  return body
}

export const getTransaccionById = async (id) => {
  const resp = await fetch(`${API}/transaccion/${id}`,{
    headers: getHeadersAutorization()}
  )
  const { body } = await resp.json()
  return body
} 

export const createTransaccion = async (data) => {
  const resp = await fetch(`${API}/transaccion`, {
    method: 'POST',
    headers: getHeadersAutorization(),
    body: JSON.stringify(data)
  })
  if (resp.status === 200) {
    return true
  }else{
    const {body} = await  resp.json()
    console.log(body)
    return Promise.reject('Failed to create record');
  }
}

export const balanceTransacciones = async (startDate, endDate) => {
  const resp = await fetch(`${API}/transaccion/fechas/${startDate}/${endDate}`,{
    headers: getHeadersAutorization()}
  )
  return resp
}