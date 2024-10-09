import PropTypes from "prop-types"
export const TransaccionItem = ({ID, Fecha, Valor, Producto}) => {
  
  const handleClick = () => {
    console.log(ID)
  }

  return (
    <div className="TransaccionItem" onClick={handleClick}>
      <img src="src/assets/img/positivo.png" alt="icon"/>
      <p> {Fecha} </p>
      <div className="producto-valor">
        <h3> {Producto} </h3>
        <p> $ {Valor} </p>
      </div>      
    </div>

  )
}

TransaccionItem.propTypes = {
  ID: PropTypes.string,
  Fecha: PropTypes.string,
  Valor: PropTypes.number,
  Producto: PropTypes.string,
}


