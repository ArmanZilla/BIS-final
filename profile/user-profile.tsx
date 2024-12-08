'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Toast } from "@/components/ui/toast"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"

interface UserProfile {
  name: string;
  email: string;
  age: number;
  weight: number;
  height: number;
  goal: string;
}

interface ConnectedApp {
  name: string;
  connected: boolean;
}

export default function UserProfile() {
  const [profile, setProfile] = useState<UserProfile>({
    name: 'John Doe',
    email: 'john@example.com',
    age: 30,
    weight: 70,
    height: 175,
    goal: 'lose_weight'
  })

  const [connectedApps, setConnectedApps] = useState<ConnectedApp[]>([
    { name: 'Fitbit', connected: false },
    { name: 'Strava', connected: false },
    { name: 'Apple Health', connected: false },
  ])

  const { toast } = useToast()

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setProfile(prev => ({ ...prev, [name]: value }))
  }

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    })
  }

  const handleAppConnection = (appName: string) => {
    setConnectedApps(prev => prev.map(app => 
      app.name === appName ? { ...app, connected: !app.connected } : app
    ))
    toast({
      title: `${appName} ${connectedApps.find(app => app.name === appName)?.connected ? 'Disconnected' : 'Connected'}`,
      description: `Your ${appName} account has been ${connectedApps.find(app => app.name === appName)?.connected ? 'disconnected' : 'connected'} successfully.`,
    })
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      
      <Tabs defaultValue="profile">
        <TabsList className="mb-4">
          <TabsTrigger value="profile">Edit Profile</TabsTrigger>
          <TabsTrigger value="connections">App Connections</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Edit Your Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={profile.name}
                      onChange={handleProfileChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={profile.email}
                      onChange={handleProfileChange}
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      name="age"
                      type="number"
                      value={profile.age}
                      onChange={handleProfileChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="weight">Weight (kg)</Label>
                    <Input
                      id="weight"
                      name="weight"
                      type="number"
                      value={profile.weight}
                      onChange={handleProfileChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="height">Height (cm)</Label>
                    <Input
                      id="height"
                      name="height"
                      type="number"
                      value={profile.height}
                      onChange={handleProfileChange}
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="goal">Fitness Goal</Label>
                  <Select name="goal" value={profile.goal} onValueChange={(value) => handleProfileChange({ target: { name: 'goal', value } } as React.ChangeEvent<HTMLSelectElement>)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your goal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lose_weight">Lose Weight</SelectItem>
                      <SelectItem value="gain_muscle">Gain Muscle</SelectItem>
                      <SelectItem value="improve_endurance">Improve Endurance</SelectItem>
                      <SelectItem value="maintain_health">Maintain Health</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit">Update Profile</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="connections">
          <Card>
            <CardHeader>
              <CardTitle>Connect Fitness Apps</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {connectedApps.map(app => (
                  <div key={app.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id={`${app.name}-connection`}
                        checked={app.connected}
                        onCheckedChange={() => handleAppConnection(app.name)}
                      />
                      <Label htmlFor={`${app.name}-connection`}>{app.name}</Label>
                    </div>
                    <span className={app.connected ? "text-green-500" : "text-muted-foreground"}>
                      {app.connected ? "Connected" : "Disconnected"}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <Toaster />
    </div>
  )
}