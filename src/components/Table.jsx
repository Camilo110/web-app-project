import { useState } from "react"
import PropTypes from 'prop-types'

export const Table = ({HeaderList, keyList, data, onEdit, onDelete}) => {

  const [numRows, setNumRows] = useState(10)
  const [limit, setLimit] = useState({inf: 0, sup: 10})

  const onChangeRows = (e) => {
    const value = parseInt(e.target.value)
    setNumRows(value)
    setLimit({inf: limit.inf, sup: limit.inf + value})
  }

  const onChangeLimit = (op) => {
    const addInf = limit.inf + numRows > data.length ? limit.inf : limit.inf + numRows
    const addSup = Math.min((limit.sup + numRows), data.length)

    const minusInf = Math.max((limit.inf - numRows), 0)
    const minusSup = minusInf + numRows
    if (op === '+') {
      setLimit({inf: addInf, sup: addSup})
    } else {
      setLimit({inf: minusInf, sup: minusSup})
    }
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            {HeaderList.map((header) => (
              <th key={header}>{header}</th>
            ))}
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.slice(limit.inf, limit.sup).map((registro) => (
            <tr key={registro.ID}>
              {keyList.map((key) => (
                <td key={key}>{registro[key]}</td>
              ))}
              <td>
                <span onClick={() => onEdit(registro.ID)}>Editar </span>
                <span onClick={() => onDelete(registro.ID)}>Eliminar</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
      <span onClick={()=>onChangeLimit('-')}>
          {'<<'}
        </span>
        <select value={numRows} onChange={onChangeRows}>
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>

        </select>
        <span onClick={()=>onChangeLimit('+')}>
          {'>>'}
        </span>

      </div>
    </div>
  )
}

Table.propTypes = {
  HeaderList: PropTypes.array.isRequired,
  keyList: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}



