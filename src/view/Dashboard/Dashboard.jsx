import { CardDashboard } from "./Componentes/CardDashboard";
import {ProductionChart} from  "./Componentes/ProduccionGrafico";
import { GraficoTorta } from "./Componentes/GraficoTorta";
import { InformeFinanzas } from "./Componentes/InformeFinanzas";
import { useState, useEffect } from "react";
import { getDistribucionPorSexo, getDistribucionPorTipo, getDistribucionPorRaza, getDistribucionPorEdad } from "../../services/informes";

export function Dashboard() {
  /* ajuste fecha inicial */
  const [fechaInicial, setFechaInicial] = useState('');
  const [fechaFinal, setFechaFinal] = useState('');
  useEffect(() => {
    const today = new Date();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(today.getMonth() - 1);

    setFechaFinal(today.toISOString().split('T')[0]);
    setFechaInicial(oneMonthAgo.toISOString().split('T')[0]);
  }, []);

  const handleStartDateChange = (e) => {
    setFechaInicial(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setFechaFinal(e.target.value);
  };

  

  /* distribucion por sexo */
  const [distribucionPorSexo, setDistribucionPorSexo] = useState([]);
  useEffect(() => {
    const fetchDistribucionPorSexo = async () => {
      if (fechaInicial && fechaFinal) {
        try {
          const response = await getDistribucionPorSexo( fechaInicial, fechaFinal);
          if(response.ok) {
            const data = await response.json();
            setDistribucionPorSexo(data.body);
          } else {
            setDistribucionPorSexo([]);
          }
        } catch (error) {
          console.error('Error fetching production data:', error);
        }
      }
    };

    fetchDistribucionPorSexo();
  }, [fechaInicial, fechaFinal]);

  const DataHebrasMachos = {
    labels: ['Machos', 'Hembras'],
    datasets: [
      {
        label: 'N° de Reses',
        data: distribucionPorSexo.map((d) => d.numeroReses),
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  };

  /* distribucion por sexo */
  const [distribucionPorTipo, setDistribucionPorTipo] = useState([]);
  useEffect(() => {
    const fetchDistribucionPorTipo = async () => {
      if (fechaInicial && fechaFinal) {
        try {
          const response = await getDistribucionPorTipo( fechaInicial, fechaFinal);
          if(response.ok) {
            const data = await response.json();
            setDistribucionPorTipo(data.body);
          } else {
            setDistribucionPorTipo([]);
          }
        } catch (error) {
          console.error('Error fetching production data:', error);
        }
      }
    };

    fetchDistribucionPorTipo();
  }, [fechaInicial, fechaFinal]);

  const DataTiposAnimales = {
    labels: distribucionPorTipo.map((d) => d.Tipo),
    datasets: [
      {
        label: 'N° de Reses',
        data: distribucionPorTipo.map((d) => d.numeroReses),
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
 
    /* distribucion por raza */
    const [distribucionPorRaza, setDistribucionPorRaza] = useState([]);
    useEffect(() => {
      const fetchDistribucionPorRaza = async () => {
        if (fechaInicial && fechaFinal) {
          try {
            const response = await getDistribucionPorRaza( fechaInicial, fechaFinal);
            if(response.ok) {
              const data = await response.json();
              setDistribucionPorRaza(data.body);
            } else {
              setDistribucionPorRaza([]);
            }
          } catch (error) {
            console.error('Error fetching production data:', error);
          }
        }
      };
  
      fetchDistribucionPorRaza();
    }, [fechaInicial, fechaFinal]);

  const DataRazas = {
    labels: distribucionPorRaza.map((d) => d.Raza),
    datasets: [
      {
        label: 'N° de Reses',
        data: distribucionPorRaza.map((d) => d.numeroReses),
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

      /* distribucion por edad */
      const [distribucionPorEdad, setDistribucionPorEdad] = useState([]);
      useEffect(() => {
        const fetchDistribucionPorEdad = async () => {
          if (fechaInicial && fechaFinal) {
            try {
              const response = await getDistribucionPorEdad( fechaInicial, fechaFinal);
              if(response.ok) {
                const data = await response.json();
                setDistribucionPorEdad(data.body);
              } else {
                setDistribucionPorEdad([]);
              }
            } catch (error) {
              console.error('Error fetching production data:', error);
            }
          }
        };
    
        fetchDistribucionPorEdad();
      }, [fechaInicial, fechaFinal]);
  
  const DataEdadesAnimales = {
    labels: distribucionPorEdad.map((d) => d.rangoEdad),
    datasets: [
      {
        label: 'N° de Reses',
        data: distribucionPorEdad.map((d) => d.numeroReses),
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
            <input type="date" value={fechaInicial} onChange={handleStartDateChange} />
          </div>
          <div className="fin">
            <p>Fin</p>
            <input type="date" value={fechaFinal} onChange={handleEndDateChange} />
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
          <InformeFinanzas startDate={fechaInicial} endDate={fechaFinal}/>
        </div>
        <div className="graficos-torta">
        <GraficoTorta data={DataHebrasMachos} title="Distribución por sexo" />
        <GraficoTorta data={DataTiposAnimales} title="Distribución por tipo" />
        <GraficoTorta data={DataRazas} title="Distribución por raza" />
        <GraficoTorta data={DataEdadesAnimales} title="Distribución por edad" />
        </div>
      </div>
    </div>
  )
}

