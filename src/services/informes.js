/* sección inicial */

export const getNumeroResesPorFecha = async (fechaInicio, fechaFin) => {
  const response = await fetch(`http://localhost:4000/informes/getNumeroResesPorFecha/${fechaInicio}/${fechaFin}`);
  return response;
};

export const getNumeroNacimientosPorFecha = async (fechaInicio, fechaFin) => {
  const response = await fetch(`http://localhost:4000/informes/getNumeroNacimientosPorFecha/${fechaInicio}/${fechaFin}`);
  return response;
};

export const getProduccionTotalPorTipo = async (fechaInicio, fechaFin, tipo) => {
  const response = await fetch(`http://localhost:4000/informes/getProduccionTotalPorTipo/${fechaInicio}/${fechaFin}/${tipo}`);
  return response;
};

/* graficas */


/* sección final */
export const getDistribucionPorSexo = async (fechaInicio, fechaFin) => {
  const response = await fetch(`http://localhost:4000/informes/getDistribucionPorSexo/${fechaInicio}/${fechaFin}`);
  return response;
};

export const getDistribucionPorTipo = async (fechaInicio, fechaFin) => {
  const response = await fetch(`http://localhost:4000/informes/getDistribucionPorTipo/${fechaInicio}/${fechaFin}`);
  return response;
};

export const getDistribucionPorRaza = async (fechaInicio, fechaFin) => {
  const response = await fetch(`http://localhost:4000/informes/getDistribucionPorRaza/${fechaInicio}/${fechaFin}`);
  return response;
};

export const getDistribucionPorEdad = async (fechaInicio, fechaFin) => {
  const response = await fetch(`http://localhost:4000/informes/getDistribucionPorEdad/${fechaInicio}/${fechaFin}`);
  return response;
};