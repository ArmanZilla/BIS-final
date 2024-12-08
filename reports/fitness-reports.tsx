'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

// Simulated data for demonstration
const generateWeekData = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  return days.map(day => ({
    day,
    steps: Math.floor(Math.random() * 5000) + 5000,
    calories: Math.floor(Math.random() * 300) + 200,
    distance: Math.floor(Math.random() * 5) + 3
  }))
}

const weeks = [
  { id: 'week1', name: 'Week 1', data: generateWeekData() },
  { id: 'week2', name: 'Week 2', data: generateWeekData() },
  { id: 'week3', name: 'Week 3', data: generateWeekData() },
  { id: 'week4', name: 'Week 4', data: generateWeekData() },
]

export default function FitnessReports() {
  const [selectedWeek, setSelectedWeek] = useState(weeks[0])

  const totalCalories = selectedWeek.data.reduce((sum, day) => sum + day.calories, 0)
  const averageCalories = Math.round(totalCalories / 7)

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-2xl font-bold mb-4">Fitness Reports & Analytics</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Weekly Report</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Select onValueChange={(value) => setSelectedWeek(weeks.find(week => week.id === value) || weeks[0])}>
              <SelectTrigger>
                <SelectValue placeholder="Select week" />
              </SelectTrigger>
              <SelectContent>
                {weeks.map((week) => (
                  <SelectItem key={week.id} value={week.id}>{week.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <Tabs defaultValue="steps">
            <TabsList>
              <TabsTrigger value="steps">Steps</TabsTrigger>
              <TabsTrigger value="calories">Calories</TabsTrigger>
              <TabsTrigger value="distance">Distance</TabsTrigger>
            </TabsList>
            <TabsContent value="steps">
              <ChartContainer
                config={{
                  steps: {
                    label: "Steps",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={selectedWeek.data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line type="monotone" dataKey="steps" stroke="var(--color-steps)" name="Steps" />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </TabsContent>
            <TabsContent value="calories">
              <ChartContainer
                config={{
                  calories: {
                    label: "Calories",
                    color: "hsl(var(--chart-2))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={selectedWeek.data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line type="monotone" dataKey="calories" stroke="var(--color-calories)" name="Calories" />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </TabsContent>
            <TabsContent value="distance">
              <ChartContainer
                config={{
                  distance: {
                    label: "Distance (km)",
                    color: "hsl(var(--chart-3))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={selectedWeek.data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line type="monotone" dataKey="distance" stroke="var(--color-distance)" name="Distance (km)" />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Calories Burned</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold mb-2">{totalCalories}</div>
          <p className="text-muted-foreground mb-4">Total calories burned this week</p>
          <div className="text-2xl font-semibold mb-2">{averageCalories}</div>
          <p className="text-muted-foreground">Average calories burned per day</p>
        </CardContent>
      </Card>
    </div>
  )
}