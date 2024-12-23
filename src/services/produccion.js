import API from "../config";

export const getProduccion = async () => {
  const resp = await fetch(`${API}/produccionindividual`)
  const {body} = await resp.json()
  return body
}

export const CreateProduccionIndividual = async (data) => {

  const resp = await fetch(`${API}/produccionindividual`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
    })
    if (resp.status === 200) {
      return true;
    }else{
      return Promise.reject('Failed to create record');
    }
}

export const EditProduccionIndividual = async (data, id) => {
  const resp = await fetch(`${API}/produccionindividual/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  if (resp.status === 200) {
    return true;
  }else{
    return Promise.reject('Failed to create record');
  }
}

export const DeleteProduccionIndividual = async (id) => {
  const resp = await fetch(`${API}/produccionindividual/${id}`, {
    method: 'DELETE'
  })

  return resp
}