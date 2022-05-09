import './edit.css'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { deleteBlogAction, fetchBlogAction, fetchDraftAction, updateBlogAction } from '../REDUX/Actions/blogActions'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from 'pari_read_blocs'
import UnsplashReact, { Base64Uploader, withDefaultProps, InsertIntoApplicationUploader} from "unsplash-react"
import Header from './Header'
import axios from 'axios'
import '../Axios'

function EditDraft() {
     const dispatch = useDispatch()
     const navigate = useNavigate()
     const selector = useSelector(state=>state.fetchBlog)
     const blog = selector.blog
     const {id} = useParams()

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

     useEffect(()=>{
         dispatch(fetchDraftAction(id))
        
        },[])

        const userLogin = useSelector(state => state.userLogin)
        const[authorized,setauthorized] = useState(true)
        
        
        
         useEffect(()=>{
            if(blog){
              if(selector.blog.author._id != JSON.parse(localStorage.user).id){
                console.log(selector.blog.author._id,userLogin.user.id)
                setauthorized(false)
              }
            for ( const key of selector.blog.tags) {
                setTags(prev=>({...prev,[key]:true}))
            }
            console.log(tags)
            setTitle(selector.blog.title)
            setC(selector.blog.coverImg)
            setB(selector.blog.content)
            
        }
     },[blog])

     const [title,setTitle]=useState('')
  const TitleChange = (e) =>{
    setTitle(e.target.value)
  }

  const[body,setB]=useState('')

  const TagChange = (e) =>{
    setTags({...tags,[e.target.name]:e.target.checked})
    
}

const[cover,setC] = useState('')

  const handleFinishedUploading = imageUrl => {
    console.log(imageUrl)
    setC(imageUrl);
    console.log(cover)
  }

  var array = []

  

  const[loading,setLoading] = useState(false)

  const[text,setText]=useState()
  
  useEffect(()=>{
    const dummyNode = document.getElementById('editorContent')
    dummyNode.innerHTML=body;
 var text1 = dummyNode.textContent;
 const SLICE = text1.slice(0,150)
setText(SLICE)
console.log('text : ',text)
},[body])


  const submit =()=>{
    setLoading(true)
    // tags
    for (const key in tags) {
      if (tags[key]==true) {
          array.push(key)
      }
  }
  // const tagArr = JSON.stringify(array)
  // const coverImg = cover
  // const blogTitle = title
  // const content = body
  const data = {
    coverImg:cover
    ,blogTitle:title
    ,content:body
    ,tagArr:JSON.stringify(array)
    ,id:id,
    desc:text
  }
  const path = '/api/blog/'+id+'/edit'
        axios.put(path,data).then(res=>{
        if(res.status===200){
          setLoading(false)
          alert('update successfull')
          navigate(`/read/${id}`)
        }}).catch(e=>{
          setLoading(false)
          alert('Update failed')})
  
  }

  const deleteBlog = () => {
    setLoading(true)
    const path = '/api/blog/'+id+'/delete'
        axios.delete(path).then(res=>{
        if(res.status===200){
          setLoading(false)
          alert('delete successfull')
          navigate('/myarticles')
        }})
        .catch(e=>{
          setLoading(false)
          alert('delete failed')})
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
  }).catch(err=>{setLoading(false);alert('update failed')})
  }
  
  const[warn,setWarn] = useState(false)

  return (
    <>
    <div id="editorContent" style={{display:'none'}}></div>
    <Header/>
    <div>{!loading?
    <div>{authorized?
    <> 
    {selector.loading?<div class="loader"></div>:selector.error?<h1>Could Not get article</h1>:
    selector.blog?

    <div className="form mt-5">
      <div class=" Addtitle  ">
        <label htmlFor="exampleFormControlInput1" class="form-label align-self-center align-self-center">
          Title 
        </label>
        <input id="t" placeholder="Enter Title" type='text' onChange={TitleChange} value={title}></input>
        
      </div>
      <div className=" tags_c ">
      <label className="tag_label">Tags</label>
      <div className='tags check'>
      <div className="tag"><input type='checkbox' name="Technology" onChange={TagChange} checked={tags.Technology}/><span>Technology</span></div>
        <div className="tag"><input type='checkbox' name="Health" onChange={TagChange} checked={tags.Health}/><span>Health</span></div>
        <div className="tag"><input type='checkbox' name="Food" onChange={TagChange} checked={tags.Food}/><span>Food</span></div>
        <div className="tag"><input type='checkbox' name="Travel" onChange={TagChange} checked={tags.Travel}/><span>Travel</span></div>
        <div className="tag"><input type='checkbox' name="Books" onChange={TagChange} checked={tags.Books}/><span>Books</span></div>
        <div className="tag"><input type='checkbox' name="Lifestyle" onChange={TagChange} checked={tags.Lifestyle}/><span>Lifestyle</span></div>
        <div className="tag"><input type='checkbox' name="Spirituality" onChange={TagChange} checked={tags.Spirituality}/><span>Spirituality</span></div>
        <div className="tag"><input type='checkbox' name="Current_affairs" onChange={TagChange} checked={tags.Current_affairs}/><span>Current affairs</span></div>
        <div className="tag"><input type='checkbox' name="Politics" onChange={TagChange} checked={tags.Politics}/><span>Politics</span></div>
        <div className="tag"><input type='checkbox' name="Finance" onChange={TagChange} checked={tags.Finance}/><span>Finance</span></div>
        </div>
      </div>
      <div className="unsplash d-flex align-items-center justify-content-between " style={{backgroundColor:'white',border:"0.8px solid silver",borderRadius:"5px",padding:"20px"}}>
      <label for="exampleFormControlInput1" class="form-label align-self-center ">
          Cover Image  
        </label>
        <div style={{ display: "flex" ,justifyContent:"space-around",backgroundColor:"white",borderRadius:'5px'}}>
        <div className='unsplashC' >
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
      {cover?<><p>Selected Cover Image : </p><img className="selected" src={cover}></img></>:null}
      {/* {cover?<img src={cover}></img>:null} */}
      {warn?<div className="i-warn   mb-3">
      {/* <h7 className="">After uploading an image do not submit until there is a green tick on top right corner </h7> */}
      <h7 className="">After uploading image wait for green tick and click on the blue icon to shift cursor to next line </h7>
      </div>:null}
      <div className="editor">
      <CKEditor className='bg-light'
                    editor={ClassicEditor}
                    // plugins={SimpleUploadAdapter}
                    // config = {custom_config}
                    // disabled = {true}
                    data={selector.blog.content}
                    onReady={ editor => {
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
                <button className="btn btn-outline-dark mt-3" onClick={submit}>Publish</button>
                <button className="btn btn-outline-dark mt-3" onClick={s_draft} style={{'marginLeft':'2vw','marginRight':'2vw'}}>Save as draft</button>
                <button className="btn  btn-outline-danger mt-3 sdb" onClick={deleteBlog} >DELETE</button>
                
    </div>
    
    :null

}
</>
:<h1 className='unath'>You cannot edit this article</h1>}</div>
:<div class="loader"></div>}
</div>
</>
  )
}

export default EditDraft