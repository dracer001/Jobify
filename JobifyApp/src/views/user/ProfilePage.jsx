import { PaperClipIcon } from '@heroicons/react/20/solid';
import { Link } from 'react-router-dom';
import TButton from '../../components/core/TButton';
import { useEffect, useState } from 'react';
import { useStateContext } from '../../context/ContextProvider';
import Loader from '../../components/core/Loader';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { profileRegValidation, companyRegValidation } from '../../validation/signupValidation';
import { axiosClient } from '../../context/axios';
import { FileUpload, LogoUpload } from '../../components/form/FIleForm';
import TextareaForm from '../../components/form/TextareaForm';
import InputForm from '../../components/form/InputForm';
import SelectForm from '../../components/form/SelectForm';
import RadioForm from '../../components/form/RadioForm';
import useError from '../../hooks/useNotification';
import axios from 'axios';
import useStateCookie from '../../hooks/useStateCookie';
import useNotification from '../../hooks/useNotification';
import { handleDropFile } from '../../hooks/fileHandler';
import { CameraIcon, UserIcon } from '@heroicons/react/24/solid';
import { fetchCities, fetchCountries, fetchInterests } from '../../context/api';
import ProfilePhotoUpload from '../../components/form/ProfilePhotoUpload';
import SelectSearch from '../../components/form/SelectSearch';
import Notification from '../../components/core/Notification';
import { isEmpty } from '../../helperFunctions';


const getValidationSchema = (regType, currentEmail = null) => {
  return (regType == "company") ? companyRegValidation(currentEmail) : profileRegValidation(currentEmail);
};

export default function ProfilePage() {


  // get current user data
  const { currentUser } = useStateContext();

  // notification contexts vaiables
  const { message, type, isVisible, showError, showSuccess } = useNotification();

  // state variable for edited data of user
  const [editedUser, setEditedUser] = useState(currentUser);

  // state to check if info is in editing mode
  const [isEditing, setIsEditing] = useState(false);


  //State Variables related to form filling
  const [interestList, setInterestList] = useStateCookie("interestList", []);
  const [countries, setCountries] = useStateCookie("countries", []);
  const [cities, setCities] = useStateCookie("cities", []);
  const [chooseCity, setChooseCity] = useState("chooseCity", false);
  const [selectedCountry, setSelectedCountry] = useState(editedUser.country);


  // handle loding stage
  const [loading, setLoading] = useState(false);

  // State to handle edit mode


  useEffect(() => {
    if (Object.keys(currentUser).length === 0) {
      setLoading(true);  // If currentUser is an empty object, show loading state
    } else {
      setEditedUser(currentUser);  // Set editedUser once currentUser is available
      setLoading(false);  // Hide loading once data is available
      reset(currentUser);
      setSelectedCountry(currentUser.country);
    }
  }, [currentUser]);

  useEffect(() => {
    if (interestList.length === 0) {
      // Call the fetchInterests function to get the data
      fetchInterests()
        .then((data) => {
          setInterestList(data); // Update state with the interest list
        })
        .catch((err) => {
          console.error(err);
          showError('Failed in fetching interest list, Please refresh browser or skip stage!');
        });
    }
  }, [interestList]); // Trigger the effect when `interestList` changes

  useEffect(() => {
    if (countries.length == 0) {
      fetchCountries()
        .then(sortedCountries => {
          setCountries(sortedCountries)
        })
        .catch(err => {
          showError('Failed to fetch countries')
          console.log('Failed to fetch countries: ', err);
        });
    }
  }, []); // Empty dependency array means this runs once when the component mounts

  useEffect(() => {

    const country = countries.find(
      country => country.name === selectedCountry || country.code === selectedCountry
    ) || null;
    if (country) {
      // Call the fetchCities function to get city data
      fetchCities(country.code)
        .then(cityData => {
          setCities(cityData); // Update cities state
        })
        .catch(error => {
          // Handle error, maybe show a message
          showError('Error fetching cities');
          console.error(error);
        });
    } else {
      setChooseCity(false);
    }
  }, [selectedCountry]); // Only trigger when `selectedCountry` changes

  // Handle file upload for image and CV
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onloadend = () => {
      setEditedUser((editeUser) => ({
        ...editeUser,
        [name]: reader.result,
      }));
    }

  };


  const validation = getValidationSchema(currentUser.user_type, currentUser.email);
  const { register, trigger, getValues, setValue, reset, formState: { errors } } = useForm({
    resolver: yupResolver(validation),
    mode: "onChange",
    defaultValues: currentUser
  })

  // Handler Functions
  const handleSubmit = async () => {
    const isValid = await trigger();  // Trigger validation for all fields in the form
    if (isValid) {
      const updatedValues = getValues();

      // Use updated values directly, not the stale signupForm state
      const { interests, profile_photo, credential, about } = editedUser;  // Destructure updatedValues


      const payload = {
        ...updatedValues,  // Spread the rest of the updated values
        profile_photo: profile_photo,
        credential: credential,
        about: about,
        interests: interests.map(interest => interest.id)  // Map interests to an array of ids
      };

      // Ensure credentialFile is removed if necessary
      setLoading(true);
      axiosClient
        .patch("/user/update", payload)
        .then(({ data }) => {
          setLoading(false);
          console.log(data);
          setIsEditing(false);

          showSuccess("Profile Updated Successfully!")
        })
        .catch((error) => {
          setLoading(false);
          console.error(error);
          if (error.response && error.response.data.errors) {
            const finalErrors = Object.values(error.response.data.errors).reduce(
              (accum, next) => [...accum, ...next],
              []
            );
            console.log(finalErrors);
            showError(finalErrors.join("<br>")); // Make sure to sanitize HTML if needed
          } else {
            console.error("Unknown error:", error);
          }
        });
    } else {
      console.log("Validation failed");
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleInterestClick = (interest) => {
    const interests = editedUser.interests
    // Check if the interest is already selected
    if (interests.some(item => item.id === interest.id)) {
      console.log("HAS INTEREST")
      // Remove the interest if already selected
      setEditedUser((prevSignupForm) => {
        const updatedInterests = prevSignupForm.interests.filter(item => item.id !== interest.id);
        return {
          ...prevSignupForm,
          interests: updatedInterests,
        };
      });

    } else {
      // Add the interest if not already selected and if less than 5
      console.log("HAS not INTEREST")

      if (interests.length < 5) {
        setEditedUser((prevSignupForm) => ({
          ...prevSignupForm,
          interests: [...interests, interest],
        }));
      }
    }
  };

  const saveImage = (photo) => {
    setEditedUser((editedForm) => ({
      ...editedForm,
      profile_photo: photo
    }));
  }


  const handleEdit = () => {
    if (isEditing) {
      setIsEditing(false);
      setEditedUser(currentUser); // Revert to the original user data
    } else {
      setIsEditing(true);
    }
  };


  return (
    <>
      {isVisible && <Notification message={message} type={type} />}

      {
        loading ?
          (
            <Loader />
          ) : (
            <div className="px-4 mb-6">
              {isEditing ? (
                <ProfilePhotoUpload
                  profilePhoto={editedUser.profile_photo}
                  saveProfilePhoto={saveImage}
                  size='size-36'
                  cameraClass='bottom-1 right-2 w-8 h-8 z-10'
                />
              ) : (
                <div
                  className={`relative flex items-center justify-center size-36 rounded-full overflow-hidden border-2 border-gray-300`}
                >
                  {/* If image is set, show the uploaded image; else show default */}
                  {editedUser.profile_photo ? (
                    <img
                      src={editedUser.profile_photo}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <UserIcon className={`size-36 text-gray-300`} />
                  )}
                </div>
              )}

              <div className='flex items-center justify-end space-x-5'>
                <TButton
                  size='sm'
                  to={`/user/view/${editedUser.id}`}
                  className='font-semibold rounded-md'
                >
                  Public View
                </TButton>
                <TButton
                  color="light-gray"
                  onClick={handleEdit}
                  size='sm'
                  className='font-semibold'
                >
                  {isEditing ? 'Cancel Edit' : 'Edit Profile'}
                </TButton>
              </div>


              <div className="mt-6 border-t border-gray-100">
                <dl className="divide-y divide-gray-100">

                  {editedUser.user_type === 'individual' ? (
                    <>
                      {/* Last Name */}
                      <div className="px-4 mb-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                          <InputForm
                            name="last_name"
                            register={register}
                            error={errors?.last_name?.message}
                            disabled={!isEditing}
                            label='Last name'
                          />
                      </div>

                      {/* First name */}
                      <div className="px-4 mb-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                          <InputForm
                            name="first_name"
                            register={register}
                            error={errors?.first_name?.message}
                            disabled={!isEditing}
                            label='First name'
                          />

                      </div>

                      {/* Title */}
                      <div className="px-4 mb-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                          <InputForm
                            name="title"
                            register={register}
                            error={errors?.title?.message}
                            disabled={!isEditing}
                            label='Title/Job Role'
                          />
                      </div>

                    </>
                  ) : (
                    <>
                      {/* Company name */}
                      <div className="px-4 mb-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                          <InputForm
                            name="company_name"
                            register={register}
                            error={errors?.company_name?.message}
                            disabled={!isEditing}
                            label='Company name'
                          />
                      </div>

                      {/* Company Website */}
                      <div className="px-4 mb-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                          <InputForm
                            name="company_website"
                            register={register}
                            error={errors?.company_website?.message}
                            disabled={!isEditing}
                            label='Company website'
                          />
                      </div>
                    </>

                  )}
                  {/* Email Address */}
                  <div className="px-4 mb-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <InputForm
                        name="email"
                        register={register}
                        error={errors?.email?.message}
                        disabled={!isEditing}
                        label='Email'

                      />
                  </div>

                  {/* Phone Number */}
                  <div className="px-4 mb-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <InputForm
                        name="phone_number"
                        label='Phone number'
                        register={register}
                        error={errors?.phone_number?.message}
                        disabled={!isEditing}
                      />
                  </div>

                  {/* Address */}
                  <div className="px-4 mb-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <InputForm
                        name="address"
                        label='Address'
                        register={register}
                        error={errors?.address?.message}
                        disabled={!isEditing}
                      />
                  </div>

                  {/* Country */}
                  <div className="px-4 mb-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <SelectSearch
                      name='country'
                      register={register}
                      onChange={
                        (e) => {
                          console.log("lets see if e rign", e);
                          setSelectedCountry(e.name);
                          setValue('country', e.name);
                        }
                      }
                      options={countries}
                      error={errors?.country?.message}
                      label='Country'
                      placeHolder='select a country'
                      disabled={!isEditing}
                      defaultValue={countries.find(country => country.name === selectedCountry)}
                    />
                  </div>

                  {/* City */}
                  <div className="px-4 mb-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <SelectSearch
                      name='city'
                      register={register}
                      onChange={
                        (e) => {
                          if(isEmpty(e)){
                            console.log("empty value found");
                            setValue('city', "")
                          }else{
                            console.log("nothing is empty value not found");

                          setValue('city', e.name)
                          }
                        }
                      }
                      options={cities}
                      error={errors?.city?.message}
                      label='City / Region'
                      placeHolder='select a city/region'
                      disabled={!isEditing}
                      defaultValue={cities.find(city => city.name === editedUser.city)}

                    />
                  </div>


                  {/* About */}
                  <div className="px-4 mb-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <TextareaForm
                          name="about"
                          label="About"
                          register={register}
                          error={errors?.about?.message}
                          rows="4"
                          disabled={!isEditing}

                        />
                  </div>

                  {/* CV File */}
                  <div className="px-4 mb-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium text-gray-900">CV</dt>
                    <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">

                      {isEditing || !editedUser.credential ? (
                        <input
                          type="file"
                          name="credential"
                          onChange={handleFileChange}
                          className="border border-gray-300 p-2 rounded-md"
                        />
                      ) : (
                        <div className="flex items-center">
                          <PaperClipIcon aria-hidden="true" className="w-5 h-5 shrink-0 text-gray-400" />
                          <a href={editedUser.credential} target='_blank' download={true} className="ml-4 text-blue-600 font-medium">download cv</a>
                        </div>
                      )}
                    </dd>
                  </div>

                </dl>
              </div >

              {/* Edit/Save Button */}
              < div className="mt-6 flex justify-end" >
                {!isEditing ? (
                  <></>
                ) : (
                  <TButton
                    onClick={handleSubmit}
                    color='green'
                    size='sm'
                    className="font-semibold bg-green-600 hover:bg-green-500"
                  >
                    Save Changes
                  </TButton>
                )
                }
              </div >
            </div >
          )
      }

    </>

  );
}





