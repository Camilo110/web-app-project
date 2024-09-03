
export const getInsumo = async () => {
  const resp = await fetch('http://localhost:4000/insumo')
  const {body} = await resp.json()
  return body
}
