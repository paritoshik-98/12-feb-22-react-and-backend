import React from 'react'

import './footer.css'

function Footer() {
  return (
      <footer className='footer text-center'>
          <div className='brand'>
          <img src='https://images.unsplash.com/photo-1532777946373-b6783242f211?ixlib=rb-0.3.5&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=1080&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjMyMDc0fQ&amp;s=8ac55cf3a68785643998730839663129'></img>
            <h1 className=' mx-3 align-self-center'> BlocRead.in</h1>
          </div>
          <div className='main text-center w-100 w-sm-75 mx-3 mx-sm-0'><p >Lorem ipsum dolor, sit amet consectetur adipisicing elit. Distinctio ab reiciendis officia aspernatur tempora voluptas facilis dolorem tenetur, dolor fugiat placeat dolore suscipit enim ex exercitationem porro quae incidunt aut.</p></div>
          <div className='  mx-3 mx-sm-0 links d-flex justify-content-around'>
             <a className='link' href="">Login</a>
             <a className='link' href="">Write</a>
             <a className='link' href="">Donate</a>
         </div>
      </footer>
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
  )
}

export default Footer