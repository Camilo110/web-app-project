import '../styles/Cards.css';
import PropTypes from 'prop-types';
import { NumeroRes } from './NumeroRes';

export const Cards = (props) => {
  const { 
    id, 
    ResID,
    Nombre,
    Estado,
    Fecha,
    FechaParto,
    onAffirmative,
    affirmativeToolTipText,
    onNegative,
    negativeToolTipText,
    isRecomendacion = false 
  } = props;
  return (
    
    <div className="card">

      <div>
        <h2>{Nombre}</h2>
        <NumeroRes id={ResID}/>
        {
          isRecomendacion &&
          <p>{ResID}</p>
        }
      </div>

      <p>Estado: {Estado}</p>

      {
        FechaParto ?
        <p>Fecha Parto: {FechaParto}</p>
        :
        <p>Fecha: {Fecha}</p>
      }

      <div>
        {
          onAffirmative &&
          <button className='buttonToolTip' onClick={onAffirmative}>
            <span className="material-icons-sharp">
              check
            </span>
            <span className='toolTip' >{affirmativeToolTipText || 'Confirmar'}</span>
          </button>
        }
        {
          onNegative &&
          <button className='buttonToolTip' onClick={onNegative}>
            <span className="material-icons-sharp">
              close
            </span>
            <span className='toolTip'>{negativeToolTipText || 'Cancelar'}</span>
          </button>
        }
      </div>

    </div>
  );
}

Cards.propTypes = {
  id: PropTypes.string.isRequired,
  ResID: PropTypes.string.isRequired,
  Nombre: PropTypes.string.isRequired,
  Estado: PropTypes.string,
  Fecha: PropTypes.string,
  FechaParto: PropTypes.string,
  onAffirmative: PropTypes.func,
  affirmativeToolTipText: PropTypes.string,
  onNegative: PropTypes.func,
  negativeToolTipText: PropTypes.string,
  isRecomendacion: PropTypes.bool
}