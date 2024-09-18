import '../../styles/Secado.css'
import { useEffect, useState } from "react"
import { Cards } from "../../components/Cards"
import { Table } from "../../components/Table"
export const Secado = () => {

  const [dataSecados, setDataSecados] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:4000/servicio')
      const {body} = await response.json()
      setDataSecados(body)
      setIsLoading(false)
      console.log(body)
    }
    fetchData()
  } , [])

  return (
    <div className='raiz'>

      <div className="Footer-Secado">
        <h1>Secado</h1>
        <div>
          <button >Agregar</button>
        </div>
      </div>

      <div className="gestacion">
        <h2>Vacas en gestación</h2>
        <div className="cards">
          <Cards Nombre="Juana" Numero="123" FechaParto="10/12/2023" />
          <Cards Nombre="Juana" Numero="123" FechaParto="10/12/2023" />
          <Cards Nombre="Juana" Numero="123" FechaParto="10/12/2023" />
          <Cards Nombre="Juana" Numero="123" FechaParto="10/12/2023" />
          <Cards Nombre="Juana" Numero="123" FechaParto="10/12/2023" />
          <Cards Nombre="Juana" Numero="123" FechaParto="10/12/2023" />
          <Cards Nombre="Juana" Numero="123" FechaParto="10/12/2023" />
          <Cards Nombre="Juana" Numero="123" FechaParto="10/12/2023" />
          <Cards Nombre="Juana" Numero="123" FechaParto="10/12/2023" />
          <Cards Nombre="Juana" Numero="123" FechaParto="10/12/2023" />
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
        />
      }
    </div>
  )
}
