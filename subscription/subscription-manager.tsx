'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, AlertCircle, CreditCard, BarChart, Activity, TrendingUp } from 'lucide-react'

type Plan = 'free' | 'basic' | 'premium'

interface SubscriptionPlan {
  name: Plan
  price: number
  features: string[]
}

const plans: SubscriptionPlan[] = [
  { name: 'free', price: 0, features: ['Basic activity tracking', 'Limited analytics'] },
  { name: 'basic', price: 9.99, features: ['Advanced activity tracking', 'Basic analytics', 'Personalized insights'] },
  { name: 'premium', price: 19.99, features: ['Advanced activity tracking', 'Detailed analytics', 'Personalized insights', 'Coach access'] },
]

export default function Component() {
  const [currentPlan, setCurrentPlan] = useState<Plan>('free')
  const [showPayment, setShowPayment] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info', text: string } | null>(null)

  const handleSubscribe = (plan: Plan) => {
    if (plan === currentPlan) {
      setMessage({ type: 'info', text: `You are already subscribed to the ${plan} plan.` })
      return
    }
    setShowPayment(true)
    setMessage(null)
  }

  const handlePayment = () => {
    setShowPayment(false)
    setCurrentPlan(currentPlan === 'free' ? 'basic' : 'premium')
    setMessage({ type: 'success', text: `Successfully upgraded to ${currentPlan === 'free' ? 'Basic' : 'Premium'} plan!` })
  }

  const handleCancel = () => {
    if (currentPlan === 'free') {
      setMessage({ type: 'info', text: "You're currently on the free plan." })
      return
    }
    setCurrentPlan('free')
    setMessage({ type: 'success', text: 'Successfully cancelled your subscription. You\'ve been moved to the free plan.' })
  }

  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle className="text-2xl">Subscription Management</CardTitle>
        <CardDescription>Manage your subscription and access premium features</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Current Plan: 
            <Badge variant="outline" className="ml-2 capitalize">{currentPlan}</Badge>
          </h3>
          <p className="text-sm text-gray-600">
            {currentPlan === 'free' 
              ? "Upgrade to access more features and detailed insights." 
              : "You're enjoying our premium features!"}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {plans.map((plan) => (
            <Card key={plan.name} className={`${currentPlan === plan.name ? 'border-blue-500' : ''}`}>
              <CardHeader>
                <CardTitle className="capitalize">{plan.name}</CardTitle>
                <CardDescription>${plan.price}/month</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={() => handleSubscribe(plan.name)}
                  disabled={currentPlan === plan.name}
                  className="w-full"
                >
                  {currentPlan === plan.name ? 'Current Plan' : 'Subscribe'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {showPayment && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Payment Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <span>Total Amount:</span>
                <span className="font-semibold">${currentPlan === 'free' ? '9.99' : '19.99'}</span>
              </div>
              <Button onClick={handlePayment} className="w-full">
                <CreditCard className="mr-2 h-4 w-4" /> Process Payment
              </Button>
            </CardContent>
          </Card>
        )}

        {message && (
          <Alert variant={message.type === 'error' ? 'destructive' : 'default'} className="mb-6">
            {message.type === 'success' && <CheckCircle className="h-4 w-4" />}
            {message.type === 'error' && <XCircle className="h-4 w-4" />}
            {message.type === 'info' && <AlertCircle className="h-4 w-4" />}
            <AlertTitle className="capitalize">{message.type}</AlertTitle>
            <AlertDescription>{message.text}</AlertDescription>
          </Alert>
        )}

        <div className="flex justify-between items-center">
          <Button variant="outline" onClick={handleCancel} disabled={currentPlan === 'free'}>
            Cancel Subscription
          </Button>
          <div className="flex items-center space-x-2">
            <BarChart className="h-5 w-5 text-blue-500" />
            <Activity className="h-5 w-5 text-green-500" />
            <TrendingUp className="h-5 w-5 text-purple-500" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="text-sm text-gray-500">
        Upgrade your plan to unlock advanced analytics and personalized insights for your fitness journey.
      </CardFooter>
    </Card>
  )
}