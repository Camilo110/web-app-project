import '../../styles/Secado.css'
import { useEffect, useState } from "react"
import { Cards } from "../../components/Cards"
import { Table } from "../../components/Table"
import { getAllSecado } from "../../services/servicio"
import { getParaSecado } from "../../services/reproduccion"
import {ModalServicios} from "../../components/ModalServicios"
export const Secado = () => {

  const [dataSecados, setDataSecados] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const [paraSecar, setParaSecar] = useState([])

  const [openModalCreateServicio, setOpenModalCreateServicio] = useState(false)
  const [openModalEditServicio, setOpenModalEditServicio] = useState(false)

  const [valuesOnAddServicio, setValuesOnAddServicio] = useState({})
  const [idServicioEdit, setIdServicioEdit] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllSecado()
      setDataSecados(response)

      const response2 = await getParaSecado ()
      setParaSecar(response2)

      setIsLoading(false)
    }
    fetchData()
  } , [])

  const addSecado = (id) => {
    setValuesOnAddServicio({
      ResID: id,
      Tipo: 'Secado',
      Fecha: new Date().toISOString().split('T')[0]
    })
    setOpenModalCreateServicio(true)
  }

  return (
    <div className='raiz'>

      <div className="Footer-Secado">
        <h1>Secado</h1>
        <div>
          <button onClick={() => addSecado('')}>Agregar</button>
        </div>
      </div>

      <div className="gestacion">
        <h2>Vacas Para Secar</h2>
        <div className="cards">
          {
            paraSecar.map((item) => {
              return (
                <Cards
                  key={item.ResID}
                  ResID={item.ResID}
                  Nombre={item.ResNombre}
                  Estado={'En Gestación'}
                  diasGestacion={item.DiasGestacion}
                  FechaParto={item.FechaParto}
                  onAffirmative={() => addSecado(item.ResID)}
                  affirmativeToolTipText='Agregar a secado'
                />
              )
            })
          }
        </div>
      </div>

      {isLoading 
        ?
        <h3>Cargando...</h3>
        :
        <Table
          HeaderList={['Numero', 'Tipo',  'Fecha',  'Veterinario', 'Nombre Res']}
          data={ dataSecados }
          keyList={ ['Numero', 'Tipo', 'Fecha', 'Veterinario', 'ResNombre'] }
          onEdit={(id) => {
            setIdServicioEdit(id)
            setOpenModalEditServicio(true)
          }}
          enableDelete={false}
        />
      }
      {
        openModalCreateServicio &&
        <ModalServicios
          setOpenModal={setOpenModalCreateServicio}
          previewData={valuesOnAddServicio}
          isSecado={true}
        />
      }
      {
        openModalEditServicio &&
        <ModalServicios
          isEdit={true}
          setOpenModal={setOpenModalEditServicio}
          idServicio={idServicioEdit}
        />
      }
    </div>
  )
}
