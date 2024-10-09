import { TransaccionItem } from "./Components/TransaccionItem"
import '../../styles/Finanzas.css'

export const Finanzas = () => {
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
                    <p>$ 1.000.000</p>
                  </div>
                </div>
                <div className="egresos">
                <img src="src/assets/img/egresos.png" alt="icon"/>
                  <div className="valor">
                    <h3>Egresos</h3>
                    <p>$ 1.000.000</p>
                  </div>
                </div>
              </div>
              <div className="parte-inferior">
                <div className="total">
                <img src="src/assets/img/balance.png" alt="icon"/>
                  <div className="valor">
                  <h3>Balance</h3>
                    <p>$ 1.000.000</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="form">
            <div className="form-headear">
              <h2>Registrar Transacción </h2>
            </div>

            <div className="form-body">
              <div className="form-tipo">
                <a> Leche </a>
                <a> Carne </a>
                <a> General </a>
              </div>

              <div className="form-input">
                <label> Descripción </label>
                <input type="text" />
              </div>

              <div className="form-input">
                <label> Código Producto </label>
                <input type="text" />
              </div>

              <div className="form-input">
                <label> Cantidad </label>
                <input type="text" />
              </div>

              <div className="form-input">
                <label> Fecha </label>
                <input type="date"/>
              </div>

              <div className="form-input">
                <label> Valor </label>
                <input type="text"/>
              </div>

              <div className="form-input">
                <label> Observaciones </label>
                <textarea></textarea>
              </div>

              <div className="form-submit">
                <button> Ingreso </button>
                <button> Egreso </button>
              </div>

            </div>          
          </div>
        </div>

        <div className="lista-transacciones">
            <h2>Transacciones</h2>
            <input type="text" placeholder="Buscar Registro" />
            <div className="scroll-trasacciones">
              <TransaccionItem
                ID="1"
                Fecha="2021-08-01"
                Valor={10000}
                Producto="Leche"
              />
              <TransaccionItem
                ID="2"
                Fecha="2021-09-01"
                Valor={20000}
                Producto="Carne"
              />
              <TransaccionItem
                ID="3"
                Fecha="2022-09-01"
                Valor={15000}
                Producto="Insumos"
              />
            </div>
          </div>

      </div>
    </div>
  )
}
