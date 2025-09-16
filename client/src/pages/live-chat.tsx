import { useState } from 'react';
import Header from '@/components/Header';
import ChatSidebar from '@/components/ChatSidebar';
import ChatArea from '@/components/ChatArea';
import UserProfile from '@/components/UserProfile';
import DocumentsModal from '@/components/DocumentsModal';
import { useChatStore } from '@/lib/store';
import { mockContacts } from '@/lib/mock-data';

export default function LiveChatPage() {
  const { activeTab, setActiveTab, activeContact, isDocumentsModalOpen } = useChatStore();

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Header />
      
      <div className="flex w-full pt-16">
        <div className="w-full">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200 bg-white shadow-sm">
            <div className="flex">
              <button
                onClick={() => setActiveTab('live-chat')}
                className={`px-8 py-4 text-sm font-semibold transition-all duration-200 ${
                  activeTab === 'live-chat'
                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
                data-testid="tab-live-chat"
              >
                Live Chat
              </button>
              <button
                onClick={() => setActiveTab('contacts')}
                className={`px-8 py-4 text-sm font-semibold transition-all duration-200 ${
                  activeTab === 'contacts'
                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
                data-testid="tab-contacts"
              >
                Contacts
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`px-8 py-4 text-sm font-semibold transition-all duration-200 ${
                  activeTab === 'settings'
                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
                data-testid="tab-settings"
              >
                Settings
              </button>
            </div>
          </div>

          <div className="flex h-full">
            <ChatSidebar />
            <ChatArea />
            {activeContact && <UserProfile />}
          </div>
        </div>
      </div>

      {isDocumentsModalOpen && <DocumentsModal />}
    </div>
  );
}
