export async function getEnGestacion(){
  const resp = await fetch(`http://localhost:4000/reproduccion/engestacion`)

  if (resp.status === 200) {
    const { body } = await resp.json()
    return body
  }

  return []
}

export async function getInseminacionPorConfirmar(){
  const resp = await fetch(`http://localhost:4000/reproduccion/porconfirmar`)
  if (resp.status === 200) {
    const { body } = await resp.json()
    return body
  }
  return []
}

export async function ConfirmarInseminacion(id){
  const resp = await fetch(`http://localhost:4000/reproduccion/confirmarinseminacion/${id}`, {
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
  const resp = await fetch(`http://localhost:4000/reproduccion/inseminacionfallida/${id}`, {
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