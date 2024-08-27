import { Link } from "react-router-dom";
import { deleteRes, updateRes, getResById } from "../../../services/res";
import { getResModal } from "../../../services/forms";
import { Modal } from "../../../components/Modal"
import { useEffect, useState } from "react";


const campos = {
  Numero: { label: 'Número', type: 'number', value: 0 },
  Nombre: { label: 'Nombre', type: 'text', value: '' },
  Tipo: { label: 'Tipo', type: 'select', value: ['Leche', 'Carne', 'Doble Proposito'] },
  FechaNacimiento: { label: 'Fecha de Nacimiento', type: 'date', value: '' },
  Estado: { label: 'Estado', type: 'select', value: ['Activa', 'Vendida', 'Muerte']},
  Madre: { label: 'Madre', type: 'select', value: [''] },
  Padre: { label: 'Padre', type: 'select', value: [''] },
  PesoActual: { label: 'Peso Actual', type: 'number', value: 0 },
  PesoNacimiento: { label: 'Peso de Nacimiento', type: 'number', value: 0},
  Sexo: { label: 'Sexo', type: 'select', value: ['F','M'] },
  Raza: { label: 'Raza', type: 'text', value: '' },
  NumeroPartos: { label: 'Número de Partos', type: 'number', value: 0 },
  RegistroICA: { label: 'Registro ICA', type: 'text', value: '' },
  Observaciones: { label: 'Observaciones', type: 'text', value: '' },
  FincaID: { label: 'Finca ID', type: 'select', value: [''] }
};


const camposDelete = {
  Fecha: { label: 'Fecha de Muerte', type: 'date', value: '' },
  Causa: { label: 'Causa', type: 'select', value: ['Muerte']},
  Observaciones: { label: 'Observaciones', type: 'text', value: '' }
};

// eslint-disable-next-line react/prop-types
export function ResItem({res : {ID: id, Numero, Nombre,NumeroPartos}}) {
  
  const [DeleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [fields, setFields] = useState(campos)
  const [values, setValues] = useState({})

  useEffect(() => {
    }, [])
  
  
  const HandleEdit = () => {
    getResModal().then(({fincas, madres, padres}) => {
      setFields(
        {...fields, 
          FincaID: { label: 'Finca', type: 'select', value: fincas},
          Madre: { label: 'Madre', type: 'select', value: madres},
          Padre: { label: 'Padre', type: 'select', value: padres}}
        )
      getResById(Numero).then((res) => {
        setValues(res) 
        setEditModal(true);
      })
    })
  }

  const HandleDelete = () => {
    setDeleteModal(true)
  }

  const ModalSubmitDelete = (body) => {
    deleteRes(id).then((resp) => {
      if (resp.status === 200) {
        console.log('Res eliminada', body)
      }
      console.log('Respuesta Delete', resp)
    })
  }
  
  const ModalSubmitEdit = (body ,idRes ) => {
    updateRes(idRes, body).then((resp) => {
      console.log('Respuesta Update', resp)
    })
  }
  

  return ( 
  <div className="card">
        
        <Link to={`/res/${id}`}>
          <img  style={{width:'300px', height:'180px'}} src={`http://localhost:4000/imagen/id/${id}`} alt="Cow Image"/>
        </Link>
       

        <section className="card-info">
        <Link to={`/res/${id}`} className="link">  

          <div className="especial">
              <h2>{Nombre}</h2>
              <div className="id">{Numero}</div>
          </div>

            <p>N° Partos: {NumeroPartos}</p>
            <p>Promedio leche (diaria): 19 lts</p>
            <p>Ubicación: Lote 2</p>
        </Link>
            <div className="actions">
                <button onClick={HandleDelete} className="delete">❌</button>
                <button onClick={HandleEdit} className="edit">✏️</button>
            </div>

        </section>

        {editModal &&
          <Modal Handlesubmit={ModalSubmitEdit} fields={fields} data={values} setOpenModal={setEditModal}>
            <h3>Editar Res</h3>
          </Modal>}
        
        {DeleteModal &&
        <Modal Handlesubmit={ModalSubmitDelete} fields={camposDelete} setOpenModal={setDeleteModal}>
          <h3>Eliminar Res</h3>
        </Modal>}
  </div> 
  );
}