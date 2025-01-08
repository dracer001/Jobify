import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import { useEffect, useState } from 'react';
import InputForm from '../form/InputForm';
import SelectForm from '../form/SelectForm';
import RadioForm from '../form/RadioForm';
import { FileUpload, LogoUpload, ProfilePhotoUpload } from '../form/FIleForm';
import TextareaForm from '../form/TextareaForm';
import DatalistForm from '../form/DataListForm';
import SelectSearch from '../form/SelectSearch';

function ProfileReg({ errors, register, setValue, countries, chooseCity, setSelectedCountry, cities }) {

    return(
        <div className="">
          <h2 className="text-base/7 font-semibold text-gray-900">Personal Information</h2>
          <p className="mt-1 text-sm/6 text-gray-600">
            Your Information is safe with us 
            <a 
                href=""
                className='text-blue-600'
                > &nbsp; learn why </a>
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
                <InputForm
                    name="first_name"
                    label='First name'
                    register={register}
                    error={errors?.first_name?.message}
                />
            </div>

            <div className="sm:col-span-3">
                <InputForm
                    name="last_name"
                    label='Last name'
                    register={register}
                    error={errors?.last_name?.message}
                />
            </div>
            <div className="col-span-full">
                <InputForm
                    name="title"
                    label='Job Role / title'
                    placeHolder='e.g. Sofware Developer | Programmer'
                    register={register}
                    error={errors?.title?.message}
                />
            </div>

            <div className="sm:col-span-3">
                <InputForm
                    name="email"
                    type="email"
                    label='Email'
                    register={register}
                    error={errors?.email?.message}
                />
            </div>

            <div className="sm:col-span-3">
              <InputForm
                name="phone_number"
                label="Phone number"
                type="number"
                register={register}
                error={errors?.phone_number?.message}
              />
            </div>

            <div className="col-span-full">
                    
              <InputForm
                name="address"
                label="Street address"
                type="text"
                register={register}
                error={errors?.address?.message}
              />
            </div>


            <div className="sm:col-span-3">
            {/* <label htmlFor="country" className="block text-sm/6 font-medium text-gray-900">
                Country
            </label> */}
                <SelectSearch
                    name='country'
                    register={register}
                    onChange={ 
                        (e) => {
                            setSelectedCountry(e.code);
                            setValue('country', e.name);
                        }
                    }
                    options={countries}
                    error={errors?.country?.message}
                    label='Country'
                    placeHolder='select a country'
                />
            </div>

            <div className="sm:col-span-3">
                <SelectSearch
                    name='city'
                    register={register}
                    onChange={ 
                        (e) => {
                            setValue('city', e.name)
                        }
                    }
                    options={cities}
                    error={errors?.city?.message}
                    label='City / Region'
                    placeHolder='select a country'
                    disabled={!chooseCity}
                />
            </div>

            <div className="col-span-full">
                <RadioForm
                    name='gender'
                    label='Gender'
                    register={register}
                    error={errors?.gender?.message}
                    options={[
                        { value:"male", label:"Male" },
                        { value:"female", label:"Female" },
                        { value:"other", label:"Others" }
                    ]}

                />
            </div>

          </div>
        </div>
    );
}

function CompanyReg({ register,  errors, countries, chooseCity, setSelectedCountry, cities, signupForm, setSignupForm }) {

    return(
        <div className="">
          <h2 className="text-base/7 font-semibold text-gray-900">Company Information</h2>
          <p className="mt-1 text-sm/6 text-gray-600">
            Your Information is safe with us 
            <a 
                href=""
                className='text-blue-600'
                > &nbsp; learn why </a>
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

            <div className="sm:col-span-full">
                <InputForm
                    name="company_name"
                    label='Company Name'
                    register={register}
                    error={errors.company_name?.message}
                />
            </div>

            <div className="sm:col-span-3">
                <InputForm
                    name="email"
                    type="email"
                    label='Company Email'
                    register={register}
                    error={errors.email?.message}
                />
            </div>

            <div className="sm:col-span-3">
                <InputForm
                    name="company_website"
                    type="url"
                    label='Company Website'
                    register={register}
                    error={errors.company_website?.message}
                />
            </div>

            <div className="col-span-full">
                <InputForm
                    name="address"
                    label="Company's address"
                    register={register}
                    error={errors.address?.message}
                />
            </div>

            <div className="sm:col-span-3">
                <SelectForm
                    name="country"
                    label='Country'
                    register={register}
                    error={errors?.country?.message}
                    options={countries}
                    onChange={ (e) => setSelectedCountry(e.target.value)}
                />
            </div>

            <div className="sm:col-span-3">
                <SelectForm
                    name="city"
                    label='city / Province'
                    register={register}
                    error={errors?.city?.message}
                    options={cities}
                    disabled={!chooseCity}

                />
            </div>

            <div className="sm:col-span-full">
                <TextareaForm
                    name="about"
                    label='Company Info'
                    register={register}
                />
            </div>

            <div className="col-span-full">
                <label  className="block text-sm/6 font-medium text-gray-900">
                    Company Logo
                </label>
                <LogoUpload
                    setSignupForm={setSignupForm}
                    signupForm={signupForm}
                />
            </div>
          </div>
        </div>
    );
}

function BioReg({value, handleInputChange}) {
    // Register function to return value and onChange handler
    const register = (name) => {
        return {
        value: value || '',
        onChange: handleInputChange
        };
    };
    return(
        <div className="col-span-full">
            <TextareaForm
                label="Tell us about yourself."
                name="about"
                rows={5}
                register={register}
            />
            <p className="mt-3 text-sm/6 text-gray-600">feel free to add info on work experience.</p>
        </div>
    );
}


function StackReg({ interestList, interests, setSignupForm }) {
    const [searchTerm, setSearchTerm] = useState("");

    const handleInterestClick = (interest) => {
        if (interests.some((item) => item.id === interest.id)) {
            setSignupForm((prevSignupForm) => ({
                ...prevSignupForm,
                interests: prevSignupForm.interests.filter(
                    (item) => item.id !== interest.id
                ),
            }));
        } else if (interests.length < 5) {
            setSignupForm((signupForm) => ({
                ...signupForm,
                interests: [...interests, interest],
            }));
        }
    };

    const filteredInterests = interestList.filter((interest) =>
        interest.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="max-w-4xl mx-auto md:p-6 p-0 md:pt-0">
            {/* Header */}
            <div className="">
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
                    Select Skill Interest
                </h2>
                <p className="text-center text-gray-600 mb-6">
                    You can select up to <span className="font-bold">5 skills</span>.
                </p>

                {/* Search Bar */}
                <div className="mb-4 shadow-lg">
                    <input
                        type="text"
                        placeholder="Search interests..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>

                {/* Interest Grid */}
                <div className="h-64 overflow-y-auto border shadow-lg border-gray-200 rounded-lg p-4">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {filteredInterests.map((interest) => (
                            <button
                                key={interest.id}
                                className={`flex items-center justify-center p-4 border-2 rounded-lg text-sm font-medium transition-colors 
                                    ${interests.some((item) => item.id === interest.id)
                                        ? "bg-blue-500 text-white border-blue-600"
                                        : "bg-gray-200 text-gray-800 hover:bg-gray-300 border-gray-300"
                                    }`}
                                onClick={() => handleInterestClick(interest)}
                            >
                                {interest.name}
                            </button>
                        ))}
                        {filteredInterests.length === 0 && (
                            <p className="text-gray-500 text-sm col-span-full text-center">
                                No matches found.
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Selected Interests */}
            <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">Your Selected Skill:</h3>
                <div className="flex flex-wrap gap-3">
                    {interests.map((interest) => (
                        <div
                            key={interest.id}
                            className="flex items-center px-3 py-2 bg-blue-500 text-white rounded-lg text-sm"
                        >
                            {interest.name}
                            <button
                                onClick={() => handleInterestClick(interest)}
                                className="ml-2 text-xs font-bold bg-white text-blue-500 rounded-full size-5 flex justify-center"
                            >
                                &times;
                            </button>
                        </div>
                    ))}
                    {interests.length === 0 && (
                        <p className="text-gray-500 text-sm">No interests selected yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
}



function ProfilePhotoReg({ setSignupForm, signupForm }) {

    return(
        <>
            <p 
                className='text-center text-2xl font-bold text-slate-600 mb-5'
            >Upload Your Profile Photo</p>
            <ProfilePhotoUpload
                setSignupForm={setSignupForm}
                signupForm={signupForm}
            />


            <p className="text-xs text-red-300 mt-8 text-center">
                note: files uploaded will dissapear when page is reloaded
            </p>

        </>


    );
}

function CredentialUpload({ setSignupForm, signupForm, label }) {
    const title = (label === "individual")
        ? "Upload Your CV/Resume" :
        (label === "company") ? "Upload Company Certification" :
        "Upload File"

    return(
        <>
            <p 
                className='text-center text-2xl font-bold text-slate-600 mb-5'
            >{title}</p>
            <FileUpload
                signupForm={signupForm}
                setSignupForm={setSignupForm}
            />
            <p className="text-xs text-red-300 mt-8 text-center">
                note: files uploaded will dissapear when page is reloaded
            </p>
        </>

    );
}

function SetPassword({ register, errors}) {

    return(
        <div className="">
          <h2 className="text-base/7 font-semibold text-gray-900">Set Your Password</h2>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8">
            <div className="">
                <InputForm
                    name="password"
                    type="password"
                    label='Password'
                    register={register}
                    error={errors.password?.message}
                />
            </div>

            <div className="">
                <InputForm
                    name="password_confirmation"
                    type="password"
                    label='Confirm password'
                    register={register}
                    error={errors.password_confirmation?.message}
                />
            </div>

          </div>
        </div>
    );
}

export {
    ProfileReg,
    StackReg,
    BioReg,
    ProfilePhotoReg,
    CredentialUpload,
    CompanyReg,
    SetPassword
};