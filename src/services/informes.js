import API from "../config";
import { getHeadersAutorization } from '../utils/getHeaders.js';

/* sección inicial */
export const getNumeroResesPorFecha = async (fechaInicio, fechaFin) => {
  const response = await fetch(`${API}/informes/getNumeroResesPorFecha/${fechaInicio}/${fechaFin}`,{
    headers: getHeadersAutorization()}
  );
  return response;
};

export const getNumeroNacimientosPorFecha = async (fechaInicio, fechaFin) => {
  const response = await fetch(`${API}/informes/getNumeroNacimientosPorFecha/${fechaInicio}/${fechaFin}`,{
    headers: getHeadersAutorization()}
  );
  return response;
};

export const getProduccionTotalPorTipo = async (fechaInicio, fechaFin, tipo) => {
  const response = await fetch(`${API}/informes/getProduccionTotalPorTipo/${fechaInicio}/${fechaFin}/${tipo}`,{
    headers: getHeadersAutorization()}
  );
  return response;
};

/* graficas */
export const getProduccionLechePorFecha = async (fechaInicio, fechaFin) => {
  const response = await fetch(`${API}/informes/getProduccionLechePorFecha/${fechaInicio}/${fechaFin}`,{
    headers: getHeadersAutorization()}
  );
  return response;
};

export const getBalancePorFecha = async (fechaInicio, fechaFin) => {
  const response = await fetch(`${API}/informes/getBalancePorFecha/${fechaInicio}/${fechaFin}`,{
    headers: getHeadersAutorization()}
  );
  return response;
};

/* sección final */
export const getDistribucionPorSexo = async (fechaInicio, fechaFin) => {
  const response = await fetch(`${API}/informes/getDistribucionPorSexo/${fechaInicio}/${fechaFin}`,{
    headers: getHeadersAutorization()}
  );
  return response;
};

export const getDistribucionPorTipo = async (fechaInicio, fechaFin) => {
  const response = await fetch(`${API}/informes/getDistribucionPorTipo/${fechaInicio}/${fechaFin}`,{
    headers: getHeadersAutorization()}
  );
  return response;
};

export const getDistribucionPorRaza = async (fechaInicio, fechaFin) => {
  const response = await fetch(`${API}/informes/getDistribucionPorRaza/${fechaInicio}/${fechaFin}`,{
    headers: getHeadersAutorization()}
  );
  return response;
};

export const getDistribucionPorEdad = async (fechaInicio, fechaFin) => {
  const response = await fetch(`${API}/informes/getDistribucionPorEdad/${fechaInicio}/${fechaFin}`,{
    headers: getHeadersAutorization()}
  );
  return response;
};