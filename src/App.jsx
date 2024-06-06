import "./App.css";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Posts from "./components/Posts/Posts";
import PostDetails from "./components/Posts/PostDetails/PostDetails";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./components/Profile/Profile";
import Search from "./components/Search/Search";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/post/:id" element={<PostDetails />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/search/:name" element={<Search />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;