import {  CameraIcon, DocumentTextIcon, PhotoIcon } from "@heroicons/react/24/outline";
import { UserIcon,  } from "@heroicons/react/24/solid";
import { handleDropFile } from "../../hooks/fileHandler";
import { useState } from "react";


export function FileUpload({setSignupForm, signupForm}) {
  const credentialFile = signupForm.credentialFile

  // const [image, setImage] = useState(signupForm.profile_photo);
  const [error, setError] = useState(null);

  const setImage = (credentialFile)=>{
    const reader = new FileReader();
    reader.readAsDataURL(credentialFile);

    reader.onloadend = () => {
      const credential = reader.result; // Save the file data (base64) to state
      setSignupForm((signupForm)=>({
        ...signupForm,
        credentialFile: credentialFile,
        credential: credential
      }))
    };
  }

  const {
    getInputProps,
    getRootProps,
  } = handleDropFile( 'document', setImage, setError);

  return (
    <div className="">
    {error && <p className="text-sm text-red-500 text-center">{error}</p>}
    <div 
      className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10"
      {...getRootProps()}
    >
      <div className="text-center">
        { credentialFile ? (
          <>
            <DocumentTextIcon
              className="text-indigo-600 size-16 mx-auto"
            />
            <p>{credentialFile.name}</p>
          </>
        ):(
          <DocumentTextIcon aria-hidden="true" className="mx-auto size-12 text-gray-300" />
        )}
        <div className="mt-4 flex text-sm/6 text-gray-600">
          <label
            htmlFor="file-upload"
            className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
          >
            
            {/* If profilePic is set, show the uploaded image, else show default */}
            <input 
              {...getInputProps()} 
              className="sr-only"
            />

          </label>
        </div>
        <p className="pl-1 text-center text-sm/6"><span className="text-blue-600 font-semibold cursor-pointer">Upload a file</span> or drag and drop</p>

        <p className="text-xs/5 text-gray-600">PDF, DOCX up to 5MB</p>

      </div>
    </div>
  </div>
  )
}



export function ProfilePhotoUpload({ setSignupForm, signupForm }) {

  const profile_photo = signupForm.profile_photo

  // const [image, setImage] = useState(signupForm.profile_photo);
  const [error, setError] = useState(null);

  const setImage = (image)=>{
    setSignupForm((signupForm)=>({
      ...signupForm,
      profile_photo: image
    }))
  }

  const {
    getInputProps,
    getRootProps,
  } = handleDropFile( 'image', setImage, setError);



  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Profile Picture Container */}
      {error && <span className="text-sm text-red-500">{error}</span>}
      <div
        className="relative flex items-center justify-center w-48 h-48 rounded-full overflow-hidden border-4 border-gray-300"
        {...getRootProps()} // Apply dropzone props here
      >
        <input 
        {...getInputProps()} 
        accept="image/*"

        />

        {/* If image is set, show the uploaded image; else show default */}
        {profile_photo ? (
          <img
            src={profile_photo}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        ) : (
          <UserIcon className="w-24 h-24 text-gray-300" />
        )}

        {/* Camera Icon for Upload Button */}
        <div className="absolute bottom-2 right-3 w-12 h-12 z-10 rounded-full bg-white p-2 cursor-pointer">
          <CameraIcon className="w-6 h-6 text-gray-700" />
        </div>
      </div>

      {/* Drag and drop or click to upload */}
      <p className="text-sm text-gray-500">
        Drag & drop a new image here, or click to select a file
      </p>
    </div>
  );
}




export function LogoUpload({ setSignupForm, signupForm }){

  const logo = signupForm.profile_photo



  // const [image, setImage] = useState(signupForm.profile_photo);
  const [error, setError] = useState(null);

  const setImage = (image)=>{
    setSignupForm((signupForm)=>({
      ...signupForm,
      profile_photo: image
    }))
  }

  const {
    getInputProps,
    getRootProps,
  } = handleDropFile( 'image', setImage, setError);


  return(
    <>
      {error && <span className="text-sm text-red-500">{error}</span>}
      <div 
        className="mt-2 flex items-center gap-x-3"
        {...getRootProps()}
      >
        <input 
        {...getInputProps()} 
        accept="image/*"

        />

        { logo ? (
          <div
          className="size-24 rounded-full overflow-hidden"
        >
            <img
              src={logo}
              alt="Profile"
              className="w-full h-full object-cover"
            />
        </div>

        ):(
          <PhotoIcon aria-hidden="true" className="size-12 text-gray-300" />
        )}

        <label
          className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          Change
        </label>
      </div>
  </>
  )
}