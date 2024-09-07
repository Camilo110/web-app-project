import './styles/App.css' 
import {Routes, Route} from 'react-router-dom'
import { Aside } from "./components/Aside";
import { Res } from './pages/Res';
import { ProduccionPage } from './pages/ProduccionPage';
import { Reproduccion } from "./view/Reproduccion/Reproduccion"
import { Servicios } from './view/Servicios/Servicios';
import {Secado} from './pages/Secado';
import {Alimentacion} from './pages/Alimentacion';
import { ResIndividual } from './view/ResIndividual/ResIndividual';

function App() {
  return (
    <>
      <Aside/>

      <main className='containerMain'>
        <Routes>
          <Route path="/" element={<Res/>} />
          <Route path="/res" element={<Res/>} />
          <Route path="/res/:id" element={<ResIndividual/>}/>
          <Route path='produccion' element={<ProduccionPage/>}/>
          <Route path='reproduccion' element={<Reproduccion/>}/>
          <Route path='servicios' element={<Servicios/>}/>
          <Route path='secado' element={<Secado/>}/>
          <Route path='alimentacion' element={<Alimentacion/>}/>

          <Route path="*" element={<div> <h1>Not Found</h1> </div> } />
        </Routes>
      </main>   
    </>
   );
}

export default App;