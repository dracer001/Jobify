import { ChatBubbleLeftRightIcon, UserIcon } from '@heroicons/react/24/outline';
import { Link, useParams } from 'react-router-dom';
import { useStateContext } from '../../context/ContextProvider';
import { axiosClient } from '../../context/axios';
import { useEffect, useState } from 'react';
import useNotification from '../../hooks/useNotification';
import Loader from '../../components/core/Loader';
import { isEmpty } from '../../helperFunctions';
import TButton from '../../components/core/TButton';


export default function UserProfile() {
  const { currentUser } = useStateContext();
  const { message, showError, type, isVisible } = useNotification();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    if(!isEmpty(currentUser) && isEmpty(user)){
      setLoading(true);

      axiosClient.get('/user/' + id)
      .then(({ data }) => {
        setUser(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false)
        showError("failed is getting user ")
      });
    }
  }, [currentUser]);



  const isCompany = user.reg_type == "company";  // Check if it's a company profile

  return (
<>

      {isVisible && <Notification message={message} type={type} />}

    {
      loading ? 
      (
        <Loader />
      ):(
        <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-md max-w-4xl">
        <div className="bg-white shadow-xl rounded-lg p-6 space-y-6">
          {/* Profile Header */}
          <div className="flex flex-col justify-center space-y-3 items-center">

            <div
              className={`relative flex items-center justify-center size-36 rounded-full overflow-hidden border-2 border-gray-300`}
            >
              {/* If image is set, show the uploaded image; else show default */}
              {user.profile_photo ? (
                <img
                  src={user.profile_photo}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <UserIcon className={`size-36 text-gray-300`} />
              )}
            </div>

            <div className='text-center'>
              <h1 className="text-3xl font-semibold text-gray-800">
                {isCompany ? user.company_name : `${user.first_name} ${user.last_name}`}
              </h1>
              <p className="text-xl text-gray-600">{isCompany ? 'Company' : user.title}</p>
              <p className="text-sm text-gray-500">{user.city}, {user.country}</p>
              <div className="mt-4">
                {
                  isCompany &&
                  <Link
                  to={isCompany ? user.company_website : `mailto:${user.email}`}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  {isCompany ? 'Visit Website' : 'Send Email'}
                </Link>
                }
                <div className="mt-6 flex justify-center gap-4">
                  <TButton
                  size='sm'
                    to="/hire" // Link to the chat page
                    className="font-semibold text-white flex items-center gap-2"
                  >
                    Hire
                  </TButton>
                  <TButton
                  size='sm'
                    to="/chat" // Link to the chat page
                    transparent={true}
                    className="font-semibold flex items-center gap-1"
                  >
                    <ChatBubbleLeftRightIcon className="h-5 w-5" />
                    Chat
                  </TButton>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        {/* About Section */}
        <div className="bg-white shadow-xl rounded-lg p-6 mt-8">
          <div className="text-lg font-semibold text-gray-800 mb-4">About</div>
          <p className="text-gray-600">{user.about || 'No information provided'}</p>
        </div>
  
        {/* Skills/Tech Stack Section */}
        <div className="bg-white shadow-xl rounded-lg p-6 mt-8">
          <div className="text-lg font-semibold text-gray-800 mb-4">Skills / Tech Stack</div>
          <div className="flex flex-wrap gap-3">
            {user.interests?.length ? (
              user.interests.map((skill, index) => (
                <span key={index} className="bg-blue-100 text-blue-600 text-xs font-semibold px-4 py-2 rounded-full">
                  {skill.name}
                </span>
              ))
            ) : (
              <span>No skills listed</span>
            )}
          </div>
        </div>
  
        {/* Profile Details */}
        <div className="bg-white shadow-xl rounded-lg p-6 mt-8">
          <div className="text-lg font-semibold text-gray-800 mb-4">Other Information</div>
          <div className="space-y-3">
            {isCompany ? (
              <>
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span className="font-semibold text-gray-800">Company Email:</span>
                  <span>{user.companyEmail}</span>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span className="font-semibold text-gray-800">Company Certification:</span>
                  <span>{user.companyCertification || 'N/A'}</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span className="font-semibold text-gray-800">Email:</span>
                  <span>{user.email}</span>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span className="font-semibold text-gray-800">Address:</span>
                  <span>{user.address}</span>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span className="font-semibold text-gray-800">CV:</span>
                  <a href={user.cv} className="text-blue-600 hover:text-blue-800" download>
                    Download CV
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
  
      </div>
      )
    }
</>

  )
}
