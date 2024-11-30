import '../styles/Dash.css';
import PropTypes from 'prop-types';

export const CardDashboard = ({ title, info }) => {
  return (
    <div className="card-dashboard">
      <h3>{title}</h3>
      <h2>{info}</h2>
    </div>
  );
};

CardDashboard.propTypes = {
  title: PropTypes.string.isRequired,
  info: PropTypes.string.isRequired,
};
