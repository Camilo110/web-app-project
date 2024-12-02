import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

export const GraficoTorta = ({ data, title }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: title,
      },
    },
  };

  return <Pie data={data} options={options} />;
};