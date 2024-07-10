import { Link } from "react-router-dom";
import { deleteRes } from "../../../services/res";

// eslint-disable-next-line react/prop-types
export function ResItem({res : {ID: id, Numero, Nombre,NumeroPartos}, setOpenModal}) {


  const HandleClick = () => {
    console.log('ver mas...')
    //redireccionar a la vista individual
  }
  const HandleDelete = () => {
    deleteRes(id);
  }
  
  const HandleEdit = () => {
    setOpenModal(true)
  } 

  return ( 
  <div className="card">
        <img onClick={HandleClick} src="https://fakeimg.pl/250x135" alt="Cow Image"/>
        <section className="card-info">
          <div onClick={HandleClick} className="especial">
            <h2>{Nombre}</h2>
            <Link to={`/res/${Numero}`} className="id"> {Numero} </Link>
          </div>
            <p>N° Partos: {NumeroPartos}</p>
            <p>Promedio leche (diaria): 19 lts</p>
            <p>Ubicación: Lote 2</p>
            <div className="actions">
                <button onClick={HandleDelete} className="delete">❌</button>
                <button onClick={HandleEdit} className="edit">✏️</button>
            </div>
        </section>
  </div> 
  );
}
