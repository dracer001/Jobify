import React, { useState } from 'react';

export default function MetricsPage() {
  const [metrics] = useState({
    totalEarnings: 3500, // Example earnings in dollars
    completedJobsCreated: 20, // Number of completed jobs the user created
    completedJobsDone: 15, // Number of completed jobs the user did
    totalJobsCreated: 30, // Total jobs the user created
    totalJobsDone: 25, // Total jobs the user completed
    ongoingJobsCreated: 5, // Ongoing jobs created by the user
    ongoingJobsDone: 2, // Ongoing jobs the user is working on
    totalJobsInProgress: 7, // Total jobs in progress
  });

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6">
      <h2 className="text-xl md:text-2xl font-semibold text-gray-800">Your Metrics</h2>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* Earnings */}
        <div className="bg-white p-6 rounded-lg shadow-md space-y-2">
          <h3 className="text-lg font-semibold text-gray-800">Total Earnings</h3>
          <p className="text-2xl text-blue-600 font-bold">${metrics.totalEarnings}</p>
        </div>

        {/* Completed Jobs Created */}
        <div className="bg-white p-6 rounded-lg shadow-md space-y-2">
          <h3 className="text-lg font-semibold text-gray-800">Completed Jobs Created</h3>
          <p className="text-2xl text-green-600 font-bold">{metrics.completedJobsCreated}</p>
        </div>

        {/* Completed Jobs Done */}
        <div className="bg-white p-6 rounded-lg shadow-md space-y-2">
          <h3 className="text-lg font-semibold text-gray-800">Completed Jobs Done</h3>
          <p className="text-2xl text-green-600 font-bold">{metrics.completedJobsDone}</p>
        </div>

        {/* Total Jobs Created */}
        <div className="bg-white p-6 rounded-lg shadow-md space-y-2">
          <h3 className="text-lg font-semibold text-gray-800">Total Jobs Created</h3>
          <p className="text-2xl text-blue-600 font-bold">{metrics.totalJobsCreated}</p>
        </div>

        {/* Total Jobs Done */}
        <div className="bg-white p-6 rounded-lg shadow-md space-y-2">
          <h3 className="text-lg font-semibold text-gray-800">Total Jobs Done</h3>
          <p className="text-2xl text-blue-600 font-bold">{metrics.totalJobsDone}</p>
        </div>

        {/* Ongoing Jobs Created */}
        <div className="bg-white p-6 rounded-lg shadow-md space-y-2">
          <h3 className="text-lg font-semibold text-gray-800">Ongoing Jobs Created</h3>
          <p className="text-2xl text-yellow-600 font-bold">{metrics.ongoingJobsCreated}</p>
        </div>

        {/* Ongoing Jobs Done */}
        <div className="bg-white p-6 rounded-lg shadow-md space-y-2">
          <h3 className="text-lg font-semibold text-gray-800">Ongoing Jobs Done</h3>
          <p className="text-2xl text-yellow-600 font-bold">{metrics.ongoingJobsDone}</p>
        </div>

        {/* Total Jobs in Progress */}
        <div className="bg-white p-6 rounded-lg shadow-md space-y-2">
          <h3 className="text-lg font-semibold text-gray-800">Total Jobs in Progress</h3>
          <p className="text-2xl text-yellow-600 font-bold">{metrics.totalJobsInProgress}</p>
        </div>
      </div>
    </div>
  );
}
