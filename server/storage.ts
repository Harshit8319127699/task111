import { type User, type InsertUser, type Contact, type InsertContact, type Message, type InsertMessage, type Document, type InsertDocument, type Conversation, type InsertConversation, type Subscription, type InsertSubscription } from "../shared/schema.js";
import { randomUUID } from "crypto";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, user: Partial<User>): Promise<User | undefined>;

  // Contact methods
  getContacts(): Promise<Contact[]>;
  getContact(id: string): Promise<Contact | undefined>;
  createContact(contact: InsertContact): Promise<Contact>;
  updateContact(id: string, contact: Partial<Contact>): Promise<Contact | undefined>;
  deleteContact(id: string): Promise<boolean>;

  // Message methods
  getMessages(contactId: string): Promise<Message[]>;
  getMessage(id: string): Promise<Message | undefined>;
  createMessage(message: InsertMessage): Promise<Message>;
  deleteMessage(id: string): Promise<boolean>;

  // Document methods
  getDocuments(contactId: string): Promise<Document[]>;
  getDocument(id: string): Promise<Document | undefined>;
  createDocument(document: InsertDocument): Promise<Document>;
  deleteDocument(id: string): Promise<boolean>;

  // Conversation methods
  getConversations(): Promise<Conversation[]>;
  getConversation(id: string): Promise<Conversation | undefined>;
  createConversation(conversation: InsertConversation): Promise<Conversation>;
  updateConversation(id: string, conversation: Partial<Conversation>): Promise<Conversation | undefined>;

  // Subscription methods
  getSubscriptions(userId?: string): Promise<Subscription[]>;
  getSubscription(id: string): Promise<Subscription | undefined>;
  getSubscriptionByStripeId(stripeSubscriptionId: string): Promise<Subscription | undefined>;
  createSubscription(subscription: InsertSubscription): Promise<Subscription>;
  updateSubscription(id: string, subscription: Partial<Subscription>): Promise<Subscription | undefined>;
  deleteSubscription(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private contacts: Map<string, Contact>;
  private messages: Map<string, Message>;
  private documents: Map<string, Document>;
  private conversations: Map<string, Conversation>;
  private subscriptions: Map<string, Subscription>;

  constructor() {
    this.users = new Map();
    this.contacts = new Map();
    this.messages = new Map();
    this.documents = new Map();
    this.conversations = new Map();
    this.subscriptions = new Map();

    // Initialize with mock data
    this.initializeMockData();
  }

  private initializeMockData() {
    // Mock subscriptions for demo
    const mockSubscriptions = [
      {
        stripeSubscriptionId: "sub_demo_yearly_001",
        stripePriceId: "price_yearly_demo",
        status: 'active' as const,
        amount: "250",
        currency: "usd",
        planId: "yearly",
        userId: null,
        currentPeriodStart: new Date('2024-01-01'),
        currentPeriodEnd: new Date('2025-01-01'),
        cancelAtPeriodEnd: false,
      },
      {
        stripeSubscriptionId: "sub_demo_monthly_001",
        stripePriceId: "price_monthly_demo",
        status: 'active' as const,
        amount: "25",
        currency: "usd",
        planId: "monthly",
        userId: null,
        currentPeriodStart: new Date('2024-12-01'),
        currentPeriodEnd: new Date('2025-01-01'),
        cancelAtPeriodEnd: false,
      }
    ];

    mockSubscriptions.forEach(sub => {
      this.createSubscription(sub);
    });

    // Mock contacts
    const mockContacts = [
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
      }
    ];

    mockContacts.forEach(contact => {
      this.contacts.set(contact.id, contact);
    });
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id,
      email: insertUser.email || null,
      stripeCustomerId: insertUser.stripeCustomerId || null,
      stripeSubscriptionId: insertUser.stripeSubscriptionId || null
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: string, userUpdate: Partial<User>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;

    const updated = { ...user, ...userUpdate };
    this.users.set(id, updated);
    return updated;
  }

  // Contact methods
  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values());
  }

  async getContact(id: string): Promise<Contact | undefined> {
    return this.contacts.get(id);
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = randomUUID();
    const contact: Contact = { 
      ...insertContact, 
      id,
      createdAt: new Date(),
      source: insertContact.source || 'WhatsApp',
      status: insertContact.status || 'active',
      email: insertContact.email || null,
      avatar: insertContact.avatar || null,
      company: insertContact.company || null,
      city: insertContact.city || null,
      country: insertContact.country || null,
      website: insertContact.website || null,
      lastActive: insertContact.lastActive || null,
      totalMessages: insertContact.totalMessages || '0',
      tokensUsed: insertContact.tokensUsed || '0',
      isBlocked: insertContact.isBlocked || false,
      attributes: insertContact.attributes || null,
      tags: insertContact.tags || null
    };
    this.contacts.set(id, contact);
    return contact;
  }

  async updateContact(id: string, contactUpdate: Partial<Contact>): Promise<Contact | undefined> {
    const contact = this.contacts.get(id);
    if (!contact) return undefined;

    const updated = { ...contact, ...contactUpdate };
    this.contacts.set(id, updated);
    return updated;
  }

  async deleteContact(id: string): Promise<boolean> {
    return this.contacts.delete(id);
  }

  // Message methods
  async getMessages(contactId: string): Promise<Message[]> {
    return Array.from(this.messages.values()).filter(
      message => message.contactId === contactId
    );
  }

  async getMessage(id: string): Promise<Message | undefined> {
    return this.messages.get(id);
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const id = randomUUID();
    const message: Message = {
      ...insertMessage,
      id,
      timestamp: new Date(),
      contactId: insertMessage.contactId || null,
      isBot: insertMessage.isBot || false
    };
    this.messages.set(id, message);
    return message;
  }

  async deleteMessage(id: string): Promise<boolean> {
    return this.messages.delete(id);
  }

  // Document methods
  async getDocuments(contactId: string): Promise<Document[]> {
    return Array.from(this.documents.values()).filter(
      document => document.contactId === contactId
    );
  }

  async getDocument(id: string): Promise<Document | undefined> {
    return this.documents.get(id);
  }

  async createDocument(insertDocument: InsertDocument): Promise<Document> {
    const id = randomUUID();
    const document: Document = {
      ...insertDocument,
      id,
      createdAt: new Date(),
      contactId: insertDocument.contactId || null,
      url: insertDocument.url || null
    };
    this.documents.set(id, document);
    return document;
  }

  async deleteDocument(id: string): Promise<boolean> {
    return this.documents.delete(id);
  }

  // Conversation methods
  async getConversations(): Promise<Conversation[]> {
    return Array.from(this.conversations.values());
  }

  async getConversation(id: string): Promise<Conversation | undefined> {
    return this.conversations.get(id);
  }

  async createConversation(insertConversation: InsertConversation): Promise<Conversation> {
    const id = randomUUID();
    const conversation: Conversation = { 
      ...insertConversation, 
      id,
      contactId: insertConversation.contactId || null,
      lastMessage: insertConversation.lastMessage || null,
      lastMessageTime: insertConversation.lastMessageTime || null,
      unreadCount: insertConversation.unreadCount || '0',
      tags: insertConversation.tags || null,
      status: insertConversation.status || 'active'
    };
    this.conversations.set(id, conversation);
    return conversation;
  }

  async updateConversation(id: string, conversationUpdate: Partial<Conversation>): Promise<Conversation | undefined> {
    const conversation = this.conversations.get(id);
    if (!conversation) return undefined;

    const updated = { ...conversation, ...conversationUpdate };
    this.conversations.set(id, updated);
    return updated;
  }

  // Subscription methods
  async getSubscriptions(userId?: string): Promise<Subscription[]> {
    const allSubscriptions = Array.from(this.subscriptions.values());
    if (userId) {
      return allSubscriptions.filter(sub => sub.userId === userId);
    }
    return allSubscriptions;
  }

  async getSubscription(id: string): Promise<Subscription | undefined> {
    return this.subscriptions.get(id);
  }

  async getSubscriptionByStripeId(stripeSubscriptionId: string): Promise<Subscription | undefined> {
    return Array.from(this.subscriptions.values()).find(
      sub => sub.stripeSubscriptionId === stripeSubscriptionId
    );
  }

  async createSubscription(insertSubscription: InsertSubscription): Promise<Subscription> {
    const id = randomUUID();
    const subscription: Subscription = {
      ...insertSubscription,
      id,
      userId: insertSubscription.userId || null,
      currentPeriodStart: insertSubscription.currentPeriodStart || null,
      currentPeriodEnd: insertSubscription.currentPeriodEnd || null,
      cancelAtPeriodEnd: insertSubscription.cancelAtPeriodEnd || false,
      status: insertSubscription.status || 'active',
      currency: insertSubscription.currency || 'usd',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.subscriptions.set(id, subscription);
    return subscription;
  }

  async updateSubscription(id: string, subscriptionUpdate: Partial<Subscription>): Promise<Subscription | undefined> {
    const subscription = this.subscriptions.get(id);
    if (!subscription) return undefined;

    const updated = { 
      ...subscription, 
      ...subscriptionUpdate,
      updatedAt: new Date()
    };
    this.subscriptions.set(id, updated);
    return updated;
  }

  async deleteSubscription(id: string): Promise<boolean> {
    return this.subscriptions.delete(id);
  }
}

export const storage = new MemStorage();
