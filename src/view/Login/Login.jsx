import '../../styles/Login.css';
import { useState } from "react"

export const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = () => {
    console.log({ email, password })
  }

  return (
    <div className="login">
      <div className="login__container">
        <div className="login__logo">
          <img src="src/assets/img/logo.png" alt="logo" />
        </div>
        <h1>Iniciar Sesión</h1>
        <div className="login__campos">
          <div className="login__container--input">
            <p>Correo</p>
            <input type="text" placeholder="Correo" onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="login__container--input">
            <p>Contraseña</p>
            <input type="password" placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button onClick={onSubmit}>Iniciar Sesión</button>
        </div>
        <p>
          No tienes una cuenta? <a href="/register">Regístrate</a>
        </p>
      </div>
    </div>
  );
}