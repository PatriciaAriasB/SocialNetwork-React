import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import './Header.scss'; 

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState('');

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/register');
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchText('');
    navigate(`/search/${searchText}`);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">M&P</Link>
        <button className="navbar-toggler" type="button" onClick={toggleNavbar}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}>
          <ul className="navbar-nav me-auto"> 
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            {user ? (
              <>
                {user.role === "admin" && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin">Admin</Link>
                  </li>
                )}
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">{user.name}</Link>
                </li>
                <li className="nav-item">
                  <button className="btn btn-link nav-link" onClick={handleLogout}>Logout</button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
          <form className="d-flex" onSubmit={handleSearchSubmit}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchText}
              onChange={handleSearchChange}
            />
            <button className="btn btn-outline-light" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Header;
