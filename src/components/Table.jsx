
export const Table = ({HeaderList, keyList, data, onEdit, onDelete}) => {
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
          {data.map((registro) => (
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
    </div>
  )
}
