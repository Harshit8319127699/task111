import { create } from 'zustand';
import { Contact, Message, Document, Conversation } from '../../../shared/schema.js';

interface ChatState {
  activeTab: 'live-chat' | 'contacts' | 'settings';
  activeContact: Contact | null;
  selectedConversation: string | null;
  isDocumentsModalOpen: boolean;
  searchQuery: string;
  filterStatus: 'all' | 'pending' | 'booking';
  
  // Actions
  setActiveTab: (tab: 'live-chat' | 'contacts' | 'settings') => void;
  setActiveContact: (contact: Contact | null) => void;
  setSelectedConversation: (conversationId: string | null) => void;
  setDocumentsModalOpen: (isOpen: boolean) => void;
  setSearchQuery: (query: string) => void;
  setFilterStatus: (status: 'all' | 'pending' | 'booking') => void;
}

export const useChatStore = create<ChatState>((set) => ({
  activeTab: 'live-chat',
  activeContact: null,
  selectedConversation: null,
  isDocumentsModalOpen: false,
  searchQuery: '',
  filterStatus: 'all',
  
  setActiveTab: (tab) => set({ activeTab: tab }),
  setActiveContact: (contact) => set({ activeContact: contact }),
  setSelectedConversation: (conversationId) => set({ selectedConversation: conversationId }),
  setDocumentsModalOpen: (isOpen) => set({ isDocumentsModalOpen: isOpen }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setFilterStatus: (status) => set({ filterStatus: status }),
}));
