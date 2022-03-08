import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchBlogAction } from '../REDUX/Actions/blogActions'
import './read.css'

function Read() {

    const dispatch = useDispatch()

    const getblog = useSelector(state=>state.fetchBlog)

    const {id} = useParams()
    useEffect(() => {
       dispatch(fetchBlogAction(id))
    }, [])
    
    useEffect(()=>{
        if(getblog.blog)
        {document.getElementById('c').innerHTML=getblog.blog.content
}
        
    }
    ,[getblog.blog])
  return (
<> 
    {getblog.loading?<h1>Loading.....</h1>:getblog.error?<h1>Internal Server Error</h1>:
    getblog.blog?
    <div className="content">
        <img className='cover' src={getblog.blog.coverImg} alt="Cover Image" />
        <h1 className='title text-center'> {getblog.blog.title} </h1>
        <div className="body" id="c"></div> 
    </div>
    :null

}
</>
  )
}

export default Read