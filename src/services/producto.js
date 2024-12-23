import API from "../config";

export async function getProductos(){
  const response = await fetch(`${API}/producto`)
  const {body} = await response.json()
  return body
}