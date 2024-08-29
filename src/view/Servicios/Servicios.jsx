import '../../styles/Servicios.css'
import { useEffect, useState } from "react"
import { Modal } from "../../components/Modal"
import { Table } from "../../components/Table"
import { createServicio, getServicio, getServicioById, updateServicio, deleteServicio } from "../../services/servicio"

const fields = {
  Tipo: { label: 'Tipo', type: 'text', value: '' },
  Fecha: { label: 'Fecha', type: 'date', value: '' },
  Veterinario: { label: 'Veterinario', type: 'text', value: '' },
  Observaciones: { label: 'Observaciones', type: 'textarea', value: '' }
}

export const Servicios = () => {

  const [openModalEdit, setOpenModalEdit] = useState(false)
  const [openModalCreate, setOpenModalCreate] = useState(false)

  const [data, setData] = useState([])

  const [servicios, setServicios] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getServicio().then((resp) => {
      setServicios(resp)
      setIsLoading(false)
    })
  }, [])

  const onEdit = (id) => {
    getServicioById(id).then((resp) => {
      setData(resp)
      setOpenModalEdit(true)
    })
  }

  const SubmitUpdate = async (values, idservicio) => {
    const resp = await updateServicio(idservicio, values)
    console.log(resp)
    setOpenModalEdit(false)
  }

  const SubmitCreate = async (valuesCreate, id) => {
    console.log(valuesCreate, 'values')
    const resp = await createServicio(valuesCreate)
    console.log(resp,'------', id)
    setOpenModalCreate(false)
  }




  return (
    <section className="Servicios">

      <div className='Title'>
        <h1> Servicios </h1>
        <button onClick={() => setOpenModalCreate(true)}> Agregar </button>
      </div>

      <main className='ServiciosMain'>

        {
          isLoading
          ?
          <h3> Cargando... </h3>
          :
          <Table
          HeaderList={['Numero', 'Tipo',  'Fecha',  'Veterinario']} //, 'Producto', '# Res'
          data={ servicios }
          keyList={ ['Numero', 'Tipo', 'Fecha', 'Veterinario']}
          onDelete={deleteServicio}
          onEdit={onEdit}
        />

        }
        

      </main>

      {openModalEdit
       &&
       <Modal
        setOpenModal={setOpenModalEdit}
        data={data}
        fields={fields}
        Handlesubmit={SubmitUpdate}>
          <h3>  Editar Servicio</h3>
        </Modal>
      }

      {openModalCreate
       &&
       <Modal
        setOpenModal={setOpenModalCreate}
        fields={fields}
        Handlesubmit={SubmitCreate}>
          <h3>  Crear Servicio</h3>
        </Modal>

      }

    </section>
  )
}