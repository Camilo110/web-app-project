
export const ItemRegistro = ({Cantidad, Fecha, Tipo, Nombre}) => { 
  return (
    <div className='registroItem'>
      <img src='' alt={Tipo} />
      <div className='infoRegistro'>
        <span className='resgistroP'>{Cantidad} {Tipo === 'Leche' ? 'Lts' : 'Kgs'}</span>
        <span>{Fecha.split('T')[0]}</span>
        <span>{Nombre.toString()}</span>
      </div>
    </div>
  )
}
