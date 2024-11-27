import './styles/App.css' 
import {Routes, Route, useLocation} from 'react-router-dom'
import { Aside } from "./components/Aside";
import { Res } from './pages/Res';
import { ProduccionPage } from './pages/ProduccionPage';
import { Reproduccion } from "./view/Reproduccion/Reproduccion"
import { Servicios } from './view/Servicios/Servicios';
import {Secado} from './view/Secado/Secado';
import {Alimentacion} from './pages/Alimentacion';
import { ResIndividual } from './view/ResIndividual/ResIndividual';
import { Insumos } from './view/Insumos/Insumos';
import { Fincas } from './view/Finca/Fincas';
import { User } from './view/User/User';
import { Finanzas } from './view/Finanzas/Finanzas';
import { Manual } from './view/User/Manual';
import { Login } from './view/Login/Login';
import { Register } from './view/Login/Register';

function App() {

  const location = useLocation();

  // Define las rutas en las que no quieres mostrar el Aside
  const noAsideRoutes = ['/login', '/register'];

  return (
    <>
      {/* Renderiza el Aside solo si la ruta actual no está en noAsideRoutes */}
      <div className={noAsideRoutes.includes(location.pathname) ? 'no-aside-container' : 'container'}>
      {!noAsideRoutes.includes(location.pathname) && <Aside />}
      <main className="containerMain">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Res />} />
          <Route path="/res" element={<Res />} />
          <Route path="/res/:id" element={<ResIndividual />} />
          <Route path="/produccion" element={<ProduccionPage />} />
          <Route path="/reproduccion" element={<Reproduccion />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/secado" element={<Secado />} />
          <Route path="/alimentacion" element={<Alimentacion />} />
          <Route path="/insumos" element={<Insumos />} />
          <Route path="/fincas" element={<Fincas />} />
          <Route path="/user" element={<User />} />
          <Route path="/finanzas" element={<Finanzas />} />
          <Route path="/manual" element={<Manual />} />
          <Route path="*" element={<div><h1>Not Found</h1></div>} />
        </Routes>
      </main>
      </div>   
    </>
   );
}

export default App;