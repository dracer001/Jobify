import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useStateContext } from '../../context/ContextProvider'
import { isEmpty } from '../../helperFunctions';
import FButton from '../../components/core/FButton';
import Loader from '../../components/core/Loader';
import { axiosClient } from '../../context/axios';
import useNotification from '../../hooks/useNotification';
import Badge, { BadgeStatus } from '../../components/core/Badges';

export default function UserJobs() {
  // Sample data of jobs (replace this with actual data from API or state)
  const { currentUser } = useStateContext();
  const { message, type, isVisible, showError, showSuccess } = useNotification();

  const [userJobs, setUserJobs] = useState([]);
  const [createdJobs, setCreatedJobs] = useState([]);
  const [handlingJobs, setHandlingJobs] = useState([]);
  const [requestedJobs, setRequestedJobs] = useState([]);

  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const [loading, setLoading] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);  // Set loading to true when starting the API calls
      try {
        const response = await axiosClient.get(`/work/associate`);
        setCreatedJobs(response.data.createdJobs || []);
        setHandlingJobs(response.data.handlingJobs || []);
        setRequestedJobs(response.data.requestedJobs || []);
      } catch (error) {
        console.error('An error occurred:', error);
        showError("Error fetching information ");
      } finally {
        setLoading(false);  // Always set loading to false when done
      }
    };
    if (!isEmpty(currentUser)) {
      fetchData();  // Call the async function
    }
  }, [currentUser]);

  useEffect(() => {
    console.log(filter);
    switch (filter) {
      case 'all':
        setUserJobs([
          ...new Map([...createdJobs, ...handlingJobs, ...requestedJobs].map(job => [job.id, job])).values()
        ]);

        break;
      case 'created':
        setUserJobs([...createdJobs]);
        break;
      case 'handling':
        setUserJobs([...handlingJobs]);
        break;
      case 'requested_in':
        setUserJobs(requestedJobs.filter(job => job.work_request && job.work_request.type === 'requested_in'));
        break;
      case 'requested_out':
        setUserJobs(requestedJobs.filter(job => job.work_request && job.work_request.type === 'requested_out'));
        break;
      default:
        setUserJobs([...createdJobs, ...handlingJobs, ...requestedJobs]);
    }
  }, [filter, createdJobs, handlingJobs, requestedJobs]);




  // Filter jobs based on search term and selected filter
  const filteredJobs = userJobs.filter((job) => {
    const isJobNameMatch = job.title.toLowerCase().includes(searchTerm.toLowerCase())
    return isJobNameMatch
  })

  const filterOptions = [
    {
      label: "All",
      keyword: "all"
    },
    {
      label: "Created",
      keyword: "created"
    },
    {
      label: "Handling",
      keyword: "handling"
    },
    {
      label: "Requested In",
      keyword: "requested_in"
    },
    {
      label: "Requested Out",
      keyword: "requested_out"
    },
  ]
  return (
    <>
      {
        loading ? (
          <Loader />
        ) : (
          <div className="container mx-auto p-6">
            {/* Filter Bar */}

            <div className="flex mb-6 gap-y-3 gap-x-5 flex-wrap">
              {
                filterOptions.map((option, index) => (
                  <FButton
                    key={index}
                    label={option.label}
                    onClick={() => setFilter(option.keyword)}
                    isActive={filter === option.keyword}
                  />
                ))
              }

            </div>

            {/* Search Bar */}
            <div className="mb-6">
              <input
                type="text"
                placeholder="Search by job title..."
                className="w-full sm:w-1/2 px-4 py-2 rounded-lg border border-gray-300 focus:outline-indigo-500 focus:ring-2 focus:ring-indigo-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Job List - Mobile Friendly */}
            <div className="space-y-4">
              {filteredJobs.length >0 ?
                (
                  filteredJobs.map((job) => (
                    <div
                      key={job.id}
                      className="bg-white border border-gray-200 rounded-lg shadow-md p-4 sm:flex sm:items-center sm:justify-between sm:p-6"
                    >
                      {/* Job Name & Status */}
                      <div className="sm:flex sm:items-center sm:space-x-4">
                        <div className="text-lg font-semibold text-gray-900">{job.title}</div>

                        {(currentUser.id === job.employer_id || currentUser.id === job.employee_id) &&
                          <div className="flex flex-col sm:flex-row sm:items-center mb-4">
                            <span className="text-sm text-gray-600 sm:mr-2">Job Status:</span>
                            <span className=''>
                              <BadgeStatus
                                status={job.status}
                                theme='medium'
                                size='sm'
                              />
                            </span>
                          </div>
                        }

                        {
                          currentUser.id === job.employer_id &&
                          <div className="flex flex-col sm:flex-row sm:items-center mb-4">
                            <span className="text-sm text-gray-600 sm:mr-2">Job Payment:</span>
                            <span className=''>
                              <BadgeStatus
                                status={job.employer_payment_status}
                                theme='medium'
                                size='md'
                              />
                            </span>
                          </div>
                        }
                        {
                          currentUser.id === job.employee_id &&
                          <div className="flex flex-col sm:flex-row sm:items-center mb-4">
                            <span className="text-sm text-gray-600 sm:mr-2">Job Payment:</span>
                            <span className=''>
                              <BadgeStatus
                                status={job.employee_payment_status}
                                theme='medium'
                                size='md'
                              />
                            </span>
                          </div>
                        }

                        {
                          job.work_request &&
                          <div className="flex flex-col sm:flex-row sm:items-center mb-4">
                            <span className="text-sm text-gray-600 sm:mr-2">Request Status:</span>
                            <span className=''>
                              <BadgeStatus
                                status={job.work_request.status}
                                theme='medium'
                                size='sm'
                              />
                            </span>
                          </div>
                        }
                      </div>

                      {/* Actions (View Details) */}
                      <div className="mt-3 sm:mt-0 sm:text-right">
                        <Link
                          to={`/job/${job.id}`}
                          className="inline-block text-indigo-600 hover:text-indigo-900 text-sm font-medium"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className='text-center'> no jobs available for this query</div>
                )
              }
            </div>
          </div>
        )
      }
    </>
  )
}