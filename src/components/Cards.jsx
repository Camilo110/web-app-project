import '../styles/Cards.css';
import PropTypes from 'prop-types';

export const Cards = ({id, Nombre, Estado, FechaParto, onClick}) => {
  return (
    
    <div onClick={() => onClick(id)} className="card">
      <h2>{Nombre}</h2>
      <p>Estado: {Estado}</p>
      <p>Fecha: {FechaParto}</p>
    </div>
  );
}

Cards.propTypes = {
  id: PropTypes.string.isRequired,
  Nombre: PropTypes.string.isRequired,
  Estado: PropTypes.string.isRequired,
  FechaParto: PropTypes.string.isRequired,
  onClick: PropTypes.func
}