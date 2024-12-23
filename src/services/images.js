import API from "../config";

export const getImages = async (id) => {
  const response = await fetch(`${API}/imagen/${id}`);
  const {body} = await response.json()
  return body
}


export const uploadImage = async (id, files, key) => {
  const formData = new FormData()
  for (let i = 0; i < files.length; i++) {
      formData.append(key, files[i])
  }
  formData.append('resID', id)

  const response = await fetch(`${API}/imagen`, {
      method: 'POST',
      body: formData,
  });
  const resp = await response.json()
  console.log(resp)
  if (resp.status === 200) {
    return true;
  }else{
    return Promise.reject('Failed to create record');
  }
}

export const deleteImage = async (id) => {
  const response = await fetch(`${API}/imagen/${id}`, {
      method: 'DELETE',
  });
  return response
}