import React from 'react';

const ChatWindow: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <div>
          <h2 className="font-semibold">Harsh Agarwal, +91 - 9865423032</h2>
        </div>
        <div className="flex items-center">
          <button className="border border-gray-300 px-3 py-1 rounded-md text-sm mr-2">Booking Intent</button>
          <button className="border border-gray-300 px-3 py-1 rounded-md text-sm mr-2">Talk to Human</button>
          <button className="bg-green-500 text-white px-3 py-1 rounded-md text-sm">Resolve</button>
        </div>
      </div>
      <div className="flex-1 p-4 bg-gray-100 overflow-y-auto">
        {/* Chat messages will go here */}
        <div className="flex mb-4">
            <div className="w-8 h-8 bg-gray-300 rounded-full mr-3"></div>
            <div className="bg-white p-3 rounded-lg">
                <p>Hi! I'm Skyla, your AI-powered pricing assistant. Send me a query, and I'll help you calculate the best rates instantly! Let's get started. 🚀</p>
            </div>
        </div>
        <div className="flex justify-end mb-4">
            <div className="bg-blue-500 text-white p-3 rounded-lg">
                <p>Hi,</p>
                <p>Kindly quote for the following hotel:</p>
                <p>No. of adults - 12</p>
                <p>City - Delhi</p>
                <p>Hotel - Novotel Aerocity</p>
            </div>
        </div>
      </div>
      <div className="p-4 border-t border-gray-200">
        <input type="text" placeholder="Write your message..." className="w-full p-2 border border-gray-300 rounded-md" />
      </div>
    </div>
  );
};

export default ChatWindow;
