import '../../../styles/Dash.css';
import PropTypes from 'prop-types';

export const CardDashboard = ({ title, info }) => {
  return (
    <div className="card-dashboard">
      <div className="title">
        <img src="src/assets/img/icons/animales.png" alt="icon"/>
        <h3>{title}</h3>
      </div>      
      <h2>{info}</h2>
    </div>
  );
};

CardDashboard.propTypes = {
  title: PropTypes.string.isRequired,
  info: PropTypes.string.isRequired,
};
