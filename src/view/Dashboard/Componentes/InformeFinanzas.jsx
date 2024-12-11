import { useEffect, useState } from "react"
import { Line } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import { getBalancePorFecha } from "../../../services/informes.js";

export const InformeFinanzas = ({fechaInicial, fechaFinal}) => {
  const [financialData, setFinancialData] = useState([]);
  
  useEffect(() => {
    const fetchFinancialData = async () => {
      if (fechaInicial && fechaFinal) {
        try {
          const response = await getBalancePorFecha(fechaInicial, fechaFinal);
          if (response.ok) {
            const data = await response.json();
            setFinancialData(data.body);
          } else {
            setFinancialData([]);
          }
        } catch (error) {
          console.error('Error fetching financial data:', error);
        }
      }
    };
  
    fetchFinancialData();
  }, [fechaInicial, fechaFinal]);
  

  const data = {
    labels: financialData.map((d) => new Date(d.Fecha).toISOString().split('T')[0]),
    datasets: [
      {
        label: 'Balance',
        data: financialData.map((d) => d.Balance),
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
          text: 'Balance',
        },
      },
    },
  };

  return (
      <Line data={data} options={options}/>
  );
}

InformeFinanzas.propTypes = {
  fechaInicial: PropTypes.string,
  fechaFinal: PropTypes.string
}