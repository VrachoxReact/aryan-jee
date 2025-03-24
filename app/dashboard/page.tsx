import { Metadata } from "next"
import Link from "next/link"
import { BarChart3, BookOpen, Clock, Cog, LineChart, Star, Trophy, UserCircle2 } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { fetchJEETests, getTestCounts } from "@/lib/jee-data"
import { fetchJEELectures, getLectureCounts } from "@/lib/lecture-data"

export const metadata: Metadata = {
  title: "Dashboard | AI Test & Learning Platform",
  description: "View your learning progress and manage your JEE preparation",
}

export default async function DashboardPage() {
  try {
    // Fetch necessary data efficiently
    const [testCounts, lectureCounts, tests, lectures] = await Promise.all([
      getTestCounts(),
      getLectureCounts(),
      fetchJEETests(),
      fetchJEELectures()
    ]);
    
    // Process for dashboard display
    const totalTests = Object.values(testCounts).reduce((sum, count) => sum + count, 0);
    const totalLectures = Object.values(lectureCounts).reduce((sum, count) => sum + count, 0);
    
    // Mock user stats for dashboard
    const userStats = {
      testsCompleted: 7,
      avgScore: 72,
      studyHours: 24,
      streak: 5,
      subjectProgress: {
        "Physics": 65,
        "Chemistry": 48,
        "Mathematics": 76
      }
    };
    
    // Recent tests for the user (mock data)
    const recentTests = tests.slice(0, 3).map(test => ({
      ...test,
      dateTaken: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)).toISOString(),
      score: Math.floor(50 + Math.random() * 50),
    }));
    
    // Recommended content (based on mock user data)
    const recommendedContent = [
      ...tests.slice(0, 2).map(test => ({
        id: test.id,
        title: test.title,
        type: 'test',
        subject: test.subject,
        description: `Recommended based on your recent ${test.subject} performance`,
      })),
      ...lectures.slice(0, 2).map(lecture => ({
        id: lecture.id,
        title: lecture.title,
        type: 'lecture',
        subject: lecture.subject,
        description: `Recommended to improve your understanding of ${lecture.subject}`,
      }))
    ];
    
    return (
      <div className="container py-6">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <Button asChild>
              <Link href="/tests">Take a Test</Link>
            </Button>
          </div>
          
          {/* Stats Overview */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Tests Completed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userStats.testsCompleted}</div>
                <p className="text-xs text-muted-foreground">
                  +2 from last week
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Average Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userStats.avgScore}%</div>
                <p className="text-xs text-muted-foreground">
                  +5% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Study Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userStats.studyHours}</div>
                <p className="text-xs text-muted-foreground">
                  This month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Streak</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userStats.streak} days</div>
                <p className="text-xs text-muted-foreground">
                  Keep it up!
                </p>
              </CardContent>
            </Card>
          </div>
          
          {/* Subject Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Subject Progress</CardTitle>
              <CardDescription>
                Your progress across different JEE subjects
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              {Object.entries(userStats.subjectProgress).map(([subject, progress]) => (
                <div key={subject} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{subject}</span>
                    <span className="text-sm text-muted-foreground">{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button variant="outline" asChild className="w-full">
                <Link href="/tests">Continue Learning</Link>
              </Button>
            </CardFooter>
          </Card>
          
          {/* Recent Activity and Recommendations */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Recent Tests</CardTitle>
                <CardDescription>
                  Your recently completed tests and scores
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentTests.map((test) => (
                  <div key={test.id} className="flex items-center justify-between rounded-lg border p-3">
                    <div>
                      <p className="font-medium">{test.title}</p>
                      <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{test.subject}</span>
                        <span>•</span>
                        <span>{new Date(test.dateTaken).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-bold">{test.score}%</span>
                      <div className="mt-1 text-sm text-muted-foreground">
                        {test.score >= 75 ? 'Excellent' : test.score >= 60 ? 'Good' : 'Needs Improvement'}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button variant="outline" asChild className="w-full">
                  <Link href="/dashboard/history">View All Activity</Link>
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Recommended For You</CardTitle>
                <CardDescription>
                  Personalized content based on your progress
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recommendedContent.map((item) => (
                  <div key={item.id} className="rounded-lg border p-3">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">{item.title}</div>
                      <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                        {item.type === 'test' ? 'Test' : 'Lecture'}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                    <Button 
                      variant="link" 
                      asChild 
                      className="mt-2 h-auto p-0 text-primary"
                    >
                      <Link href={item.type === 'test' ? `/tests/${item.id}` : `/resources/lectures/${item.id}`}>
                        {item.type === 'test' ? 'Take Test' : 'Watch Lecture'} →
                      </Link>
                    </Button>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button variant="outline" asChild className="w-full">
                  <Link href="/resources">Explore Resources</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          {/* Library Overview */}
          <Card>
            <CardHeader>
              <CardTitle>JEE Content Library</CardTitle>
              <CardDescription>
                Complete JEE preparation resources available
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="tests">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="tests">Tests</TabsTrigger>
                  <TabsTrigger value="lectures">Lectures</TabsTrigger>
                </TabsList>
                <TabsContent value="tests" className="space-y-4 pt-4">
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-3">
                    {Object.entries(testCounts)
                      .filter(([subject]) => subject !== 'PCM' && subject !== 'General')
                      .map(([subject, count]) => (
                        <div key={subject} className="rounded-lg border p-3">
                          <div className="font-medium">{subject}</div>
                          <div className="mt-1 flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">{count} tests</span>
                            <Button variant="ghost" size="sm" asChild className="h-8 px-2">
                              <Link href={`/tests?subject=${subject.toLowerCase()}`}>
                                View
                              </Link>
                            </Button>
                          </div>
                        </div>
                      ))}
                  </div>
                  <div className="flex justify-center">
                    <Button variant="outline" asChild>
                      <Link href="/tests">Browse All Tests</Link>
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="lectures" className="space-y-4 pt-4">
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-3">
                    {Object.entries(lectureCounts)
                      .filter(([subject]) => subject !== 'General')
                      .map(([subject, count]) => (
                        <div key={subject} className="rounded-lg border p-3">
                          <div className="font-medium">{subject}</div>
                          <div className="mt-1 flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">{count} lectures</span>
                            <Button variant="ghost" size="sm" asChild className="h-8 px-2">
                              <Link href={`/resources/lectures?subject=${subject.toLowerCase()}`}>
                                View
                              </Link>
                            </Button>
                          </div>
                        </div>
                      ))}
                  </div>
                  <div className="flex justify-center">
                    <Button variant="outline" asChild>
                      <Link href="/resources/lectures">Browse All Lectures</Link>
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  } catch (error) {
    console.error("Error loading dashboard data:", error);
    
    return (
      <div className="container py-6">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <Button asChild>
              <Link href="/tests">Take a Test</Link>
            </Button>
          </div>
          
          <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-6">
            <h2 className="text-xl font-bold">Error Loading Dashboard</h2>
            <p className="mt-2">
              There was a problem loading your dashboard data. Please try refreshing the page.
            </p>
            <div className="mt-4">
              <Button variant="outline" onClick={() => window.location.reload()}>
                Refresh Page
              </Button>
            </div>
          </div>
          
          {/* Fallback Navigation Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Tests</CardTitle>
                <CardDescription>
                  Practice with JEE tests to improve your skills
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button asChild>
                  <Link href="/tests">Browse Tests</Link>
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Resources</CardTitle>
                <CardDescription>
                  Access learning materials and video lectures
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button asChild>
                  <Link href="/resources">Explore Resources</Link>
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Community</CardTitle>
                <CardDescription>
                  Connect with other students and educators
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button asChild>
                  <Link href="/community">Join Community</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    );
  }
} 