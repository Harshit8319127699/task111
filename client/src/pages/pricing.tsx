import { useState } from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

const plans = [
  {
    id: 'monthly',
    name: 'Monthly Plan',
    price: 25,
    currency: 'USD',
    interval: 'month',
    description: 'Perfect for getting started',
    features: [
      'Live Chat Support',
      'Contact Management',
      'Basic Analytics',
      'File Sharing',
      'Email Support'
    ],
    popular: false,
  },
  {
    id: 'yearly',
    name: 'Yearly Plan',
    price: 250,
    currency: 'USD',
    interval: 'year',
    description: 'Best value for growing businesses',
    features: [
      'Everything in Monthly',
      'Advanced Analytics',
      'Priority Support',
      'Custom Integrations',
      'Team Collaboration',
      '2 months free!'
    ],
    popular: true,
  },
];

export default function PricingPage() {
  const [loading, setLoading] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubscribe = async (planId: string, amount: number) => {
    setLoading(planId);
    try {
      const response = await apiRequest('POST', '/api/create-checkout-session', {
        planId,
        amount,
        successUrl: `${window.location.origin}/payment/success`,
        cancelUrl: `${window.location.origin}/payment/cancel`,
      });

      const { url } = await response.json();
      
      if (url) {
        window.location.href = url;
      } else {
        toast({
          title: "Error",
          description: "Failed to create checkout session",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Subscription error:', error);
      toast({
        title: "Error",
        description: "Failed to start subscription process",
        variant: "destructive",
      });
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="text-primary font-bold text-xl">rategen</div>
              <div className="w-2 h-2 bg-primary rounded-full"></div>
            </div>
            <Button variant="outline" size="sm">
              Back to Chat
            </Button>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get started with our powerful chat management system. Choose the plan that works best for your business.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan) => (
            <Card 
              key={plan.id} 
              className={`relative ${plan.popular ? 'border-primary shadow-lg scale-105' : ''}`}
              data-testid={`plan-card-${plan.id}`}
            >
              {plan.popular && (
                <Badge 
                  className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground"
                  data-testid="badge-popular"
                >
                  Most Popular
                </Badge>
              )}
              
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <CardDescription className="text-base">{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-muted-foreground">/{plan.interval}</span>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </CardContent>

              <CardFooter className="pt-6">
                <Button
                  className="w-full"
                  size="lg"
                  variant={plan.popular ? 'default' : 'outline'}
                  onClick={() => handleSubscribe(plan.id, plan.price)}
                  disabled={loading === plan.id}
                  data-testid={`button-subscribe-${plan.id}`}
                >
                  {loading === plan.id ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      <span>Processing...</span>
                    </div>
                  ) : (
                    `Subscribe to ${plan.name}`
                  )}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Test Card Info */}
        <div className="mt-16 max-w-2xl mx-auto">
          <Card className="bg-muted/50">
            <CardHeader>
              <CardTitle className="text-lg">Test Mode</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                This is running in test mode. Use these test card numbers:
              </p>
              <div className="space-y-2 text-sm">
                <div><strong>Success:</strong> 4242 4242 4242 4242</div>
                <div><strong>Decline:</strong> 4000 0000 0000 0002</div>
                <div className="text-xs text-muted-foreground mt-2">
                  Use any future expiry date and any CVC
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}