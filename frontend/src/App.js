import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import LandingPage from './LandingPage';
import Login from './Login';
import BlogList from './BlogList';
import { BrowserRouter as Router, Routes, Route, Link , useNavigate, Navigate} from "react-router-dom";
import Form from './Form';
import Unsplash from './Unsplash';
import Toggle from './Toggle';
import Test from './Test';
import Slider from './Slider';
import Footer from './Components/Footer';
import Header from './Components/Header';
import AddBlog from './Components/AddBlog';
import Read from './Components/Read';
import EditBlog from './Components/EditBlog';
import Recover from './Recover';
import Reset from './Reset';
import Home from './Components/Home';
import Profile from './Components/Profile';
import { useSelector } from 'react-redux';
import Category from './Components/Category';
import About from './Components/About';
import MyArticles from './Components/MyArticles';
import Marked from './Components/Marked';
import ChangeP from './ChangeP';
import Drafts from './Components/Drafts';
import Register from './Components/Register';
import EditDraft from './Components/EditDraft';
import Books from './Components/Tags/Books';
import CA from './Components/Tags/CA';
import Travel from './Components/Tags/Travel';
import Fi from './Components/Tags/Fi';
import Food from './Components/Tags/Food';
import Health from './Components/Tags/Health';
import LS from './Components/Tags/LS';
import Pol from './Components/Tags/Pol';
import Sp from './Components/Tags/Sp';
import Tech from './Components/Tags/Tech';

function App() {

  const navigate = useNavigate()

  useEffect(()=>document.body.style.backgroundColor='#F8F8F8')

  const LoginStatus = useSelector((state) => state.userLogin);

  // useEffect(()=>{
  //   if(!LoginStatus.user){
  //     navigate('/')
  //   }
  // },[LoginStatus.user])


  return (
    <div className="app">
      {/* <Header/> */}
    <Routes>
<Route exact path = '/login' element = {<LandingPage/>}></Route>
<Route exact path = '/register' element = {<Register/>}></Route>
<Route exact path = '/about' element = {<About/>}></Route>
<Route exact path = '/profile' element = {<Profile/>}></Route>
<Route exact path = '/' element = {<Home/>}></Route>
<Route exact path = '/editDraft/:id' element = {<EditDraft/>}></Route>
{/* <Route exact path = '/login' element = {<Login/>}></Route> */}
{/* <Route exact path = '/all' element = {<BlogList/>}></Route> */}
{/* <Route exact path = '/form' element = {<Form/>}></Route> */}
{/* <Route exact path = '/unsplash' element = {<Unsplash/>}></Route> */}
{/* <Route exact path = '/toggle' element = {<Toggle/>}></Route> */}
{/* <Route exact path = '/test' element = {<Test/>}></Route> */}
{/* <Route exact path = '/slider' element = {<Slider/>}></Route> */}
{/* <Route exact path = '/footer' element = {<Footer/>}></Route> */}
{/* <Route exact path = '/header' element = {<Header/>}></Route> */}
<Route exact path = '/add' element = {<AddBlog/>}></Route>
<Route exact path = '/Read/:id' element = {<Read/>}></Route>
<Route exact path = '/edit/:id' element = {<EditBlog/>}></Route>
{/* <Route exact path = '/recoverPassword' element = {<Recover/>}></Route> */}
<Route exact path = '/reset/:jwt' element = {<Reset/>}></Route>
{/* <Route exact path = '/cat/:tag' element = {<Category/>}></Route> */}
<Route exact path = '/myArticles' element = {<MyArticles/>}></Route>
<Route exact path = '/Favourites' element = {<Marked/>}></Route>
<Route exact path = '/ChangePassword' element = {<ChangeP/>}></Route>
<Route exact path = '/Drafts' element = {<Drafts/>}></Route>
<Route exact path = '/category/Books' element = {<Books/>}></Route>
<Route exact path = '/category/Current_affairs' element = {<CA/>}></Route>
<Route exact path = '/category/Travel' element = {<Travel/>}></Route>
<Route exact path = '/category/Finance' element = {<Fi/>}></Route>
<Route exact path = '/category/Food' element = {<Food/>}></Route>
<Route exact path = '/category/Lifestyle' element = {<LS/>}></Route>
<Route exact path = '/category/Politics' element = {<Pol/>}></Route>
<Route exact path = '/category/Spirituality' element = {<Sp/>}></Route>
<Route exact path = '/category/Health' element = {<Health/>}></Route>
<Route exact path = '/category/Technology' element = {<Tech/>}></Route>
</Routes>
  <Footer/>
</div>
  );
}

export default App;
