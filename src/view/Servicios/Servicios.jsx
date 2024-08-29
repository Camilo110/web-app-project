import '../../styles/Servicios.css'
import { useEffect, useState } from "react"
import { Modal } from "../../components/Modal"
import { Table } from "../../components/Table"
import { createServicio, getServicio, getServicioById, updateServicio, deleteServicio } from "../../services/servicio"
import { getServiciosModal } from '../../services/forms'

const fields = {
  Tipo: { label: 'Tipo', type: 'text', value: '' },
  Fecha: { label: 'Fecha', type: 'date', value: '' },
  Veterinario: { label: 'Veterinario', type: 'text', value: '' },
  Observaciones: { label: 'Observaciones', type: 'textarea', value: '' },
  ResID: { label: 'Nombre Res', type: 'select', value: [''] }
}

export const Servicios = () => {

  const [openModalEdit, setOpenModalEdit] = useState(false)
  const [openModalCreate, setOpenModalCreate] = useState(false)

  const [data, setData] = useState([])
  const [campos, setCampos] = useState(fields)

  const [servicios, setServicios] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getServicio().then((resp) => {
      setServicios(resp)
      setIsLoading(false)
    })
  }, [])

  const onEdit = async (id) => {
    const resp = await getServicioById(id)
    setData(resp)
    const reses= await getServiciosModal()
    setCampos({...fields, ResID: { label: 'Nombre Res', type: 'select', value: reses}})
    setOpenModalEdit(true)
  }

  const onCreate = async () => {
    const reses= await getServiciosModal()
    setCampos({...fields, ResID: { label: 'Nombre Res', type: 'select', value: reses}})
    setOpenModalCreate(true)
  }

  const SubmitUpdate = async (values, idservicio) => {
    const resp = await updateServicio(idservicio, values)
    console.log(resp)
    setOpenModalEdit(false)
  }

  const SubmitCreate = async (valuesCreate) => {
    console.log(valuesCreate, 'values')
    const resp = await createServicio(valuesCreate)
    console.log(resp,'------')
    setOpenModalCreate(false)
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
        fields={campos}
        Handlesubmit={SubmitUpdate}>
          <h3>  Editar Servicio</h3>
        </Modal>
      }

      {openModalCreate
       &&
       <Modal
        setOpenModal={setOpenModalCreate}
        fields={campos}
        Handlesubmit={SubmitCreate}>
          <h3>  Crear Servicio</h3>
        </Modal>

      }

    </section>
  )
}