export const getImages = async (id) => {
  const response = await fetch(`http://localhost:4000/imagen/${id}`);
  const {body} = await response.json()
  return body
}


export const uploadImage = async (id, files, key) => {
  const formData = new FormData()
  for (let i = 0; i < files.length; i++) {
      formData.append(key, files[i])
  }
  formData.append('resID', id)

  const response = await fetch('http://localhost:4000/imagen', {
      method: 'POST',
      body: formData,
  });
  const resp = await response.json()
  console.log(resp)
  if (resp.status == 200) {
      return 'OK'
  }
}

export const deleteImage = async (id) => {
  const response = await fetch(`http://localhost:4000/imagen/${id}`, {
      method: 'DELETE',
  });
  return response
}