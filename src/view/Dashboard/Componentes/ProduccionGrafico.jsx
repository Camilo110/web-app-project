import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

export const ProductionChart = () => {
  //const [productionData, setProductionData] = useState([]);

  const [productionData, setProductionData] = useState([
    { fecha: '2023-01-01', produccion: 10 },
    { fecha: '2023-01-02', produccion: 15 },
    { fecha: '2023-01-03', produccion: 12 },
    { fecha: '2023-01-04', produccion: 8 },
    { fecha: '2023-01-05', produccion: 20 },
    // Agrega más datos según sea necesario
  ]);
  useEffect(() => {
    const fetchProductionData = async () => {
      /* try {
        const response = await fetch('http://localhost:4000/api/produccion?start=2023-01-01&end=2023-01-31');
        const data = await response.json();
        setProductionData(data);
      } catch (error) {
        console.error('Error fetching production data:', error);
      } */
    };

    fetchProductionData();
  }, []);

  const data = {
    labels: productionData.map((d) => d.fecha),
    datasets: [
      {
        label: 'Producción de Leche',
        data: productionData.map((d) => d.produccion),
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Fecha',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Producción',
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default ProductionChart;