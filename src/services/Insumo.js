
export const getInsumo = async () => {
  const resp = await fetch('http://localhost:4000/insumo')
  const {body} = await resp.json()
  return body
}

export const getInsumoById = async (id) => {
  const resp = await fetch(`http://localhost:4000/insumo/${id}`)
  const {body} = await resp.json()
  return body
}

export const createInsumo = async (data) => {
  const resp = await fetch('http://localhost:4000/insumo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  const {body} = await resp.json()
  return body
}

export const updateInsumo = async (id, data) => {
  const resp = await fetch(`http://localhost:4000/insumo/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  const {body} = await resp.json()
  return body
}