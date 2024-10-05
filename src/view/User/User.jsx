export const User = () => {

  const onClickManual = () => {
    window.location.href = '/manual'
  }

  return (
    <div className="user">

      <button> Editar </button>
      <button onClick={onClickManual}> Manual de Usuario </button>

      <a > Imagen Perfil</a>

      <div className="user-info">
        <p> Nombre: </p>
        <p> Apellido: </p>
        <p> Email: </p>
        <p> Telefono: </p>
      </div>
    </div>
  )
}
