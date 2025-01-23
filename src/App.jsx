import './styles/App.css' 
import {Routes, Route, useLocation} from 'react-router-dom'
import { Aside } from "./components/Aside";
import { Res } from './pages/Res';
import { ProduccionPage } from './pages/ProduccionPage';
import { Reproduccion } from "./view/Reproduccion/Reproduccion"
import { Servicios } from './view/Servicios/Servicios';
import { Secado } from './view/Secado/Secado';
import { Alimentacion } from './pages/Alimentacion';
import { ResIndividual } from './view/ResIndividual/ResIndividual';
import { Insumos } from './view/Insumos/Insumos';
import { Fincas } from './view/Finca/Fincas';
import { User } from './view/User/User';
import { Finanzas } from './view/Finanzas/Finanzas';
import { Manual } from './view/User/Manual';
import { Login } from './view/Login/Login';
import { Register } from './view/Login/Register';
import { Dashboard } from './view/Dashboard/Dashboard';
import { Toaster } from 'react-hot-toast';
import { ProtectedRoute } from './pages/ProtectedRoute';

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
          <Route path="/" element={<ProtectedRoute element={<Dashboard />} />} />
          <Route path="/res" element={<ProtectedRoute element={<Res />} />} />
          <Route path="/res/:id" element={<ProtectedRoute element={<ResIndividual />} />} />
          <Route path="/produccion" element={<ProtectedRoute element={<ProduccionPage />} />} />
          <Route path="/reproduccion" element={<ProtectedRoute element={<Reproduccion />} />} />
          <Route path="/servicios" element={<ProtectedRoute element={<Servicios />} />} />
          <Route path="/secado" element={<ProtectedRoute element={<Secado />} />} />
          <Route path="/alimentacion" element={<ProtectedRoute element={<Alimentacion />} />} />
          <Route path="/insumos" element={<ProtectedRoute element={<Insumos />} />} />
          <Route path="/fincas" element={<ProtectedRoute element={<Fincas />} />} />
          <Route path="/user" element={<ProtectedRoute element={<User />} />} />
          <Route path="/finanzas" element={<ProtectedRoute element={<Finanzas />} />} />
          <Route path="/manual" element={<ProtectedRoute element={<Manual />} />} />
          <Route path="*" element={<div><h1>Not Found</h1></div>} />
        </Routes>
        <div><Toaster/></div>
      </main>
      </div>   
    </>
   );
}

export default App;