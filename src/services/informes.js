import API from "../config";

/* sección inicial */
export const getNumeroResesPorFecha = async (fechaInicio, fechaFin) => {
  const response = await fetch(`${API}/informes/getNumeroResesPorFecha/${fechaInicio}/${fechaFin}`);
  return response;
};

export const getNumeroNacimientosPorFecha = async (fechaInicio, fechaFin) => {
  const response = await fetch(`${API}/informes/getNumeroNacimientosPorFecha/${fechaInicio}/${fechaFin}`);
  return response;
};

export const getProduccionTotalPorTipo = async (fechaInicio, fechaFin, tipo) => {
  const response = await fetch(`${API}/informes/getProduccionTotalPorTipo/${fechaInicio}/${fechaFin}/${tipo}`);
  return response;
};

/* graficas */
export const getProduccionLechePorFecha = async (fechaInicio, fechaFin) => {
  const response = await fetch(`${API}/informes/getProduccionLechePorFecha/${fechaInicio}/${fechaFin}`);
  return response;
};

export const getBalancePorFecha = async (fechaInicio, fechaFin) => {
  const response = await fetch(`${API}/informes/getBalancePorFecha/${fechaInicio}/${fechaFin}`);
  return response;
};

/* sección final */
export const getDistribucionPorSexo = async (fechaInicio, fechaFin) => {
  const response = await fetch(`${API}/informes/getDistribucionPorSexo/${fechaInicio}/${fechaFin}`);
  return response;
};

export const getDistribucionPorTipo = async (fechaInicio, fechaFin) => {
  const response = await fetch(`${API}/informes/getDistribucionPorTipo/${fechaInicio}/${fechaFin}`);
  return response;
};

export const getDistribucionPorRaza = async (fechaInicio, fechaFin) => {
  const response = await fetch(`${API}/informes/getDistribucionPorRaza/${fechaInicio}/${fechaFin}`);
  return response;
};

export const getDistribucionPorEdad = async (fechaInicio, fechaFin) => {
  const response = await fetch(`${API}/informes/getDistribucionPorEdad/${fechaInicio}/${fechaFin}`);
  return response;
};