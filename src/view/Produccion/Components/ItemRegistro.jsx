import PropTypes from 'prop-types'

export const ItemRegistro = ({Cantidad, Fecha, Tipo, Nombre}) => { 
  const sourceImage = Tipo === 'Leche' ? 'src/assets/img/milkMany.png' : 'src/assets/img/cow.png'
  return (
    <div className='registroItem'>
      <img src={sourceImage} alt={Tipo} />
      <div className='infoRegistro'>
        <span className='resgistroP'>{Cantidad} {Tipo === 'Leche' ? 'Lts' : 'Kgs'}</span>
        <span>{Fecha.split('T')[0]}</span>
        <span>{Nombre.toString()}</span>
      </div>
    </div>
  )
}

ItemRegistro.propTypes = {
  Cantidad: PropTypes.string,
  Fecha: PropTypes.string,
  Tipo: PropTypes.string,
  Nombre: PropTypes.string
}
