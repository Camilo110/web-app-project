import { TransaccionItem } from "./Components/TransaccionItem"
import '../../styles/Finanzas.css'
import { useEffect } from "react"
import { getAllTransaccion, getResumen, balanceTransacciones } from "../../services/transaccion"
import { useState } from "react"
import { TransaccionForm } from "./Components/TransaccionForm"
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

export const Finanzas = () => {

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [financialData, setFinancialData] = useState([]);

  useEffect(() => {
    const today = new Date();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(today.getMonth() - 1);

    setEndDate(today.toISOString().split('T')[0]);
    setStartDate(oneMonthAgo.toISOString().split('T')[0]);
  }, []);

  useEffect(() => {
    const fetchFinancialData = async () => {
      if (startDate && endDate) {
        try {
          const response = await balanceTransacciones(startDate, endDate);
          if(response.ok) {
            const data = await response.json();
            const processedData = processFinancialData(data.body)
            setFinancialData(processedData);
          } else {
            setFinancialData([]);
          }
          setFinancialData(data);
        } catch (error) {
          console.error('Error fetching financial data:', error);
        }
      }
    };

    fetchFinancialData();
  }, [startDate, endDate]);

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
  

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
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
        title: {
          display: true,
          text: 'Balance',
        },
      },
    },
  };

  

  const [transacciones, setTransacciones] = useState([])
  const [resumen, setResumen] = useState({Ingreso: 0, Egreso: 0, Balance: 0})

  useEffect(() => {
    fetchTransacciones()
    fetchResumen()
  }, [])

  const fetchTransacciones = async () => {
    const resp = await getAllTransaccion()
    setTransacciones(resp)
  }

  const fetchResumen = async() => {
    const resp = await getResumen()
    setResumen(resp)
  }


  return (
      <div className="finanzas">
        <h1 className="title"> Finanzas </h1>
        <div className="finanzas-main">
          <div className="section-one">
            <div className="Balance">
              <h2>Resumen</h2>
              <div className="Balance-content">
                <div className="parte-superior">
                  <div className="ingresos">
                    <img src="src/assets/img/ingresos.png" alt="icon"/>
                    <div className="valor">
                    <h3>Ingresos</h3>
                      <p>$ {resumen.Ingreso}</p>
                    </div>
                  </div>
                  <div className="egresos">
                  <img src="src/assets/img/egresos.png" alt="icon"/>
                    <div className="valor">
                      <h3>Egresos</h3>
                      <p>$ {resumen.Egreso}</p>
                    </div>
                  </div>
                  <div className="total">
                  <img src="src/assets/img/balance.png" alt="icon"/>
                    <div className="valor">
                    <h3>Balance</h3>
                      <p>$ {resumen.Total}</p>
                    </div>
                </div>
                </div>
              </div>
            </div>
            <TransaccionForm />
          </div>
            
          <div className="grafico-main">
            <h2>Balance</h2>
            <div className="grafico-fechas">
              <div className="fechas">
                <label>
                  Fecha de inicio:
                  <input type="date" value={startDate} onChange={handleStartDateChange} />
                </label>
                <label>
                  Fecha de fin:
                  <input type="date" value={endDate} onChange={handleEndDateChange} />
                </label>
              </div>
              <Line data={data} options={options}/>
            </div>
          </div>

          <div className="lista-transacciones">
              <h2>Transacciones</h2>
              <input type="text" placeholder="Buscar Registro" />
              <div className="scroll-trasacciones">
                {
                  transacciones.map((item) => (
                    <TransaccionItem key={item.ID} item={item} />
                  ))
                }
              </div>
          </div>
            

        </div>
      </div>
  )
}
