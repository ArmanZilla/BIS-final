"use client"

import { useState, useEffect } from "react"
import { Bell, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function FitnessGoals() {
  const [goal, setGoal] = useState<number | null>(null)
  const [progress, setProgress] = useState(0)
  const [notification, setNotification] = useState<string | null>(null)

  const handleSetGoal = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const newGoal = Number(formData.get("goal"))
    setGoal(newGoal)
    setProgress(0)
    setNotification(`New goal set: ${newGoal} steps`)
  }

  // Simulate progress updates
  useEffect(() => {
    if (goal === null) return

    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + Math.floor(Math.random() * 1000)
        if (newProgress >= goal) {
          setNotification("Congratulations! You've reached your goal!")
          clearInterval(interval)
          return goal
        }
        if (newProgress / goal >= 0.5 && prevProgress / goal < 0.5) {
          setNotification("You're halfway to your goal!")
        }
        return newProgress
      })
    }, 5000) // Update every 5 seconds

    return () => clearInterval(interval)
  }, [goal])

  return (
    <div className="max-w-md mx-auto space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Set Your Fitness Goal</CardTitle>
          <CardDescription>Enter your daily step goal to stay motivated</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSetGoal} className="space-y-4">
            <div className="flex items-center space-x-2">
              <Input type="number" name="goal" placeholder="e.g., 10000" required min="1" />
              <Button type="submit">Set Goal</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {goal !== null && (
        <Card>
          <CardHeader>
            <CardTitle>Current Goal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-primary" />
              <span>{goal} steps</span>
            </div>
            <div className="mt-2">
              <div className="bg-secondary h-2 rounded-full">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min((progress / goal) * 100, 100)}%` }}
                />
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {progress} / {goal} steps
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {notification && (
        <Alert>
          <Bell className="h-4 w-4" />
          <AlertTitle>Notification</AlertTitle>
          <AlertDescription>{notification}</AlertDescription>
        </Alert>
      )}
    </div>
  )
}