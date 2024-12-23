import API from "../config";

export const getInsumoServicio = async (idServicio) => {
  const resp = await fetch(`${API}/insumoServicio/servicio/${idServicio}`)
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
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(insumo)
  })
  return resp
}

export const deleteInsumoServicio = async (data) => {
  const resp = await fetch(`${API}/insumoServicio`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  return resp
}
