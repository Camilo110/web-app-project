import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

export const GraficoTorta = () => {
  const data = {
    labels: ['Hembras', 'Machos'],
    datasets: [
      {
        label: 'Distribución de Animales',
        data: [100, 100], // Datos de ejemplo
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Distribución de Animales',
      },
    },
  };

  return <Pie data={data} options={options} />;
};