import '../styles/Cards.css';
import PropTypes from 'prop-types';

export const Cards = ({Nombre, Numero, FechaParto}) => {
  return (
    <div className="card">
      <h2>{Nombre}</h2>
      <p> {Numero}</p>
      <p>Fecha de Parto: {FechaParto}</p>
    </div>
  );
}

Cards.propTypes = {
  Nombre: PropTypes.string.isRequired,
  Numero: PropTypes.number.isRequired,
  FechaParto: PropTypes.string.isRequired
}