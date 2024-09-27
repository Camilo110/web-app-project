import { Link } from "react-router-dom";
import { useEffect } from 'react';
import { NumeroRes } from '../../../components/NumeroRes';

// eslint-disable-next-line react/prop-types
export function ResItem({res : {ID: id, Numero, Nombre, Tipo, NumeroPartos, FincaNombre}}) {

  useEffect(() => {
    }, [])
  
  return ( 
  <div className="card">
        
        <Link to={`/res/${id}`}>
          <img  style={{width:'300px', height:'180px'}} src={`http://localhost:4000/imagen/id/${id}`} alt="Cow Image"/>
        </Link>
       

        <section className="card-info">
        <Link to={`/res/${id}`} className="link">  

          <div className="especial">
              <h2>{Nombre}</h2>
              <NumeroRes id={id} numero={Numero} tipo={Tipo} />
          </div>

            <p>N° Partos: {NumeroPartos}</p>
            <p>Promedio leche (diaria): 19 lts</p>
            <p>Ubicación: {FincaNombre}</p>
            <p>Peso Actual: 500kg</p>
            <p>Raza: Holstein</p>
            <p>Tipo: {Tipo}</p>
        </Link>
        </section>
  </div> 
  );
}