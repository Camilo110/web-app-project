
export const getInsumoServicio = async (idServicio) => {
  const resp = await fetch(`http://localhost:4000/insumoServicio/servicio/${idServicio}`)
  if (resp.status === 200) {
    const {body} = await resp.json()
    return body
  }
  return []
}

export const updateInsumoServicio = async (insumo) => {
  console.log(insumo)
  const resp = await fetch('http://localhost:4000/insumoServicio', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(insumo)
  })
  return resp
}

export const deleteInsumoServicio = async (data) => {
  const resp = await fetch('http://localhost:4000/insumoServicio', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  return resp
}
