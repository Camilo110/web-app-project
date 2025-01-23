import API from "../config";
import { getHeadersAutorization } from '../utils/getHeaders.js';

export async function getProductos(){
  const response = await fetch(`${API}/producto`,{
    headers: getHeadersAutorization()})
  const {body} = await response.json()
  return body
}