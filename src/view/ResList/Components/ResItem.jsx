

// eslint-disable-next-line react/prop-types
export function ResItem({res : {Numero, Nombre,NumeroPartos}}) {


  const HandleClick = () => {
    //redireccionar a la vista individual
  }
  const onDelete = () => {
    //eliminar el animal
  }
  
  const onEdit = () => {
    //redireccionar a la vista de edición
  } 

  return ( 
  <>
  <div className="card"
    onClick={HandleClick}>
        <img src="https://fakeimg.pl/250x135" alt="Cow Image"/>
        <section className="card-info">
          <div className="especial">
            <h2>Nombre: {Nombre}</h2>
            <div className="id">{Numero}</div>
          </div>
            <p>N° Partos: {NumeroPartos}</p>
            <p>Promedio leche (diaria): 19 lts</p>
            <p>Ubicación: Lote 2</p>
            <div className="actions">
                <button onClick={onDelete} className="delete">❌</button>
                <button onClick={onEdit} className="edit">✏️</button>
            </div>
        </section>
    </div>
  </> 
  );
}
