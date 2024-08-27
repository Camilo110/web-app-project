export const getImages = async (id) => {
  const response = await fetch(`http://localhost:4000/imagen/${id}`);
  const {body} = await response.json()
  return body
}


export const uploadImage = async (id, image) => {
  const formData = new FormData()
  formData.append('images', image)
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