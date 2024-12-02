import { CardDashboard } from "./Componentes/CardDashboard";
import {ProductionChart} from  "./Componentes/ProduccionGrafico";
import { GraficoTorta } from "./Componentes/GraficoTorta";
import { InformeFinanzas } from "./Componentes/InformeFinanzas";
import { useState } from "react";

export function Dashboard() {
  const [dateRange, setDateRange] = useState(
    {
      start: new Date().toISOString().split('T')[0], 
      end: '2024-11-01'
    }
  )

  const onSetDate = (e, key) => {
    const { value } = e.target;
    setDateRange({...dateRange, [key]: value});
  }

  /* data de prueba antes del fetch */
  const DataHebrasMachos = {
    labels: ['Hembras', 'Machos'],
    datasets: [
      {
        label: 'Distribución de Animales',
        data: [31, 11], // Datos de ejemplo
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const DataTiposAnimales = {
    labels: ['Leche', 'Carne', 'Doble Propósito'],
    datasets: [
      {
        label: 'Distribución por Tipo de Animales',
        data: [25, 12, 5], // Datos de ejemplo
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)', 
          'rgba(255, 99, 132, 0.6)', 
          'rgba(54, 162, 235, 0.6)'
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)', 
          'rgba(255, 99, 132, 1)', 
          'rgba(54, 162, 235, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };
 

  const DataRazas = {
    labels: ['Holstein', 'Jersey', 'Normando', 'Otros'],
    datasets: [
      {
        label: 'Distribución de Razas',
        data: [18, 10, 10, 4], // Datos de ejemplo
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)', 
          'rgba(255, 99, 132, 0.6)', 
          'rgba(54, 162, 235, 0.6)', 
          'rgba(153, 102, 255, 0.6)'
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)', 
          'rgba(255, 99, 132, 1)', 
          'rgba(54, 162, 235, 1)', 
          'rgba(153, 102, 255, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };
  
  const DataEdadesAnimales = {
    labels: [
      '0 a 3 meses', 
      '3 a 9 meses', 
      '9 a 12 meses', 
      '1 a 2 años', 
      '2 a 3 años', 
      '3 a 5 años', 
      'Mayores de 5 años'
    ],
    datasets: [
      {
        label: 'Distribución por Edades',
        data: [5, 8, 4, 10, 7, 5, 3], // Datos de ejemplo que suman 42
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)', 
          'rgba(255, 99, 132, 0.6)', 
          'rgba(54, 162, 235, 0.6)', 
          'rgba(153, 102, 255, 0.6)', 
          'rgba(255, 206, 86, 0.6)', 
          'rgba(201, 203, 207, 0.6)', 
          'rgba(255, 159, 64, 0.6)'
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)', 
          'rgba(255, 99, 132, 1)', 
          'rgba(54, 162, 235, 1)', 
          'rgba(153, 102, 255, 1)', 
          'rgba(255, 206, 86, 1)', 
          'rgba(201, 203, 207, 1)', 
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };
  

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
          <CardDashboard title="Total de animales" info="42" />
          <CardDashboard title="Total de partos" info="2" />
          <CardDashboard title="Total de leche(lts)" info="641" />
          <CardDashboard title="Total de carne(kg)" info="859" />
        </div>
        <div className="graficas">
          <ProductionChart/>
          <InformeFinanzas startDate={dateRange.start} endDate={dateRange.end}/>
        </div>
        <div className="graficos-torta">
        <GraficoTorta data={DataHebrasMachos} title="Distribución de Animales" />
        <GraficoTorta data={DataTiposAnimales} title="Distribución de Animales" />
        <GraficoTorta data={DataRazas} title="Distribución de Animales" />
        <GraficoTorta data={DataEdadesAnimales} title="Distribución de Animales" />
        </div>
      </div>
    </div>
  )
}

