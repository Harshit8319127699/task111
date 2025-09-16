import React from 'react';

const UserProfile: React.FC = () => {
  return (
    <div className="w-1/4 border-l border-gray-200 bg-gray-50 p-4">
      <h2 className="text-lg font-semibold mb-4">User Profile</h2>
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
        <div>
          <h3 className="font-semibold">Harsh Agarwal</h3>
          <p className="text-sm text-gray-600">+91 - 9865423032</p>
        </div>
      </div>
      <div className="text-sm text-gray-600">
        <div className="flex justify-between py-2 border-b">
          <span>Status</span>
          <span className="text-green-500">Active</span>
        </div>
        <div className="flex justify-between py-2 border-b">
          <span>Company</span>
          <span>-</span>
        </div>
        <div className="flex justify-between py-2 border-b">
          <span>Last Active</span>
          <span>March 12, 2025, 7:44AM</span>
        </div>
        <div className="flex justify-between py-2 border-b">
          <span>Total Messages</span>
          <span>200</span>
        </div>
        <div className="flex justify-between py-2 border-b">
          <span>Tokens Used</span>
          <span>.02%</span>
        </div>
        <div className="flex justify-between py-2 border-b">
          <span>Source</span>
          <span>------</span>
        </div>
        <div className="flex justify-between py-2">
          <span>Incoming</span>
          <span className="text-red-500">Blocked</span>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="font-semibold mb-2">Tags</h3>
        <div className="flex flex-wrap">
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">New</span>
          <span className="bg-purple-100 text-purple-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">Prospect</span>
          <span className="bg-pink-100 text-pink-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">Hot</span>
          <span className="bg-red-100 text-red-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">Spam</span>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
