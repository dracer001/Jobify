// import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
// import TButton from '../../components/core/TButton';
// import { formatDate, isEmpty } from '../../helperFunctions';
// import { InformationCircleIcon } from '@heroicons/react/20/solid';
// import PopUp from '../../components/core/PopUp';
// import { useEffect, useState } from 'react';
// import { useStateContext } from '../../context/ContextProvider';
// import { axiosClient } from '../../context/axios';
// import Loader from '../../components/core/Loader';
// import JobView from './JobView';
// import JobTermination from './JobTermination';




// const renderModalContent = () => {
//     // Conditions for the modal content based on job and payment status
//     if (job.jobStatus === "pending" && job.paymentStatus === "pending") {
//         return (
//             <div>
//                 <h3 className="text-lg font-semibold text-gray-900">Warning: Deleting Job</h3>
//                 <p className="mt-2 text-sm text-gray-500">You are about to delete this job. Please note that jobs cannot be permanently deleted, but they will be moved to the trash.</p>
//             </div>
//         );
//     }

//     if (job.jobStatus === "pending" && job.paymentStatus === "completed") {
//         return (
//             <div>
//                 <h3 className="text-lg font-semibold text-gray-900">Warning: Deleting Job</h3>
//                 <p className="mt-2 text-sm text-gray-500">You are about to delete this job. Please note that jobs cannot be permanently deleted, but they will be moved to the trash. Additionally, 90% of the money paid will be deposited back to your account within 3 days.</p>
//             </div>
//         );
//     }

//     if (job.jobStatus === "ongoing") {
//         return (
//             <div>
//                 <h3 className="text-lg font-semibold text-gray-900">Cannot Delete</h3>
//                 <p className="mt-2 text-sm text-gray-500">You cannot delete a job that is currently ongoing. Please wait until it is completed or terminated.</p>
//             </div>
//         );
//     }

//     if (job.jobStatus === "completed" || job.jobStatus === "terminated") {
//         return (
//             <div>
//                 <h3 className="text-lg font-semibold text-gray-900">Deleting Job</h3>
//                 <p className="mt-2 text-sm text-gray-500">The job will be deleted only on your end. It will remain visible to the person who is doing the job.</p>
//             </div>
//         );
//     }

//     return null;
// }

// export default function JobDetails() {

//     const navigate = useNavigate();
//     const { search } = useLocation();
//     const queryParams = new URLSearchParams(search);

//     const action = queryParams.get('action') || 'view';

//     const { jobId } = useParams();
//     const { currentUser } = useStateContext();



//     const [job, setJob] = useState({});
//     const [jobHandler, setJobHandler] = useState({});
//     const [openDel, setOpenDel] = useState(false);
//     const [isOwner, setIsOwner] = useState(false);
//     const [isWorker, setIsWorker] = useState(false);
//     const [isGuest, setIsGuest] = useState(false);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchData = async () => {
//             setLoading(true);  // Set loading to true when starting the API calls
//             try {
//                 const jobResponse = await axiosClient.get(`/work/${jobId}`);
//                 setJob(jobResponse.data.data);
//             } catch (error) {
//                 console.error('An error occurred:', error);
//                 if (error.response && error.response.status === 403) {
//                     navigate("/403"); // Redirect to 403 page if the response status is 403.
//                 } else {
//                     // Handle other errors, like network errors or 5xx status codes.
//                     showError("Couldn't get Job");
//                 }
//             } finally {
//                 setLoading(false);  // Always set loading to false when done
//             }
//         };
//         if (jobId && !isEmpty(currentUser)) {
//             fetchData();  // Call the async function
//         }
//     }, [jobId, currentUser]);


//     useEffect(() => {
//         if (!isEmpty(currentUser) && !isEmpty(job)) {
//             setIsOwner(job.employer_id === currentUser.id);
//             setIsWorker(job.employee_id === currentUser.id);
//             setIsGuest(!isOwner && !isWorker);
//             if (job.employee_id) {
//                 axiosClient.get(`/user/${job.employee_id}`)
//                     .then(response => setJobHandler(response.data.data))
//                     .catch(error => console.error('An error occurred:', error));
//             }
//         }
//     }, [job]);

//     const handleDeleteClick = () => {
//         setOpenDel(true)
//     }



//     // Conditionally render based on the action
//     let ComponentToRender;

//     switch (action) {
//         case 'view':
//             ComponentToRender = <JobView
//                 job={job}
//                 jobHandler={jobHandler}
//                 isOwner={isOwner}
//                 isWorker={isWorker}
//             />;
//             break;
//         case 'terminate':
//             ComponentToRender = <JobTermination
//                 jobData={job}
//                 handler={jobHandler}
//                 isOwner={isOwner}
//             />;
//             break;
//     }

//     return (
//         <>
//             {
//                 loading ? <Loader /> : (
//                     <ComponentToRender />
//                 )
//             }

//         </>

//     );
// }



import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { isEmpty } from '../../helperFunctions';
import { useEffect, useState } from 'react';
import { useStateContext } from '../../context/ContextProvider';
import { axiosClient } from '../../context/axios';
import Loader from '../../components/core/Loader';
import JobView from './JobView';
import JobTermination from './JobTermination';
import useNotification from '../../hooks/useNotification';
import Notification from '../../components/core/Notification';



export default function JobDetails() {
    const navigate = useNavigate();
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const action = queryParams.get('action') || 'view';

    const { jobId } = useParams();
    const { currentUser } = useStateContext();

    const [job, setJob] = useState(null);
    const [jobHandler, setJobHandler] = useState(null);
    const [isOwner, setIsOwner] = useState(false);
    const [isWorker, setIsWorker] = useState(false);
    const [isGuest, setIsGuest] = useState(false);
    const [loading, setLoading] = useState(true);
    const { message, type, isVisible, showError } = useNotification();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const jobResponse = await axiosClient.get(`/work/${jobId}`);
                setJob(jobResponse.data.data);
            } catch (error) {
                console.error('An error occurred:', error);
                if (error.response && error.response.status === 403) {
                    navigate("/403");
                } else {
                    showError("Couldn't get Job");
                }
            } finally {
                setLoading(false);
            }
        };

        if (jobId && !isEmpty(currentUser)) {
            fetchData();
        }
    }, [jobId, currentUser, navigate]);

    useEffect(() => {
        if (!isEmpty(currentUser) && !isEmpty(job)) {
            setIsOwner(job.employer_id === currentUser.id);
            setIsWorker(job.employee_id === currentUser.id);
            setIsGuest(!isOwner && !isWorker);

            if (job.employee_id) {
                axiosClient.get(`/user/${job.employee_id}`)
                    .then(response => setJobHandler(response.data.data))
                    .catch(error => console.error('An error occurred:', error));
            }
        }
    }, [job, currentUser, isOwner, jobHandler]);

    let ComponentToRender = null;

    switch (action) {
        case 'view':
            ComponentToRender = JobView; // Use component directly without JSX
            break;
        case 'terminate':
            ComponentToRender = JobTermination; // Use component directly without JSX
            break;
        default:
            ComponentToRender = JobView;
            break;
    }

    return (
        <>
            {isVisible && (
                <Notification message={message} type={type} />
            )}

            {
                loading ? <Loader /> : (
                    // Ensure to pass props correctly if the component is a function
                    ComponentToRender && <ComponentToRender job={job} jobHandler={jobHandler} isOwner={isOwner} isWorker={isWorker} />
                )
            }
        </>
    );
}
