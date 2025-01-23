import '../../styles/Login.css';
import { useState } from "react"
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const onSubmit = async () => {
    console.log("user", email, password)
    try {
      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Email: email, Contrasena: password }),
      });
      const data = await response.json();
      if (data.token) {
        localStorage.setItem('token', data.token);
        navigate('/');
      } else {
        alert('Error de autenticación');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Error de autenticación');
    }
  };

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