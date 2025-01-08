import { Link, useNavigate } from 'react-router-dom';
import PhotoDisplay from "../../components/PhotoDisplay";
import { PencilIcon, TrashIcon, InformationCircleIcon, CurrencyDollarIcon, CalendarDaysIcon, ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/solid';
import { formatDate, isEmpty } from '../../helperFunctions';
import { BadgeStatus } from '../../components/core/Badges';
import TButton from '../../components/core/TButton';
import { useState } from 'react';
import WarningDialog from '../../components/core/warningDialog';
import { axiosClient } from '../../context/axios';
import useNotification from '../../hooks/useNotification';
import Notification from '../../components/core/Notification';

const dialogObject = {
    title: "",
    message: "",
    onConfirm: () => { },
    confirmButtonText: "",
};


export default function JobView({
    job,
    jobHandler,
    isOwner,
    isWorker,
}) {

    const { message, type, isVisible, showError, showSuccess } = useNotification();
    const navigate = useNavigate();

    const [isWarningDialog, setIsWarningDialog] = useState(false);


    const handleWarningDialog = () => {
        if (!isOwner) return;
        setIsWarningDialog(true);
    };

    const handleWarningClose = () => {
        setIsWarningDialog(false);
    };

    const handleDeleteJob = async () => {
        try {
            const response = await axiosClient.delete(`/work/${job.id}`);
            if (response.status === 204) {
                showSuccess("Job deleted successfully");
                setTimeout(() => {
                    navigate("/job/my_jobs");

                }, 3000);
            }
        } catch (error) {
            console.error('An error occurred:', error);
            showError("Couldn't delete job");
        }
    };


    switch (job.status) {

        case "pending":
            dialogObject.title = "Warning: Deleting Job";
            if (job.employer_payment_status === "completed") {
                dialogObject.message = "You are about to delete this job. Please note that jobs cannot be permanently deleted, but they will be moved to the trash. Additionally, 90% of the money paid will be deposited back to your account within 3 days.";
            } else {

                dialogObject.message = "You are about to delete this job. Please note that jobs cannot be permanently deleted, but they will be moved to the trash.";
            }
            dialogObject.onConfirm = handleDeleteJob;
            dialogObject.confirmButtonText = "Delete";
            break;

        case "in_progress":
            dialogObject.title = "Cannot Delete";
            dialogObject.message = "You cannot delete a job that is currently ongoing. Please wait until it is completed or terminated.";
            dialogObject.confirmButtonText = "Close";
            dialogObject.onConfirm = handleWarningClose;

            break;

        case "completed":
        case "terminated":
            dialogObject.title = "Deleting Job";
            dialogObject.message = "The job will be deleted only on your end. It will remain visible to the person who is doing the job.";
            dialogObject.confirmButtonText = "Delete";
            dialogObject.onConfirm = handleDeleteJob;
            break;

        default:
            break;
    }
    return (
        <>
            {isVisible && (
                <Notification message={message} type={type} />
            )}
            {isOwner && (job.employer_payment_status === "pending") &&
                <>
                    <div className="mt-0 text-center text-yellow-600 flex items-center justify-center space-x-2">
                        <InformationCircleIcon className="h-5 w-5 text-yellow-500 hidden md:flex" />
                        <p className="font-semibold text-sm">
                            Please be advised that this job will not be made public until payment is confirmed.
                            For further details, kindly visit our
                            <a className="underline text-yellow-500" href="#"> Policy </a> page.
                        </p>
                    </div>
                    <div className='mb-2 container mx-auto px-6 py-3'>
                        <TButton
                            to={`/job/payment?job_id=${job.id}`}
                            className='flex items-center font-semibold'
                        >
                            <CurrencyDollarIcon className=" w-4 h-4 mr-2" />
                            Make Payment
                        </TButton>
                    </div>
                </>
            }

            <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-md max-w-4xl">

                {/* Job Title */}
                <div className='flex justify-between flex-col-reverse md:flex-row md:items-center md:mb-8'>
                    <h1 className="text-3xl font-bold text-blue-800">{job.title}</h1>
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
                    <p className='text-lg rounded-lg shadow p-4 text-gray-700 bg-white'>
                        {job.description}
                    </p>
                </div>



                {/* Dates */}
                {
                    (isOwner || isWorker) &&
                    <>
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
                                        {job.updated_at ? formatDate(job.updated_at) : "Not updated yet"}
                                    </div>

                                </div>
                            </div>

                            <div className="flex items-center space-x-4">
                                <CalendarDaysIcon className="h-7 w-7 text-blue-500" />
                                <div>
                                    <span className="font-semibold text-gray-800">Expected Deadline</span>
                                    <div className="font-semibold text-gray-700 mt-1 p-2 bg-gray-100 rounded-lg shadow-sm">
                                        {job.expected_end_at ? formatDate(job.expected_end_at) : "Not updated yet"}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4">
                                <CalendarDaysIcon className="h-7 w-7 text-blue-500" />
                                <div>
                                    <span className="font-semibold text-gray-800">Started on</span>
                                    <div className="font-semibold text-gray-700 mt-1 p-2 bg-gray-100 rounded-lg shadow-sm">
                                        {job.started_at ? formatDate(job.started_at) : "Not updated yet"}

                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4">
                                <CalendarDaysIcon className="h-7 w-7 text-blue-500" />
                                <div>
                                    <span className="font-semibold text-gray-800">Ended on</span>
                                    <div className="font-semibold text-gray-700 mt-1 p-2 bg-gray-100 rounded-lg shadow-sm">
                                        {job.ended_at ? formatDate(job.ended_at) : "Not updated yet"}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                }



                <div className="mb-5 shadow-lg rounded-lg grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-white">
                    {/* Job Status */}

                    <div className=" flex items-center space-x-4">
                        <span className="font-semibold text-gray-800">Job Status:</span>
                        <BadgeStatus
                            size='sm'
                            status={job.status}
                        />
                    </div>

                    {
                        isOwner &&
                        <div className=" flex items-center space-x-4">
                            <span className="font-semibold text-gray-800">Payment Status:</span>
                            <BadgeStatus
                                size='sm'
                                status={job.employer_payment_status}
                            />
                        </div>
                    }

                    {
                        (isOwner || isWorker) && !isEmpty(jobHandler) &&
                        <div className=" flex items-center space-x-4">
                            <span className="font-semibold text-gray-800">Handler Payment Status:</span>
                            <BadgeStatus
                                size='sm'
                                status={job.employee_payment_status}
                            />
                        </div>
                    }
                </div>

                {/* Action Buttons */}
                {
                    isOwner &&
                    <div className="mt-6 flex gap-4 justify-end">
                        <Link className="flex items-center hover:underline px-4 py-2 text-slate-600 ">
                            <PencilIcon className="w-5 h-5 mr-2" />
                            Edit
                        </Link>
                        <button
                            onClick={handleWarningDialog}
                            className="flex items-center px-4 py-2 text-red-600 hover:underline">
                            <TrashIcon className="w-5 h-5 mr-2" />
                            Remove
                        </button>
                    </div>
                }


                {/* Worker Profile */}
                {
                    isOwner && !isEmpty(jobHandler)
                    && (
                        < div className="bg-white shadow-xl rounded-lg p-6 space-y-6 mt-12">
                            <div className="text-lg font-semibold text-gray-800">Job Hanlder Profile</div>
                            <div className="flex items-center space-x-6">
                                <PhotoDisplay user={jobHandler}
                                    size="w-20 h-20"
                                />
                                <div>
                                    <p className="text-xl font-semibold text-gray-800">{jobHandler.first_name || ""} {jobHandler.last_name || ""}{jobHandler.company_name || ""}</p>
                                    <p className="text-sm text-gray-600">{jobHandler.title || ""}</p>
                                    <div className=' mt-2 gap-4 flex'>
                                        <Link
                                            to={`/user/${jobHandler.id}`}
                                            className="text-blue-600 hover:text-blue-800 block text-sm"
                                        >
                                            View Profile
                                        </Link>
                                        <Link
                                            to={`/chat/${jobHandler.id}`}>
                                            <ChatBubbleOvalLeftEllipsisIcon
                                                className='size-6 text-blue-600'
                                            />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <Link
                                    to={`/job/termination/`}
                                    className="px-4 py-2 text-sm font-semibold text-red-600 border border-red-600 rounded-md bg-transparent hover:bg-red-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50 transition-colors duration-300">
                                    Request Termination
                                </Link>
                            </div>


                        </div>
                    )
                }
            </div >

            <WarningDialog
                isOpen={isWarningDialog}
                onClose={handleWarningClose}
                onConfirm={dialogObject.onConfirm}
                title={dialogObject.title}
                message={dialogObject.message}
                confirmButtonText={dialogObject.confirmButtonText}
                cancelButtonText="Cancel"
            />
        </>
    )
}
