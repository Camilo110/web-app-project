import '../../styles/Secado.css'
import { useEffect, useState } from "react"
import { Table } from "../../components/Table"
import { Modal } from '../../components/Modal'
import { getFinca, getFincaById, createFinca, updateFinca} from '../../services/finca';

const fields = {
  Nombre: { label: 'Nombre', type: 'text', value: '' },
  Direccion: { label: 'Dirección', type: 'text', value: '' },
  Observaciones: { label: 'Observaciones', type: 'text', value: '' }
};

export const Fincas = () => {

  const [openModalCreate, setOpenModalCreate] = useState(false)
  const [openModalEdit, setOpenModalEdit] = useState(false)

  const [dataFinca, setDatafinca] = useState([])
  const [dataOnEdit, setDataOnEdit] = useState({})


  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const resp = await getFinca()
      setDatafinca(resp)
      setIsLoading(false)
    }
    fetchData()
  } , [])

  const onEditFinca = async (id) => {
    const resp = await getFincaById(id)
    setDataOnEdit(resp)
    setOpenModalEdit(true)
  }

  const onSubmitCreate = async (data) => {
    await createFinca(data)
  }

  const onSubmitEdit = async (data, id) => {
    await updateFinca(id, data)
  }

  return (
    <div className='raiz'>

      <div className="Footer-Secado">
        <h1>Fincas</h1>
        <div>
          <button onClick={() =>  setOpenModalCreate(true)}>Agregar</button>
        </div>
      </div>


      {isLoading 
        ?
        <h3>Cargando...</h3>
        :
        <Table
          HeaderList={['Nombre', 'Direccion']}
          data={ dataFinca }
          keyList={ ['Nombre', 'Direccion'] }
          onEdit={onEditFinca}
          enableDelete={false}
        />
      }
      {
        openModalCreate &&
        <Modal
        fields={fields}
        Handlesubmit={onSubmitCreate}
        setOpenModal={setOpenModalCreate}
        >
          <h2>Agregar Finca</h2>
        </Modal>
      }
      {
        openModalEdit &&
        <Modal
        fields={fields}
        data={dataOnEdit}
        Handlesubmit={onSubmitEdit}
        setOpenModal={setOpenModalEdit}
        >
          <h2>Editar Finca</h2>
        </Modal>
      }
    </div>
  )
}
