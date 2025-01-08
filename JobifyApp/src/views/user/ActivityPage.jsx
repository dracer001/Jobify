import { useState } from "react";

// Sample activity data
const activityData = [
  {
    id: 1,
    content: "Applied for 'React Developer' job at ABC Corp.",
    timestamp: "2025-01-03T10:00:00Z",
  },
  {
    id: 2,
    content: "Updated profile picture.",
    timestamp: "2025-01-02T12:30:00Z",
  },
  {
    id: 3,
    content: "Saved 'Frontend Developer' job listing for later.",
    timestamp: "2025-01-01T15:45:00Z",
  },
  {
    id: 4,
    content: "Changed password.",
    timestamp: "2025-01-01T09:00:00Z",
  },
];

export default function ActivityPage() {
  const [activities, setActivities] = useState(activityData);

  const handleClearActivities = () => {
    setActivities([]);
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Your Activities</h2>
        <button
          onClick={handleClearActivities}
          className="text-sm text-red-600 hover:text-red-800 focus:outline-none"
        >
          Delete All
        </button>
      </div>

      {/* Activity List */}
      {activities.length > 0 ? (
        <div>
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="bg-white p-4 rounded-md mb-4 border-l-4 border-blue-500"
            >
              <p className="text-base text-gray-800">{activity.content}</p>
              <p className="text-xs text-gray-500">
                {new Date(activity.timestamp).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500">
          No activities found.
        </div>
      )}
    </div>
  );
}
