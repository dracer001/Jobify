import React, { useState } from 'react';

export default function ChatHomePage() {
  // Sample chat data for recent conversations
  const [chats] = useState([
    {
      id: 1,
      user: 'John Doe',
      lastMessage: 'Hey there! How are you?',
      timestamp: '2025-01-03 12:15 PM',
      online: true,
    },
    {
      id: 2,
      user: 'Sarah Smith',
      lastMessage: 'Just finished the project, we need to discuss.',
      timestamp: '2025-01-02 9:30 AM',
      online: false,
    },
    {
      id: 3,
      user: 'Mark Johnson',
      lastMessage: 'Good to see you! Are we meeting tomorrow?',
      timestamp: '2025-01-01 6:45 PM',
      online: true,
    },
    {
      id: 4,
      user: 'Alice Brown',
      lastMessage: 'I’ve sent you the file. Let me know if you need anything.',
      timestamp: '2025-01-01 11:00 AM',
      online: false,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  // Filter chats based on the search term
  const filteredChats = chats.filter((chat) =>
    chat.user.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6 bg-gray-100">

      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for users..."
          className="w-full max-w-md px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Recent Chats */}
      <div className="space-y-4">
        {filteredChats.length === 0 ? (
          <div className="text-center text-gray-500">No chats found</div>
        ) : (
          filteredChats.map((chat) => (
            <div
              key={chat.id}
              className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md cursor-pointer hover:bg-gray-50"
            >
              {/* Online Status Indicator */}
              <div className="flex items-center">
                <div
                  className={`w-3 h-3 rounded-full mr-3 ${
                    chat.online ? 'bg-green-500' : 'bg-gray-400'
                  }`}
                ></div>
                <div>
                  <p className="font-semibold text-gray-800">{chat.user}</p>
                  <p className="text-sm text-gray-500">{chat.lastMessage}</p>
                </div>
              </div>
              <p className="text-xs text-gray-400">{chat.timestamp}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
