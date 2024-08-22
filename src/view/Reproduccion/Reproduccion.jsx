import {Cards} from './Componets/Cards';
import '../../styles/Reproduccion.css';

export const Reproduccion = () => {
  

  return(
    <div className='raiz'>
      <div className="Footer"> 
        <h1>Registros de reproducción</h1>
        <button> Agregar </button>
      </div> 
      <div className="gestacion"> 
        <h2>Vacas en gestación</h2>
        <div className="cards">
          <Cards Nombre= "Juana" Numero="123" FechaParto="10/12/2023"/>
          <Cards Nombre= "Juana" Numero="123" FechaParto="10/12/2023"/>
          <Cards Nombre= "Juana" Numero="123" FechaParto="10/12/2023"/>
          <Cards Nombre= "Juana" Numero="123" FechaParto="10/12/2023"/>
          <Cards Nombre= "Juana" Numero="123" FechaParto="10/12/2023"/>
          <Cards Nombre= "Juana" Numero="123" FechaParto="10/12/2023"/>
          <Cards Nombre= "Juana" Numero="123" FechaParto="10/12/2023"/>
          <Cards Nombre= "Juana" Numero="123" FechaParto="10/12/2023"/>
          <Cards Nombre= "Juana" Numero="123" FechaParto="10/12/2023"/>
          <Cards Nombre= "Juana" Numero="123" FechaParto="10/12/2023"/>
        </div>
      </div>
      <div className="inseminacion"> 
        <h2>Vacas para inseminación</h2>
        <div className="cards">
          <Cards Nombre= "Juana" Numero="123" FechaParto="10/12/2023"/>
          <Cards Nombre= "Juana" Numero="123" FechaParto="10/12/2023"/>
          <Cards Nombre= "Juana" Numero="123" FechaParto="10/12/2023"/>
        </div>
      </div>
    </div>
  )
}