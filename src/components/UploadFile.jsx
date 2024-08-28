import { useState } from 'react';
import PropTypes from 'prop-types'
import './../styles/ModalUpload.css';
export const UploadFile = ({onUpload, setModal}) => {
  
  const [fileSelect, setFileSelect] = useState('')

  const uploadChange = (e) => {
    setFileSelect(e.target.files[0])
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
      <h3>Subir Imagen</h3>
      <button onClick={onExit}>X</button>
      <input type="file" onChange={uploadChange} />
      <button onClick={handleUpload}>Subir</button>
    </div>
  )
}

UploadFile.propTypes = {
  onUpload: PropTypes.func.isRequired,
  setModal: PropTypes.func.isRequired
}
