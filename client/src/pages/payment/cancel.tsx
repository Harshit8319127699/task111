import { useEffect } from 'react';
import { X, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'wouter';

export default function PaymentCancelPage() {
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

      {/* Cancel Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <Card className="border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950/30">
            <CardHeader className="pb-8">
              <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <X className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
              </div>
              <CardTitle className="text-2xl text-yellow-800 dark:text-yellow-300">
                Payment Cancelled
              </CardTitle>
              <CardDescription className="text-yellow-700 dark:text-yellow-400 text-base">
                Your payment was not processed. No charges have been made to your account.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="bg-white dark:bg-background p-6 rounded-lg border">
                <h3 className="font-semibold mb-3">What happened?</h3>
                <p className="text-sm text-muted-foreground text-left mb-4">
                  The payment process was cancelled before completion. This could be because:
                </p>
                <ul className="text-left space-y-2 text-sm text-muted-foreground">
                  <li>• You clicked the back button or closed the payment window</li>
                  <li>• There was an issue with your payment method</li>
                  <li>• You decided not to proceed with the subscription</li>
                </ul>
              </div>

              <div className="bg-white dark:bg-background p-6 rounded-lg border">
                <h3 className="font-semibold mb-3">Want to try again?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  You can return to our pricing page to select a plan or continue using our free features.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/pricing">
                  <Button className="w-full sm:w-auto" data-testid="button-try-again">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Try Again
                  </Button>
                </Link>
                <Link href="/">
                  <Button variant="outline" className="w-full sm:w-auto" data-testid="button-continue-free">
                    Continue with Free
                  </Button>
                </Link>
              </div>

              <div className="text-xs text-muted-foreground">
                Need help? Contact our support team for assistance.
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}