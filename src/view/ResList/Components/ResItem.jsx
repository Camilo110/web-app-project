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

            <p> <b>N° Partos:</b> {NumeroPartos}</p>
            <p> <b>Promedio leche (diaria):</b> 19 lts</p>
            <p> <b>Ubicación:</b> {FincaNombre}</p>
            <p> <b>Peso Actual:</b> 500kg</p>
            <p> <b>Raza:</b> Holstein</p>
            <p> <b>Tipo:</b> {Tipo}</p>
        </Link>
        </section>
  </div> 
  );
}