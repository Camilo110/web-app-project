import { CardDashboard } from "../../components/CardDashboard";
import {ProductionChart} from  "./Componentes/ProduccionGrafico";
import { GraficoTorta } from "./Componentes/GraficoTorta";
import { InformeFinanzas } from "./Componentes/InformeFinanzas";
import { useState } from "react";

export function Dashboard() {
  const [dateRange, setDateRange] = useState(
    {
      start: new Date().toISOString().split('T')[0], 
      end: () => {
        const date = new Date();
        date.setMonth(date.getMonth() - 1);
        return date.toISOString().split('T')[0];
      }
    });

  const onSetDate = (e, key) => {
    const { value } = e.target;
    setDateRange({...dateRange, [key]: value});
  }

  return (
    <div className="dashboardMain">
      <div className="header">
        <h1>Dashboard</h1>
        <div className="fechas">
          <div className="inicio">
            <p>Inicio</p>
            <input type="date" value={dateRange.start} onChange={(e) => onSetDate(e,'start')}/>
          </div>
          <div className="fin">
            <p>Fin</p>
            <input type="date" value={dateRange.end} onChange={(e) => onSetDate(e,'end')}/>
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
          <InformeFinanzas startDate={dateRange.start} endDate={dateRange.end}/>
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

