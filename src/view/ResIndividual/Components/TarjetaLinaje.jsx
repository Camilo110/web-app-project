import PropTypes from 'prop-types'
export function TarjetaLinaje ({id, nombre, familiaridad, urlImage = "https://fakeimg.pl/180x140" }) {
  return (
    <div className="TarjetaLinaje">
      <div>
        <p>familiaridad {familiaridad}</p>
        <img src={urlImage} alt="Cow Image"/>
        <div className='info'>
          <h2>{nombre}</h2>
          <p>id{id}</p>
        </div>
      </div>
    </div>
  )
}

TarjetaLinaje.propTypes = {
  id: PropTypes.number.isRequired,
  nombre: PropTypes.string.isRequired,
  familiaridad: PropTypes.string.isRequired,
  urlImage: PropTypes.string,
}

