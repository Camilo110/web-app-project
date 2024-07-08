import {PropTypes} from 'prop-types'

export const Modal = ({children, fields, values, Handlesubmit, setValues, setOpenModal}) => {

  const HandleChange = (e, name) => {
    const {value} = e.target
    setValues({...values, [name]: value})
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
            <input type={fields[key].type} name="" value={values[key]} onChange={(e) => HandleChange(e,key)}/>
          </div>
        ))}
        </section>
        <p  className="submit">
          <button onClick={Handlesubmit}>Submit</button>
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
      label: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]).isRequired,
    })
  ).isRequired,
  Handlesubmit: PropTypes.func,
  setValues: PropTypes.func,
  setOpenModal: PropTypes.func,
}
