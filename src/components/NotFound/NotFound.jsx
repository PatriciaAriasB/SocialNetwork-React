import { Link } from "react-router-dom";
import "./NotFound.scss"; 

const NotFound = () => {
  return (
    <div>
      <Link>
        <img src="/public/404-not-found.png" alt="Error 404" className="full-width-img" /> 
      </Link>
    </div>
  );
};

export default NotFound;
