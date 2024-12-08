'use client'

import { useState, useEffect } from 'react'
import { Bell, CheckCircle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function Component() {
  const [lastActivity, setLastActivity] = useState(Date.now())
  const [showAlert, setShowAlert] = useState(false)
  const inactivityThreshold = 10000 // 10 seconds for demonstration purposes

  useEffect(() => {
    const interval = setInterval(() => {
      if (Date.now() - lastActivity > inactivityThreshold) {
        setShowAlert(true)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [lastActivity])

  const handleActivity = () => {
    setLastActivity(Date.now())
    setShowAlert(false)
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Inactivity Alert</CardTitle>
        <CardDescription>Stay consistent with your routine</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="mb-4">Last activity: {new Date(lastActivity).toLocaleTimeString()}</p>
        <Button onClick={handleActivity} className="mb-4">
          Record Activity
        </Button>
        {showAlert && (
          <Alert>
            <Bell className="h-4 w-4" />
            <AlertTitle>Inactivity Detected</AlertTitle>
            <AlertDescription>
              You've been inactive for a while. Don't forget to stay on track with your routine!
            </AlertDescription>
          </Alert>
        )}
        {!showAlert && (
          <Alert variant="default" className="bg-green-50 border-green-200">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-800">On Track</AlertTitle>
            <AlertDescription className="text-green-700">
              Great job! You're staying consistent with your routine.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  )
}