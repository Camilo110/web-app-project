import { TransaccionItem } from "./Components/TransaccionItem"

export const Finanzas = () => {
  return (
    <div>
      <h2> Finanzas </h2>

      <div className="Balance">
        <h2>Resumen</h2>
        <div className="ingresos">
          <a>icon</a>
          <h2>Title</h2>
          <p>$ valor</p>
        </div>
        <div className="egresos">
          <a>icon</a>
          <h2>Title</h2>
          <p>$ valor</p>
        </div>
        <div className="total">
          <a>icon</a>
          <h2>Title</h2>
          <p>$ valor</p>
        </div>
      </div>

      <div className="form">
        <div className="form-headear">
          <h2>Registrar Transaccion </h2>
        </div>

        <div className="form-body">
          <div className="form-tipo">
            <a> Leche </a>
            <a> Carne </a>
            <a> General </a>
          </div>

          <div className="form-input">
            <label> Descripcion </label>
            <input type="text" placeholder="Descripcion"/>
          </div>

          <div className="form-input">
            <label> Codigo Producto </label>
            <input type="text" placeholder="Codigo Producto"/>
          </div>

          <div className="form-input">
            <label> Cantidad </label>
            <input type="text" placeholder="Cantidad"/>
          </div>

          <div className="form-input">
            <label> Fecha </label>
            <input type="date"/>
          </div>

          <div className="form-input">
            <label> Valor </label>
            <input type="text" placeholder="Valor"/>
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
          </div>
        </div>
          
      </div>

    </div>
  )
}
