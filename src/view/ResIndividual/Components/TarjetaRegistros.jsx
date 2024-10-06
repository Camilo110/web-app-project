import PropTypes from 'prop-types'
// eslint-disable-next-line no-unused-vars
export function TarjetaRegistros({body: {ID, Numero, ResID, listInsumos, ...body}, onDelete, onEdit}) {

  return (
    <div className='TarjetaRegistro'>
      <div className='numero'>
        <p> N° {Numero}</p>
      </div>
      <div className='contenido'>
        {Object.keys(body).map((key) => (
          <p key={key}>
          { body[key] && 
            <> {key}: {body[key]}</>
          }
          </p>
        ))}

         {listInsumos && 
         <p>Lista Insumos: {listInsumos} </p>
          }
      </div>
      <div className="opciones">
        <button onClick={() => onDelete(ID)}>Borrar</button>
        <button onClick={() => onEdit(ID)}>Editar</button>
      </div>      
      
    </div>
  )
}

TarjetaRegistros.propTypes = {
  body: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired
}

