'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Activity {
  id: number;
  date: string;
  type: string;
  duration: number;
  notes: string;
}

export default function ActivityTracker() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [newActivity, setNewActivity] = useState<Omit<Activity, 'id'>>({
    date: '',
    type: '',
    duration: 0,
    notes: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewActivity(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const activity: Activity = {
      ...newActivity,
      id: Date.now(),
      duration: Number(newActivity.duration)
    }
    setActivities(prev => [activity, ...prev])
    setNewActivity({ date: '', type: '', duration: 0, notes: '' })
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-2xl font-bold mb-4">Activity Tracker</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Log New Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                type="date"
                id="date"
                name="date"
                value={newActivity.date}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="type">Activity Type</Label>
              <Input
                type="text"
                id="type"
                name="type"
                value={newActivity.type}
                onChange={handleInputChange}
                required
                placeholder="e.g., Running, Weightlifting"
              />
            </div>
            <div>
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Input
                type="number"
                id="duration"
                name="duration"
                value={newActivity.duration}
                onChange={handleInputChange}
                required
                min="1"
              />
            </div>
            <div>
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                name="notes"
                value={newActivity.notes}
                onChange={handleInputChange}
                placeholder="Any additional notes..."
              />
            </div>
            <Button type="submit">Log Activity</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Past Activities</CardTitle>
        </CardHeader>
        <CardContent>
          {activities.length === 0 ? (
            <p className="text-muted-foreground">No activities logged yet.</p>
          ) : (
            <ul className="space-y-4">
              {activities.map(activity => (
                <li key={activity.id} className="border-b pb-2">
                  <p className="font-semibold">{activity.type} - {activity.date}</p>
                  <p>Duration: {activity.duration} minutes</p>
                  {activity.notes && <p className="text-sm text-muted-foreground">{activity.notes}</p>}
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  )
}