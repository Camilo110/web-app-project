export async function getReses(){
  const resp = await fetch(`http://localhost:4000/res`);
  const { body } = await resp.json();
  return body;
}