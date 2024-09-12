import '../../styles/Servicios.css'
import { useEffect, useState } from "react"
import { Table } from "../../components/Table"
import { ModalServicios } from "../../components/ModalServicios"
import { getServicio, deleteServicio } from "../../services/servicio"

export const Servicios = () => {

  const [openModalEdit, setOpenModalEdit] = useState(false)
  const [openModalCreate, setOpenModalCreate] = useState(false)

  const [idToEdit, setIdToEdit] = useState({})

  const [servicios, setServicios] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect( () => {
    getAll()
  }, [])

  const getAll = async () => {
    const resp = await getServicio()
    resp.forEach(element => {
      element.listInsumos = element.listInsumos.map((insumo) => insumo.Nombre)
    });
    setServicios(resp)
    setIsLoading(false)
  }

  const onEdit = async (id) => {
    setIdToEdit(id)
    setOpenModalEdit(true)
  }

  const onCreate = () => {
    setOpenModalCreate(true)
  }

  return (
    <section className="Servicios">

      <div className='Title'>
        <h1> Servicios </h1>
        <button onClick={onCreate}> Agregar </button>
      </div>

      <main className='ServiciosMain'>

        {
          isLoading
          ?
          <h3> Cargando... </h3>
          :
          <Table
          HeaderList={['Numero', 'Tipo',  'Fecha',  'Veterinario', 'Nombre Res', 'Insumos']}
          data={ servicios }
          keyList={ ['Numero', 'Tipo', 'Fecha', 'Veterinario', 'ResNombre', 'listInsumos'] }
          onDelete={deleteServicio}
          onEdit={onEdit}
        />

        }
        

      </main>

      {
        openModalCreate &&
        <ModalServicios 
          setOpenModal={setOpenModalCreate} />
      }

{
        openModalEdit &&
        <ModalServicios 
          isEdit={true}
          setOpenModal={setOpenModalEdit}
          idServicio={idToEdit} />
      }

    </section>
  )
}