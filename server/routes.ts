import type { Express } from "express";
import { createServer, type Server } from "http";
import Stripe from "stripe";
import { storage } from "./storage";
import { insertContactSchema, insertMessageSchema, insertDocumentSchema, insertSubscriptionSchema } from "../shared/schema.js";

// Stripe configuration - From javascript_stripe blueprint
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing required Stripe secret: STRIPE_SECRET_KEY');
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-08-27.basil",
});

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Contact routes
  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ message: "Failed to get contacts" });
    }
  });

  app.get("/api/contacts/:id", async (req, res) => {
    try {
      const contact = await storage.getContact(req.params.id);
      if (!contact) {
        return res.status(404).json({ message: "Contact not found" });
      }
      res.json(contact);
    } catch (error) {
      res.status(500).json({ message: "Failed to get contact" });
    }
  });

  app.post("/api/contacts", async (req, res) => {
    try {
      const contactData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(contactData);
      res.status(201).json(contact);
    } catch (error) {
      res.status(400).json({ message: "Invalid contact data" });
    }
  });

  app.patch("/api/contacts/:id", async (req, res) => {
    try {
      const contact = await storage.updateContact(req.params.id, req.body);
      if (!contact) {
        return res.status(404).json({ message: "Contact not found" });
      }
      res.json(contact);
    } catch (error) {
      res.status(500).json({ message: "Failed to update contact" });
    }
  });

  // Message routes
  app.get("/api/contacts/:contactId/messages", async (req, res) => {
    try {
      const messages = await storage.getMessages(req.params.contactId);
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: "Failed to get messages" });
    }
  });

  app.post("/api/messages", async (req, res) => {
    try {
      const messageData = insertMessageSchema.parse(req.body);
      const message = await storage.createMessage(messageData);
      res.status(201).json(message);
    } catch (error) {
      res.status(400).json({ message: "Invalid message data" });
    }
  });

  // Document routes
  app.get("/api/contacts/:contactId/documents", async (req, res) => {
    try {
      const documents = await storage.getDocuments(req.params.contactId);
      res.json(documents);
    } catch (error) {
      res.status(500).json({ message: "Failed to get documents" });
    }
  });

  app.post("/api/documents", async (req, res) => {
    try {
      const documentData = insertDocumentSchema.parse(req.body);
      const document = await storage.createDocument(documentData);
      res.status(201).json(document);
    } catch (error) {
      res.status(400).json({ message: "Invalid document data" });
    }
  });

  app.delete("/api/documents/:id", async (req, res) => {
    try {
      const success = await storage.deleteDocument(req.params.id);
      if (!success) {
        return res.status(404).json({ message: "Document not found" });
      }
      res.json({ message: "Document deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete document" });
    }
  });

  // Conversation routes
  app.get("/api/conversations", async (req, res) => {
    try {
      const conversations = await storage.getConversations();
      res.json(conversations);
    } catch (error) {
      res.status(500).json({ message: "Failed to get conversations" });
    }
  });

  // Stripe Checkout Session - Create checkout for subscription
  app.post("/api/create-checkout-session", async (req, res) => {
    try {
      const { planId, amount, successUrl, cancelUrl } = req.body;

      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        ui_mode: 'hosted',
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: planId === 'yearly' ? 'Yearly Plan' : 'Monthly Plan',
                description: planId === 'yearly' ? 'Annual subscription with 2 months free!' : 'Monthly subscription',
              },
              unit_amount: Math.round(amount * 100), // Convert to cents
              recurring: {
                interval: planId === 'yearly' ? 'year' : 'month',
              },
            },
            quantity: 1,
          },
        ],
        mode: 'subscription',
        success_url: successUrl,
        cancel_url: cancelUrl,
        metadata: {
          planId: planId,
        },
      });

      res.json({ url: session.url });
    } catch (error: any) {
      res.status(500).json({ message: "Error creating checkout session: " + error.message });
    }
  });

  // Subscription routes
  app.get("/api/subscriptions", async (req, res) => {
    try {
      // For demo purposes, return all subscriptions. In production, filter by authenticated user
      const subscriptions = await storage.getSubscriptions();
      res.json(subscriptions);
    } catch (error) {
      res.status(500).json({ message: "Failed to get subscriptions" });
    }
  });

  app.get("/api/subscriptions/:id", async (req, res) => {
    try {
      const subscription = await storage.getSubscription(req.params.id);
      if (!subscription) {
        return res.status(404).json({ message: "Subscription not found" });
      }
      res.json(subscription);
    } catch (error) {
      res.status(500).json({ message: "Failed to get subscription" });
    }
  });

  app.post("/api/subscriptions/:id/cancel", async (req, res) => {
    try {
      const subscription = await storage.getSubscription(req.params.id);
      if (!subscription) {
        return res.status(404).json({ message: "Subscription not found" });
      }

      // Cancel the subscription in Stripe
      if (subscription.stripeSubscriptionId) {
        await stripe.subscriptions.update(subscription.stripeSubscriptionId, {
          cancel_at_period_end: true,
        });
      }

      // Update local subscription
      const updated = await storage.updateSubscription(req.params.id, {
        cancelAtPeriodEnd: true,
      });

      res.json(updated);
    } catch (error: any) {
      res.status(500).json({ message: "Failed to cancel subscription: " + error.message });
    }
  });

  // Stripe webhook handling
  app.post("/api/webhooks/stripe", async (req, res) => {
    try {
      // In production, verify the webhook signature here
      const event = req.body;

      switch (event.type) {
        case 'checkout.session.completed':
          const session = event.data.object;
          
          // Create subscription record
          await storage.createSubscription({
            stripeSubscriptionId: session.subscription,
            stripePriceId: session.line_items?.data[0]?.price?.id || '',
            status: 'active',
            amount: String((session.amount_total || 0) / 100), // Convert from cents
            currency: session.currency || 'usd',
            planId: session.metadata?.planId || 'monthly',
            userId: null, // In production, link to authenticated user
            currentPeriodStart: null,
            currentPeriodEnd: null,
            cancelAtPeriodEnd: false,
          });
          break;

        case 'customer.subscription.updated':
        case 'customer.subscription.deleted':
          const subscription = event.data.object;
          
          const existingSubscription = await storage.getSubscriptionByStripeId(subscription.id);
          if (existingSubscription) {
            await storage.updateSubscription(existingSubscription.id, {
              status: subscription.status,
              currentPeriodStart: new Date(subscription.current_period_start * 1000),
              currentPeriodEnd: new Date(subscription.current_period_end * 1000),
              cancelAtPeriodEnd: subscription.cancel_at_period_end,
            });
          }
          break;

        default:
          console.log(`Unhandled event type ${event.type}`);
      }

      res.json({ received: true });
    } catch (error: any) {
      console.error('Webhook error:', error);
      res.status(400).json({ message: "Webhook error: " + error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
