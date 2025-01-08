import { useState } from "react";

const notificationsData = [
  {
    id: 1,
    content: "Your job application has been received.",
    date: "2025-01-03T10:00:00Z",
    read: false,
  },
  {
    id: 2,
    content: "New recommended jobs are available!",
    date: "2025-01-02T12:00:00Z",
    read: true,
  },
  {
    id: 3,
    content: "You have a new message from a recruiter.",
    date: "2025-01-01T14:00:00Z",
    read: false,
  },
];

export default function NotificationPage() {
  const [notifications, setNotifications] = useState(notificationsData);

  const handleDelete = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id)
    );
  };

  const handleMarkRead = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Notifications</h2>
      <div className="space-y-4">
        {notifications
          .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort by most recent
          .map((notification) => (
            <div
              key={notification.id}
              className={`p-4 rounded-lg shadow-md ${
                notification.read ? "bg-white" : "bg-yellow-100"
              }`}
            >
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <p className="text-lg font-semibold text-gray-800">
                    {notification.content}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(notification.date).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(notification.id)}
                  className="text-red-500 hover:text-red-700 ml-4"
                >
                  Delete
                </button>
              </div>
              {!notification.read && (
                <button
                  onClick={() => handleMarkRead(notification.id)}
                  className="mt-2 text-blue-500 hover:text-blue-700 text-sm"
                >
                  Mark as Read
                </button>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}
