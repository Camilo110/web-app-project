import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
export function TarjetaLinaje ({id, nombre,numero, familiaridad }) {
  return (
    <div style={{cursor: 'pointer'}} className="TarjetaLinaje">
      
      <Link to={`/res/${id}`} className="link">
          <p>{familiaridad}</p>
          <img 
          style={{width:'180px', height:'100px'}}
            src={`http://localhost:4000/imagen/id/${id}`} 
            alt="Cow Image"/>
          <div className='info'>
              <h2>{nombre}</h2>
              <p>Numero : {numero}</p>
          </div>
      </Link>
    </div>
  )
}

TarjetaLinaje.propTypes = {
  id: PropTypes.string.isRequired,
  nombre: PropTypes.string.isRequired,
  numero: PropTypes.number.isRequired,
  familiaridad: PropTypes.string.isRequired
}

