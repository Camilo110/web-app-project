import './styles/App.css' 
import { Aside } from "./components/Aside";
import { ResIndividual } from './view/ResIndividual/ResIndividual';

function App() {
  return (
    <div className="admin">
    <Aside/>
    <ResIndividual/>
    </div>
   );
}

export default App;