import PropTypes from "prop-types"
export const TransaccionItem = ({ID, Fecha, Valor, Producto}) => {
  
  const handleClick = () => {
    console.log(ID)
  }

  return (
    <div className="TransaccionItem" onClick={handleClick}>
      <a> Icon</a>
      <h2> {Producto} </h2>
      <p> {Fecha} </p>
      <p> $ {Valor} </p>
    </div>

  )
}

TransaccionItem.propTypes = {
  ID: PropTypes.string,
  Fecha: PropTypes.string,
  Valor: PropTypes.number,
  Producto: PropTypes.string,
}


