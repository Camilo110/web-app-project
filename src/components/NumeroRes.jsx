import PropTypes from "prop-types"
import { getResById } from "../services/res";
import { useState } from "react";
import { useEffect } from "react";

const colorByTipo = {
  Leche: '#EBD24B',
  Carne: '#DE3C34',
  'Doble Proposito': '#307CEB'
}

export const NumeroRes = ({id, numero, tipo}) => {

  const [tipoRes, setTipoRes] = useState(tipo)
  const [numeroRes, setNumeroRes] = useState(numero)

  useEffect(() => {
    if (!tipo || !numero) {
      getTipo();
    }
  }, [])

  const getTipo = async () => {
    const {Tipo, Numero} = await getResById(id);
    setNumeroRes(Numero);
    setTipoRes(Tipo);
  }

  return (
    <div className='resNumero' style={{backgroundColor: colorByTipo[tipoRes]}}>
        {numeroRes}
    </div>
  )
}
NumeroRes.propTypes = {
  id: PropTypes.string.isRequired,
  tipo: PropTypes.string,
  numero: PropTypes.number
}
