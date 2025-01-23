import API from "../config";
import { getHeadersAutorization } from '../utils/getHeaders.js';

export async function getEnGestacion(){
  const resp = await fetch(`${API}/reproduccion/engestacion`,{
    headers: getHeadersAutorization()}
  )
  if (resp.status === 200) {
    const { body } = await resp.json()
    return body
  }

  return []
}

export async function getInseminacionPorConfirmar(){
  const resp = await fetch(`${API}/reproduccion/porconfirmar`,{
    headers: getHeadersAutorization()}
  )
  if (resp.status === 200) {
    const { body } = await resp.json()
    return body
  }
  return []
}

export async function ConfirmarInseminacion(id){
  const resp = await fetch(`${API}/reproduccion/confirmarinseminacion/${id}`, {
    headers: getHeadersAutorization(),
    method: 'PUT'
  })

  if (resp.status === 200) {
    return true
  }

  return false
}
export async function inseminacionFallida(id){
  const resp = await fetch(`${API}/reproduccion/inseminacionfallida/${id}`, {
    headers: getHeadersAutorization(),
    method: 'PUT'
  })

  if (resp.status === 200) {
    return true
  }
  return false
}

export async function getPartos(){
  const resp = await fetch(`${API}/reproduccion/partos`,{
    headers: getHeadersAutorization()}
  )
  if (resp.status === 200) {
    const { body } = await resp.json()
    return body
  }

  return []
}

export async function getParaSecado(){
  const resp = await fetch(`${API}/reproduccion/parasecado`,{
    headers: getHeadersAutorization()}
  )
  if (resp.status === 200) {
    const { body } = await resp.json()
    return body
  }

  return []
}