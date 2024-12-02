import { balanceTransacciones } from "../../../services/transaccion"
import { useEffect, useState } from "react"
import { Line } from 'react-chartjs-2';
import PropTypes from 'prop-types';

export const InformeFinanzas = ({startDate, endDate}) => {
  
  const [financialData, setFinancialData] = useState([
    { date: '2023-01-01', balance: 10 },
    { date: '2023-01-02', balance: 15 },
    { date: '2023-01-03', balance: 12 },
    { date: '2023-01-04', balance: 8 },
    { date: '2023-01-05', balance: 20 },
  ]);

  // useEffect(() => {
    // const fetchFinancialData = async () => {
    //   if (startDate && endDate) {
    //     try {
    //       const response = await balanceTransacciones(startDate, endDate);
    //       if(response.ok) {
    //         const data = await response.json();
    //         const processedData = processFinancialData(data.body)
    //         setFinancialData(processedData);
    //         calculateResumen(processedData);
    //       } else {
    //         setFinancialData([]);
    //       }
    //       setFinancialData(data);
    //     } catch (error) {
    //       console.error('Error fetching financial data:', error);
    //     }
    //   }
  //   };

  //   fetchFinancialData();
  // }, [startDate, endDate]);

  const processFinancialData = (data) => {
    const result = [];
    let balance = 0;

    data.forEach((item) => {
      const date = item.Fecha;
      const value = parseFloat(item.Valor);
      if (item.Tipo === 'Ingreso') {
        balance += value;
      } else if (item.Tipo === 'Egreso') {
        balance -= value;
      }
      result.push({ date, balance });
    });
    console.log('result', result);
    return result;
  };
  

  const data = {
    labels: financialData.map((d) => d.date),
    datasets: [
      {
        label: 'Balance',
        data: financialData.map((d) => d.balance),
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
  startDate: PropTypes.string,
  endDate: PropTypes.string
}