// for testing
// http://localhost:3000/read/6244287355a8ef62001c830e

import React, { useEffect, useState} from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { fetchBlogAction, like } from '../REDUX/Actions/blogActions'
import './read.css'

import { MdDelete } from 'react-icons/md';
import { MdSend } from 'react-icons/md';
import { FcLike } from 'react-icons/fc';
import { FcLikePlaceholder } from 'react-icons/fc';
import { BiCommentDetail } from 'react-icons/bi';
import { BsBookmark } from 'react-icons/bs';
import { BsFillBookmarkCheckFill } from 'react-icons/bs';
import { ImShare } from 'react-icons/im';
import { FaShareSquare } from 'react-icons/fa';
import { BsBookmarkPlus } from 'react-icons/bs';

import { FaEdit } from 'react-icons/fa';

import axios from 'axios'
import '../Axios'
import Header from './Header'
import {
  EmailShareButton,
  FacebookShareButton,
  HatenaShareButton,
  InstapaperShareButton,
  LineShareButton,
  LinkedinShareButton,
  LivejournalShareButton,
  MailruShareButton,
  OKShareButton,
  PinterestShareButton,
  PocketShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  ViberShareButton,
  VKShareButton,
  WhatsappShareButton,
  WorkplaceShareButton
} from "react-share";

import {
  EmailIcon,
  FacebookIcon,
  FacebookMessengerIcon,
  HatenaIcon,
  InstapaperIcon,
  LineIcon,
  LinkedinIcon,
  LivejournalIcon,
  MailruIcon,
  OKIcon,
  PinterestIcon,
  PocketIcon,
  RedditIcon,
  TelegramIcon,
  TumblrIcon,
  TwitterIcon,
  ViberIcon,
  VKIcon,
  WeiboIcon,
  WhatsappIcon,
  WorkplaceIcon
} from "react-share";


function Read() {

    const dispatch = useDispatch()

    const getblog = useSelector(state=>state.fetchBlog,shallowEqual)

    const[author,setA]=useState()

    const user = useSelector(state=>state.userLogin.user)

    var {id} = useParams()
    useEffect(() => {
       dispatch(fetchBlogAction(id));
       console.log(window.location.href)
    }, [])

    
    
    useEffect(()=>{
      if(getblog.blog){
          document.getElementById('c').innerHTML=getblog.blog.content;
        setLikes(getblog.blog.likes);
        setComments(getblog.blog.comments)
        setA(getblog.blog.author)
        setDate(getblog.blog.date)
        setMarked((getblog.blog.markedby))
      }
    }
    ,[getblog.blog])
    

const[date,setDate]=useState('swe')

const [marked,setMarked] = useState([])

const [likes,setLikes] = useState([])

const likeHandler = () => {
  if(likes.includes(user.id)){
    const path = `http:localhost:8080/api/blog/${id}/unlike`;
  axios.put(path).then(res=>setLikes(res.data));
  }
  else{
  const path = `http:localhost:8080/api/blog/${id}/like`;
  axios.put(path).then(res=>setLikes(res.data));
}
}
// const unlike = () => {
// dispatch(like(id))
// }

const markHandler = () => {
  if(marked.includes(user.id)){
    const path = '/api/blog/unMark';
  axios.put(path,{blogId:getblog.blog._id}).then(res=>setMarked(res.data));
  }
  else{
    const path = '/api/blog/Mark';
  axios.put(path,{blogId:getblog.blog._id}).then(res=>setMarked(res.data));
  }
}

const[comments,setComments]=useState([])

const addComment = () => {
  const path = `/api/blog/${id}/comment`
  axios.post(path,{text:inputC}).then(res=>setComments(res.data));
}

// const deleteComment =(cid) => {
//   console.log(cid)
//   // const path = `/api/blog/${id}/comment/delete`
//   // axios.delete(path,{cid:cid}).then(res=>setComments(res.data));
  
// }

const delComment = (cid) => {
  // console.log(e.target.id)
  console.log(cid)
  const path = `/api/blog/${id}/comment/delete`
  // axios.delete(path,{cid:cid}).then(res=>console.log(res.data))
}
const[inputC,setinputC]=useState('')

const change = (e) => {
  setinputC(e.target.value)
}

const[toggleComments,setTC]=useState(false)

const toggle = () => setTC(!toggleComments)



  return (
<> 
<Header/>
    {getblog.loading?<h1>Loading.....</h1>:getblog.error?<h1>Internal Server Error</h1>:
    getblog.blog?
    <div className="content">
      {/* {  getblog.blog.likes ? getblog.blog.likes.includes(user.id) ? <FcLike/>:<AiOutlineHeart id='l'/>:null} */}

        <img className='read-cover mt-3' src={getblog.blog.coverImg} alt="cover image" />
        <h1 className='title text-center mt-5'> {getblog.blog.title} </h1>
        <div className="a d-flex justify-content-between mb-3 mt-5">
          <div className="left-a d-flex">
        <img className='r-pic' src={getblog.blog.author.profile_pic}></img>
        <div className="read-a-h">
        <h3 className=' align-self-center'>{getblog.blog.author.name}</h3>
        <p className='text-muted'>Posted on   <span className='fw-bold text-muted'>{date.split('T')[0]}</span></p>
        </div>
        </div>
        <div className='d-flex'>
        {user?        

         marked.includes(user.id) ? 
         <button className='r-mark' onClick={markHandler}>
        {<BsFillBookmarkCheckFill size={30}/>}</button>
         :
        <button className='r-mark'onClick={markHandler}>{<BsBookmarkPlus size={30}/>}</button>

          :null}
        {user.id===getblog.blog.author._id?<Link className='align-self-center edit' to={`/edit/${getblog.blog._id}`}><FaEdit size={30}/></Link>:null}
        {/* {user.id===getblog.blog.author._id?<MdDelete size={30} className='align-self-center ' />:null} */}
        

        {user.id!==getblog.blog.author._id?<a href="#share" id='s_link' className='align-self-center text-muted fw-bold'><ImShare size={30}/></a>:null}
        
        </div>
        {/* <a href="#share" className='align-self-center'><ImShare size={30}/></a> */}
        
        </div>
        <div className="body" id="c"></div> 
        <div className="user-int d-flex justify-content-between">
          <div className='d-flex'>
          <div className="like-div d-flex">
        <button className='like align-self-center' onClick={likeHandler}>{likes?likes.length>0?likes.includes(user.id)?<span><FcLike size={32} fillOpacity={1}/>{likes.length.count}</span>:<span><FcLikePlaceholder size={32} fill='red'/>{likes.length.count}</span>:<span><FcLikePlaceholder size={32}fill='red' f/>{likes.length.count}</span>:null}</button>
          <h5 className=' align-self-center text-muted l_count'>{likes.length}</h5>
        </div>
        <div className="comment-div d-flex">
          <button className='comment-btn' onClick={()=>setTC(!toggleComments)}><BiCommentDetail size={28}/></button>
          <h5 className=' align-self-center text-muted c_count'>{comments.length}</h5>
        </div>
        </div>
        <div className="share-l d-flex align-items-center" id='share'>
 <WhatsappShareButton url={window.location.href}  ><WhatsappIcon className='s-icon' round={true} /></WhatsappShareButton>
 <FacebookShareButton url={window.location.href}><FacebookIcon className='s-icon' round={true}/></FacebookShareButton>
 <TwitterShareButton url={window.location.href}><TwitterIcon className='s-icon' round={true} /></TwitterShareButton>
        <LinkedinShareButton url={window.location.href} ><LinkedinIcon className='s-icon' round={true} /></LinkedinShareButton>
 <EmailShareButton url={window.location.href}><EmailIcon className='s-icon' round={true} /></EmailShareButton>
 </div>
        </div>
        {/* <div className="likes"> */}
          {/* <button className='like' onClick={likeHandler}>{likes?likes.length>0?likes.includes(user.id)?<span><FcLike/>{likes.length.count}</span>:<span><AiOutlineHeart/>{likes.length.count}</span>:<span><AiOutlineHeart/>{likes.length.count}</span>:null}</button> */}
          {/* <h4>{ */}
            {/* likes.length */}
          {/* }</h4> */}
          {/* {getblog.blog.likes} */}
        {/* </div> */}
        {/* <button onClick={toggle}>Comments</button> */}
        {toggleComments?
        <div className="comments_cont">
          <h5 className='mb-3'>Comments </h5>
        {comments?comments.map(c=>{ return (
        <div className='comment mb-3'>
          <div className='d-flex justify-content-between '  >
          <div><p className='text-muted mb-0'>{c.userName} :- </p>
          {/* <p className='mb-0' ><b>{c.text}</b></p></div> */}
          <p className='mb-0' ><i><b>{c.text}</b></i></p></div>
          <div className='align-self-center'>
          {c.userId===user.id? <button className='del_cmt_btn ' id={c._id} onClick={()=>{
            // console.log('del',c._id);
            const path = `/api/blog/${id}/comment/delete`;
  axios.put(path,{cid:c._id}).then(res=>setComments(res.data))

            }}><MdDelete size={30}/></button>:null}
            </div>
            
            </div>
          
        </div>
        )
        }):null}
        <h5>Add Comment</h5>
        <div className="comment-form d-flex">
        <input type="text" className='cmt_input ' id='c' onChange={change} value={inputC}/>
        <div className='sbt_cmt'><button className='btn btn-outline-dark submitC  ' onClick={addComment}>SUBMIT</button></div>
        </div>
        {/* {JSON.stringify(comments)} */}
      </div>
        :null}
    </div>
    :null

}
{/* <TwitterIcon size={32} round={true} />
 */}
 
</>
  )
}

export default Read