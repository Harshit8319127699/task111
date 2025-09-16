import React from 'react';

const ChatList: React.FC = () => {
  return (
    <div className="w-1/4 border-r border-gray-200 bg-gray-50 p-4">
      <h2 className="text-lg font-semibold mb-4">Live Chat</h2>
      <div className="flex mb-4">
        <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-l-md">All</button>
        <button className="text-gray-600 px-4 py-2">Pending</button>
        <button className="text-gray-600 px-4 py-2 rounded-r-md">Booking</button>
      </div>
      <div>
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="flex items-center p-2 mb-2 rounded-md hover:bg-gray-100 cursor-pointer">
            <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
            <div className="flex-grow">
              <div className="flex justify-between">
                <h3 className="font-semibold">User Name</h3>
                <span className="text-xs text-gray-500">Yesterday</span>
              </div>
              <p className="text-sm text-gray-600">You pinned a message</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;
