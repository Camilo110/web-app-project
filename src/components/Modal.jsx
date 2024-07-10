import {PropTypes} from 'prop-types'
import { useState } from 'react'

export const Modal = ({children, fields, values: values2, Handlesubmit, setValues : aux, setOpenModal}) => {

  const [valuesUpdate, setValuesUpdate] = useState({})
  const [values, setValues] = useState(values2)

  const HandleChange = (e, name) => {
    let {value} = e.target
    const type = e.target.type

    if (type === 'number' && value) value = parseInt(value)
    
    setValuesUpdate({...valuesUpdate, [name]: value})
    setValues({...values, [name]: value})
    aux({...values, [name]: value})
  }

  const onExit = () => {
    setOpenModal(false)
  }

  return (
    <article className="Modal">
      <section className=" Modal-content">
        <button onClick={onExit} className="exit">X</button>
        <div className="Title">
          {children}
        </div>
        <section className="Fields">
        {Object.keys(fields).map((key) => (
          <div className='field' key={key}>
            <label>{fields[key].label}</label>
            <input type={fields[key].type} value={values[key] || ''} onChange={(e) => HandleChange(e,key)}/>
          </div>
        ))}
        </section>
        <p  className="submit">
          <button onClick={(e) => Handlesubmit(values.ID, valuesUpdate)}>Submit</button>
        </p>
      </section>
    </article>
  )
}

Modal.propTypes = {
  children: PropTypes.node,
  values: PropTypes.object.isRequired,
  fields: PropTypes.objectOf(
    PropTypes.shape({
      label: PropTypes.string,
      type: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
    })
  ).isRequired,
  Handlesubmit: PropTypes.func,
  setValues: PropTypes.func,
  setOpenModal: PropTypes.func,
}
