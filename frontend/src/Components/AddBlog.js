import React, { useEffect, useState } from "react";
import Form from "../Form";
import Unsplash from "../Unsplash";
import "./add.css";
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from 'testing_blog_1'
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
    if(!userLogin){navigate('/')}
  },[])

  
  const [title,setT]=useState('')
  const TChange = (e) =>{
    setT(e.target.value)
    console.log('title',title)
  }

  const[body,setB]=useState('')

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
    { loading?<h1>Loading</h1>:
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
        <div className="tag"><input type='checkbox' name="music" onChange={TaghandleChange} checked={tags.music}/>Music</div>
        <div className="tag"><input type='checkbox' name="code" onChange={TaghandleChange} checked={tags.code}/>Code</div>
        <div className="tag"><input type='checkbox' name="dance" onChange={TaghandleChange} checked={tags.dance}/>Dance</div>
        <div className="tag"><input type='checkbox' name="read" onChange={TaghandleChange} checked={tags.read}/>read</div>
        <div className="tag"><input type='checkbox' name="write" onChange={TaghandleChange} checked={tags.write}/>write</div>
        <div className="tag"><input type='checkbox' name="eat" onChange={TaghandleChange} checked={tags.eat}/>eat</div>
        <div className="tag"><input type='checkbox' name="sleep" onChange={TaghandleChange} checked={tags.sleep}/>sleep</div>
        <div className="tag"><input type='checkbox' name="wakeup" onChange={TaghandleChange} checked={tags.wakeup}/>wakeup</div>
        <div className="tag"><input type='checkbox' name="movie" onChange={TaghandleChange} checked={tags.movie}/>movie</div>
        <div className="tag"><input type='checkbox' name="webseries" onChange={TaghandleChange} checked={tags.webseries}/>webseries</div>
    </div>
      </div>
      <div className="unsplash d-flex align-items-center justify-content-between " style={{backgroundColor:'white',border:"0.8px solid silver",borderRadius:"5px",padding:"20px"}}>
      <label for="exampleFormControlInput1" class="form-label align-self-center ">
          Cover Image  
        </label>
        <div style={{ display: "flex" ,justifyContent:"space-around",backgroundColor:"white",borderRadius:'5px'}}>
        <div style={{ height: "50vh", width: "55vw" }}>
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
      {cover?<img src={cover}></img>:null}
      </div>
      {warn?<div className="i-warn  alert-dark border-dark mb-3">
      <h7 className="text-muted">After uploading an image do not submit until there is a green tick on top right corner </h7>
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
                    } }
                    onFocus={ ( event, editor ) => {
                        console.log( 'Focus.', editor );
                    } }
                />
                </div>
                <button className="btn btn-outline-dark" onClick={submit}>SUBMIT</button>
                <button className="btn btn-outline-dark " onClick={s_draft}>Save as draft</button>
                <div id="editorContent" style={{display:'block'}}></div>
    </div>
    }
    </>

  );
}

export default AddBlog;
