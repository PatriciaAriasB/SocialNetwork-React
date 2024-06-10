import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

const PrivateZone = ({ children }) => {
  const user = localStorage.getItem("user");
  return user ? children : <Navigate to="/login" />;
};

PrivateZone.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateZone;
