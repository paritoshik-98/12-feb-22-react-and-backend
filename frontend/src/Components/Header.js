import React from 'react'

import './header.css'

function Header() {

  const path = window.location.pathname

  return (
    <header className='mt-1 mt-sm-3 mb-sm-2 pb-sm-4'>
      
      <div className='brand w-25 w-sm-50'>
      <img src='https://images.unsplash.com/photo-1532777946373-b6783242f211?ixlib=rb-0.3.5&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=1080&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjMyMDc0fQ&amp;s=8ac55cf3a68785643998730839663129'></img>

      <p className='name'><strong>BlockRead.in</strong></p>
      </div>

      <div className='links'>
        {/* {(path === '/add' || path === '/edit' || path === '/profile' )?(<div> */}
        {/* .............. hi <name> .. */}
      {/* </div>):(<></>)} */}
        <a href="" className='link'>About Us</a>
        <a href="" className='link'>Login</a>
      </div>




    </header>
    )
}

export default Header