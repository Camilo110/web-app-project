import { CardDashboard } from "../../components/CardDashboard";
import {ProductionChart} from  "./Componentes/ProduccionGrafico";
import { GraficoTorta } from "./Componentes/GraficoTorta";

export function Dashboard() {
  return (
    <div className="dashboardMain">
      <div className="header">
        <h1>Dashboard</h1>
        <div className="fechas">
          <div className="inicio">
            <p>Inicio</p>
            <input type="date" id="start" name="start" />
          </div>
          <div className="fin">
            <p>Fin</p>
            <input type="date" id="end" name="end" />
          </div>
        </div>
      </div>
      <div className="dashboard">
        <div className="cards">
          <CardDashboard title="Total de animales" info="200" />
          <CardDashboard title="Total de hembras" info="100" />
          <CardDashboard title="Total de machos" info="100" />
          <CardDashboard title="Total de montas" info="100" />
        </div>
        <div className="graficas">
          <ProductionChart/>
          <ProductionChart/>
        </div>
        <div className="graficos-torta">
          <GraficoTorta/>
          <GraficoTorta/>
          <GraficoTorta/>
          <GraficoTorta/>
        </div>
      </div>
    </div>
  )
}

