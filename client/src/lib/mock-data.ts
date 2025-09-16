import { Contact, Message, Document, Conversation } from '../../../shared/schema.js';

export const mockContacts: Contact[] = [
  {
    id: '1',
    name: 'Harsh Agarwal',
    phone: '+91 - 9865423032',
    avatar: '',
    status: 'active',
    company: '',
    city: 'Ghaziabad',
    country: 'India',
    email: 'harsh@gmail.com',
    website: 'www.chattmc.com',
    lastActive: new Date('2025-03-12T07:44:00'),
    totalMessages: '200',
    tokensUsed: '.02%',
    source: 'WhatsApp',
    isBlocked: true,
    attributes: {
      admin: 'Harsh Agarwal',
      adminMobile: '+91 - 9865423032',
      date: 'March 20, 2025'
    },
    tags: ['New', 'Prospect', 'Hot', 'Spam'],
    createdAt: new Date(),
  },
  {
    id: '2',
    name: 'Ritik',
    phone: '+91 - 9876543210',
    avatar: '',
    status: 'active',
    company: '',
    city: 'Delhi',
    country: 'India',
    email: 'ritik@example.com',
    website: '',
    lastActive: new Date(),
    totalMessages: '50',
    tokensUsed: '.01%',
    source: 'WhatsApp',
    isBlocked: false,
    attributes: {},
    tags: ['New'],
    createdAt: new Date(),
  },
  {
    id: '3',
    name: 'Santo',
    phone: '+91 - 9765432109',
    avatar: '',
    status: 'active',
    company: '',
    city: 'Mumbai',
    country: 'India',
    email: 'santo@example.com',
    website: '',
    lastActive: new Date(),
    totalMessages: '25',
    tokensUsed: '.005%',
    source: 'WhatsApp',
    isBlocked: false,
    attributes: {},
    tags: [],
    createdAt: new Date(),
  }
];

export const mockMessages: Message[] = [
  {
    id: '1',
    contactId: '1',
    content: "Hi I'm Skyla, your AI-powered pricing assistant. Send me a query, and I'll help you calculate the best rates instantly! Let's get started.",
    isBot: true,
    timestamp: new Date('2025-03-12T10:00:00'),
  },
  {
    id: '2',
    contactId: '1',
    content: "Hi,\n\nKindly quote for the following hotel:\n\nNo. of adults - 12\nCity - Delhi\n\nHotel - Novotel Aerocity",
    isBot: false,
    timestamp: new Date('2025-03-12T10:01:00'),
  },
  {
    id: '3',
    contactId: '1',
    content: "Your Rates are ready! 😊 Let me know if you need any adjustments.",
    isBot: true,
    timestamp: new Date('2025-03-12T10:02:00'),
  }
];

export const mockDocuments: Document[] = [
  {
    id: '1',
    contactId: '1',
    name: 'Itinerary 1.pdf',
    size: '1MB',
    type: 'pdf',
    url: '/documents/itinerary1.pdf',
    createdAt: new Date(),
  },
  {
    id: '2',
    contactId: '1',
    name: 'Itinerary 2.pdf',
    size: '1MB',
    type: 'pdf',
    url: '/documents/itinerary2.pdf',
    createdAt: new Date(),
  },
  {
    id: '3',
    contactId: '1',
    name: 'Itinerary 3.pdf',
    size: '1MB',
    type: 'pdf',
    url: '/documents/itinerary3.pdf',
    createdAt: new Date(),
  }
];

export const mockConversations: Conversation[] = [
  {
    id: '1',
    contactId: '1',
    lastMessage: 'Your Rates are ready! 😊',
    lastMessageTime: new Date('2025-03-12T10:02:00'),
    unreadCount: '0',
    tags: ['Booking Intent', 'Talk to Human'],
    status: 'booking',
  },
  {
    id: '2',
    contactId: '2',
    lastMessage: 'You pinned a message',
    lastMessageTime: new Date(),
    unreadCount: '1',
    tags: [],
    status: 'pending',
  },
  {
    id: '3',
    contactId: '3',
    lastMessage: 'You pinned a message',
    lastMessageTime: new Date(),
    unreadCount: '0',
    tags: [],
    status: 'active',
  }
];
