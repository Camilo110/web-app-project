import '../../styles/Register.css';
import { useState } from "react"

export const Register = () => {
const [email, setEmail] = useState('')
const [name, setName] = useState('')
const [password, setPassword] = useState('')

const onSubmit = () => {
  console.log({email, name, password})
}

return (
  <div className="login">
    <div className="login__container">
      <div className="login__logo">
        <img src="src/assets/img/logo.png" alt="logo" />
      </div>
      <h1>Registro</h1>
      <div className="login__campos">
        <div className="login__container--input">
          <p>Nombre</p>
          <input type="text" placeholder="Nombre" onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="login__container--input">
          <p>Correo</p>
          <input type="text" placeholder="Correo" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="login__container--input">
          <p>Contraseña</p>
          <input type="password" placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button onClick={onSubmit}>Registrarme</button>
      </div>
      <p>
        Ya tienes una cuenta? <a href="/login">Inicia sesión</a>
      </p>
    </div>
  </div>
);
}
