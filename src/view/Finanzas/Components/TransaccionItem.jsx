import PropTypes from "prop-types"
export const TransaccionItem = ({item: {ID, Fecha, Valor, Producto, Tipo}}) => {
  
  const handleClick = () => {
    console.log(ID)
  }

  return (
    <div className="TransaccionItem" onClick={handleClick}>
      <img 
        src={(Tipo == "Ingreso") ? "src/assets/img/positivo.png" : "src/assets/img/negativo.png"}
        alt="icon"
      />
      <p> {Fecha} </p>
      <div className="producto-valor">
        <h3> {Producto} </h3>
        <p> $ {Valor} </p>
      </div>      
    </div>

  )
}

TransaccionItem.propTypes = {
  item : PropTypes.shape({
    ID: PropTypes.string,
    Fecha: PropTypes.string,
    Valor: PropTypes.string,
    Producto: PropTypes.string,
    Tipo: PropTypes.string
  })
}


