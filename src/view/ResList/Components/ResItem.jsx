import { deleteRes } from "../../../services/res";

// eslint-disable-next-line react/prop-types
export function ResItem({res : {ID, Numero, Nombre,NumeroPartos}, setOpenModal}) {


  const HandleClick = () => {
    console.log('ver mas...')
    //redireccionar a la vista individual
  }
  const HandleDelete = () => {
    deleteRes(ID);
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
            <div className="id">{Numero}</div>
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
