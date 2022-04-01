import './edit.css'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchBlogAction, updateBlogAction } from '../REDUX/Actions/blogActions'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@paritoshik_kharad/ckeditor5-build-classic-custom'
import UnsplashReact, { Base64Uploader, withDefaultProps, InsertIntoApplicationUploader} from "unsplash-react"
import Header from './Header'

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

        const userLogin = useSelector(state => state.userLogin)
        const[authorized,setauthorized] = useState(true)
        
        
        
         useEffect(()=>{
            if(blog){
              if(selector.blog.author._id != userLogin.user.id){
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

  const submit =()=>{
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
  console.log(tagArr,coverImg,blogTitle,content)
  
  dispatch(updateBlogAction({coverImg,blogTitle,content,tagArr,id}))
  }

  return (
    <>
    <Header/>
    <>{authorized?
    <> 
    {selector.loading?<h1>Loading.....</h1>:selector.error?<h1>Internal Server Error</h1>:
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
        <div className="tag"><input type='checkbox' name="music" onChange={TagChange} checked={tags.music}/>Music</div>
        <div className="tag"><input type='checkbox' name="code" onChange={TagChange} checked={tags.code}/>Code</div>
        <div className="tag"><input type='checkbox' name="dance" onChange={TagChange} checked={tags.dance}/>Dance</div>
        <div className="tag"><input type='checkbox' name="read" onChange={TagChange} checked={tags.read}/>read</div>
        <div className="tag"><input type='checkbox' name="write" onChange={TagChange} checked={tags.write}/>write</div>
        <div className="tag"><input type='checkbox' name="eat" onChange={TagChange} checked={tags.eat}/>eat</div>
        <div className="tag"><input type='checkbox' name="sleep" onChange={TagChange} checked={tags.sleep}/>sleep</div>
        <div className="tag"><input type='checkbox' name="wakeup" onChange={TagChange} checked={tags.wakeup}/>wakeup</div>
        <div className="tag"><input type='checkbox' name="movie" onChange={TagChange} checked={tags.movie}/>movie</div>
        <div className="tag"><input type='checkbox' name="webseries" onChange={TagChange} checked={tags.webseries}/>webseries</div>
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
      <div className="editor">
      <CKEditor className='bg-light'
                    editor={ClassicEditor}
                    // plugins={SimpleUploadAdapter}
                    // config = {custom_config}
                    // disabled = {true}
                    data={selector.blog.content}
                    onReady={ editor => {
                        //////////////////// hide toolbar
                        const toolbarElement = editor.ui.view.toolbar.element;
                        toolbarElement.style.display = 'none';
                        //&& disabled = {true}
                        ////////////////////////
                        // You can store the "editor" and use when it is needed.
                        editor.ui.view.editable.element.style.minHeight = "300px";
                        // editor.ui.view.editable.element.style.backgroundColor = '#F8F8F8';
                        // editor.ui.view.editable.element.style.border = "0px";
                        console.log( 'Editor is ready to use!', editor );
                        
                      } }
                      onChange={ ( event, editor ) => {
                        // editor.ui.view.editable.element.style.minHeight = "300px";
                        const data = editor.getData();
                        console.log( { event, editor, data } );
                        setB(data)
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
                <button className="btn btn-outline-dark" onClick={submit}>Submit</button>
    </div>
    
    :null

}
</>
:<h1 className='unath'>You cannot edit this article</h1>}</>
</>
  )
}

export default EditBlog