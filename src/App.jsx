import './styles/App.css' 
import {Routes, Route} from 'react-router-dom'
import { Aside } from "./components/Aside";
import { ResList } from './view/ResList/ResList';
import { ResIndividual } from './view/ResIndividual/ResIndividual';

function App() {
  return (
    <div className="admin">
    <Aside/>

      <Routes>
        <Route path="/listares" element={<ResList/>} />
        <Route path="/res/:id" element={<ResIndividual/>}/>
      </Routes>
      
    </div>
   );
}

export default App;