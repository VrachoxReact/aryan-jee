import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Test Builder | AI Test & Learning Platform",
  description: "Create custom tests tailored to your learning needs",
}

export default function TestBuilderPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 container py-8">
        <div className="flex flex-col space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Custom Test Builder</h1>
              <p className="text-muted-foreground mt-1">Create a personalized test tailored to your learning needs</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">Save as Draft</Button>
              <Button>Create Test</Button>
            </div>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-6">
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                <h3 className="text-lg font-medium mb-4">Test Configuration</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Test Name
                    </label>
                    <input 
                      type="text" 
                      placeholder="Enter test name..." 
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Number of Questions
                    </label>
                    <div className="flex items-center">
                      <input 
                        type="range" 
                        min="5" 
                        max="50" 
                        step="5" 
                        defaultValue="20" 
                        className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer"
                      />
                      <span className="ml-2 text-sm font-medium">20</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Time Limit (minutes)
                    </label>
                    <div className="flex items-center">
                      <input 
                        type="range" 
                        min="10" 
                        max="120" 
                        step="5" 
                        defaultValue="60" 
                        className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer"
                      />
                      <span className="ml-2 text-sm font-medium">60</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                <h3 className="text-lg font-medium mb-4">Subject Selection</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between rounded-md border p-4">
                    <div className="flex items-center space-x-2">
                      <input 
                        id="math" 
                        type="checkbox" 
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <label htmlFor="math" className="text-sm font-medium">Mathematics</label>
                    </div>
                    <div className="flex items-center">
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        step="10" 
                        defaultValue="20" 
                        className="w-24 h-2 bg-secondary rounded-lg appearance-none cursor-pointer"
                      />
                      <span className="ml-2 text-sm font-medium">20%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between rounded-md border p-4">
                    <div className="flex items-center space-x-2">
                      <input 
                        id="science" 
                        type="checkbox" 
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        defaultChecked
                      />
                      <label htmlFor="science" className="text-sm font-medium">Science</label>
                    </div>
                    <div className="flex items-center">
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        step="10" 
                        defaultValue="30" 
                        className="w-24 h-2 bg-secondary rounded-lg appearance-none cursor-pointer"
                      />
                      <span className="ml-2 text-sm font-medium">30%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between rounded-md border p-4">
                    <div className="flex items-center space-x-2">
                      <input 
                        id="history" 
                        type="checkbox" 
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        defaultChecked
                      />
                      <label htmlFor="history" className="text-sm font-medium">History</label>
                    </div>
                    <div className="flex items-center">
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        step="10" 
                        defaultValue="20" 
                        className="w-24 h-2 bg-secondary rounded-lg appearance-none cursor-pointer"
                      />
                      <span className="ml-2 text-sm font-medium">20%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between rounded-md border p-4">
                    <div className="flex items-center space-x-2">
                      <input 
                        id="language" 
                        type="checkbox" 
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        defaultChecked
                      />
                      <label htmlFor="language" className="text-sm font-medium">Language Arts</label>
                    </div>
                    <div className="flex items-center">
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        step="10" 
                        defaultValue="30" 
                        className="w-24 h-2 bg-secondary rounded-lg appearance-none cursor-pointer"
                      />
                      <span className="ml-2 text-sm font-medium">30%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                <h3 className="text-lg font-medium mb-4">Difficulty Level</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between rounded-md border p-4">
                    <div className="flex flex-col">
                      <label className="text-sm font-medium">Easy Questions</label>
                      <span className="text-xs text-muted-foreground">Fundamental concepts</span>
                    </div>
                    <div className="flex items-center">
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        step="10" 
                        defaultValue="30" 
                        className="w-24 h-2 bg-secondary rounded-lg appearance-none cursor-pointer"
                      />
                      <span className="ml-2 text-sm font-medium">30%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between rounded-md border p-4">
                    <div className="flex flex-col">
                      <label className="text-sm font-medium">Medium Questions</label>
                      <span className="text-xs text-muted-foreground">Application of concepts</span>
                    </div>
                    <div className="flex items-center">
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        step="10" 
                        defaultValue="40" 
                        className="w-24 h-2 bg-secondary rounded-lg appearance-none cursor-pointer"
                      />
                      <span className="ml-2 text-sm font-medium">40%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between rounded-md border p-4">
                    <div className="flex flex-col">
                      <label className="text-sm font-medium">Hard Questions</label>
                      <span className="text-xs text-muted-foreground">Advanced problem solving</span>
                    </div>
                    <div className="flex items-center">
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        step="10" 
                        defaultValue="30" 
                        className="w-24 h-2 bg-secondary rounded-lg appearance-none cursor-pointer"
                      />
                      <span className="ml-2 text-sm font-medium">30%</span>
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Total:</span>
                    <span className="text-sm font-medium">100%</span>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                <h3 className="text-lg font-medium mb-4">Advanced Options</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <input 
                      id="adaptive" 
                      type="checkbox" 
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      defaultChecked
                    />
                    <div>
                      <label htmlFor="adaptive" className="text-sm font-medium">Adaptive Testing</label>
                      <p className="text-xs text-muted-foreground">Questions adjust in difficulty based on your performance</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input 
                      id="immediate" 
                      type="checkbox" 
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <div>
                      <label htmlFor="immediate" className="text-sm font-medium">Immediate Feedback</label>
                      <p className="text-xs text-muted-foreground">Receive explanations after each question</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input 
                      id="timer" 
                      type="checkbox" 
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      defaultChecked
                    />
                    <div>
                      <label htmlFor="timer" className="text-sm font-medium">Question Timer</label>
                      <p className="text-xs text-muted-foreground">Set time limits for individual questions</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input 
                      id="ai" 
                      type="checkbox" 
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      defaultChecked
                    />
                    <div>
                      <label htmlFor="ai" className="text-sm font-medium">AI Assistance</label>
                      <p className="text-xs text-muted-foreground">Enable AI explanations and support during the test</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                <div className="flex items-center gap-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary h-6 w-6">
                    <path d="M2.27 21.7s9.87-3.5 12.73-6.36a4.5 4.5 0 0 0-6.36-6.37C5.77 11.84 2.27 21.7 2.27 21.7zM15.42 15.42l6.37 6.37"></path>
                    <path d="M19.73 4.73 15.42 9.04"></path>
                    <path d="M15.42 4.73 19.73 9.04"></path>
                  </svg>
                  <div>
                    <h3 className="text-lg font-medium">AI Question Generation</h3>
                    <p className="text-sm text-muted-foreground">Our AI will generate customized questions based on your preferences</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="w-full border-t bg-background py-6 md:py-8">
        <div className="container flex flex-col items-center justify-center gap-4 md:flex-row md:gap-8">
          <p className="text-center text-sm text-muted-foreground md:text-left">
            © 2023 AI Test & Learning. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary">
              Terms of Service
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">
              Contact Us
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
} 