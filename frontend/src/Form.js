// tags frontend


import React, { useState } from 'react'

function Form() {

    const [state,setState] = useState(
        {
            coding:false,
            music:false
        }
    )



    const CchangeHandler = () => {
        setState(prevState =>({...prevState,coding:!state.coding}))
    } 

    const MchangeHandler = () => {
        setState(prevState =>({...prevState,music:!state.music}))
    } 

    var array = []
    const submit = (e) => {
        e.preventDefault()
    for (const key in state) {
        if (state[key]===true) {
            array.push(key)
        }
    }
    console.log(array)
    let string = JSON.stringify(array)
    console.log(string)
    console.log(JSON.parse(string))
}
    return(
    <form>
  <div>
    <input type="checkbox" id="coding" name="coding"  checked={state.coding} onChange={CchangeHandler}></input>
    <label htmlFor="coding">Coding</label>
  </div>
  <div>
    <input type="checkbox" id="music" name="music" checked={state.music} onChange={MchangeHandler}></input>
    <label htmlFor="music">Music</label>
  </div>
  <button className='btn btn-outline-dark' onClick={submit}>Submit</button>
</form>
  )
}

export default Form



