import PropTypes from 'prop-types'

export function TarjetaRegistros({body: {ID, Numero, ...body}, onDelete, onEdit}) {

  return (
    <div className='TarjetaRegistro'>
      <p>N° {Numero}</p>
      
      {Object.keys(body).map((key) => (
        <p key={key}>{key}: {body[key]}</p>
      ))}

      <button onClick={() => onDelete(ID)}>Borrar</button>
      <button onClick={() => onEdit(ID)}>Editar</button>
      
    </div>
  )
}

TarjetaRegistros.propTypes = {
  body: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired
}

