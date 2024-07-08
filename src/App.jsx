import './styles/App.css' 
import { Aside } from "./components/Aside";
import { ResIndividual } from './view/ResIndividual/ResIndividual';

function App() {
  return (
    <div className="admin">
    <Aside/>
    <ResIndividual id={2}/>
    </div>
   );
}

export default App;