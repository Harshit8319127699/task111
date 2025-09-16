import { useEffect } from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'wouter';

export default function PaymentSuccessPage() {
  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center space-x-2">
            <div className="text-primary font-bold text-xl">rategen</div>
            <div className="w-2 h-2 bg-primary rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Success Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/30">
            <CardHeader className="pb-8">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle className="text-2xl text-green-800 dark:text-green-300">
                Payment Successful!
              </CardTitle>
              <CardDescription className="text-green-700 dark:text-green-400 text-base">
                Thank you for your subscription. Your payment has been processed successfully.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="bg-white dark:bg-background p-6 rounded-lg border">
                <h3 className="font-semibold mb-3">What's Next?</h3>
                <ul className="text-left space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>You'll receive a confirmation email shortly</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>Your subscription is now active</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>Access all premium features immediately</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>Manage your subscription in the dashboard</span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/dashboard">
                  <Button className="w-full sm:w-auto" data-testid="button-dashboard">
                    View Dashboard
                  </Button>
                </Link>
                <Link href="/">
                  <Button variant="outline" className="w-full sm:w-auto" data-testid="button-chat">
                    Start Chatting
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}