
export const createMuerte = async (muerte) => {
  const resp = await fetch('http://localhost:4000/muerte', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(muerte)
  });
  const { body } = await resp.json();
  return body;
}