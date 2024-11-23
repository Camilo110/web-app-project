import '../../styles/Reproduccion.css';
import { Cards } from '../../components/Cards';
import { Table } from '../../components/Table';
import { Modal } from '../../components/Modal';
import { ModalServicios } from '../../components/ModalServicios';
import { useEffect, useState } from 'react';
import { getAllParaInseminar, getParaInseminarSugeridos, createParaInseminar } from '../../services/paraInseminar';
import { getEnGestacion, getInseminacionPorConfirmar, ConfirmarInseminacion, inseminacionFallida, getPartos } from '../../services/reproduccion';
import { getAllServicioWithInseminacion } from '../../services/servicio';
import { getServiciosModal, getResModal } from '../../services/forms';
import { createRes } from '../../services/res';

const camposRes = {
  Numero: { label: 'Número', type: 'number', value: 0 },
  Nombre: { label: 'Nombre', type: 'text', value: '' },
  Tipo: { label: 'Tipo', type: 'select', value: ['Leche', 'Carne', 'Doble Proposito'] },
  FechaNacimiento: { label: 'Fecha de Nacimiento', type: 'date', value: '' },
  Estado: { label: 'Estado', type: 'select', value: ['Activa', 'Vendida', 'Muerte'] },
  Madre: { label: 'Madre', type: 'select', value: [''] },
  Padre: { label: 'Padre', type: 'select', value: [''] },
  PesoActual: { label: 'Peso Actual', type: 'number', value: 0 },
  PesoNacimiento: { label: 'Peso de Nacimiento', type: 'number', value: 0 },
  Sexo: { label: 'Sexo', type: 'select', value: ['F', 'M'] },
  Raza: { label: 'Raza', type: 'text', value: '' },
  NumeroPartos: { label: 'Número de Partos', type: 'number', value: 0 },
  RegistroICA: { label: 'Registro ICA', type: 'text', value: '' },
  Observaciones: { label: 'Observaciones', type: 'text', value: '' },
  FincaID: { label: 'Finca ID', type: 'select', value: [''] }
};

export const Reproduccion = () => {

  const [dataParaInseminar, setDataParaInseminar] = useState([])
  const [dataParaInseminarSugeridos, setDataParaInseminarSugeridos] = useState([])

  const [tableInseminacion, setTableInseminacion] = useState(true)

  const [openModalParaInseminar, setOpenModalParaInseminar] = useState(false)

  const [openModalCreateServicio, setOpenModalCreateServicio] = useState(false)
  const [openModalEditServicio, setOpenModalEditServicio] = useState(false)

  const [openModalCreateRes, setOpenModalCreateRes] = useState(false)

  const [dataEnGestacion, setDataEnGestacion] = useState([])

  const [dataInseminacionPorConfirmar, setDataInseminacionPorConfirmar] = useState([])

  const [dataServicio, setDataServicio] = useState([])

  const [dataPartos, setDataPartos] = useState([])

  const [listResesForm, setListResesForm] = useState([])

  const [fieldsRes, setFieldsRes] = useState(camposRes)

  const [valuesOnAddParto, setValuesOnAddParto] = useState({})
  const [valuesOnAddServicio, setValuesOnAddServicio] = useState({})
  const [onAddParaInseminar, setOnAddParaInseminar] = useState({})

  const [idResEditServicio, setIdResEditServicio] = useState('')


  useEffect(() => {
    const fetchData = async () => {
      const ParaInseminar = await getAllParaInseminar()
      setDataParaInseminar(ParaInseminar)
      
      const ParaInseminarSugeridos = await getParaInseminarSugeridos()
      setDataParaInseminarSugeridos(ParaInseminarSugeridos)

      const EnGestacion = await  getEnGestacion()
      setDataEnGestacion(EnGestacion)

      const InseminacionPorConfirmar = await getInseminacionPorConfirmar()
      setDataInseminacionPorConfirmar(InseminacionPorConfirmar)

      const servicios = await getAllServicioWithInseminacion()
      setDataServicio(servicios)

      const partos = await getPartos()
      setDataPartos(partos)
    }
    fetchData()
  }
    , [])

  

  const showTableInseminacion = () => {
    setTableInseminacion(true)
  }

  const showTableParto = () => {
    setTableInseminacion(false)
  }

  const openModalCreateServicioGestacion = async (data) => {
    const {fincas, madres, padres } = await getResModal();
    setFieldsRes({
      ...fieldsRes,
      FincaID: { label: 'Finca', type: 'select', value: fincas },
        Madre: { label: 'Madre', type: 'select', value: madres },
        Padre: { label: 'Padre', type: 'select', value: padres }
    })

    setValuesOnAddParto({Madre: data.ResID, FechaNacimiento: new Date().toISOString().split('T')[0], Padre:data.ToroID})
    setOpenModalCreateRes(true)
    
  }

  const openModalAborto = (data) => {
    setValuesOnAddServicio({ID: data.ResID, Tipo: 'Aborto', Fecha: new Date().toISOString().split('T')[0], ResID: data.ResID})
    setOpenModalCreateServicio(true)
  }

  const InsemiancionFallida = (id) => {
    inseminacionFallida(id)
  }
  const InseminacionCorrecta = (id) => {
    ConfirmarInseminacion(id)
  }

  const onOpenModalParaInseminar = async (data) => {
    if (data){
      setOnAddParaInseminar({ResID: data.ID, Fecha: new Date().toISOString().split('T')[0]})
    }
    const reses = await getServiciosModal()
    setListResesForm(reses)
    setOpenModalParaInseminar(true)
  }


  const ModalSubmitCreateRes = async (values) => {
    const resp = await createRes(values)
    console.log(resp + "CREATE RES")
  }

  const onAddInseminacion = (data) => {
    setValuesOnAddServicio(data)
    setOpenModalCreateServicio(true)
  }

  const HandleCreateParaEnseminar = async (values) => {
    await createParaInseminar(values)
  }
  
  const onOpenModalEditServicio = (id) => {
    setIdResEditServicio(id)
    setOpenModalEditServicio(true)
  }
    



  return (
    <div className='raiz'>
      <div className="Footer">
        <h1>Registros de reproducción</h1>
        <div className='BotonesPrincipales'>
          <button onClick={() => onOpenModalParaInseminar({Fecha: new Date().toISOString().split('T')[0]})}> Programar Inseminación </button>
          <button onClick={()=>setOpenModalCreateServicio(true)}> Registrar Inseminación </button>
        </div>
      </div>

      <div className="inseminacion">
        <h2>Vacas para inseminación</h2>
        {
          dataParaInseminar.length > 0 &&
        <div className="cards">
          {
          dataParaInseminar.map((item) => (
            <Cards 
              key={item.ID}
              ResID={item.ResID}
              Nombre={item.ResNombre}
              Estado={item.Estado}
              Fecha={item.Fecha}
              onAffirmative={() => onAddInseminacion({ResID: item.ResID, Fecha: new Date().toISOString().split('T')[0]})}
              affirmativeToolTipText={'Registrar Inseminación'}
              />
          ))
          }
          {
            dataParaInseminarSugeridos.map((item) => (
              <Cards 
              key={item.ID}
              ResID={item.ID}
              Nombre={item.ResNombre}
              Estado={'Sugerido'}
              Fecha={'Sin Confirmar'}
              isRecomendacion={true}
              onAffirmative={() => onOpenModalParaInseminar(item)}
              affirmativeToolTipText={'Registrar Inseminación'}
              />
            ))
          }
        </div>
        }
      </div>

      <div className="inseminacionPorConfirmar">
        <h2>Inseminacion por Confirmar</h2>
        {
          dataInseminacionPorConfirmar.length > 0 &&
          <div className="cards">
          {
          dataInseminacionPorConfirmar.map((item) => (
              <Cards
                key={item.ID}
                ResID={item.ResID}
                Nombre={item.ResNombre}
                Estado={'Por Confirmar'}
                FechaParto={item.FechaParto}
                onAffirmative={() => InseminacionCorrecta(item.ID)}
                affirmativeToolTipText={'Confirmar Inseminación'}
                onNegative={() => InsemiancionFallida(item.ID)}
                negativeToolTipText={'Inseminación Fallida'}
                />
          ))
        }
        </div>
        }
      </div>

      <div className="gestacion">
        <h2>Vacas en gestación</h2>
        <div className="cards">
          {
            dataEnGestacion.map((item) => (
              <Cards 
              key={item.ResID}
              ResID={item.ResID}
              Nombre={item.ResNombre}
              Estado={'En Gestacion'}
              FechaParto={item.FechaParto}
              onAffirmative={() => openModalCreateServicioGestacion(item)}
              affirmativeToolTipText={'Registrar Parto'}
              onNegative={() => openModalAborto(item)}
              negativeToolTipText={'Registrar Aborto'}
              />
            ))
          }
        </div>
      </div>

      <p className='ver-opciones'>
        Ver:
        <span
          onClick={showTableInseminacion}
          style={{
            margin: '10px',
            cursor: 'pointer',
            fontWeight: tableInseminacion ? 'BOLD' : 'normal',
            textDecoration: tableInseminacion ? 'underline' : 'none'
          }}
        >
          Inseminaciones
        </span>
        <span
          onClick={showTableParto}
          style={{
            cursor: 'pointer',
            fontWeight: tableInseminacion ? 'normal' : 'BOLD' ,
            textDecoration: tableInseminacion ? 'none' : 'underline'
          }}
        >
          Partos
        </span>
      </p>


      {tableInseminacion
        ?
        <Table
          HeaderList={['Nombre', 'Numero', 'Fecha', 'Producto']}
          keyList={['ResNombre', 'Numero', 'Fecha', 'listInsumos']}
          data={dataServicio}
          onEdit={onOpenModalEditServicio}
          enableDelete={false}
        />
        :
        <Table
          HeaderList={['Nombre', 'Numero', 'Fecha', 'Hijo']}
          keyList={['ResNombre', 'Numero', 'FechaParto', 'HijoNombre']}
          data={dataPartos}
          edit={false}
          enableDelete={false}
        />
      }

      {openModalParaInseminar &&
        <Modal
          fields={{
            Fecha: { label: 'Fecha', type: 'date' },
            ResID: { label: 'Nombre de Res', type: 'select', value: listResesForm },
            Observaciones: { label: 'Observaciones', type: 'textarea' }
          }}
          columns={1}
          data={onAddParaInseminar}
          Handlesubmit={HandleCreateParaEnseminar}
          setOpenModal={setOpenModalParaInseminar}
          includeDataInSubmit={true}
        >
          <h2>Programar fecha de Inseminación</h2>
        </Modal>
      }
      {
        openModalCreateServicio &&
        <ModalServicios
          isInseminacion={true}
          setOpenModal={setOpenModalCreateServicio}
          previewData={valuesOnAddServicio}
        />
      }
      {
        openModalEditServicio &&
        <ModalServicios
          isEdit={true}
          isInseminacion={true}
          setOpenModal={setOpenModalEditServicio}
          idServicio={idResEditServicio}
        />
      }
      {openModalCreateRes &&
          <Modal 
            Handlesubmit={ModalSubmitCreateRes} 
            fields={fieldsRes} 
            data={valuesOnAddParto} 
            setOpenModal={setOpenModalCreateRes}
            includeDataInSubmit={true}
          >
            <h3>Editar Res</h3>
         </Modal>}
      
    </div>
  )
}