import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useStateContext } from "../../context/ContextProvider";
import StageSetup from '../../components/signup_stage/StageSetup';
import { ProfileReg, StackReg, BioReg, ProfilePhotoReg, CredentialUpload, CompanyReg, SetPassword } from '../../components/signup_stage/StageComponents'
import ProgressBar from '../../components/signup_stage/ProgressBar';
import useStateCookie from '../../hooks/useStateCookie';
import StageButton from '../../components/signup_stage/StageButton';
import {axiosClient} from '../../context/axios';
import { profileRegValidation, companyRegValidation, passwordValidation } from '../../validation/signupValidation';
import Loader from '../../components/core/Loader';
import axios from 'axios';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import useNotification from '../../hooks/useNotification';
import { useNavigate } from 'react-router-dom';
import TButton from '../../components/core/TButton';
import Notification from '../../components/core/Notification';


const getValidationSchema = (regType, stage) => {

  switch (regType) {
    case 'individual':
      switch (stage) {
        case 1:
          return profileRegValidation();
        case 6:
          return passwordValidation;
        default:
          return false;
      }
      break;
    case 'company':
      switch (stage) {
        case 1:
          return companyRegValidation();
        case 4:
          return passwordValidation;
        default:
          return false;
      }
    default:
      return false;
  }
};

const defaultSignUpForm = {
  first_name: "",
  last_name: "",
  title: "",
  company_name: "",
  email: "",
  phone_number: "",
  company_website: "",
  address: "",
  country: "",
  city: "",
  state: "",
  about: "",
  gender: "",
  password: "",
  password_confirmation: "",
  profile_photo: null,
  credential: null,
  interests: [],
  reg_type: ""
}

const SignUp = () => {
  const navigate = useNavigate();
  const { capitalizeFirstLetter, setAuthToken, setCurrentUser } = useStateContext();
  const [interestList, setInterestList] = useStateCookie("intrestList", []);
  const [countries, setCountries] = useStateCookie("countries", []);
  const [cities, setCities] = useStateCookie("cities", []);
  const [chooseCity, setChooseCity] = useState("chooseCity", false);
  
  const [regType, setRegType] = useStateCookie('regType', null);
  const [stage, setStage] = useStateCookie('stage', 1);
  const [totalStages, setTotalStages] = useStateCookie('totalStages', 0);

  const [signupForm, setSignupForm] = useStateCookie("signupForm", defaultSignUpForm);
  const [selectedCountry, setSelectedCountry] = useState(signupForm.country);
  const [loading, setLoading] = useState(false);
  const { message, type, isVisible, showError, showSuccess, showInfo, showWarning } = useNotification();

  // useEffect(()=>{
  //   console.log("updated data", signupForm)
  // }, [signupForm])

// Fetch countries when the component mounts
useEffect(() => {
  if (countries.length == 0) {
    // setLoading(true);
    axios.get('https://restcountries.com/v3.1/all') // API URL to get countries
      .then(({ data }) => {
        const sortedCountries = data
          .map(({ name, cca2 }) => ({ name: name.common, code: cca2 }))
          .sort((a, b) => a.name.localeCompare(b.name));
          setCountries(sortedCountries);
      })
      .catch(err => {
        showError('Error fetching Countries');
        // setLoading(false);  // Stop loading even if error occurs
        console.log(err);
      });
  }
}, []); // Empty dependency array means this runs once when the component mounts

useEffect(() => {
  if(selectedCountry){
    // setLoading(true);
    // Fetch cities for the selected country from GeoNames API
    axios.get('http://api.geonames.org/searchJSON', {
      params: {
        formatted: 'true',
        lang: 'en',
        username: 'daviddracer',
        country: selectedCountry, // Use ISO-3166-1 alpha-2 code (e.g., 'US', 'NG')
        maxRows: 500,
        featureClass: 'P',
        featureCode: 'PPL',
        orderby: 'population', // Sort by population size
      }
    })
    .then(response => {
      // Check if we have the 'geonames' property in the response
      if (response.data && response.data.geonames) {
        // Map, sort and store data in one go
        const cityData = response.data.geonames
          .map(city => ({
            name: city.name + ", " + city.adminName1,              // Extract city name
            code: city.geonameId,              // City unique code (geonameId)
            state: city.adminName1
          }))
          .sort((a, b) => a.state.localeCompare(b.state));  // Sort by name alphabetically
    
        setCities(cityData)
        }
        // setLoading(false);

      })
      .catch(error => {
        showError('Error fetching cities');
        // setLoading(false);
        console.error(error)
      });
    setChooseCity(true);

  } else {
    setChooseCity(false);
  }
}, [selectedCountry]);  // Only depend on key2



useEffect(() => {
  if (interestList.length == 0) {
    console.log("setting loading to ture")
    setLoading(true);
    axiosClient.get('/interests')
    .then( response=>{
      setInterestList(response.data.data);
      setLoading(false);
    console.log("setting loading to false")

    })
    .catch (err => {
      console.error(err);
      showError("Failed In fetching interest list, Please refresh browser or skip stage !")
      setLoading(false);
    console.log("setting loading to false")

    })
  }
}, []);


  const validation = getValidationSchema(regType, stage);
  const { register, trigger, getValues, setValue, reset, setError, formState: { errors } } = useForm({
    resolver: yupResolver(validation),
    mode: "onChange",
    defaultValues: signupForm
  })



  // Handler Functions
  const handleSubmit = async () => {
    const isValid = await trigger();  // Trigger validation for all fields in the form
    if (isValid) {
      const updatedValues = getValues();
  
      // Use updated values directly, not the stale signupForm state
      const { interests,  profile_photo, credential, about} = signupForm;  // Destructure updatedValues


      const payload = { 
        ...updatedValues,  // Spread the rest of the updated values
        reg_type: regType,
        profile_photo: profile_photo,
        credential: credential,
        about: about,
        interests: interests.map(interest => interest.id)  // Map interests to an array of ids
      };
  
      // Ensure credentialFile is removed if necessary
      if (payload.credentialFile) {
        delete payload.credentialFile;
      }
      setLoading(true);
      axiosClient
        .post("/auth/signup", payload)
        .then(({ data }) => {
          setLoading(false);
          console.log(data);
          showSuccess("Your Registration was Successful!")
          setTimeout(() => {
            setAuthToken(data.token)
            navigate('/home'); // Automatically redirect after delay
          }, 2000);
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
  

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSignupForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle user type selection (company or individual)
  const handleregTypeSelection = (type) => {
    setRegType(type);
    setSignupForm((signupForm)=>({
      ...signupForm,
      reg_type: type
    }))
    setStage(1); // Start with the first stage for the selected user type
    type === "individual" ? setTotalStages(6) : setTotalStages(4)
  };


  const handleNextWithValidation = async () => {
    const isValid = await trigger();  // Trigger validation for all fields in the form
    if (isValid) {
      const updatedValues = getValues();
      console.log("updated values", updatedValues)
      console.log("signup form", signupForm)
      const { profile_photo } = signupForm
      setSignupForm({ ...signupForm, ...updatedValues, profile_photo: profile_photo });
      handleNext();  // Move to the next stage if valid
    } else {
      console.log('Validation failed');
    }
  };

  const handleNext = () => {
    if (stage < totalStages) {
      setStage(stage + 1);
    }
  };

  const handlePrevious = () => {
    if (stage > 1) {
      setStage(stage - 1);
    }
  };

  const handleReset = () => {
    setStage(1);
    setRegType(null);
    setSignupForm(defaultSignUpForm);
    reset();
  };

  return (
    
    <>
      {
        regType ? (
          <div className='sm:mx-auto sm:w-full sm:max-w-3xl'>

              <h2 className='text-center text-2xl md:text-3xl font-normal text-gray-800 mt-8 md:mt-0'>Registering as {capitalizeFirstLetter(regType)}</h2>
              { stage > 1 && 
                <TButton
                  overideClass={true}
                  onClick={()=>{setStage(totalStages)}}
                  className=" mt-6 px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center space-x-3"
                  >
                  <span>Skip</span>
                  <ArrowRightIcon className="h-5 w-5 transform transition-all duration-300 ease-in-out hover:translate-x-2" />
                </TButton>

              }
                <div className="border bg-white shadow-lg rounded-lg px-6 py-8 md:px-12 md:py-15 md:py-12 border-gray-900/10 mt-10">
                  { isVisible && <Notification 
                    message={message} 
                    type={type}
                  />}

                  {loading && <Loader />}

                  {   
                    regType === "individual" && stage === 1 && (
                      
                      <>
                        <ProfileReg
                          errors={errors}
                          register={register}
                          setValue={setValue}
                          countries={countries}
                          chooseCity={chooseCity}
                          setSelectedCountry={setSelectedCountry}
                          cities={cities}
                        />
                      </>
                    )
                  }
                  {   
                    stage === 2 && (
                      <>
                        <StackReg
                          interestList={interestList}
                          interests={signupForm.interests}
                          setSignupForm={setSignupForm}
                        />
                      </>
                    )
                  }
                  {   
                    regType === "individual" && stage === 3 && (
                      <BioReg
                        value={signupForm.about}
                        handleInputChange={handleInputChange}
                      />
                    )
                  }
                  {   
                    regType === "individual" && stage === 4 && (
                      <>
                        <ProfilePhotoReg
                          setSignupForm={setSignupForm}
                          signupForm={signupForm}
                        />

                      </>
                    )
                  }
                  {   
                    ((regType === "individual" && stage === 5) ||
                    (regType === "company" && stage === 3))
                      && (
                      <>
                        <CredentialUpload
                          setSignupForm={setSignupForm}
                          signupForm={signupForm}
                          label={regType}
                        />

                      </>
                    )
                  }
                  {   
                    regType === "company" && stage === 1 && (
                      <>
                        <CompanyReg
                          register={register}
                          errors={errors}
                          countries={countries}
                          chooseCity={chooseCity}
                          setSelectedCountry={setSelectedCountry}
                          cities={cities}
                          setSignupForm={setSignupForm}
                          signupForm={signupForm}
                        />

                      </>
                    )
                  }
                  {   
                    regType && stage === totalStages && (
                      <>
                        <SetPassword
                          register={register}
                          errors={errors}
                        />
                        {/* { setFormVal("password") } */}

                      </>
                    )
                  }

                  </div>

                  <div className="mt-10">
                    <StageButton
                      stage={stage}
                      totalStage={totalStages}
                      // handleNext={handleNext}
                      handlePrevious={handlePrevious}
                      handleSubmit={handleSubmit}
                      handleNext={ validation ? handleNextWithValidation : handleNext}
                    />
                    <ProgressBar 
                      currentStage={stage}
                      totalStages={totalStages}
                    />
                    <button 
                        className=" text-center font-semibold text-blue-600 hover:text-blue-700"
                        onClick={handleReset}
                    >
                      Restart Registration
                    </button>
                  </div>
          </div>
                
        ) : (
            <StageSetup 
              handleregTypeSelection={handleregTypeSelection}
            />
        )
      }
      <p className="mt-10 text-center text-sm/6 text-gray-500">
            already have account?{' '}
            <a href="/auth/signin" className="font-semibold text-blue-600 hover:text-blue-700">
              sign in
            </a>
      </p>
    </>

  );
}

export default SignUp;