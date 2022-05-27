import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import './footer.css'
import axios from 'axios'
// import '../Axios'

function Footer() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userLogin = useSelector((state) => state.userLogin)

  const Logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("DP");
    dispatch({type:'DP_REMOVED',payload:''})
    dispatch({type:'LOGOUT'})
      navigate('/login')
  };

// useEffect(()=>{
//   const Script = document.createElement("script");
//   //id should be same as given to form element
//   const Form = document.getElementById('donate');
//   Script.setAttribute('src',"https://checkout.razorpay.com/v1/payment-button.js")
//   Script.setAttribute('data-payment_button_id','pl_JVR1PsfyXbNhcb')
//   Form.appendChild(Script);
// })

  const paymentHandler = async (e) => {
    const rs = 1
    const API_URL = 'http://localhost:8080/api/payment/'
    e.preventDefault();
    const orderUrl = `${API_URL}order`;
    const response = await axios.post(orderUrl,{amt:rs});
    const { data } = response;
    const options = {
      key: 'rzp_test_woj80rKkwTndjo',
      name: "ReadBlocs",
      description: "Social publishing platform",
      order_id: data.id,
      handler: async (response) => {
        try {
         const paymentId = response.razorpay_payment_id;
         const url = `${API_URL}capture/${paymentId}`;
         const captureResponse = await axios.post(url, {amt:rs})
         console.log(captureResponse.data);
        } catch (err) {
          console.log(err);
        }
      },  theme: {
        color: "#686CFD",
      },
    };const rzp1 = new window.Razorpay(options);rzp1.open();};

  return (
      <footer className='footer text-center'>
          <div className='brand'>
          {/* <img classname='logo'id='l' src='https://images.unsplash.com/photo-1532777946373-b6783242f211?ixlib=rb-0.3.5&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=1080&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjMyMDc0fQ&amp;s=8ac55cf3a68785643998730839663129'></img> */}
            <h1 className=' mx-3 align-self-center name'> ReadBlocs</h1>
          </div>
          {/* <div className='main text-center w-100 w-sm-75 mx-3 mx-sm-0'><p  className='text-muted'><h5 style={{'margin-bottom':'3vh'}}>Made with &#10084; by Pari</h5></p></div> */}
          <div className='main text-center  w-75 w-sm-75 mx-3 mx-sm-0'><p  className='text-muted'><h5 style={{'margin-bottom':'3vh'}}> A social publishing platform that is open to all and home to a diverse array of stories, ideas, and perspectives.</h5></p></div>
          <div className='  mx-3 f-links d-flex  justify-content-around'>
          <Link className='link'  style={{textDecoration:'underline',color:'#2E0300'}} to='/'>Home</Link>
          <Link className='link' style={{textDecoration:'underline',color:'#2E0300'}} to='/add'>Write</Link>
          {userLogin.user?
          <a onClick={Logout} style={{textDecoration:'underline',color:'#2E0300'}}>Logout</a>
          :
          <Link className='link' style={{textDecoration:'underline',color:'#2E0300'}} to='/login'>Login</Link>
          }
    {/* <form id='donate' onSubmit={paymentHandler}></form> */}
             </div>
      </footer>
  )
}

export default Footer


    //   <div className='container'>
    // <footer className=' p-2  text-center mt-4  d-flex flex-column justify-content-around align-items-center'>
    //     <div className='h d-flex w-75 justify-content-center align-content-center '>
    
    //     </div>
    //     <div className='main'><p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Distinctio ab reiciendis officia aspernatur tempora voluptas facilis dolorem tenetur, dolor fugiat placeat dolore suscipit enim ex exercitationem porro quae incidunt aut.</p></div>
    //     <div className='f d-flex w-75 justify-content-around align-content-center'>
    //         <a className='link' href="">Login</a>
    //         <a className='link' href="">Write</a>
    //         <a className='link' href="">Donate</a>
    //     </div>
    // </footer>
    // </div>