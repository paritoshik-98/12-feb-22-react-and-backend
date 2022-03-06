import React from 'react'
import { useState } from 'react'

import'./form.css'

function CheckBox() {

    const[tags,setTags]=useState({
        code:false,
        music:false,
        dance:false,
        read:false,
        write:false,
        eat:false,
        sleep:false,
        wakeup:false,
        movie:false,
        webseries:false,
    })

    var array = []

    const handleChange = (e) =>{
        setTags({...tags,[e.target.name]:e.target.checked})
        for (const key in tags) {
            if (tags[key]==true) {
                array.push(key)
            }
        }
        console.log(array)
    }


  return (
      <div className='tags'>
        <div className="tag"><input type='checkbox' name="music" onChange={handleChange} checked={tags.music}/>Music</div>
        <div className="tag"><input type='checkbox' name="code" onChange={handleChange} checked={tags.code}/>Code</div>
        <div className="tag"><input type='checkbox' name="dance" onChange={handleChange} checked={tags.dance}/>Dance</div>
        <div className="tag"><input type='checkbox' name="read" onChange={handleChange} checked={tags.read}/>read</div>
        <div className="tag"><input type='checkbox' name="write" onChange={handleChange} checked={tags.write}/>write</div>
        <div className="tag"><input type='checkbox' name="eat" onChange={handleChange} checked={tags.eat}/>eat</div>
        <div className="tag"><input type='checkbox' name="sleep" onChange={handleChange} checked={tags.sleep}/>sleep</div>
        <div className="tag"><input type='checkbox' name="wakeup" onChange={handleChange} checked={tags.wakeup}/>wakeup</div>
        <div className="tag"><input type='checkbox' name="movie" onChange={handleChange} checked={tags.movie}/>movie</div>
        <div className="tag"><input type='checkbox' name="webseries" onChange={handleChange} checked={tags.webseries}/>webseries</div>
    </div>
  )
}

export default CheckBox