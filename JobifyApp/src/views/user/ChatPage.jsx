import React, { useState } from 'react';

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'John', message: 'Hey there! How are you?', timestamp: '2025-01-03 12:15 PM', isSent: false },
    { id: 2, sender: 'You', message: 'I\'m good! How about you?', timestamp: '2025-01-03 12:16 PM', isSent: true },
    { id: 3, sender: 'John', message: 'I\'m doing great, thanks for asking!', timestamp: '2025-01-03 12:17 PM', isSent: false },
  ]);
  
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        { id: messages.length + 1, sender: 'You', message: newMessage, timestamp: new Date().toLocaleString(), isSent: true },
      ]);
      setNewMessage('');
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-4 shadow-md rounded-t-lg">
        <button className="text-gray-500 text-lg">←</button>
        <h2 className="font-semibold text-lg text-gray-800">John Doe</h2>
        <button className="text-gray-500">⋮</button>
      </div>

      {/* Message List */}
      <div className="flex flex-col p-4 space-y-4 max-h-96 overflow-y-auto">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.isSent ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs p-3 rounded-lg text-white ${msg.isSent ? 'bg-blue-500' : 'bg-gray-300 text-gray-800'}`}
            >
              <p className="text-sm">{msg.message}</p>
              <p className="text-xs text-gray-400">{msg.timestamp}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input Field and Send Button */}
      <div className="flex items-center bg-white p-4 shadow-md rounded-b-lg">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={handleSendMessage}
          className="ml-3 p-3 bg-blue-500 rounded-full text-white hover:bg-blue-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 12l14-9-4 9 4 9-14-9z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
