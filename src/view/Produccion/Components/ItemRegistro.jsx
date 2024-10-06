import PropTypes from 'prop-types'

export const ItemRegistro = ({Cantidad, Tipo}) => { 
  const sourceImage = Tipo === 'Leche' ? 'src/assets/img/milkMany.png' : 'src/assets/img/cow.png'
  return (
    <div className='registroItem'>
      <img src={sourceImage} alt={Tipo} />
      <div className='infoRegistro'>
        <span className='resgistroP'>{Cantidad} {Tipo === 'Leche' ? 'Lts' : 'Kgs'}</span>
        <span>{Tipo}</span>
      </div>
    </div>
  )
}

ItemRegistro.propTypes = {
  Cantidad: PropTypes.number,
  Tipo: PropTypes.string
}
