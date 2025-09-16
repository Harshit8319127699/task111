import { useState, useEffect } from 'react';
import { Calendar, CreditCard, AlertCircle, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { Subscription } from '../../../shared/schema.js';

export default function DashboardPage() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: subscriptions, isLoading } = useQuery({
    queryKey: ['/api/subscriptions'],
    queryFn: async () => {
      const response = await apiRequest('GET', '/api/subscriptions');
      return response.json() as Promise<Subscription[]>;
    },
  });

  const cancelMutation = useMutation({
    mutationFn: async (subscriptionId: string) => {
      const response = await apiRequest('POST', `/api/subscriptions/${subscriptionId}/cancel`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/subscriptions'] });
      toast({
        title: "Subscription Cancelled",
        description: "Your subscription will remain active until the end of the current billing period.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to cancel subscription. Please try again.",
        variant: "destructive",
      });
    },
  });

  const formatDate = (date: Date | string | null) => {
    if (!date) return 'N/A';
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'canceled':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'past_due':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'incomplete':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  const getPlanName = (planId: string) => {
    switch (planId) {
      case 'monthly':
        return 'Monthly Plan';
      case 'yearly':
        return 'Yearly Plan';
      default:
        return planId;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-6 py-16">
          <div className="flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        </div>
      </div>
    );
  }

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

      {/* Dashboard Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Subscription Dashboard</h1>
          <p className="text-muted-foreground">Manage your active subscriptions and billing information</p>
        </div>

        {!subscriptions || subscriptions.length === 0 ? (
          <Card className="max-w-2xl">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center space-x-2">
                <CreditCard className="w-6 h-6" />
                <span>No Active Subscriptions</span>
              </CardTitle>
              <CardDescription>
                You don't have any active subscriptions. Choose a plan to get started.
              </CardDescription>
            </CardHeader>
            <CardFooter className="justify-center">
              <Button data-testid="button-view-plans">
                View Plans
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <div className="space-y-6">
            {subscriptions.map((subscription) => (
              <Card key={subscription.id} className="max-w-4xl" data-testid={`subscription-${subscription.id}`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center space-x-3">
                        <span>{getPlanName(subscription.planId || '')}</span>
                        <Badge className={getStatusColor(subscription.status || 'active')}>
                          {subscription.status?.charAt(0).toUpperCase() + subscription.status?.slice(1)}
                        </Badge>
                      </CardTitle>
                      <CardDescription className="mt-2">
                        ${subscription.amount} {subscription.currency?.toUpperCase()} / {subscription.planId === 'yearly' ? 'year' : 'month'}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">${subscription.amount}</div>
                      <div className="text-sm text-muted-foreground">{subscription.currency?.toUpperCase()}</div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <div className="text-sm font-medium">Current Period</div>
                        <div className="text-sm text-muted-foreground">
                          {formatDate(subscription.currentPeriodStart)} - {formatDate(subscription.currentPeriodEnd)}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <CreditCard className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <div className="text-sm font-medium">Next Billing Date</div>
                        <div className="text-sm text-muted-foreground">
                          {formatDate(subscription.currentPeriodEnd)}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      {subscription.cancelAtPeriodEnd ? (
                        <AlertCircle className="w-5 h-5 text-yellow-500" />
                      ) : (
                        <Check className="w-5 h-5 text-green-500" />
                      )}
                      <div>
                        <div className="text-sm font-medium">Status</div>
                        <div className="text-sm text-muted-foreground">
                          {subscription.cancelAtPeriodEnd ? 'Cancelling at period end' : 'Active & Renewing'}
                        </div>
                      </div>
                    </div>
                  </div>

                  {subscription.cancelAtPeriodEnd && (
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        Your subscription is set to cancel on {formatDate(subscription.currentPeriodEnd)}. 
                        You'll continue to have access until then.
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>

                <CardFooter className="justify-end space-x-2">
                  {subscription.status === 'active' && !subscription.cancelAtPeriodEnd && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => cancelMutation.mutate(subscription.id)}
                      disabled={cancelMutation.isPending}
                      data-testid={`button-cancel-${subscription.id}`}
                    >
                      {cancelMutation.isPending ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                          <span>Cancelling...</span>
                        </div>
                      ) : (
                        <>
                          <X className="w-4 h-4 mr-2" />
                          Cancel Subscription
                        </>
                      )}
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}