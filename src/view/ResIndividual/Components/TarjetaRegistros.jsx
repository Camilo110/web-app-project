import PropTypes from 'prop-types'
import { useState } from 'react'
import { ModalServicios } from '../../../components/ModalServicios'

// eslint-disable-next-line no-unused-vars
export function TarjetaRegistros({body: {ID, Numero, ResID, listInsumos, ...body}, onDelete}) {

  const [openModalEdit, setOpenModalEdit] = useState(false)



  return (
    <div className='TarjetaRegistro'>
      <p>N° {Numero}</p>
      
      {Object.keys(body).map((key) => (
        <p key={key}> {key}: {body[key]}</p>
      ))}

      <p> Lista Insumos: {listInsumos} </p>
      <div className="opciones">
        <button onClick={() => onDelete(ID)}>Borrar</button>
        <button onClick={() => setOpenModalEdit(true)}>Editar</button>
      </div>      

      {
        openModalEdit &&
        <ModalServicios 
          isEdit={true}
          setOpenModal={setOpenModalEdit}
          idServicio={ID} />
      }
      
    </div>
  )
}

TarjetaRegistros.propTypes = {
  body: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired
}

