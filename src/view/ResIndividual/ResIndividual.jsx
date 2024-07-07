import './ResIndividual.css'
import { useEffect } from "react"
import { getResById } from "../../services/res"
import { useState } from "react"

export function ResIndividual({id = 2}){

  const [res, setRes] = useState({})

  useEffect(() => {
    getResById(id).then((res) => {
      setRes(res)
    })
  }, [])  

    //TODO metodo para mostrar linaje

    return (
      <div>
      <p>volver a la lista</p>

      <div className='SectionOne'>
        <div>
          <p>{res.Numero}</p>
          <h2>{res.Nombre}</h2>
        </div>

        <div>
          <p>borrar</p>
          <p>editar</p>
          <p>tomar foto</p>
        </div>
      </div>

      <main>
      <div>
        <img src="https://fakeimg.pl/450x350" alt="Cow Image"/>

        <div className='listImg'>
          <img src="https://fakeimg.pl/100x80" alt="Cow Image"/>
          <img src="https://fakeimg.pl/100x80" alt="Cow Image"/>
          <img src="https://fakeimg.pl/100x80" alt="Cow Image"/>
          <img src="https://fakeimg.pl/100x80" alt="Cow Image"/>
        </div>
      </div>

        { res.Sexo === 'F' ?
          <div>
            <p>Promedio de leche diaria: NUM</p>
            <p>Número de partos: {res.NumeroPartos} </p>
            <p>Ubicación: LOTE 2</p>
            <p>Estado: {res.Estado}</p>
            <p>Peso al Nacer: {res.PesoNacimiento} Kg</p>
            <p>Peso Actual: {res.PesoActual} Kg</p>
          </div>
        :
        <div>
            <p>Cantidad de Hijos: NUM</p>
            <p>Ubicación: LOTE 2</p>
            <p>Edad: {res.FechaNacimiento} </p>
            <p>Estado: {res.Estado}</p>
            <p>Peso al Nacer: {res.PesoNacimiento} Kg</p>
            <p>Peso Actual: {res.PesoActual} Kg</p>
          </div>
        }
        </main>



      <div>
        <h3>Linaje</h3>
        <div>
          lista de tarjetas con los padres
        </div>
      </div>

      { res.Sexo === 'F' &&
      <div>
        <h3> Registros de Produccion</h3>
         <p>CUADRO CON ESTADISTAS DE PRODUCCION</p>
      </div> }

      <div>
        <p>ADD BUTTON COMPONENT</p>
        <h3>Linaje</h3>
        <div>
          lista de tarjetas con los registros
        </div>
      </div>


      </div>
    )
}

