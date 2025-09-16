import { useState } from 'react';
import { Search, ArrowUpDown, Filter } from 'lucide-react';
import { useChatStore } from '@/lib/store';
import { mockContacts, mockConversations } from '@/lib/mock-data';
import { Input } from '@/components/ui/input';

export default function ChatSidebar() {
  const { 
    searchQuery, 
    setSearchQuery, 
    filterStatus, 
    setFilterStatus, 
    setActiveContact, 
    setSelectedConversation,
    activeContact 
  } = useChatStore();

  const filteredContacts = mockContacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         contact.phone.includes(searchQuery);
    
    // Filter by conversation status
    if (filterStatus !== 'all') {
      const conversation = mockConversations.find(c => c.contactId === contact.id);
      if (!conversation || conversation.status !== filterStatus) {
        return false;
      }
    }
    
    return matchesSearch;
  });

  const handleContactSelect = (contact: typeof mockContacts[0]) => {
    setActiveContact(contact);
    setSelectedConversation(contact.id);
  };

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col shadow-sm">
      {/* Chat Header */}
      <div className="p-6 border-b border-gray-100 bg-gradient-to-b from-gray-50 to-white">
        <h2 className="text-xl font-bold text-gray-900 mb-6" data-testid="sidebar-title">Live Chat</h2>
        
        {/* Search Bar */}
        <div className="relative mb-4">
          <Input
            type="text"
            placeholder="Search Name or Mobile Number"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-gray-50 border-gray-200 focus:bg-white focus:border-blue-300 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
            data-testid="input-search"
          />
          <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center space-x-2 mb-6">
          <button 
            className="flex items-center space-x-2 px-3 py-2 text-xs font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
            data-testid="button-sort"
          >
            <ArrowUpDown className="w-3 h-3" />
            <span>Sort</span>
          </button>
          <button 
            className="flex items-center space-x-2 px-3 py-2 text-xs font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
            data-testid="button-filter"
          >
            <Filter className="w-3 h-3" />
            <span>Filter</span>
          </button>
        </div>
        
        {/* Chat Tabs */}
        <div className="flex space-x-6 text-sm">
          <button 
            onClick={() => setFilterStatus('all')}
            className={`pb-2 font-semibold transition-all duration-200 ${
              filterStatus === 'all'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            data-testid="filter-all"
          >
            All
          </button>
          <button 
            onClick={() => setFilterStatus('pending')}
            className={`pb-2 font-semibold transition-all duration-200 ${
              filterStatus === 'pending'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            data-testid="filter-pending"
          >
            Pending
          </button>
          <button 
            onClick={() => setFilterStatus('booking')}
            className={`pb-2 font-semibold transition-all duration-200 ${
              filterStatus === 'booking'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            data-testid="filter-booking"
          >
            Booking
          </button>
        </div>
      </div>
      
      {/* Chat List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {filteredContacts.map((contact, index) => {
          const conversation = mockConversations.find(c => c.contactId === contact.id);
          const isActive = activeContact?.id === contact.id;
          
          return (
            <div
              key={contact.id}
              onClick={() => handleContactSelect(contact)}
              className={`p-4 border-b border-gray-100 cursor-pointer transition-all duration-200 ${
                isActive 
                  ? 'bg-blue-50 border-l-4 border-l-blue-500 shadow-sm' 
                  : 'hover:bg-gray-50 hover:shadow-sm'
              }`}
              data-testid={`contact-${contact.id}`}
            >
              <div className="flex items-start space-x-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-sm ${
                  isActive 
                    ? 'bg-gradient-to-br from-blue-500 to-blue-600' 
                    : 'bg-gradient-to-br from-gray-400 to-gray-500'
                }`}>
                  <span className="text-sm font-semibold text-white">
                    {contact.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-semibold text-gray-900" data-testid={`contact-name-${contact.id}`}>
                      {contact.name}
                    </h4>
                    <span className="text-xs text-gray-500 font-medium">Yesterday</span>
                  </div>
                  <p className="text-sm text-gray-600 truncate leading-relaxed">
                    {conversation?.lastMessage || 'You pinned a message'}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
