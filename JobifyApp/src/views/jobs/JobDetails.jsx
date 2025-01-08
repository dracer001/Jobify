import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { CheckCircleIcon, CreditCardIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import { CalendarDaysIcon, ChatBubbleLeftRightIcon, ChatBubbleOvalLeftIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import { Link, useNavigate, useParams } from 'react-router-dom';
import TButton from '../../components/core/TButton';
import { formatDate, isEmpty } from '../../helperFunctions';
import Banner from '../../components/core/Banner';
import { InformationCircleIcon } from '@heroicons/react/20/solid';
import PopUp from '../../components/core/PopUp';
import { useEffect, useState } from 'react';
import { useStateContext } from '../../context/ContextProvider';
import { axiosClient } from '../../context/axios';


// Helper function to style badges based on status
const getBadgeStyle = (status) => {
    switch (status.toLowerCase()) {
        case "pending":
            return "bg-yellow-500 text-white";
        case "success":
            return "bg-green-500 text-white";
        case "active":
        case "in progress":
            return "bg-blue-500 text-white";
        case "terminated":
            return "bg-red-500 text-white";
        default:
            return "bg-gray-500 text-white";
    }
};


const renderModalContent = () => {
    // Conditions for the modal content based on job and payment status
    if (job.jobStatus === "pending" && job.paymentStatus === "pending") {
        return (
            <div>
                <h3 className="text-lg font-semibold text-gray-900">Warning: Deleting Job</h3>
                <p className="mt-2 text-sm text-gray-500">You are about to delete this job. Please note that jobs cannot be permanently deleted, but they will be moved to the trash.</p>
            </div>
        );
    }

    if (job.jobStatus === "pending" && job.paymentStatus === "completed") {
        return (
            <div>
                <h3 className="text-lg font-semibold text-gray-900">Warning: Deleting Job</h3>
                <p className="mt-2 text-sm text-gray-500">You are about to delete this job. Please note that jobs cannot be permanently deleted, but they will be moved to the trash. Additionally, 90% of the money paid will be deposited back to your account within 3 days.</p>
            </div>
        );
    }

    if (job.jobStatus === "ongoing") {
        return (
            <div>
                <h3 className="text-lg font-semibold text-gray-900">Cannot Delete</h3>
                <p className="mt-2 text-sm text-gray-500">You cannot delete a job that is currently ongoing. Please wait until it is completed or terminated.</p>
            </div>
        );
    }

    if (job.jobStatus === "completed" || job.jobStatus === "terminated") {
        return (
            <div>
                <h3 className="text-lg font-semibold text-gray-900">Deleting Job</h3>
                <p className="mt-2 text-sm text-gray-500">The job will be deleted only on your end. It will remain visible to the person who is doing the job.</p>
            </div>
        );
    }

    return null;
}
export default function JobDetails() {
    const navigate = useNavigate();

    // Mock data
    const { jobId } = useParams();
    const { currentUser } = useStateContext();

    const [job, setJob] = useState({});
    const [openDel, setOpenDel] = useState(false);
    const [isOwner, setIsOwner] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);  // Set loading to true when starting the API calls
            try {
                const jobResponse = await axiosClient.get(`/work/${jobId}`);
                setJob(jobResponse.data.data);
                setIsOwner(jobResponse.data.data.employer_id === currentUser.id);
            } catch (error) {
                console.error('An error occurred:', error);
                if (error.response && error.response.status === 403) {
                    navigate("/403"); // Redirect to 403 page if the response status is 403.
                } else {
                    // Handle other errors, like network errors or 5xx status codes.
                    showError("Couldn't get Job");
                }
            } finally {
                setLoading(false);  // Always set loading to false when done
            }
        };
        if (jobId && !isEmpty(currentUser)) {
            fetchData();  // Call the async function
        }
    }, [jobId, currentUser]);


    const handleDeleteClick = () => {
        setOpenDel(true)
    }

    return (
        <>
            {isOwner && (job.employer_payment_status === "pending") &&
                <div className="mt-0 text-center text-yellow-600 flex items-center justify-center space-x-2">
                    <InformationCircleIcon className="h-5 w-5 text-yellow-500 hidden md:flex" />
                    <p className="font-semibold text-sm">
                        Please be advised that this job will not be made public until payment is confirmed.
                        For further details, kindly visit our
                        <a className="underline text-yellow-500" href="#"> Policy </a> page.
                    </p>
                </div>
            }

            <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-md md:px-16 md:py-12 max-w-4xl">

                {/* Job Title */}
                <div className='flex justify-between flex-col-reverse md:flex-row md:items-center md:mb-8'>
                    <h1 className="text-3xl font-bold text-blue-800">{job.title}</h1>
                    {isOwner && (job.employer_payment_status === "pending") &&

                        <div className='mb-8'>
                            <TButton
                                to={`/job/payment?job_id=${job.id}`}
                                className='flex items-center font-semibold'
                            >
                                <CurrencyDollarIcon className=" w-4 h-4 mr-2" />
                                Make Payment
                            </TButton>
                        </div>

                    }
                </div>
                {/* Job Category */}
                <div className="mb-8 mt-5">
                    <span className='font-bold shadow rounded-lg rounded-lg px-4 py-2 text-gray-600 bg-white'>
                        {job.category?.name}
                    </span>
                </div>

                {/* Job Description */}
                <div className="mb-8">
                    <p className="font-semibold text-gray-700 mb-2 text-xl">Job Description </p>
                    <p className='text-lg rounded-lg shadow p-6 text-gray-700 bg-white'>
                        {job.description}
                    </p>
                </div>



                {/* Dates */}
                {
                    isOwner &&
                    <div className="mb-5 shadow-lg rounded-lg grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-white">
                    <div className="flex items-center space-x-4">
                        <CalendarDaysIcon className="h-7 w-7 text-blue-500" />
                        <div>
                            <span className="font-semibold text-gray-800">Created on</span>
                            <div className="font-semibold text-gray-700 mt-1 p-2 bg-gray-100 rounded-lg shadow-sm">
                                {formatDate(job.created_at)}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <CalendarDaysIcon className="h-7 w-7 text-blue-500" />
                        <div>
                            <span className="font-semibold text-gray-800">Last updated on</span>
                            <div className="font-semibold text-gray-700 mt-1 p-2 bg-gray-100 rounded-lg shadow-sm">
                                {job.updatedDate ? formatDate(job.updatedDate) : "Not updated yet"}
                            </div>

                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <CalendarDaysIcon className="h-7 w-7 text-blue-500" />
                        <div>
                            <span className="font-semibold text-gray-800">Expected Deadline</span>
                            <div className="font-semibold text-gray-700 mt-1 p-2 bg-gray-100 rounded-lg shadow-sm">
                                {job.expectedEndDate ? formatDate(job.expectedEndDate) : "Not updated yet"}

                            </div>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <CalendarDaysIcon className="h-7 w-7 text-blue-500" />
                        <div>
                            <span className="font-semibold text-gray-800">Started on</span>
                            <div className="font-semibold text-gray-700 mt-1 p-2 bg-gray-100 rounded-lg shadow-sm">
                                {job.beginningDate ? formatDate(job.beginningDate) : "Not updated yet"}

                            </div>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <CalendarDaysIcon className="h-7 w-7 text-blue-500" />
                        <div>
                            <span className="font-semibold text-gray-800">Ended on</span>
                            <div className="font-semibold text-gray-700 mt-1 p-2 bg-gray-100 rounded-lg shadow-sm">
                                {job.terminatedDate ? formatDate(job.terminatedDate) : "Not updated yet"}

                            </div>
                        </div>
                    </div>
                </div>

                }



                <div className="mb-5 shadow-lg rounded-lg grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-white">
                    {/* Job Status */}

                    <div className="mb-5 flex items-center space-x-4">
                        <span className="font-semibold text-gray-800 text-lg">Job Status:</span>
                        <div className="inline-flex items-center rounded-md bg-green-100 px-4 py-2 text-sm font-semibold text-green-700 ring-1 ring-inset ring-green-600/20">
                            <CheckCircleIcon className="h-5 w-5 text-green-600 mr-2" />
                            {job.jobStatus}
                        </div>
                    </div>

                    {/* Payment Status with Make Payment Button */}
                    <div className="mb-5 flex items-center space-x-4">
                        <span className="font-semibold text-gray-800 text-lg">Payment Status:</span>
                        <div className="inline-flex items-center rounded-md bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700 ring-1 ring-inset ring-blue-600/20">
                            <CreditCardIcon className="h-5 w-5 text-blue-600 mr-2" />
                            {job.paymentStatus}
                        </div>
                    </div>
                </div>
                {/* Action Buttons */}
                <div className="mt-6 flex gap-4 justify-end">
                    <Link className="flex items-center hover:underline px-4 py-2 text-slate-600 ">
                        <PencilIcon className="w-5 h-5 mr-2" />
                        Edit
                    </Link>
                    <button
                        onClick={handleDeleteClick}
                        className="flex items-center px-4 py-2 text-red-600 hover:underline">
                        <TrashIcon className="w-5 h-5 mr-2" />
                        Remove
                    </button>
                </div>

                {/* Worker Profile */}
                {job.user && (
                    < div className="bg-white shadow-xl rounded-lg p-6 space-y-6 mt-12">
                        <div className="text-lg font-semibold text-gray-800">Person Doing the Job</div>
                        <div className="flex items-center space-x-6">
                            <img
                                src={job.user.image}
                                alt={`${job.user.firstName} ${job.user.lastName}`}
                                className="h-20 w-20 rounded-full object-cover"
                            />
                            <div>
                                <p className="text-xl font-semibold text-gray-800">{job.user.firstName} {job.user.lastName}</p>
                                <p className="text-sm text-gray-600">{job.user.title}</p>
                                <div className=' mt-2 gap-4 flex'>
                                    <Link
                                        to={job.user.profileLink}
                                        className="text-blue-600 hover:text-blue-800 block text-sm"
                                    >
                                        View Profile
                                    </Link>
                                    <Link>
                                        <ChatBubbleLeftRightIcon
                                            className='size-6 text-blue-600'
                                        />
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div>
                            <Link
                                to="/job/termination"
                                className="px-4 py-2 text-sm font-semibold text-red-600 border border-red-600 rounded-md bg-transparent hover:bg-red-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50 transition-colors duration-300">
                                Request Termination
                            </Link>
                        </div>


                    </div>
                )
                }
            </div >
            <Dialog open={openDel} onClose={() => setOpenDel(false)} className="relative z-10">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
                />

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <DialogPanel
                            transition
                            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                        >
                            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                                        <ExclamationTriangleIcon aria-hidden="true" className="size-6 text-red-600" />
                                    </div>
                                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                        <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                                            Job Deletion Confirmation
                                        </DialogTitle>
                                        <div className="mt-2">
                                            {renderModalContent()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button
                                    type="button"
                                    onClick={() => setOpenDel(false)}
                                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                >
                                    Confirm Deletion
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setOpenDel(false)}
                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                >
                                    Cancel
                                </button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>

    );
}










// import { useState } from 'react'
// import { Link, useParams } from 'react-router-dom'
// import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'

// export default function JobDetails() {
//   const { jobId } = useParams()
//   const [job] = useState({
//     id: 1,
//     jobName: 'Frontend Developer',
//     description:
//       'We are looking for an experienced frontend developer to build and maintain web applications. The ideal candidate should have expertise in JavaScript, React, and responsive design principles.',
//     createdAt: '2023-09-01',
//     expectedCompletion: '2024-01-15',
//     terminatedDate: null,
//     salary: '$80,000',
//     paymentStatus: 'Pending',
//     status: 'In Progress',
//     person: {
//       firstName: 'John',
//       lastName: 'Doe',
//       title: 'Senior Developer',
//       image: 'https://via.placeholder.com/150',
//       profileLink: '/profile/john-doe',
//     },
//   })

//   const isTerminated = job.terminatedDate !== null

//   return (
//     <div className="max-w-screen-xl mx-auto px-6 py-8 space-y-8">
//       {/* Job Title */}
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-4xl font-semibold text-gray-800">{job.jobName}</h1>
//         <div className="flex space-x-4">
//           <Link
//             to="/jobs"
//             className="text-sm font-semibold text-gray-600 hover:text-indigo-600 transition"
//           >
//             Back to Listings
//           </Link>
//           <button
//             className="inline-flex items-center px-5 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition"
//             onClick={() => alert('Proceeding to payment page...')}
//           >
//             Make Payment
//           </button>
//         </div>
//       </div>

//       {/* Job Information Section */}
//       <div className="bg-white shadow-xl rounded-lg p-6 space-y-6">
//         <div className="text-lg font-semibold text-gray-800">Job Details</div>
//         <div className="text-base text-gray-600 space-y-3">
//           <p><strong>Description:</strong> {job.description}</p>
//           <p><strong>Created On:</strong> {new Date(job.createdAt).toLocaleDateString()}</p>
//           <p><strong>Expected Completion:</strong> {new Date(job.expectedCompletion).toLocaleDateString()}</p>
//           {isTerminated && (
//             <p><strong>Terminated On:</strong> {new Date(job.terminatedDate).toLocaleDateString()}</p>
//           )}
//           <p><strong>Salary:</strong> {job.salary}</p>
//         </div>

//         {/* Job Status */}
//         <div className="flex items-center space-x-4">
//           <div className="text-sm font-semibold text-gray-700">Job Status:</div>
//           <span
//             className={`inline-block px-4 py-2 rounded-full text-xs font-semibold ${job.status === 'In Progress'
//               ? 'bg-yellow-100 text-yellow-600'
//               : job.status === 'Completed'
//               ? 'bg-green-100 text-green-600'
//               : 'bg-gray-200 text-gray-600'}`}
//           >
//             {job.status}
//           </span>
//         </div>

//         {/* Payment Status */}
//         <div className="flex items-center space-x-4">
//           <div className="text-sm font-semibold text-gray-700">Payment Status:</div>
//           <span
//             className={`inline-block px-4 py-2 rounded-full text-xs font-semibold ${job.paymentStatus === 'Paid'
//               ? 'bg-green-100 text-green-600'
//               : 'bg-red-100 text-red-600'}`}
//           >
//             {job.paymentStatus}
//           </span>
//         </div>

//         {/* Buttons (Edit & Remove) */}
//         <div className="flex space-x-4 mt-6">
//           <button
//             className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition"
//             onClick={() => alert('Edit Job')}
//           >
//             <PencilIcon className="h-5 w-5 mr-2" /> Edit
//           </button>
//           <button
//             className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md shadow-md hover:bg-red-700 transition"
//             onClick={() => alert('Remove Job')}
//           >
//             <TrashIcon className="h-5 w-5 mr-2" /> Remove
//           </button>
//         </div>
//       </div>

//       {/* Person Doing the Job */}
//       <div className="bg-white shadow-xl rounded-lg p-6 space-y-6">
//         <div className="text-lg font-semibold text-gray-800">Person Doing the Job</div>
//         <div className="flex items-center space-x-6">
//           <img
//             src={job.person.image}
//             alt={`${job.person.firstName} ${job.person.lastName}`}
//             className="h-20 w-20 rounded-full object-cover"
//           />
//           <div>
//             <p className="text-xl font-semibold text-gray-800">{job.person.firstName} {job.person.lastName}</p>
//             <p className="text-sm text-gray-600">{job.person.title}</p>
//             <Link
//               to={job.person.profileLink}
//               className="text-indigo-600 hover:text-indigo-800 mt-2 block text-sm"
//             >
//               View Profile
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
