import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import LandingPage from './LandingPage';
import Login from './Login';
import BlogList from './BlogList';
import { BrowserRouter as Router, Routes, Route, Link , useNavigate} from "react-router-dom";

function App() {

  return (
    <Routes>
<Route exact path = '/' element = {<LandingPage/>}></Route>
<Route exact path = '/login' element = {<Login/>}></Route>
<Route exact path = '/all' element = {<BlogList/>}></Route>
  
</Routes>
  );
}

export default App;
