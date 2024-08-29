import { useState } from 'react';
import PropTypes from 'prop-types'
import './../styles/ModalUpload.css';
export const UploadFile = ({onUpload, setModal}) => {
  
  const [fileSelect, setFileSelect] = useState([])

  const uploadChange = (e) => {
    setFileSelect(e.target.files)
  }

  const onExit = () => {
    setFileSelect('')
    setModal(false)
  }


  const handleUpload = async () => {
    if (fileSelect) {
      const resp = await onUpload(fileSelect)
      if (resp == 'OK') {
        setFileSelect('')
        onExit()
        return
      }
      console.log('Ocurrio un error')
      return
    }
    console.log('Select a file')
  }

  return (
    <div className="Modal-upload">
      <div className='content-upload'>
        <h1>Subir Imagen</h1>
        <button onClick={onExit} className="exit">X</button>
        <input type="file" multiple onChange={uploadChange} />
        <button onClick={handleUpload}>Subir</button>
      </div>
    </div>
  )
}

UploadFile.propTypes = {
  onUpload: PropTypes.func.isRequired,
  setModal: PropTypes.func.isRequired
}
