import React, { useState } from 'react'
import UnsplashReact, { Base64Uploader, withDefaultProps, InsertIntoApplicationUploader} from "unsplash-react"

const MY_ACCESS_KEY = "UNSPLASH_KEY_FROM_UNSPLASH"
export default function Unsplash() {

  const[state,set] = useState()

  const handleFinishedUploading = imageUrl => {
    console.log(imageUrl)
    set(imageUrl);
    console.log(state)
  }


  return (
    <>
    
    <div style={{ display: "flex" ,justifyContent:"center"}}>
        <div style={{ height: "80vh", width: "80vw" }}>
          <UnsplashReact
            accessKey={'3QrIg1ALejFXqmOl1YA6QH4xG1obxasv1J9-mi7_ZuY'}
            applicationName="Bloc"
            Uploader={InsertIntoApplicationUploader}
            photoRatio={16 / 9}
            preferredSize={{ width: 800, height: 450 }}
            onFinishedUploading={handleFinishedUploading}
          />
        </div>

        {/* <div>
          <img src={state} />
        </div> */}
      </div>
      </>
    // <UnsplashReact
    //   accessKey={'3QrIg1ALejFXqmOl1YA6QH4xG1obxasv1J9-mi7_ZuY'}
    //   Uploader={withDefaultProps(Base64Uploader, { name: "event[logo]" })}
    // />
  )
}