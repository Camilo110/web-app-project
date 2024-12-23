import API from "../config";

export async function getEnGestacion(){
  const resp = await fetch(`${API}/reproduccion/engestacion`)

  if (resp.status === 200) {
    const { body } = await resp.json()
    return body
  }

  return []
}

export async function getInseminacionPorConfirmar(){
  const resp = await fetch(`${API}/reproduccion/porconfirmar`)
  if (resp.status === 200) {
    const { body } = await resp.json()
    return body
  }
  return []
}

export async function ConfirmarInseminacion(id){
  const resp = await fetch(`${API}/reproduccion/confirmarinseminacion/${id}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'PUT'
  })

  if (resp.status === 200) {
    return true
  }

  return false
}
export async function inseminacionFallida(id){
  const resp = await fetch(`${API}/reproduccion/inseminacionfallida/${id}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'PUT'
  })

  if (resp.status === 200) {
    return true
  }
  return false
}

export async function getPartos(){
  const resp = await fetch(`${API}/reproduccion/partos`)

  if (resp.status === 200) {
    const { body } = await resp.json()
    return body
  }

  return []
}

export async function getParaSecado(){
  const resp = await fetch(`${API}/reproduccion/parasecado`)

  if (resp.status === 200) {
    const { body } = await resp.json()
    return body
  }

  return []
}