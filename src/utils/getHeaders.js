import { getToken } from '../services/auth.js';

export const getHeadersAutorization = () => {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
};