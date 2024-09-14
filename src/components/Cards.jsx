import '../styles/Cards.css';
import PropTypes from 'prop-types';

export const Cards = ({id, Nombre, Estado, FechaParto}) => {
  const setOpenModal = () => {
    console.log('Modal abierto')
  }
  return (
    <div onClick={setOpenModal} className="card">
      <h2>{Nombre}</h2>
      <p>Estado: {Estado}</p>
      <p>Fecha: {FechaParto}</p>
    </div>
  );
}

Cards.propTypes = {
  id: PropTypes.number.isRequired,
  Nombre: PropTypes.string.isRequired,
  Estado: PropTypes.string.isRequired,
  FechaParto: PropTypes.string.isRequired
}