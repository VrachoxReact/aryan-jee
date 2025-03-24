import Link from 'next/link'
import { Metadata } from "next"
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: "Community | AI Test & Learning Platform",
  description: "Connect with other learners and share educational resources",
}

export default function CommunityPage() {
  // Mock data for discussions and study sessions
  const discussions = [
    {
      id: 1,
      title: "Understanding Quantum Mechanics Basics",
      author: "ElizabethT",
      subject: "Physics",
      replies: 24,
      lastActive: "2 hours ago"
    },
    {
      id: 2,
      title: "Help with Calculus Integration Techniques",
      author: "MathWhiz42",
      subject: "Mathematics",
      replies: 18,
      lastActive: "5 hours ago"
    },
    {
      id: 3,
      title: "Literary Analysis of Hamlet",
      author: "ShakespeareScholar",
      subject: "Literature",
      replies: 32,
      lastActive: "yesterday"
    },
    {
      id: 4,
      title: "Immune System Response Mechanisms",
      author: "BioResearcher",
      subject: "Biology",
      replies: 15,
      lastActive: "3 days ago"
    }
  ]

  const studySessions = [
    {
      id: 1,
      title: "AP Chemistry Exam Prep",
      host: "ChemTeacher",
      subject: "Chemistry",
      participants: 12,
      maxParticipants: 15,
      startTime: "Today, 7:00 PM"
    },
    {
      id: 2,
      title: "World History Review",
      host: "HistoryBuff",
      subject: "History",
      participants: 8,
      maxParticipants: 20,
      startTime: "Tomorrow, 5:30 PM"
    },
    {
      id: 3,
      title: "Python Programming Workshop",
      host: "CodeMaster",
      subject: "Computer Science",
      participants: 18,
      maxParticipants: 20,
      startTime: "Saturday, 2:00 PM"
    }
  ]

  const leaderboard = [
    { name: "AlexScientist", points: 4250, rank: 1 },
    { name: "MathGenius", points: 3890, rank: 2 },
    { name: "LitExplorer", points: 3675, rank: 3 },
    { name: "PhysicsWiz", points: 3420, rank: 4 },
    { name: "HistoryBuff", points: 3185, rank: 5 }
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 container py-8">
        <div className="flex flex-col space-y-10">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tight">Community Learning</h1>
            <p className="text-muted-foreground">Connect with fellow learners, participate in discussions, and join live study sessions</p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2 space-y-6">
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="flex items-center justify-between p-6">
                  <h2 className="text-xl font-semibold">Discussion Forums</h2>
                  <Button>New Discussion</Button>
                </div>
                <div className="p-0">
                  <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                      <thead className="[&_tr]:border-b">
                        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Topic</th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Subject</th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Replies</th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Last Active</th>
                        </tr>
                      </thead>
                      <tbody className="[&_tr:last-child]:border-0">
                        {discussions.map((discussion) => (
                          <tr key={discussion.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                            <td className="p-4 align-middle">
                              <div className="flex flex-col">
                                <Link href={`/community/discussions/${discussion.id}`} className="font-medium hover:underline">
                                  {discussion.title}
                                </Link>
                                <span className="text-xs text-muted-foreground">by {discussion.author}</span>
                              </div>
                            </td>
                            <td className="p-4 align-middle">
                              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground">
                                {discussion.subject}
                              </div>
                            </td>
                            <td className="p-4 align-middle">{discussion.replies}</td>
                            <td className="p-4 align-middle">{discussion.lastActive}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="p-4 flex justify-center">
                  <Link href="/community/discussions">
                    <Button variant="outline">Browse All Discussions</Button>
                  </Link>
                </div>
              </div>
              
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="flex items-center justify-between p-6">
                  <h2 className="text-xl font-semibold">Live Study Sessions</h2>
                  <Button>Host Session</Button>
                </div>
                <div className="p-6 pt-0 grid gap-4">
                  {studySessions.map((session) => (
                    <div key={session.id} className="flex flex-col space-y-2 rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">{session.title}</h3>
                        <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground">
                          {session.subject}
                        </div>
                      </div>
                      <div className="flex text-sm text-muted-foreground">
                        <span>Hosted by {session.host}</span>
                        <span className="mx-2">•</span>
                        <span>{session.startTime}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="text-sm">
                          <span className="font-medium">{session.participants}</span>
                          <span className="text-muted-foreground">/{session.maxParticipants} participants</span>
                        </div>
                        <Link href={`/community/sessions/${session.id}`}>
                          <Button variant="secondary" size="sm">Join Session</Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 flex justify-center">
                  <Link href="/community/sessions">
                    <Button variant="outline">View All Sessions</Button>
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Find Study Partners</h2>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Subject
                      </label>
                      <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                        <option value="">Any Subject</option>
                        <option value="math">Mathematics</option>
                        <option value="science">Science</option>
                        <option value="history">History</option>
                        <option value="language">Language Arts</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Skill Level
                      </label>
                      <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                        <option value="">Any Level</option>
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                      </select>
                    </div>
                    <div className="pt-2">
                      <Button className="w-full">Search Partners</Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Leaderboard</h2>
                  <div className="space-y-2">
                    {leaderboard.map((user) => (
                      <div key={user.rank} className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50">
                        <div className="flex items-center gap-2">
                          <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs ${
                            user.rank === 1 ? "bg-yellow-500/20 text-yellow-500" : 
                            user.rank === 2 ? "bg-gray-400/20 text-gray-500" : 
                            user.rank === 3 ? "bg-amber-600/20 text-amber-600" : 
                            "bg-primary/20 text-primary"
                          }`}>
                            {user.rank}
                          </div>
                          <span className="font-medium">{user.name}</span>
                        </div>
                        <span className="text-sm">{user.points} pts</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <Link href="/community/leaderboard">
                      <Button variant="ghost" size="sm" className="w-full">View Full Leaderboard</Button>
                    </Link>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
                  <div className="space-y-3">
                    <div className="border rounded-md p-3">
                      <div className="font-medium">Science Olympiad Prep</div>
                      <div className="text-sm text-muted-foreground mt-1">Saturday, Nov 18 • 3:00 PM</div>
                    </div>
                    <div className="border rounded-md p-3">
                      <div className="font-medium">Math Competition Workshop</div>
                      <div className="text-sm text-muted-foreground mt-1">Sunday, Nov 19 • 10:00 AM</div>
                    </div>
                    <div className="border rounded-md p-3">
                      <div className="font-medium">Essay Writing Seminar</div>
                      <div className="text-sm text-muted-foreground mt-1">Tuesday, Nov 21 • 4:30 PM</div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <Link href="/community/events">
                      <Button variant="ghost" size="sm" className="w-full">View All Events</Button>
                    </Link>
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