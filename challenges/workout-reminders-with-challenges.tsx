'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Trash2, UserPlus, Trophy } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Reminder {
  id: number;
  exercise: string;
  time: string;
  days: string[];
}

interface Challenge {
  id: number;
  name: string;
  description: string;
  participants: number;
}

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function WorkoutReminders() {
  const [reminders, setReminders] = useState<Reminder[]>([])
  const [exercise, setExercise] = useState('')
  const [time, setTime] = useState('')
  const [selectedDays, setSelectedDays] = useState<string[]>([])
  const [challenges, setChallenges] = useState<Challenge[]>([])
  const [newChallengeName, setNewChallengeName] = useState('')
  const [newChallengeDescription, setNewChallengeDescription] = useState('')
  const [joinChallengeName, setJoinChallengeName] = useState('')

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

  const createChallenge = (e: React.FormEvent) => {
    e.preventDefault()
    if (newChallengeName && newChallengeDescription) {
      const newChallenge: Challenge = {
        id: Date.now(),
        name: newChallengeName,
        description: newChallengeDescription,
        participants: 1 // Creator is the first participant
      }
      setChallenges([...challenges, newChallenge])
      setNewChallengeName('')
      setNewChallengeDescription('')
      console.log(`New challenge created: ${newChallengeName}`)
    }
  }

  const joinChallenge = (e: React.FormEvent) => {
    e.preventDefault()
    const challenge = challenges.find(c => c.name.toLowerCase() === joinChallengeName.toLowerCase())
    if (challenge) {
      const updatedChallenges = challenges.map(c => 
        c.id === challenge.id ? { ...c, participants: c.participants + 1 } : c
      )
      setChallenges(updatedChallenges)
      setJoinChallengeName('')
      console.log(`Joined challenge: ${challenge.name}`)
    } else {
      console.log(`Challenge not found: ${joinChallengeName}`)
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Workout Reminders & Challenges</CardTitle>
        <CardDescription>Set reminders and join challenges for your fitness journey</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="reminders">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="reminders">Reminders</TabsTrigger>
            <TabsTrigger value="join">Join Challenge</TabsTrigger>
            <TabsTrigger value="create">Create Challenge</TabsTrigger>
          </TabsList>
          <TabsContent value="reminders">
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
          </TabsContent>
          <TabsContent value="join">
            <form onSubmit={joinChallenge} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="join-challenge">Join Challenge</Label>
                <Input
                  id="join-challenge"
                  value={joinChallengeName}
                  onChange={(e) => setJoinChallengeName(e.target.value)}
                  placeholder="Enter challenge name"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                <UserPlus className="mr-2 h-4 w-4" />
                Join Challenge
              </Button>
            </form>
          </TabsContent>
          <TabsContent value="create">
            <form onSubmit={createChallenge} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="challenge-name">Challenge Name</Label>
                <Input
                  id="challenge-name"
                  value={newChallengeName}
                  onChange={(e) => setNewChallengeName(e.target.value)}
                  placeholder="Enter challenge name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="challenge-description">Challenge Description</Label>
                <Input
                  id="challenge-description"
                  value={newChallengeDescription}
                  onChange={(e) => setNewChallengeDescription(e.target.value)}
                  placeholder="Describe your challenge"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                <Trophy className="mr-2 h-4 w-4" />
                Create Challenge
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        {challenges.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Active Challenges</h3>
            <ul className="space-y-2">
              {challenges.map(challenge => (
                <li key={challenge.id} className="bg-secondary p-2 rounded">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{challenge.name}</p>
                      <p className="text-sm text-muted-foreground">{challenge.description}</p>
                      <p className="text-sm text-muted-foreground">Participants: {challenge.participants}</p>
                    </div>
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