import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import LandingPage from './LandingPage';
import Login from './Login';
import BlogList from './BlogList';
import { BrowserRouter as Router, Routes, Route, Link , useNavigate} from "react-router-dom";
import Form from './Form';
import Unsplash from './Unsplash';
import Toggle from './Toggle';
import Test from './Test';
import Slider from './Slider';
import Footer from './Components/Footer';
import Header from './Components/Header';


function App() {

  return (
    <Routes>
<Route exact path = '/' element = {<LandingPage/>}></Route>
<Route exact path = '/login' element = {<Login/>}></Route>
<Route exact path = '/all' element = {<BlogList/>}></Route>
<Route exact path = '/form' element = {<Form/>}></Route>
<Route exact path = '/unsplash' element = {<Unsplash/>}></Route>
<Route exact path = '/toggle' element = {<Toggle/>}></Route>
<Route exact path = '/test' element = {<Test/>}></Route>
<Route exact path = '/slider' element = {<Slider/>}></Route>
<Route exact path = '/footer' element = {<Footer/>}></Route>
<Route exact path = '/header' element = {<Header/>}></Route>
  
</Routes>
  );
}

export default App;
