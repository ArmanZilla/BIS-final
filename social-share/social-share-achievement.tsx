'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Facebook, Twitter, Instagram, Award, Share2 } from 'lucide-react'

export default function Component() {
  const [sharedOn, setSharedOn] = useState<string | null>(null)

  const achievement = {
    title: "10K Run Personal Best",
    description: "Completed a 10K run in 45 minutes!",
    date: new Date().toLocaleDateString()
  }

  const handleShare = (platform: string) => {
    // In a real app, this would trigger the actual sharing functionality
    setSharedOn(platform)
    // Reset the "shared" state after 3 seconds
    setTimeout(() => setSharedOn(null), 3000)
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="h-6 w-6 text-yellow-500" />
          Share Your Achievement
        </CardTitle>
        <CardDescription>Motivate others with your fitness milestones</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-4 rounded-lg mb-4">
          <h3 className="font-bold text-lg mb-2">{achievement.title}</h3>
          <p className="text-sm text-gray-600">{achievement.description}</p>
          <p className="text-xs text-gray-500 mt-2">Achieved on: {achievement.date}</p>
        </div>
        <div className="flex justify-center gap-4 mb-4">
          <Button onClick={() => handleShare('Facebook')} size="sm" variant="outline" className="flex items-center gap-2">
            <Facebook className="h-4 w-4" />
            Facebook
          </Button>
          <Button onClick={() => handleShare('Twitter')} size="sm" variant="outline" className="flex items-center gap-2">
            <Twitter className="h-4 w-4" />
            Twitter
          </Button>
          <Button onClick={() => handleShare('Instagram')} size="sm" variant="outline" className="flex items-center gap-2">
            <Instagram className="h-4 w-4" />
            Instagram
          </Button>
        </div>
        {sharedOn && (
          <Alert className="bg-green-50 border-green-200">
            <Share2 className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-800">Shared Successfully!</AlertTitle>
            <AlertDescription className="text-green-700">
              Your achievement has been shared on {sharedOn}.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter className="text-sm text-gray-500">
        Sharing your achievements can inspire and motivate others in their fitness journey.
      </CardFooter>
    </Card>
  )
}