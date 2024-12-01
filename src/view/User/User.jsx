import '../../styles/User.css'

export const User = () => {

  const onClickManual = () => {
    window.location.href = '/manual'
  }

  return (
    <div className="user">
      <h1>Perfil de Usuario</h1>
      <div className="user-content">
        <div className="user-image">
          <img src="https://www.w3schools.com/howto/img_avatar.png" alt="user"/>
        </div>        
        <div className="user-info">
          <p><strong>Tipo:</strong> Administrador</p>
          <p><strong>Identificación:</strong> 1.112.457.201</p>
          <p><strong>Nombre:</strong> Juan Ramirez</p>
          <p><strong>Dirección:</strong> Calle 25 # 12-29</p>
          <p><strong>Email:</strong> juan@gmail.com</p>
          <p><strong>Teléfono:</strong> 3204789564</p>
        </div>
        <button> Editar </button>
      </div>
      <div className="manual-usuario">
      <button onClick={onClickManual}> Manual de Usuario </button>
      </div>
    </div>
  )
}



