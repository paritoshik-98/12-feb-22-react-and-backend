import React, { useEffect, useState } from "react";
import Form from "../Form";
import Unsplash from "../Unsplash";
import "./add.css";
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from 'pari_read_blocs'
// import blog from "../../../models/blog";
import UnsplashReact, { Base64Uploader, withDefaultProps, InsertIntoApplicationUploader} from "unsplash-react"
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { createBlogAction } from "../REDUX/Actions/blogActions";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import '../Axios'

function AddBlog() {

  const userLogin = useSelector(state=>state.userLogin.user)

  const navigate = useNavigate()

  useEffect(()=>{
    // if(!userLogin){navigate('/login')}
    if(!userLogin){
      alert('Login to continue')
      navigate('/login')
    }
  },[])

  
  const [title,setT]=useState('')
  const TChange = (e) =>{
    setT(e.target.value)
    console.log('title',title)
  }

  const[body,setB]=useState('')

  const[tags,setTags]=useState({
    Technology:false,
    Health:false,
    Food:false,
    Travel:false,
    Lifestyle:false,
    Spirituality:false,
    Current_affairs:false,
    Books:false,
    Politics:false,
    Finance:false,
})

var array = []

const TaghandleChange = (e) =>{
    setTags({...tags,[e.target.name]:e.target.checked})
    
}

const[cover,setC] = useState('')

  const handleFinishedUploading = imageUrl => {
    console.log(imageUrl)
    setC(imageUrl);
    console.log(cover)
  }

  const dispatch = useDispatch()

  const[loading,setLoading] = useState(false)
  const[ERROR,setError] = useState()

  const submit =()=>{
    setLoading(true)
    // tags
    for (const key in tags) {
      if (tags[key]==true) {
          array.push(key)
      }
  }
  const tagArr = JSON.stringify(array)
  const coverImg = cover
  const blogTitle = title
  const content = body
  const desc = text
  // console.log(tagArr,coverImg,blogTitle,content)
  const data = {coverImg,blogTitle,content,tagArr,desc}
  axios.post('/api/blog/add',data).then(res=>{
    if(res.status===200){
      const{id} = res.data
        setLoading(false);
        alert('submitted')
        // navigate('/myarticles')
        navigate(`/read/${id}`)
    }
}).catch(err=>{setLoading(false);setError(err.response.data)})

  }
const s_draft = () => {
  setLoading(true)
  // tags
  for (const key in tags) {
    if (tags[key]==true) {
        array.push(key)
    }
}
const tagArr = JSON.stringify(array)
const coverImg = cover
const blogTitle = title
const content = body
const desc = text
const draft = true
// console.log(tagArr,coverImg,blogTitle,content)
const data = {coverImg,blogTitle,content,tagArr,desc,draft}
axios.post('/api/blog/add',data).then(res=>{
  if(res.status===200){
    const{id} = res.data
      setLoading(false);
      alert('saved in draft')
      // navigate('/myarticles')
      navigate(`/profile`)
  }
}).catch(err=>{setLoading(false);setError(err.response.data)})
}

  ////////////////////// to get only Text content for description in card
  const[text,setText]=useState()
  
  useEffect(()=>{
    const dummyNode = document.getElementById('editorContent')
    dummyNode.innerHTML=body;
 var text1 = dummyNode.textContent;
 const SLICE = text1.slice(0,150)
setText(SLICE)
console.log('text : ',text)
},[body])
  
const[warn,setWarn] = useState(false)

const CreateStatus = useSelector(state=>state.createBlog)




  return (
    <>
    <Header/>
    {/* <>{CreateStatus.loading?<h1>Loading...</h1>:CreateStatus.error?alert('Failed'):CreateStatus.success?alert('Submit successfull'): */}
    { loading?<div class="loader"></div>:
    <div className="form mt-5">
      {ERROR?<div class="alert alert-danger alert-dismissible fade show" role="alert">
  {ERROR}
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>:null}
      <div class=" Addtitle  ">
        <label for="exampleFormControlInput1" class="form-label align-self-center align-self-center">
          Title 
        </label>
        <input id="t" placeholder="Enter Title" type='text' onChange={TChange} value={title} required></input>
        
      </div>
      <div className=" tags_c ">
      <label className="tag_label">Tags</label>
      <div className='tags check'>
        <div className="tag"><input type='checkbox' name="Technology" onChange={TaghandleChange} checked={tags.Technology}/><span>Technology</span></div>
        <div className="tag"><input type='checkbox' name="Health" onChange={TaghandleChange} checked={tags.Health}/><span>Health</span></div>
        <div className="tag"><input type='checkbox' name="Food" onChange={TaghandleChange} checked={tags.Food}/><span>Food</span></div>
        <div className="tag"><input type='checkbox' name="Travel" onChange={TaghandleChange} checked={tags.Travel}/><span>Travel</span></div>
        <div className="tag"><input type='checkbox' name="Books" onChange={TaghandleChange} checked={tags.Books}/><span>Books</span></div>
        <div className="tag"><input type='checkbox' name="Lifestyle" onChange={TaghandleChange} checked={tags.Lifestyle}/><span>Lifestyle</span></div>
        <div className="tag"><input type='checkbox' name="Spirituality" onChange={TaghandleChange} checked={tags.Spirituality}/><span>Spirituality</span></div>
        <div className="tag"><input type='checkbox' name="Current_affairs" onChange={TaghandleChange} checked={tags.Current_affairs}/><span>Current affairs</span></div>
        <div className="tag"><input type='checkbox' name="Politics" onChange={TaghandleChange} checked={tags.Politics}/><span>Politics</span></div>
        <div className="tag"><input type='checkbox' name="Finance" onChange={TaghandleChange} checked={tags.Finance}/><span>Finance</span></div>
    </div>
      </div>
      <div className="unsplash d-flex align-items-center justify-content-between " style={{backgroundColor:'white',border:"0.8px solid silver",borderRadius:"5px",padding:"20px"}}>
      <label for="exampleFormControlInput1" class="form-label align-self-center ">
          Cover Image  
        </label>
        <div style={{ display: "flex" ,justifyContent:"space-around",backgroundColor:"white",borderRadius:'5px'}}>
        <div className='unsplashC'>
          <UnsplashReact 
            accessKey={'3QrIg1ALejFXqmOl1YA6QH4xG1obxasv1J9-mi7_ZuY'}
            applicationName="Bloc"
            Uploader={InsertIntoApplicationUploader}
            photoRatio={16 / 9}
            preferredSize={{ width: 800, height: 450 }}
            onFinishedUploading={handleFinishedUploading}
          />
        </div>

      
      </div>
      
      </div>
      <div>
        
      {cover?<><p>Selected Cover Image : </p><img className="selected" src={cover}></img></>:null}
      </div>


      {warn?<div className="i-warn mb-3">
      <h7 className="">After uploading image wait for green tick and click on the blue icon to shift cursor to next line </h7>
      </div>:null}
      <div className="editor">
      <CKEditor className='bg-light'
                    editor={ClassicEditor}
                    // plugins={SimpleUploadAdapter}
                    // config = {custom_config}
                    // disabled = {true}
                    data='write your content'
                    onReady={ editor => {
                        //////////////////// hide toolbar
                        // const toolbarElement = editor.ui.view.toolbar.element;
                        // toolbarElement.style.display = 'none';
                        //&& disabled = {true}
                        ////////////////////////
                        // You can store the "editor" and use when it is needed.
                        editor.ui.view.editable.element.style.minHeight = "300px";
                        console.log( 'Editor is ready to use!', editor );
                      } }
                      onChange={ ( event, editor ) => {
                        editor.ui.view.editable.element.style.minHeight = "300px";
                        const data = editor.getData();
                        console.log( { event, editor, data } );
                        setB(data)
                        setWarn(true)
                        console.log(body)
                    } }
                    onBlur={ ( event, editor ) => {
                        console.log( 'Blur.', editor );
                        editor.ui.view.editable.element.style.minHeight = "300px";
                    } }
                    onFocus={ ( event, editor ) => {
                        console.log( 'Focus.', editor );
                        editor.ui.view.editable.element.style.minHeight = "300px";
                    } }
                />
                </div>
                <button className="btn btn-outline-dark mt-3 " onClick={submit}>Publish</button>
                <button className="btn btn-outline-dark mt-3 draftB" onClick={s_draft}>Save as draft</button>
                <div id="editorContent" style={{display:'none'}}></div>
    </div>
    }
    </>

  );
}

export default AddBlog;
