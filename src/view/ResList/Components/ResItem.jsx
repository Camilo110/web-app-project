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

// eslint-disable-next-line react/prop-types
export function ResItem({res : {ID: id, Numero, Nombre,NumeroPartos}}) {

  const [editModal, setEditModal] = useState(false);
  const [fields, setFields] = useState(campos)
  const [values, setValues] = useState({})

  useEffect(() => {
      getResModal().then(({fincas, madres, padres}) => {
        setFields({...fields, 
                    FincaID: { label: 'Finca', type: 'select', value: fincas},
                    Madre: { label: 'Madre', type: 'select', value: madres},
                    Padre: { label: 'Padre', type: 'select', value: padres}})
      })
    }, [])
  
  
  const HandleEdit = () => {
    getResById(Numero).then((res) => {
      setValues(res) 
      setEditModal(true);
    })
  }

  const HandleDelete = () => {
    deleteRes(id);
  }
  
  const ModalSubmitEdit = (body ,idRes ) => {
    updateRes(idRes, body).then((resp) => {
      console.log('Respuesta Update', resp)
    })
  }

  return ( 
  <div className="card">
        
        <Link to={`/res/${Numero}`}>
          <img  src="https://fakeimg.pl/250x135" alt="Cow Image"/>
        </Link>
       

        <section className="card-info">
        <Link to={`/res/${Numero}`} className="link">  

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
  </div> 
  );
}
