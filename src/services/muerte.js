import API from "../config";

export const createMuerte = async (muerte) => {
  const resp = await fetch(`${API}/muerte`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(muerte)
  });
  return resp
}