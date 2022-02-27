import React, { useState } from 'react'
import Unsplash from './Unsplash'

function Toggle() {

    const [display,setD] = useState(false)

    const toggle = (e) => {
        e.preventDefault()
        setD(!display)
    }
  return (
    <div>
        <button className='btn btn-primary' onClick={toggle}>Toggle</button>
        {display?<Unsplash/>:null}
    </div>
  )
}

export default Toggle