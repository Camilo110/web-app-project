import API from "../config";
import { getHeadersAutorization } from '../utils/getHeaders.js';
 
 export const getAllParaInseminar = async () => {
  const resp = await fetch(`${API}/paraInseminar`,{
    headers: getHeadersAutorization()}
  )
  if (resp.status === 200) {
    const {body} = await resp.json()
    return body
  }
  return []
}

export const getParaInseminarbyId = async (id) => {
  const resp = await fetch(`${API}/paraInseminar/${id}`,{
    headers: getHeadersAutorization()}
  )
  if (resp.status === 200) {
    const {body} = await resp.json()
    return body
  }
  return []
}

export const getParaInseminarSugeridos = async () => {
  const resp = await fetch(`${API}/paraInseminar/sugeridos`,{
    headers: getHeadersAutorization()}
  )
  if (resp.status === 200) {
    const {body} = await resp.json()
    return body
  }
  return []
}


export const createParaInseminar = async (paraInseminar) => {
  const resp = await fetch(`${API}/paraInseminar`, {
    method: 'POST',
    headers: getHeadersAutorization(),
    body: JSON.stringify(paraInseminar)
  })
  const {body} = await resp.json()
  return body
}

export const updateParaInseminar = async (id) => {
  const resp = await fetch(`${API}/paraInseminar/${id}`, {
    method: 'PUT',
    headers: getHeadersAutorization()
  })
  const {body} = await resp.json()
  return body
}