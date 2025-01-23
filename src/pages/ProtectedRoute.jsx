import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { isLoggedIn } from '../services/auth.js';

export const ProtectedRoute = ({ element }) => {
  return isLoggedIn() ? element : <Navigate to="/login" />;
};

ProtectedRoute.propTypes = {
  element: PropTypes.element.isRequired,
};