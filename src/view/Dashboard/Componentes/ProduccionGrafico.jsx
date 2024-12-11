import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import PropTypes from 'prop-types';
import { getProduccionLechePorFecha } from "../../../services/informes.js";

export const InformeProduccion = ({fechaInicial, fechaFinal}) => {
  const [productionData, setProductionData] = useState([]);

  useEffect(() => {
    const fetchProduccionData = async () => {
      if (fechaInicial && fechaFinal) {
        try {
          const response = await getProduccionLechePorFecha(fechaInicial, fechaFinal);
          if (response.ok) {
            const data = await response.json();
            setProductionData(data.body);
          } else {
            setProductionData([]);
          }
        } catch (error) {
          console.error('Error fetching producción data:', error);
        }
      }
    };
  
    fetchProduccionData();
  }, [fechaInicial, fechaFinal]);

  const data = {
    labels: productionData.map((d) => d.Fecha),
    datasets: [
      {
        label: 'Producción de Leche',
        data: productionData.map((d) => d.produccionTotal),
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

InformeProduccion.propTypes = {
  fechaInicial: PropTypes.string,
  fechaFinal: PropTypes.string
}