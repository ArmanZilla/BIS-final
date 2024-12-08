'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Trash2 } from 'lucide-react'

interface Reminder {
  id: number;
  exercise: string;
  time: string;
  days: string[];
}

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function WorkoutReminders() {
  const [reminders, setReminders] = useState<Reminder[]>([])
  const [exercise, setExercise] = useState('')
  const [time, setTime] = useState('')
  const [selectedDays, setSelectedDays] = useState<string[]>([])

  const addReminder = (e: React.FormEvent) => {
    e.preventDefault()
    if (exercise && time && selectedDays.length > 0) {
      const newReminder: Reminder = {
        id: Date.now(),
        exercise,
        time,
        days: selectedDays
      }
      setReminders([...reminders, newReminder])
      setExercise('')
      setTime('')
      setSelectedDays([])
      // In a real application, you would set actual reminders here
      console.log(`Reminder set for ${exercise} at ${time} on ${selectedDays.join(', ')}`)
    }
  }

  const deleteReminder = (id: number) => {
    setReminders(reminders.filter(reminder => reminder.id !== id))
  }

  const toggleDay = (day: string) => {
    setSelectedDays(prev => 
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    )
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Workout Reminders</CardTitle>
        <CardDescription>Set reminders for your exercises</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={addReminder} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="exercise">Exercise</Label>
            <Input
              id="exercise"
              value={exercise}
              onChange={(e) => setExercise(e.target.value)}
              placeholder="e.g., Running, Yoga, Weightlifting"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="time">Time</Label>
            <Input
              id="time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Days</Label>
            <div className="flex flex-wrap gap-2">
              {daysOfWeek.map(day => (
                <div key={day} className="flex items-center space-x-2">
                  <Checkbox
                    id={day}
                    checked={selectedDays.includes(day)}
                    onCheckedChange={() => toggleDay(day)}
                  />
                  <Label htmlFor={day} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {day}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          <Button type="submit" className="w-full">Set Reminder</Button>
        </form>

        {reminders.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Your Reminders</h3>
            <ul className="space-y-2">
              {reminders.map(reminder => (
                <li key={reminder.id} className="bg-secondary p-2 rounded">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{reminder.exercise}</p>
                      <p className="text-sm text-muted-foreground">{reminder.time}</p>
                      <p className="text-sm text-muted-foreground">{reminder.days.join(', ')}</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => deleteReminder(reminder.id)}>
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete reminder</span>
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  )
}