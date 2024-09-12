import PropTypes from 'prop-types'
import { useState } from 'react'
import { ModalServicios } from '../../../components/ModalServicios'

// eslint-disable-next-line no-unused-vars
export function TarjetaRegistros({body: {ID, Numero, ResID, listInsumos, ...body}, onDelete}) {

  const [openModalEdit, setOpenModalEdit] = useState(false)

  const listInsumosToString = () => {
    return listInsumos.map((item) => (
      `${item.Nombre}`
    )).join(', ')
  }


  return (
    <div className='TarjetaRegistro'>
      <p>N° {Numero}</p>
      
      {Object.keys(body).map((key) => (
        <p key={key}> {key}: {body[key]}</p>
      ))}

      <p> Lista Insumos: {listInsumosToString()} </p>

      <button onClick={() => onDelete(ID)}>Borrar</button>
      <button onClick={() => setOpenModalEdit(true)}>Editar</button>

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

