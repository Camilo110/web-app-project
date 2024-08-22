import './Cards.css';

export const Cards = ({Nombre, Numero, FechaParto}) => {
  return (
    <div className="card">
      <h2>{Nombre}</h2>
      <p> {Numero}</p>
      <p>Fecha de Parto: {FechaParto}</p>
    </div>
  );
}