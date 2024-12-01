import { TransaccionItem } from "./Components/TransaccionItem"
import '../../styles/Finanzas.css'
import { useEffect } from "react"
import { getAllTransaccion, getResumen } from "../../services/transaccion"
import { useState } from "react"
import { TransaccionForm } from "./Components/TransaccionForm"
import 'chart.js/auto';

export const Finanzas = () => {
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
