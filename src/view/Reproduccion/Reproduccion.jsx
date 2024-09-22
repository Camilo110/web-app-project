import '../../styles/Reproduccion.css';
import { Cards } from '../../components/Cards';
import { Table } from '../../components/Table';
import { Modal } from '../../components/Modal';
import { ModalServicios } from '../../components/ModalServicios';
import { useEffect, useState } from 'react';
import { getAllParaInseminar } from '../../services/paraInseminar';
import { getEnGestacion, getInseminacionPorConfirmar, ConfirmarInseminacion, inseminacionFallida } from '../../services/reproduccion';

export const Reproduccion = () => {

  const [dataParaInseminar, setDataParaInseminar] = useState([])
  const [dataParaInseminarSugeridos, setDataParaInseminarSugeridos] = useState([])

  const [tableInseminacion, setTableInseminacion] = useState(true)

  const [openModalFechaParto, setOpenModalFechaParto] = useState(false)

  const [openModalCreateServicio, setOpenModalCreateServicio] = useState(false)
  const [openModalEditServicio, setOpenModalEditServicio] = useState(false)

  const [dataEnGestacion, setDataEnGestacion] = useState([])

  const [dataInseminacionPorConfirmar, setDataInseminacionPorConfirmar] = useState([])


  useEffect(() => {
    const fetchData = async () => {
      const ParaInseminar = await getAllParaInseminar()
      setDataParaInseminar(ParaInseminar)
      
      const ParaInseminarSugeridos = await getAllParaInseminar()
      setDataParaInseminarSugeridos(ParaInseminarSugeridos)

      const EnGestacion = await  getEnGestacion()
      setDataEnGestacion(EnGestacion)

      const InseminacionPorConfirmar = await getInseminacionPorConfirmar()
      setDataInseminacionPorConfirmar(InseminacionPorConfirmar)
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

  const openModalCreateServicioGestacion = () => {
    setOpenModalCreateServicio(true)
  }

  const openModalAborto = () => {
    setOpenModalCreateServicio(true)
  }

  const InsemiancionFallida = (id) => {
    inseminacionFallida(id)
  }


  return (
    <div className='raiz'>
      <div className="Footer">
        <h1>Registros de reproducción</h1>
        <div className='BotonesPrincipales'>
          <button onClick={()=>setOpenModalFechaParto(true)}> Programar Inseminación </button>
          <button onClick={()=>setOpenModalCreateServicio(true)}> Registrar Inseminación </button>
        </div>
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
              onAffirmative={openModalCreateServicioGestacion}
              affirmativeToolTipText={'Registrar Parto'}
              onNegative={openModalAborto}
              negativeToolTipText={'Registrar Aborto'}
              />
            ))
          }
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
              onAffirmative={()=>setOpenModalCreateServicio(true)}
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
              onAffirmative={()=>setOpenModalCreateServicio(true)}
              affirmativeToolTipText={'Registrar Inseminación'}
              />
            ))
          }
        </div>
        }
      </div>

      <div className="inseminacion">
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
                onAffirmative={() => ConfirmarInseminacion(item.ID)}
                affirmativeToolTipText={'Confirmar Inseminación'}
                onNegative={() => InsemiancionFallida(item.ID)}
                negativeToolTipText={'Inseminación Fallida'}
                />
          ))
        }
        </div>
        }
      </div>

      <p>
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
          keyList={['Nombre', 'Numero', 'Fecha', 'Producto']}
          data={[{ID: '00000000-0000-0000-0000-000000000001', Nombre: 'Juana', Numero: 12, Fecha: '10/12/2023', Producto: 'Producto' },]}
          onEdit={() => setOpenModalEditServicio(true)}
          onDelete={() => console.log('')}
        />
        :
        <Table
          HeaderList={['Nombre', 'Numero', 'Fecha', 'Hijo']}
          keyList={['Nombre', 'Numero', 'Fecha', 'Hijo']}
          data={[{ID: '00000000-0000-0000-0000-000000000001', Nombre: 'Juana', Numero: '123', Fecha: '10/12/2023', Hijo: 'Hijo' },]}
          edit={false}
          enableDelete={false}
        />
      }

      {openModalFechaParto &&
        <Modal
          fields={{
            Fecha: { label: 'Fecha', type: 'date' },
            ResID: { label: 'Nombre de Res', type: 'select', value: [{ ID: 1, value: 'Juana' }, { ID: 2, value: 'Pepa' }] },
            Observaciones: { label: 'Observaciones', type: 'textarea' }
          }}
          columns={1}
          data={{ Fecha: '', ResID: '', Observaciones: '' }}
          Handlesubmit={(values) => console.log(values)}
          setOpenModal={setOpenModalFechaParto}
        >
          <h2>Programar fecha de Inseminación</h2>
        </Modal>
      }
      {
        openModalCreateServicio &&
        <ModalServicios
          isInseminacion={true}
          setOpenModal={setOpenModalCreateServicio}
        />
      }
      {
        openModalEditServicio &&
        <ModalServicios
          isEdit={true}
          isInseminacion={true}
          setOpenModal={setOpenModalEditServicio}
          idServicio={'00000000-0000-0000-0000-000000000001'}
        />
      }
      
    </div>
  )
}