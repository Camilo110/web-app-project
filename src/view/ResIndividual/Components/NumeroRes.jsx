import PropTypes from "prop-types"
import { getResById } from "../../../services/res";
import { useState } from "react";
import { useEffect } from "react";

const colorByTipo = {
  Leche: 'red',
  Carne: 'blue',
  Novillo: 'green',
  Ternero: 'yellow'
}

export const NumeroRes = ({id, numero, tipo}) => {

  const [tipoRes, setTipoRes] = useState(tipo);

  useEffect(() => {
    if (tipo){
      getTipo();
    }
  }, [])

  const getTipo = async () => {
    const {Tipo} = await getResById(id);
    setTipoRes(Tipo);
  }

  return (
    <div style={{backgroundColor: colorByTipo[tipoRes]}}>
        {numero}
    </div>
  )
}
NumeroRes.propTypes = {
  id: PropTypes.string.isRequired,
  tipo: PropTypes.string,
  numero: PropTypes.number.isRequired
}
