import '../../styles/Secado.css'
import { useEffect, useState } from "react"
import { Table } from "../../components/Table"
import { Modal } from '../../components/Modal'
import { getInsumo, createInsumo, updateInsumo, getInsumoById } from '../../services/Insumo';

const fields = {
  Numero: { label: 'Número', type: 'number', value: 0 },
  Nombre: { label: 'Nombre', type: 'text', value: '' },
  UnidadMedida: { label: 'Unidad de Medida', type: 'text', value: '' },
  CantidadActual: { label: 'Cantidad', type: 'number', value: 0 },
  FechaIngreso: { label: 'Fecha de Ingreso', type: 'date', value: '' },
  FechaVencimiento: { label: 'Fecha de Vencimiento', type: 'date', value: '' },
  Observaciones: { label: 'Observaciones', type: 'textarea', value: '' },
};

export const Insumos = () => {

  const [openModalCreate, setOpenModalCreate] = useState(false)
  const [openModalEdit, setOpenModalEdit] = useState(false)

  const [dataInsumo, setDataInsumo] = useState([])
  const [dataInsumoOnEdit, setDataInsumoOnEdit] = useState({})


  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const resp = await getInsumo()
      setDataInsumo(resp)
      setIsLoading(false)
    }
    fetchData()
  } , [])

  const onEditInsumo = async (id) => {
    const resp = await getInsumoById(id)
    setDataInsumoOnEdit(resp)
    setOpenModalEdit(true)
  }

  const onSubmitCreate = async (data) => {
    await createInsumo(data)
  }

  const onSubmitEdit = async (data, id) => {
    await updateInsumo(id, data)
  }

  return (
    <div className='raiz'>

      <div className="Footer-Secado">
        <h1>Insumos</h1>
        <div>
          <button onClick={() =>  setOpenModalCreate(true)}>Agregar</button>
        </div>
      </div>


      {isLoading 
        ?
        <h3>Cargando...</h3>
        :
        <Table
          HeaderList={['Numero', 'Nombre',  'Unidad de Medida', 'Cantidad']}
          data={ dataInsumo }
          keyList={ ['Numero', 'Nombre', 'UnidadMedida', 'CantidadActual'] }
          onEdit={onEditInsumo}
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
          <h2>Agregar Insumo</h2>
        </Modal>
      }
      {
        openModalEdit &&
        <Modal
        fields={fields}
        data={dataInsumoOnEdit}
        Handlesubmit={onSubmitEdit}
        setOpenModal={setOpenModalEdit}
        >
          <h2>Editar Insumo</h2>
        </Modal>
      }
    </div>
  )
}
