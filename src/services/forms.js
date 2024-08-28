
export const getResModal = async () => {
  const resp= await fetch('http://localhost:4000/finca');
  console.log("CUIDADO")
  const {body} = await resp.json();
  const fincas = body.map(({ID, Nombre}) => ({ID, value: Nombre}));

  const response= await fetch('http://localhost:4000/res');
  const {body: reses} = await response.json();
  const madres = reses.filter(({Sexo}) => Sexo === 'F').map(({ID, Nombre}) => ({ID, value: Nombre}))
  const padres = reses.filter(({Sexo}) => Sexo === 'M').map(({ID, Nombre}) => ({ID, value: Nombre}))

  return {fincas, madres, padres}
 }

 export const getProduccionModal = async () => {
  const response= await fetch('http://localhost:4000/res');
  const {body: reses} = await response.json();
  const res = reses.map(({ID, Numero, Nombre, Sexo}) => ({ID, Numero, Nombre, Sexo, selected: false}))

  return res
 }