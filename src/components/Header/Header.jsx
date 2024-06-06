import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";

const Header = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [text, setText] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
    if (e.key === "Enter") {
      navigate('/search/'+ text)
    }
  };


  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">M&P</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            {
              user ? (
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">Profile</Link>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">Register</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                  </li>
                </>
              )
            }
          </ul>
        </div>
        <input onKeyUp={handleChange} placeholder="search user" name="text" />
      </div>
    </nav>
  )
}

export default Header