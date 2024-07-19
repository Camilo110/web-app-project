
export const getProduccion = async () => {
  const resp = await fetch('http://localhost:4000/produccionindividual')
  const {body} = await resp.json()
  return body
}

export const CreateProduccionIndividual = async (data) => {

  const resp = await fetch('http://localhost:4000/produccionindividual', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
    })
  
  const {body} = await resp.json()
  return body
}