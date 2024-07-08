import PropTypes from 'prop-types'

export function TarjetaRegistros({body: {ID, Numero, ...body}}) {


  const deleteRegistro = (id) => {
    console.log('Delete Registro', id)
  }

  return (
    <div className='TarjetaRegistro'>
      <p>N° {Numero}</p>
      
      {Object.keys(body).map((key) => (
        <p key={key}>{key}: {body[key]}</p>
      ))}

      <button onClick={() => deleteRegistro(ID)}>Borrar</button>
      <button>Editar</button>
      
    </div>
  )
}

TarjetaRegistros.propTypes = {
  body: PropTypes.object.isRequired,
}

