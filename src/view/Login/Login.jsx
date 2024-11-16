import { useState } from "react"

export const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = () => {
   console.log({email, password})
  }

  return (
    <div>
      <div className="main">
        <div className="login">
          <div className="login__container">
            <h1>Iniciar Sesion</h1>
            <div>
              <div className="login__container--input">
                <input type="text" placeholder="Correo"  onChange={setEmail}/>
              </div>
              <div className="login__container--input">
                <input type="password" placeholder="Contraseña" onChange={setPassword} />
              </div>
              <button onClick={onSubmit}>Iniciar Sesion</button>
            </div>
            <p>
              No tienes una cuenta? <a href="/register">Registrate</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}