import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Clock, Flag, HelpCircle } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getTestById } from '@/lib/jee-data'

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  try {
    const test = await getTestById(params.id)
    
    if (!test) {
      return {
        title: 'Test Not Found | AI Test & Learning Platform',
        description: 'The requested test could not be found.'
      }
    }
    
    return {
      title: `${test.title} | AI Test & Learning Platform`,
      description: test.description
    }
  } catch (error) {
    return {
      title: 'Test | AI Test & Learning Platform',
      description: 'Take a test to improve your JEE preparation',
    }
  }
}

export default async function TestPage({ params }: { params: { id: string } }) {
  try {
    const testId = params.id
    const test = await getTestById(testId)
    
    if (!test) {
      notFound()
    }
    
    // Calculate test time in hours and minutes
    const hours = Math.floor(test.duration / 60)
    const minutes = test.duration % 60
    const timeDisplay = hours > 0 
      ? `${hours} hour${hours > 1 ? 's' : ''} ${minutes > 0 ? `${minutes} min` : ''}` 
      : `${minutes} min`

    return (
      <div className="flex min-h-screen flex-col">
        {/* Test header with timer and navigation */}
        <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-14 items-center justify-between py-4">
            <div className="flex items-center gap-4">
              <Link href="/tests" className="flex items-center text-sm font-medium">
                <svg
                  className="mr-2 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Tests
              </Link>
              <div className="hidden md:block">
                <span className="text-sm font-semibold">{test.title}</span>
                <span className="ml-2 text-sm text-muted-foreground">({test.subject})</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <svg
                  className="h-4 w-4 text-muted-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm font-medium">{timeDisplay}</span>
              </div>
              <Button variant="outline" size="sm">
                Question List
              </Button>
              <Button size="sm">Submit Test</Button>
            </div>
          </div>
        </header>
        
        <main className="container flex-1 py-6">
          <div className="mx-auto max-w-4xl">
            {/* Test information section */}
            <div className="mb-8 space-y-4">
              <div>
                <h1 className="text-2xl font-bold md:text-3xl">{test.title}</h1>
                <p className="mt-1 text-muted-foreground">{test.description}</p>
              </div>
              
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                <div className="rounded-lg border p-3">
                  <div className="text-sm text-muted-foreground">Subject</div>
                  <div className="font-medium">{test.subject}</div>
                </div>
                <div className="rounded-lg border p-3">
                  <div className="text-sm text-muted-foreground">Questions</div>
                  <div className="font-medium">{test.questions.length}</div>
                </div>
                <div className="rounded-lg border p-3">
                  <div className="text-sm text-muted-foreground">Duration</div>
                  <div className="font-medium">{timeDisplay}</div>
                </div>
              </div>
              
              <div className="rounded-lg border p-4">
                <h2 className="mb-2 font-semibold">Test Instructions</h2>
                <ul className="space-y-1 text-sm">
                  <li>• Each question carries {test.totalMarks / test.questions.length} marks.</li>
                  <li>• There is no negative marking in this test.</li>
                  <li>• All questions are multiple choice with a single correct answer.</li>
                  <li>• You can navigate between questions using the question list button.</li>
                  <li>• Click Submit Test when you have answered all questions.</li>
                </ul>
              </div>
            </div>
            
            {/* Start Test Button */}
            <div className="mt-8 flex justify-center">
              <Button size="lg" className="w-full sm:w-auto">
                Start Test
              </Button>
            </div>
            
            {/* Question preview */}
            <div className="mt-12 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Question Preview</h2>
                <span className="text-sm text-muted-foreground">
                  Showing 3 of {test.questions.length} questions
                </span>
              </div>
              
              <div className="space-y-4">
                {test.questions.slice(0, 3).map((question, index) => (
                  <div key={question.id} className="rounded-lg border p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                          {index + 1}
                        </span>
                        <span className="text-sm font-medium">{question.subject}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{question.marks} marks</span>
                    </div>
                    <p className="font-medium">{question.question}</p>
                    <div className="mt-3 space-y-2">
                      {question.options.map((option, optIndex) => (
                        <div
                          key={optIndex}
                          className="flex items-center gap-2 rounded-md border p-2.5 text-sm"
                        >
                          <span className="flex h-5 w-5 items-center justify-center rounded-full border text-xs">
                            {String.fromCharCode(65 + optIndex)}
                          </span>
                          {option}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 flex justify-center">
                <p className="text-sm text-muted-foreground">Start the test to see all questions</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  } catch (error) {
    return (
      <div className="flex min-h-screen flex-col">
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-14 items-center py-4">
            <Link href="/tests" className="flex items-center text-sm font-medium">
              <svg
                className="mr-2 h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Tests
            </Link>
          </div>
        </header>
        
        <main className="container flex-1 py-6">
          <div className="mx-auto max-w-4xl space-y-6">
            <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-6">
              <h2 className="text-xl font-bold">Error Loading Test</h2>
              <p className="mt-2">
                There was a problem loading the test information. Please try again or select a different test.
              </p>
              <div className="mt-4">
                <Button asChild>
                  <Link href="/tests">Browse Tests</Link>
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }
}
 