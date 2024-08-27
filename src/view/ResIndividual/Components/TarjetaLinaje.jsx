import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
export function TarjetaLinaje ({id, nombre,numero, familiaridad }) {
  return (
    <div className="TarjetaLinaje">
      <div>
        <p>familiaridad {familiaridad}</p>
        <img 
        style={{width:'180px', height:'100px'}}
          src={`http://localhost:4000/imagen/id/${id}`} 
          alt="Cow Image"/>
        <div className='info'>
          <Link to={`/res/${id}`} className="link">
            <h2>{nombre}</h2>
            <p>Numero : {numero}</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

TarjetaLinaje.propTypes = {
  id: PropTypes.string.isRequired,
  nombre: PropTypes.string.isRequired,
  numero: PropTypes.string.isRequired,
  familiaridad: PropTypes.string.isRequired
}

