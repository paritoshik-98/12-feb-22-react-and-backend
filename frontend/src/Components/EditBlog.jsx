import './edit.css'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchBlogAction } from '../REDUX/Actions/blogActions'

function EditBlog() {
     const dispatch = useDispatch()
     const selector = useSelector(state=>state.fetchBlog)
     const blog = selector.blog
     const {id} = useParams()

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

     useEffect(()=>{
         dispatch(fetchBlogAction(id))
        
        },[])
        
         useEffect(()=>{
            if(blog){
            for ( const key of selector.blog.tags) {
                setTags(prev=>({...prev,[key]:true}))
            }
            console.log(tags)
        }
     },[blog])
  return (
    <div>EditBlog</div>
  )
}

export default EditBlog