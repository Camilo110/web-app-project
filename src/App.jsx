import './styles/App.css' 
import { Aside } from "./components/Aside";
import { ResList } from './view/ResList/ResList';

function App() {
  return (
    <div className="admin">
    <Aside/>
    <ResList/>
    </div>
   );
}

export default App;