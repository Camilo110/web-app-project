import { useEffect, useRef, useState } from "react"
import PropTypes from 'prop-types'
import '../styles/Table.css'

export const Table = (props) => {

  const {
    HeaderList,
    keyList,
    data,
    onEdit,
    onDelete,
    edit = true,
    paginar = true,
    enableDelete = true,
    filtrar = true
  }= props

  const [numRows, setNumRows] = useState(10)
  const [limit, setLimit] = useState({ inf: 0, sup: 10 })
  const [datos, setDatos] = useState([])
  const [fieldFilter, setFieldFilter] = useState({value: keyList[0]})

  useEffect (() => {
    setDatos(data)
  }, [data])
  
  const onChangeRows = (e) => {
    const value = parseInt(e.target.value)
    setNumRows(value)
    setLimit({ inf: limit.inf, sup: limit.inf + value })
  }

  const onChangeLimit = (op) => {
    const addInf = (limit.inf + numRows >= datos.length) ? limit.inf : limit.inf + numRows
    const addSup = Math.max(Math.min((limit.sup + numRows), datos.length), numRows)
    
    const minusInf = Math.max((limit.inf - numRows), 0)
    const minusSup = minusInf + numRows
    
    if (op === '+') {
      setLimit({ inf: addInf, sup: addSup })
    } else {
      setLimit({ inf: minusInf, sup: minusSup })
    }
  }
  
  const paginacion = () => {
    return (
      <div className="Paginacion">
        <span onClick={() => onChangeLimit('-')}>{'<<'}</span>

        <select value={numRows} onChange={onChangeRows}>
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
        </select>

        <span onClick={() => onChangeLimit('+')}>{'>>'} </span>
      </div>
    )}

    const onChangeFilter = (e) => {
      const value = e.target.value
      value ? setDatos(filterDate(value)) : setDatos(data)
      setLimit({ inf: 0, sup: numRows }) 
    }
    
    const filterDate = (value) => {
      const dataFilter = data.filter((registro) => registro[fieldFilter.value].toString().toLowerCase().includes(value.toString().toLowerCase()))
      return dataFilter
    }

    const reference = useRef();

    const selectFieldFilter = (e) => {

      const {value} = e.target
      setFieldFilter({value})
      reference.current.select(); 
    }

     


  return (
    <div className="table-main">

      {filtrar &&
        <div className="table-search">
          <div className="buscar">
            <h3>Buscar:</h3>
            <input 
              ref={reference}
              type="text" 
              placeholder="" 
              onChange={onChangeFilter}
            />
          </div> 
          <div className="filtro">
            <span>por:</span>
            <select onChange={selectFieldFilter}>
              {keyList.map((key, index) => (
                <option key={key} aria-label={key}>{HeaderList[index]}</option>
              ))}
            </select>
          </div>
        </div>
      }

        {paginar && paginacion()}

      <div className="table-scroll">
        <table>

          <thead>
            <tr>
              {HeaderList.map((header) => (
                <th key={header}>{header}</th>
              ))}

            { 
            (edit || enableDelete) &&
              <th>Acciones</th>
            }

            </tr>
          </thead>

          <tbody>
            {datos.slice(limit.inf, limit.sup).map((registro, index) => (
              <tr key={`${registro.ID}${index}`}>
                {keyList.map((key) => (
                  <td key={key}>{registro[key]}</td>
                ))}
                {
                  (edit || enableDelete) &&
                  <td className="acciones-tabla">
                    {edit &&
                      <span onClick={() => onEdit(registro.ID)}>
                        <img className='icono-tabla' src="src\assets\img\icons\editar.png" alt="Editar" />
                      </span>
                    }
                    {
                      enableDelete &&
                      <span onClick={() => onDelete(registro.ID)}>
                        <img className='icono-tabla' src="src\assets\img\icons\borrar.png" alt="Elimnar" />
                      </span>
                    }
                  </td>
                }
              </tr>
            ))}
          </tbody>

        </table>

      </div>

      {paginar && paginacion()}

    </div>
  )
}

Table.propTypes = {
  HeaderList: PropTypes.array.isRequired,
  keyList: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  edit: PropTypes.bool,
  paginar : PropTypes.bool,
  enableDelete: PropTypes.bool,
  filtrar : PropTypes.bool
}



