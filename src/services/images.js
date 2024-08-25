export const getImages = async (id) => {
  const response = await fetch(`http://localhost:4000/imagen/00000000-0000-0000-0000-000000000001`)
  const {body} = await response.json()
  return body
}


export const uploadImage = async (id, image) => {
  const formData = new FormData()
  formData.append('images', image)
  formData.append('resID', id)

  console.log(formData)

  const response = await fetch('http://localhost:4000/imagen', {
      method: 'POST',
      body: formData,
  });
  const {body} = await response.json()
  return body
  }