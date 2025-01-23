import API from "../config";
import { getHeadersAutorization } from '../utils/getHeaders.js';

export const createMuerte = async (muerte) => {
  const resp = await fetch(`${API}/muerte`, {
    method: 'POST',
    headers: getHeadersAutorization(),
    body: JSON.stringify(muerte)
  });
  return resp
}