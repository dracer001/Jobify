
// export default function Example() {
//   return (
//     <form>
//       <div className="space-y-12">
//         <div className="border-b border-gray-900/10 pb-12">
//           <h2 className="text-base/7 font-semibold text-gray-900">Profile</h2>
//           <p className="mt-1 text-sm/6 text-gray-600">
//             This information will be displayed publicly so be careful what you share.
//           </p>

//           <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
//             <div className="sm:col-span-4">
//               <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
//                 Username
//               </label>
//               <div className="mt-2">
//                 <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
//                   <div className="shrink-0 select-none text-base text-gray-500 sm:text-sm/6">workcation.com/</div>
//                   <input
//                     id="username"
//                     name="username"
//                     type="text"
//                     placeholder="janesmith"
//                     className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="col-span-full">
//               <label htmlFor="about" className="block text-sm/6 font-medium text-gray-900">
//                 About
//               </label>
//               <div className="mt-2">
//                 <textarea
//                   id="about"
//                   name="about"
//                   rows={3}
//                   className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
//                   defaultValue={''}
//                 />
//               </div>
//               <p className="mt-3 text-sm/6 text-gray-600">Write a few sentences about yourself.</p>
//             </div>

//             <div className="col-span-full">
//               <label htmlFor="photo" className="block text-sm/6 font-medium text-gray-900">
//                 Photo
//               </label>
//               <div className="mt-2 flex items-center gap-x-3">
//                 <UserCircleIcon aria-hidden="true" className="size-12 text-gray-300" />
//                 <button
//                   type="button"
//                   className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
//                 >
//                   Change
//                 </button>
//               </div>
//             </div>

//             <div className="col-span-full">
//               <label htmlFor="cover-photo" className="block text-sm/6 font-medium text-gray-900">
//                 Cover photo
//               </label>
//               <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
//                 <div className="text-center">
//                   <PhotoIcon aria-hidden="true" className="mx-auto size-12 text-gray-300" />
//                   <div className="mt-4 flex text-sm/6 text-gray-600">
//                     <label
//                       htmlFor="file-upload"
//                       className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
//                     >
//                       <span>Upload a file</span>
//                       <input id="file-upload" name="file-upload" type="file" className="sr-only" />
//                     </label>
//                     <p className="pl-1">or drag and drop</p>
//                   </div>
//                   <p className="text-xs/5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="border-b border-gray-900/10 pb-12">
//           <h2 className="text-base/7 font-semibold text-gray-900">Personal Information</h2>
//           <p className="mt-1 text-sm/6 text-gray-600">Use a permanent address where you can receive mail.</p>

//           <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
//             <div className="sm:col-span-3">
//               <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">
//                 First name
//               </label>
//               <div className="mt-2">
//                 <input
//                   id="first-name"
//                   name="first-name"
//                   type="text"
//                   autoComplete="given-name"
//                   className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
//                 />
//               </div>
//             </div>

//             <div className="sm:col-span-3">
//               <label htmlFor="last-name" className="block text-sm/6 font-medium text-gray-900">
//                 Last name
//               </label>
//               <div className="mt-2">
//                 <input
//                   id="last-name"
//                   name="last-name"
//                   type="text"
//                   autoComplete="family-name"
//                   className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
//                 />
//               </div>
//             </div>

//             <div className="sm:col-span-4">
//               <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
//                 Email address
//               </label>
//               <div className="mt-2">
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   autoComplete="email"
//                   className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
//                 />
//               </div>
//             </div>

//             <div className="sm:col-span-3">
//               <label htmlFor="country" className="block text-sm/6 font-medium text-gray-900">
//                 Country
//               </label>
//               <div className="mt-2 grid grid-cols-1">
//                 <select
//                   id="country"
//                   name="country"
//                   autoComplete="country-name"
//                   className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
//                 >
//                   <option>United States</option>
//                   <option>Canada</option>
//                   <option>Mexico</option>
//                 </select>
//                 <ChevronDownIcon
//                   aria-hidden="true"
//                   className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
//                 />
//               </div>
//             </div>

//             <div className="col-span-full">
//               <label htmlFor="street-address" className="block text-sm/6 font-medium text-gray-900">
//                 Street address
//               </label>
//               <div className="mt-2">
//                 <input
//                   id="street-address"
//                   name="street-address"
//                   type="text"
//                   autoComplete="street-address"
//                   className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
//                 />
//               </div>
//             </div>

//             <div className="sm:col-span-2 sm:col-start-1">
//               <label htmlFor="city" className="block text-sm/6 font-medium text-gray-900">
//                 City
//               </label>
//               <div className="mt-2">
//                 <input
//                   id="city"
//                   name="city"
//                   type="text"
//                   autoComplete="address-level2"
//                   className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
//                 />
//               </div>
//             </div>

//             <div className="sm:col-span-2">
//               <label htmlFor="region" className="block text-sm/6 font-medium text-gray-900">
//                 State / Province
//               </label>
//               <div className="mt-2">
//                 <input
//                   id="region"
//                   name="region"
//                   type="text"
//                   autoComplete="address-level1"
//                   className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
//                 />
//               </div>
//             </div>

//             <div className="sm:col-span-2">
//               <label htmlFor="postal-code" className="block text-sm/6 font-medium text-gray-900">
//                 ZIP / Postal code
//               </label>
//               <div className="mt-2">
//                 <input
//                   id="postal-code"
//                   name="postal-code"
//                   type="text"
//                   autoComplete="postal-code"
//                   className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="border-b border-gray-900/10 pb-12">
//           <h2 className="text-base/7 font-semibold text-gray-900">Notifications</h2>
//           <p className="mt-1 text-sm/6 text-gray-600">
//             We'll always let you know about important changes, but you pick what else you want to hear about.
//           </p>

//           <div className="mt-10 space-y-10">
//             <fieldset>
//               <legend className="text-sm/6 font-semibold text-gray-900">By email</legend>
//               <div className="mt-6 space-y-6">
//                 <div className="flex gap-3">
//                   <div className="flex h-6 shrink-0 items-center">
//                     <div className="group grid size-4 grid-cols-1">
//                       <input
//                         defaultChecked
//                         id="comments"
//                         name="comments"
//                         type="checkbox"
//                         aria-describedby="comments-description"
//                         className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
//                       />
//                       <svg
//                         fill="none"
//                         viewBox="0 0 14 14"
//                         className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
//                       >
//                         <path
//                           d="M3 8L6 11L11 3.5"
//                           strokeWidth={2}
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           className="opacity-0 group-has-[:checked]:opacity-100"
//                         />
//                         <path
//                           d="M3 7H11"
//                           strokeWidth={2}
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           className="opacity-0 group-has-[:indeterminate]:opacity-100"
//                         />
//                       </svg>
//                     </div>
//                   </div>
//                   <div className="text-sm/6">
//                     <label htmlFor="comments" className="font-medium text-gray-900">
//                       Comments
//                     </label>
//                     <p id="comments-description" className="text-gray-500">
//                       Get notified when someones posts a comment on a posting.
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex gap-3">
//                   <div className="flex h-6 shrink-0 items-center">
//                     <div className="group grid size-4 grid-cols-1">
//                       <input
//                         id="candidates"
//                         name="candidates"
//                         type="checkbox"
//                         aria-describedby="candidates-description"
//                         className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
//                       />
//                       <svg
//                         fill="none"
//                         viewBox="0 0 14 14"
//                         className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
//                       >
//                         <path
//                           d="M3 8L6 11L11 3.5"
//                           strokeWidth={2}
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           className="opacity-0 group-has-[:checked]:opacity-100"
//                         />
//                         <path
//                           d="M3 7H11"
//                           strokeWidth={2}
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           className="opacity-0 group-has-[:indeterminate]:opacity-100"
//                         />
//                       </svg>
//                     </div>
//                   </div>
//                   <div className="text-sm/6">
//                     <label htmlFor="candidates" className="font-medium text-gray-900">
//                       Candidates
//                     </label>
//                     <p id="candidates-description" className="text-gray-500">
//                       Get notified when a candidate applies for a job.
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex gap-3">
//                   <div className="flex h-6 shrink-0 items-center">
//                     <div className="group grid size-4 grid-cols-1">
//                       <input
//                         id="offers"
//                         name="offers"
//                         type="checkbox"
//                         aria-describedby="offers-description"
//                         className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
//                       />
//                       <svg
//                         fill="none"
//                         viewBox="0 0 14 14"
//                         className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
//                       >
//                         <path
//                           d="M3 8L6 11L11 3.5"
//                           strokeWidth={2}
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           className="opacity-0 group-has-[:checked]:opacity-100"
//                         />
//                         <path
//                           d="M3 7H11"
//                           strokeWidth={2}
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           className="opacity-0 group-has-[:indeterminate]:opacity-100"
//                         />
//                       </svg>
//                     </div>
//                   </div>
//                   <div className="text-sm/6">
//                     <label htmlFor="offers" className="font-medium text-gray-900">
//                       Offers
//                     </label>
//                     <p id="offers-description" className="text-gray-500">
//                       Get notified when a candidate accepts or rejects an offer.
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </fieldset>

//             <fieldset>
//               <legend className="text-sm/6 font-semibold text-gray-900">Push notifications</legend>
//               <p className="mt-1 text-sm/6 text-gray-600">These are delivered via SMS to your mobile phone.</p>
//               <div className="mt-6 space-y-6">
//                 <div className="flex items-center gap-x-3">
//                   <input
//                     defaultChecked
//                     id="push-everything"
//                     name="push-notifications"
//                     type="radio"
//                     className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
//                   />
//                   <label htmlFor="push-everything" className="block text-sm/6 font-medium text-gray-900">
//                     Everything
//                   </label>
//                 </div>
//                 <div className="flex items-center gap-x-3">
//                   <input
//                     id="push-email"
//                     name="push-notifications"
//                     type="radio"
//                     className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
//                   />
//                   <label htmlFor="push-email" className="block text-sm/6 font-medium text-gray-900">
//                     Same as email
//                   </label>
//                 </div>
//                 <div className="flex items-center gap-x-3">
//                   <input
//                     id="push-nothing"
//                     name="push-notifications"
//                     type="radio"
//                     className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
//                   />
//                   <label htmlFor="push-nothing" className="block text-sm/6 font-medium text-gray-900">
//                     No push notifications
//                   </label>
//                 </div>
//               </div>
//             </fieldset>
//           </div>
//         </div>
//       </div>

//       <div className="mt-6 flex items-center justify-end gap-x-6">
//         <button type="button" className="text-sm/6 font-semibold text-gray-900">
//           Cancel
//         </button>
//         <button
//           type="submit"
//           className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//         >
//           Save
//         </button>
//       </div>
//     </form>
//   )
// }



// // import React, { useState } from 'react';

// // const interestsList = [
// //   'React', 'Vue', 'Node.js', 'Python', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'MongoDB', 'SQL', 'GraphQL', 'AWS', 'Docker'
// // ];

// // const InterestSignUpStage = () => {
// //   const [selectedInterests, setSelectedInterests] = useState([]);

// //   const handleInterestClick = (interest) => {
// //     // Check if the interest is already selected
// //     if (selectedInterests.includes(interest)) {
// //       setSelectedInterests(selectedInterests.filter(item => item !== interest)); // Remove from selected
// //     } else {
// //       setSelectedInterests([...selectedInterests, interest]); // Add to selected
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-8">
// //       <div className="w-full max-w-lg px-6 bg-white rounded-lg shadow-lg">
// //         <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Select Your Interests</h2>
        
// //         {/* Interest Grid */}
// //         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
// //           {interestsList.map((interest) => (
// //             <button
// //               key={interest}
// //               className={`p-4 border-2 rounded-lg text-sm font-medium text-gray-800 
// //                 ${selectedInterests.includes(interest) ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
// //               onClick={() => handleInterestClick(interest)}
// //             >
// //               {interest}
// //             </button>
// //           ))}
// //         </div>

// //         {/* Selected Interests */}
// //         <div className="mt-6">
// //           <h3 className="text-xl font-semibold text-gray-700">Your Selected Interests:</h3>
// //           <div className="flex flex-wrap gap-2 mt-2">
// //             {selectedInterests.map((interest, index) => (
// //               <span
// //                 key={index}
// //                 className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm"
// //               >
// //                 {interest}
// //               </span>
// //             ))}
// //           </div>
// //         </div>
        
// //         {/* Next Button (Optional) */}
// //         <div className="mt-6 text-center">
// //           <button className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600">
// //             Next
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default InterestSignUpStage;


// // import React from 'react';
// // import { useForm } from 'react-hook-form';
// // import * as Yup from 'yup';
// // import { yupResolver } from '@hookform/resolvers/yup';

// // function FormWithValidation() {
// //   // Validation schema using Yup
// //   const validationSchema = Yup.object().shape({
// //     phoneNumber: Yup.string()
// //       .matches(
// //         /^(?:\+?\d{1,3}[-.\s]?)?\(?\d{1,4}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
// //         'Phone number is not valid'
// //       )
// //       .required('Phone number is required'),
// //     file: Yup.mixed()
// //       .required('File is required')
// //       .test('fileSize', 'File size is too large', (value) => {
// //         return value && value[0]?.size <= 5 * 1024 * 1024; // 5MB max file size
// //       })
// //       .test('fileType', 'Only image files are allowed', (value) => {
// //         return value && value[0]?.type.startsWith('image/');
// //       }),
// //   });

// //   // Use react-hook-form
// //   const {
// //     register,
// //     handleSubmit,
// //     formState: { errors },
// //   } = useForm({
// //     resolver: yupResolver(validationSchema),
// //   });

// //   // Submit handler
// //   const onSubmit = (data) => {
// //     console.log('Form Data:', data);
// //   };

// //   return (
// //     <form onSubmit={handleSubmit(onSubmit)}>
// //       {/* Phone Number Field */}
// //       <div>
// //         <label>Phone Number:</label>
// //         <input
// //           type="text"
// //           {...register('phoneNumber')}
// //         />
// //         {errors.phoneNumber && <p>{errors.phoneNumber.message}</p>}
// //       </div>

// //       {/* File Upload Field */}
// //       <div>
// //         <label>Upload File:</label>
// //         <input
// //           type="file"
// //           {...register('file')}
// //         />
// //         {errors.file && <p>{errors.file.message}</p>}
// //       </div>

// //       <button type="submit">Submit</button>
// //     </form>
// //   );
// // }

// // export default FormWithValidation;

// // export function ProfilePhotoUpload ({setProfilePhoto, profilePhoto, label}) {

// //     const { getInputProps, getRootProps } = handleDropFile('images/*', setProfilePhoto, label)


// //     return (
// //         <div className="flex flex-col items-center space-y-4">
// //           {/* Profile Picture Container */}
// //           <div
// //             className="relative flex items-center justify-center w-48 h-48 rounded-full overflow-hidden border-4 border-gray-300"
// //             {...getRootProps()}
// //           >
// //             {/* If profilePic is set, show the uploaded image, else show default */}
// //             <input 
// //               {...getInputProps()} 
// //               type="file" 
// //               onChange={(event)=>handleFileUpload(event, setProfilePhoto, label)} />
// //             { profilePhoto ? (
// //                 <img
// //                   src={profilePhoto}
// //                   alt="Profile"
// //                   className="w-full h-full object-cover"
// //                 />
// //             ):(
// //                 <UserIcon />
                
// //             )}
// //             <div className="absolute bottom-2 right-5 w-12 h-12 z-10 bg-white rounded-full p-2 cursor-pointer">
// //             <CameraIcon />
// //             </div>
// //           </div>
    
// //           {/* Drag and drop or click to upload */}
// //           <p className="text-sm text-gray-500">
// //             Drag & drop a new image here, or click to select a file
// //           </p>
// //         </div>
// //       );
// // }


// // // Yup validation schema for profile photo upload
// // const profileImgValidation = Yup.object().shape({
// //   profilePhoto: Yup.mixed()
// //     .test('fileSize', 'File size is too large', (value) => {
// //       if (value) {
// //         const base64String = value.split(',')[1]; // Extract base64 part
// //         const sizeInBytes = (base64String.length * 3) / 4;
// //         return sizeInBytes <= 5 * 1024 * 1024; // Max 5MB
// //       }
// //       return true;
// //     })
// //     .test('fileType', 'Only image files are allowed', (value) => {
// //       if (value) {
// //         return value.startsWith('data:image/');
// //       }
// //       return true;
// //     }),
// // });



//             {/* Desktop View */}
//             <div className="hidden md:flex">
//               <div className="flex w-full h-screen space-x-4 custom-scrollbar">

//                 {/* Main content area */}
//                 <div className="flex-1 overflow-auto custom-scrollbar border-r border-gray-300">
//                   <div className=" px-4 space-y-8">
//                     <section>
//                       <h2 className="overflow-x-auto mt-2 text-lg font-bold text-gray-800">Recent Activities</h2>
//                       <div className="relative border-t border-blue-500">
//                         {/* Scrollable section for mobile, fixed display for desktop */}
//                         <div className="flex overflow-x-auto custom-scrollbar space-x-6 py-4 md:flex md:space-x-4">
//                           {userActivities.map((activity) => (
//                             <RecentActivity
//                               key={activity.id}
//                               title={activity.title}
//                               timestamp={activity.timestamp}
//                             />
//                           ))}
//                         </div>

//                         {/* Dark transparent background and view more indicator */}
//                         <Link
//                           to="/activities"
//                           className="absolute h-100 w-20 right-0 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-transparent via-transparent to-black/60 text-white p-4 shadow-lg transition-opacity "
//                         >
//                           <ChevronRightIcon /> {/* Large arrow for a carousel-like effect */}
//                         </Link>
//                       </div>
//                     </section>

//                     <section className="border-b border-blue-600">
//                       <h2 className=" text-lg font-bold text-gray-800">My Jobs</h2>
//                       <div className="border-t border-blue-500">
//                       </div>
//                       <div className="container mx-auto py-6">
//                         {/* Scrollable Job List */}
//                         <div className="overflow-x-auto custom-scrollbar">
//                           <div className="flex space-x-6">
//                             {userJobs.map((job) => (
//                               <div key={job.id} className="min-w-[280px] bg-white p-6 rounded-lg shadow-lg transition-transform relative">
//                                 <h3 className="text-xl font-semibold text-blue-600">{job.title}</h3>

//                                 {/* Job Status with dynamic color */}
//                                 <p className={`text-sm font-semibold mb-2 ${getStatusClass(job.status)}`}>Status: {job.status}</p>

//                                 <p className="text-lg font-bold text-blue-800">{job.salary}</p>

//                                 {/* Job Description */}
//                                 <div className="mt-2 mb-4 text-gray-700 text-sm h-16 overflow-hidden">
//                                   {job.description}
//                                 </div>

//                                 {/* View Details Link with proper positioning */}
//                                 <Link
//                                   to={`/job/${job.id}`}
//                                   className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-blue-500 font-semibold hover:text-blue-700 transition duration-300"
//                                 >
//                                   View Details
//                                 </Link>
//                               </div>
//                             ))}
//                           </div>
//                         </div>
//                         <div className="text-blue-600 text-center w-full my-3 text-sm font-semibold">__view all__</div>
//                       </div>
//                     </section>

//                     <section>
//                       <h2 className=" text-lg font-bold text-gray-800">Developers that may intrest you</h2>
//                       {/* <div className="border-t border-blue-500">
//                   </div> */}
//                       <div className="container mx-auto py-6">
//                         {/* Scrollable User List */}
//                         <div className="overflow-x-auto custom-scrollbar">
//                           <div className="flex space-x-6">
//                             {users.map((user) => (
//                               <div
//                                 key={user.id}
//                                 className="min-w-[280px] bg-white p-6 rounded-lg shadow-lg transition-transform relative"
//                               >
//                                 {/* Profile photo or initials */}
//                                 <div className="flex items-center space-x-4 mb-4">
//                                   {user.profilePhoto ? (
//                                     <img
//                                       src={user.profilePhoto}
//                                       alt={user.firstName}
//                                       className="w-16 h-16 rounded-full object-cover"
//                                     />
//                                   ) : (
//                                     <div className="w-16 h-16 bg-gray-400 text-white flex items-center justify-center rounded-full">
//                                       <span className="text-2xl font-bold">{getInitials(user.firstName, user.lastName)}</span>
//                                     </div>
//                                   )}

//                                   <div>
//                                     <h3 className="text-xl font-semibold text-blue-600">{`${user.firstName} ${user.lastName}`}</h3>
//                                     <p className="text-sm text-gray-600">{user.title}</p>
//                                   </div>
//                                 </div>

//                                 {/* Verified Status */}
//                                 {user.verified && (
//                                   <div className="absolute top-2 right-2 flex items-center space-x-2 bg-green-500 text-white px-3 py-1 rounded-lg">
//                                     <CheckCircleIcon className="h-5 w-5 text-white" />
//                                     <span className="text-sm font-semibold">Verified</span>
//                                   </div>
//                                 )}

//                                 {/* Location and Bio */}
//                                 <div className="mt-4 text-sm text-gray-700">
//                                   <p>{user.location}</p>
//                                   <p className="mt-2 mb-5 text-gray-500">{user.bio}</p>
//                                 </div>

//                                 {/* View Profile Link */}
//                                 <a
//                                   href={`/profile/${user.id}`}
//                                   className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-blue-500 font-semibold hover:text-blue-700 transition duration-300"
//                                 >
//                                   View Profile
//                                 </a>
//                               </div>
//                             ))}
//                           </div>
//                         </div>
//                       </div>
//                     </section>

//                     <section>
//                       <h2 className=" text-lg font-bold text-gray-800">Organizations that may intrest you</h2>
//                       {/* <div className="border-t border-blue-500">
//                   </div> */}
//                       <div className="container mx-auto py-6">
//                         {/* Scrollable Company List */}
//                         <div className="overflow-x-auto custom-scrollbar">
//                           <div className="flex space-x-6">
//                             {companies.map((company) => (
//                               <div
//                                 key={company.id}
//                                 className="min-w-[280px] bg-white p-6 rounded-lg shadow-lg transition-transform relative"
//                               >
//                                 {/* Company Logo or Initials */}
//                                 <div className="flex items-center space-x-4 mb-4">
//                                   {company.profilePhoto ? (
//                                     <img
//                                       src={company.profilePhoto}
//                                       alt={company.companyName}
//                                       className="w-16 h-16 rounded-full object-cover"
//                                     />
//                                   ) : (
//                                     <div className="w-16 h-16 bg-gray-400 text-white flex items-center justify-center rounded-full">
//                                       <span className="text-2xl font-bold">{getInitialsC(company.companyName)}</span>
//                                     </div>
//                                   )}

//                                   <div>
//                                     <h3 className="text-xl font-semibold text-blue-600">{company.companyName}</h3>
//                                     <p className="text-sm text-gray-600">{company.website}</p>
//                                   </div>
//                                 </div>

//                                 {/* Verified Status */}
//                                 {company.verified && (
//                                   <div className="absolute top-2 right-2 flex items-center space-x-2 bg-green-500 text-white px-3 py-1 rounded-lg">
//                                     <CheckCircleIcon className="h-5 w-5 text-white" />
//                                     <span className="text-sm font-semibold">Verified</span>
//                                   </div>
//                                 )}

//                                 {/* Location and Bio */}
//                                 <div className="mt-4 text-sm text-gray-700">
//                                   <p>{company.location}</p>
//                                   <p className="mt-2  mb-5 text-gray-500">{company.bio}</p>
//                                 </div>

//                                 {/* View Profile Link */}
//                                 <a
//                                   href={`/company/${company.id}`}
//                                   className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-blue-500 font-semibold hover:text-blue-700 transition duration-300"
//                                 >
//                                   View Profile
//                                 </a>
//                               </div>
//                             ))}
//                           </div>
//                         </div>
//                       </div>
//                     </section>

//                     <section>
//                       <h2 className="overflow-x-auto mt-8 text-lg font-bold text-gray-800">Recommended Jobs</h2>
//                       <div className="border-t border-blue-500">

//                       </div>
//                       <div className="container mx-auto py-6 ">
//                         {/* Grid Layout for Job Cards */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                           {static_jobs.map((job) => (
//                             <div key={job.id} className="bg-white p-6 rounded-lg shadow-lg transition-transform hover:scale-105 hover:shadow-xl relative">
//                               <h3 className="text-xl font-semibold text-blue-600">{job.title}</h3>
//                               <p className="text-sm text-gray-500 mb-2">Posted by: {job.postedBy}</p>
//                               <p className="text-lg font-bold text-blue-800">{job.salary}</p>

//                               {/* Job Description */}
//                               <div className="relative">
//                                 <p className={`text-gray-700 ${expandedJobId === job.id ? '' : 'truncate'}`}>
//                                   {job.description}
//                                 </p>
//                                 {job.description.length > 100 && (
//                                   <div className="mt-2">
//                                     <button
//                                       className="text-blue-500 text-sm"
//                                       onClick={() => toggleDescription(job.id)}
//                                     >
//                                       {expandedJobId === job.id ? 'Read Less' : 'Read More'}
//                                     </button>
//                                   </div>
//                                 )}
//                               </div>

//                               {/* Buttons */}
//                               <div className="flex space-x-4 mt-4">
//                                 <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
//                                   Bid
//                                 </button>
//                                 <Link to={`/job/${job.id}`} className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-300">
//                                   View
//                                 </Link>
//                               </div>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     </section>
//                   </div>
//                 </div>

//                 {/* Sidebar (Resizable) */}
//                 <div
//                   className="bg-gray-200 p-4 overflow-hidden"
//                 >
//                   <div
//                     className="resize-handle cursor-ew-resize absolute top-0 right-0 z-10 w-2 bg-gray-300 h-full"
//                   ></div>
//                   <div className="bg-white p-4 shadow rounded">
//                     <h2 className="text-lg font-bold">Work Title</h2>
//                     <p className="text-gray-700">Company: lorem ipsum</p>
//                     <p className="text-gray-700">Description: lorem ipsum text</p>
//                     <p className="text-gray-700">Pay: $00.0</p>
//                     <div className="mt-4 flex space-x-2">
//                       <button className="flex-1 bg-blue-600 text-white py-2 rounded">Button 1</button>
//                       <button className="flex-1 bg-gray-400 text-white py-2 rounded">Button 2</button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//                 <Dialog open={openDel} onClose={() => setOpenDel(false)} className="relative z-10">
//                 <DialogBackdrop
//                     transition
//                     className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
//                 />
        
//                 <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
//                     <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
//                         <DialogPanel
//                             transition
//                             className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
//                         >
//                             <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
//                                 <div className="sm:flex sm:items-start">
//                                     <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
//                                         <ExclamationTriangleIcon aria-hidden="true" className="size-6 text-red-600" />
//                                     </div>
//                                     <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
//                                         <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
//                                             Job Deletion Confirmation
//                                         </DialogTitle>
//                                         {/* <div className="mt-2">
//                                         {renderModalContent()}
//                                     </div> */}
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
//                                 <button
//                                     type="button"
//                                     onClick={() => setOpenDel(false)}
//                                     className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
//                                 >
//                                     Confirm Deletion
//                                 </button>
//                                 <button
//                                     type="button"
//                                     onClick={() => setOpenDel(false)}
//                                     className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
//                                 >
//                                     Cancel
//                                 </button>
//                             </div>
//                         </DialogPanel>
//                     </div>
//                 </div>
//             </Dialog>
// document.cookie.split(';').forEach(function(c) {
//   document.cookie = c.trim().split('=')[0] + '=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;';
// });
