import React, { useEffect, useState} from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchBlogAction, like } from '../REDUX/Actions/blogActions'
import './read.css'

import { BiLike } from 'react-icons/bi';
import { AiFillLike } from 'react-icons/ai';
import { AiOutlineHeart } from 'react-icons/ai';
import { FcLike } from 'react-icons/fc';


import axios from 'axios'
import '../Axios'



function Read() {

    const dispatch = useDispatch()

    const getblog = useSelector(state=>state.fetchBlog,shallowEqual)

    const user = useSelector(state=>state.userLogin.user)

    const {id} = useParams()
    useEffect(() => {
       dispatch(fetchBlogAction(id))
    }, [])

    
    
    useEffect(()=>{
        if(getblog.blog)
        {document.getElementById('c').innerHTML=getblog.blog.content;
        setLikes(getblog.blog.likes)
        setComments(getblog.blog.comments)
}

        console.log(user.id)
    }
    ,[getblog.blog])
    


const [likes,setLikes] = useState()

const likeHandler = () => {
  if(likes.includes(user.id)){
    const path = `/api/blog/${id}/unlike`;
  axios.put(path).then(res=>setLikes(res.data));
  }
  else{
  const path = `/api/blog/${id}/like`;
  axios.put(path).then(res=>setLikes(res.data));
  }
}
const unlike = () => {
dispatch(like(id))
}

const[comments,setComments]=useState()

const addComment = () => {
  const path = `/api/blog/${id}/comment`
  axios.post(path,{text:inputC}).then(res=>setComments(res.data));
}

const deleteComment =(cid) => {
  
  const path = `/api/blog/${id}/comment/${cid}/delete`
  axios.delete(path).then(res=>setComments(res.data));
  
}

const[inputC,setinputC]=useState('')

const change = (e) => {
  setinputC(e.target.value)
}

  return (
<> 
    {getblog.loading?<h1>Loading.....</h1>:getblog.error?<h1>Internal Server Error</h1>:
    getblog.blog?
    <div className="content">
      {/* {  getblog.blog.likes ? getblog.blog.likes.includes(user.id) ? <FcLike/>:<AiOutlineHeart id='l'/>:null} */}
        <img className='cover' src={getblog.blog.coverImg} alt="Cover Image" />
        <h1 className='title text-center'> {getblog.blog.title} </h1>
        <div className="body" id="c"></div> 
        <div className="likes">
          <button className='like' onClick={likeHandler}>{likes?likes.length>0?likes.includes(user.id)?<span><FcLike/>{likes.length.count}</span>:<span><AiOutlineHeart/>{likes.length.count}</span>:<span><AiOutlineHeart/>{likes.length.count}</span>:null}</button>
          {
            likes
          }
          {/* {getblog.blog.likes} */}
        </div>
        <div className="comments">
          {comments?comments.map(c=>{return c.text}):null}
          <div className="comment-form">
          <label className='' htmlFor='c'></label>
          <input type="text" id='c' onChange={change} value={inputC}/>
          <button className='submitC' onClick={addComment}>SUBMIT</button>
          </div>
          {JSON.stringify(comments)}
        </div>
    </div>
    :null

}
</>
  )
}

export default Read