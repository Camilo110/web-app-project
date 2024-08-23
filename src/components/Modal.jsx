import {PropTypes} from 'prop-types'
import { useState } from 'react'
import '../styles/Modal.css'

export const Modal = ({children, fields, data = {}, Handlesubmit, setOpenModal}) => {

  const [valuesUpdate, setValuesUpdate] = useState({})
  const [values, setValues] = useState(data)


  const HandleChange = (e, name) => {
    let {value} = e.target
    const type = e.target.type

    if (type === 'number' && value) value = parseInt(value)
    
    console.log(name , value, "MODALLLLL")
    setValuesUpdate({...valuesUpdate, [name]: value})
    setValues({...values, [name]: value})
  }

  const onExit = () => {
    setOpenModal(false)
  }

  return (
    <article className="Modal">
      <section className=" Modal-content">

        <button onClick={onExit} className="exit">X</button>

        <div className="title-modal">
          {children}
        </div>

        <section className="Fields-modal">
          {Object.keys(fields).map((key) => (

            fields[key].type === 'select' 
            ? 

            <div className='field-modal' key={key}>
              <label>{fields[key].label}</label>
              <select  value={values[key] || ''} onChange={(e) => HandleChange(e,key)}>
                <option value='' disabled>Elegir</option>
                {fields[key].value.map((option) => (
                  <option key={option.ID || option} value={option.ID || option}>{option.value || option}</option>
                ))}
              </select>
            </div> 

            :

            <div className='field' key={key}>
              <label>{fields[key].label}</label>
              <input type={fields[key].type} value={values[key] || ''} onChange={(e) => HandleChange(e,key)}/>
            </div>

          ))}
        </section>

        <p  className="submit">
          <button onClick={() => Handlesubmit(valuesUpdate, values.ID)}>Submit</button>
        </p>
      </section>
    </article>
  )
}

Modal.propTypes = {
  children: PropTypes.node,
  data: PropTypes.object,
  fields: PropTypes.objectOf(
    PropTypes.shape({
      label: PropTypes.string,
      type: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool, PropTypes.array]),
    })
  ).isRequired,
  Handlesubmit: PropTypes.func,
  setOpenModal: PropTypes.func,
}
