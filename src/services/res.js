
 
export const getRes = async () => {
  const resp= await fetch('http://localhost:4000/res');
  const {body} = await resp.json();
  return body;
 }

export const deleteRes = async (id) => {
  const resp = await fetch(`http://localhost:4000/res/${id}`, {
    method: 'DELETE'
  });
  console.log('melo')
  const {body} = await resp.json();
  return body;
}
