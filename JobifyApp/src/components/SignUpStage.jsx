<>
<div className="overflow-x-auto py-4">
{/* Step 2: Horizontal scrollable container */}
<div className="flex space-x-4">
  {filteredJobs.length > 0 ? (
    filteredJobs.map((job) => (
      <div
        key={job.employee_payment_id}
        className="bg-gray-100 p-6 rounded-lg shadow-md w-64"
      >
        <h3 className="text-lg font-semibold">{job.title}</h3>
        <p className="text-gray-600">{job.description}</p>
        <div className="mt-4">
          <p><strong>Salary:</strong> ${job.salary}</p>
        </div>
      </div>
    ))
  ) : (
    <p>No active jobs available</p>
  )}
</div>
</div>



<section>
                <h2 className=" text-lg font-bold text-gray-800">Organizations that may intrest you</h2>
                  {/* <div className="border-t border-blue-500">
                  </div> */}
                  <div className="container mx-auto py-6">
                    {/* Scrollable Company List */}
                    <div className="overflow-x-auto">
                      <div className="flex space-x-6">
                        {companies.map((company) => (
                          <div
                            key={company.id}
                            className="min-w-[280px] bg-white p-6 rounded-lg shadow-lg transition-transform hover:scale-105 hover:shadow-xl relative"
                          >
                            {/* Company Logo or Initials */}
                            <div className="flex items-center space-x-4 mb-4">
                              {company.profilePhoto ? (
                                <img
                                  src={company.profilePhoto}
                                  alt={company.companyName}
                                  className="w-16 h-16 rounded-full object-cover"
                                />
                              ) : (
                                <div className="w-16 h-16 bg-gray-400 text-white flex items-center justify-center rounded-full">
                                  <span className="text-2xl font-bold">{getInitialsC(company.companyName)}</span>
                                </div>
                              )}

                              <div>
                                <h3 className="text-xl font-semibold text-blue-600">{company.companyName}</h3>
                                <p className="text-sm text-gray-600">{company.website}</p>
                              </div>
                            </div>

                            {/* Verified Status */}
                            {company.verified && (
                              <div className="absolute top-2 right-2 flex items-center space-x-2 bg-green-500 text-white px-3 py-1 rounded-lg">
                                <CheckCircleIcon className="h-5 w-5 text-white" />
                                <span className="text-sm font-semibold">Verified</span>
                              </div>
                            )}

                            {/* Location and Bio */}
                            <div className="mt-4 text-sm text-gray-700">
                              <p>{company.location}</p>
                              <p className="mt-2  mb-5 text-gray-500">{company.bio}</p>
                            </div>

                            {/* View Profile Link */}
                            <a
                              href={`/company/${company.id}`}
                              className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-blue-500 font-semibold hover:text-blue-700 transition duration-300"
                            >
                              View Profile
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>



                <section>
                  <h2 className="py-4 text-lg font-bold text-gray-800">Accepted Jobs</h2>
                  <div className="overflow-x-auto py-6">
                    <div className="flex space-x-6 px-4">
                      {userRecomendedJobs.map((job) => (
                        <JobCard key={job.id} job={job} />
                      ))}
                    </div>
                  </div>
                </section>
                </>