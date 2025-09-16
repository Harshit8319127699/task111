# Live Chat & Subscription Management System

A full-stack web application combining a live chat interface with Stripe subscription management. Built with React, TypeScript, Express.js, and Stripe integration.

## 🚀 Features

### Live Chat System
- **Multi-tab interface**: Live Chat, Contacts, Settings
- **Contact management**: Search, filter, and organize contacts
- **Real-time messaging**: Chat interface with bot and user messages
- **Contact profiles**: Detailed contact information display
- **Document sharing**: File attachment capabilities
- **Conversation filtering**: By status (All, Pending, Booking)

### Subscription Management
- **Pricing plans**: Monthly ($25) and Yearly ($250) options
- **Stripe integration**: Full checkout flow with live mode
- **Subscription dashboard**: View and manage active subscriptions
- **Payment processing**: Success/cancel handling
- **Webhook support**: Stripe event handling

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for build tooling
- **Wouter** for routing
- **TanStack Query** for data fetching
- **Zustand** for state management
- **Shadcn/ui** component library
- **Tailwind CSS** for styling

### Backend
- **Express.js** with TypeScript
- **Stripe** for payment processing
- **Drizzle ORM** with PostgreSQL schema
- **In-memory storage** for development

## 📋 Prerequisites

- **Node.js** (v18 or higher)
- **npm** (v8 or higher)
- **Stripe account** with live API keys

## 🚀 Quick Start

### 1. Install Dependencies

```bash
# Install all dependencies (root, client, and server)
npm run install:all
```

### 2. Environment Setup

The `.env` file is already configured with your Stripe live keys:
- `STRIPE_SECRET_KEY`: Your Stripe secret key
- `STRIPE_PUBLISHABLE_KEY`: Your Stripe publishable key
- `VITE_STRIPE_PUBLIC_KEY`: Your Stripe public key for the client

### 3. Start Development Servers

```bash
# Start both client and server concurrently
npm run dev
```

This will start:
- **Client**: http://localhost:3000
- **Server**: http://localhost:5000

### 4. Access the Application

Open your browser and navigate to:
- **Main App**: http://localhost:3000
- **Pricing Page**: http://localhost:3000/pricing
- **Dashboard**: http://localhost:3000/dashboard

## 📁 Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── pages/         # Route components
│   │   ├── lib/           # Utilities, store, mock data
│   │   └── hooks/         # Custom React hooks
│   ├── package.json
│   └── vite.config.ts
├── server/                # Express backend
│   ├── index.ts          # Server entry point
│   ├── routes.ts         # API routes
│   ├── storage.ts        # Data storage layer
│   └── package.json
├── shared/               # Shared types and schemas
│   └── schema.ts
├── package.json          # Root package.json
└── README.md
```

## 🔧 Available Scripts

### Root Level
```bash
npm run dev              # Start both client and server
npm run dev:client       # Start only client
npm run dev:server       # Start only server
npm run build            # Build both client and server
npm run install:all      # Install all dependencies
npm run clean            # Clean all node_modules and dist folders
```

### Client
```bash
cd client
npm run dev              # Start Vite dev server
npm run build            # Build for production
npm run preview          # Preview production build
```

### Server
```bash
cd server
npm run dev              # Start with tsx watch
npm run build            # Build TypeScript
npm start                # Start production server
```

## 💳 Stripe Integration

### Live Mode Configuration
The application is configured with **live Stripe keys** for production use:

- **Secret Key**: Used for server-side operations
- **Publishable Key**: Used for client-side operations
- **Webhook Support**: Handles subscription events

### Test Cards (if switching to test mode)
- **Success**: 4242 4242 4242 4242
- **Decline**: 4000 0000 0000 0002
- Use any future expiry date and any CVC

## 🎨 UI Components

The application uses **Shadcn/ui** components with Tailwind CSS:
- Modern, accessible components
- Dark/light mode support
- Responsive design
- Custom animations and transitions

## 📊 Database Schema

The application includes a comprehensive schema for:
- **Users**: Authentication and Stripe customer data
- **Contacts**: Customer information and metadata
- **Messages**: Chat conversation history
- **Documents**: File attachments
- **Conversations**: Chat session management
- **Subscriptions**: Stripe subscription tracking

## 🔒 Security

- Environment variables for sensitive data
- TypeScript for type safety
- Input validation with Zod
- CORS configuration
- Secure Stripe integration

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Environment Variables for Production
Ensure these are set in your production environment:
- `STRIPE_SECRET_KEY`
- `STRIPE_PUBLISHABLE_KEY`
- `VITE_STRIPE_PUBLIC_KEY`
- `PORT` (default: 5000)

## 📝 API Endpoints

### Contacts
- `GET /api/contacts` - Get all contacts
- `GET /api/contacts/:id` - Get specific contact
- `POST /api/contacts` - Create new contact
- `PATCH /api/contacts/:id` - Update contact

### Messages
- `GET /api/contacts/:contactId/messages` - Get messages for contact
- `POST /api/messages` - Create new message

### Subscriptions
- `GET /api/subscriptions` - Get all subscriptions
- `POST /api/create-checkout-session` - Create Stripe checkout
- `POST /api/subscriptions/:id/cancel` - Cancel subscription
- `POST /api/webhooks/stripe` - Stripe webhook handler

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues:
1. Check the console for errors
2. Verify environment variables are set
3. Ensure all dependencies are installed
4. Check that both client and server are running

---

**Note**: This application uses live Stripe keys. Be cautious when testing payment functionality as it will process real payments.
"# task" 
