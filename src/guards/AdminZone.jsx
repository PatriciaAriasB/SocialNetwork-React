import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

const AdminZone = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.role == 'admin' ? children : <Navigate to="/" />;
};
AdminZone.propTypes = {
    children: PropTypes.node.isRequired,
  };

export default AdminZone;