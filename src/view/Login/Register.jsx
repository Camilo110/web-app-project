import { useState } from "react"

export const Register = () => {
const [email, setEmail] = useState('')
const [name, setName] = useState('')
const [password, setPassword] = useState('')

const onSubmit = () => {
  console.log({email, name, password})
}

  return (
    <div>
      <div className="main">
        <div className="login">
          <div className="login__container">
            <h1>Registro</h1>
            <div>
              <div className="login__container--input">
                <input type="text" placeholder="Nombre" onChange={setName} />
              </div>
              <div className="login__container--input">
                <input type="text" placeholder="Correo"  onChange={setEmail}/>
              </div>
              <div className="login__container--input">
                <input type="password" placeholder="Contraseña" onChange={setPassword} />
              </div>
              <button onClick={onSubmit}>Registrarme</button>
            </div>
            <p>
              Ya tienes una cuenta? <a href="/login">Inicia sesión</a>
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}
