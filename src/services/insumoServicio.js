
export const getInsumoServicio = async (idServicio) => {
  const resp = await fetch(`http://localhost:4000/insumoServicio/servicio/${idServicio}`)
  const {body} = await resp.json()
  return body
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
  console.log(resp)
  const {body} = await resp.json()
  return body
}
