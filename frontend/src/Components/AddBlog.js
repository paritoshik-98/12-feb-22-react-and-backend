import React from "react";
import Form from "../Form";
import Unsplash from "../Unsplash";
import "./add.css";
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@paritoshik_kharad/ckeditor5-build-classic-custom'

function AddBlog() {
  return (
    <div className="form mt-5">
      <div class=" title p-0 d-flex">
        {/* <label for="exampleFormControlInput1" class="form-label align-self-center ">
          Title 
        </label> */}
        <input
          type="text"
          class="w-100 title-input"
          id=""
          placeholder="Title"
        ></input>
      </div>
      <div className="d-flex justify-content-between">
      <label className="tag_label">Tags</label>
      <Form/>
      </div>
      <div className="unsplash d-flex align-items-center justify-content-between " style={{backgroundColor:'white',border:"0.8px solid silver",borderRadius:"5px"}}>
      <label for="exampleFormControlInput1" class="form-label align-self-center  w-25 mx-3">
          Cover Image  
        </label>
      <Unsplash/>
      </div>
      <div className="editor">
      <CKEditor className='bg-light'
                    editor={ClassicEditor}
                    // plugins={SimpleUploadAdapter}
                    // config = {custom_config}
                    // disabled = {true}
                    data=''
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
                        // editor.ui.view.editable.element.style.minHeight = "400px";
                        const data = editor.getData();
                        console.log( { event, editor, data } );
                        // setContent(data)
                    } }
                    onBlur={ ( event, editor ) => {
                        console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        console.log( 'Focus.', editor );
                    } }
                />
                </div>
    </div>
  );
}

export default AddBlog;
