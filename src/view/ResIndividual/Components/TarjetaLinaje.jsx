import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { NumeroRes } from '../../../components/NumeroRes'

export function TarjetaLinaje({ id, nombre, numero, familiaridad, tipo }) {
  return (
    <div style={{ cursor: 'pointer' }} className="TarjetaLinaje">
      <Link to={`/res/${id}`} className="link">
        <div className="image-container">
          <img
            src={`http://localhost:4000/imagen/id/${id}`}
            alt="Cow Image"
          />
          <p className="familiaridad">{familiaridad}</p>
        </div>
        <div className="info">
          <h2>{nombre}</h2>
          < NumeroRes id={id} numero={numero} tipo={tipo}></ NumeroRes>
        </div>
      </Link>
    </div>
  );
}

TarjetaLinaje.propTypes = {
  id: PropTypes.string.isRequired,
  nombre: PropTypes.string.isRequired,
  numero: PropTypes.number.isRequired,
  familiaridad: PropTypes.string.isRequired,
  tipo: PropTypes.string.isRequired
}

