import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Resources | AI Test & Learning Platform',
  description: 'Access a variety of learning resources and materials',
}

export default function ResourcesPage() {
  // Mock data for featured resources
  const featuredResources = [
    {
      id: 1,
      title: "Comprehensive Biology Reference Guide",
      description: "A complete reference covering all major topics in biology with detailed illustrations and examples",
      format: "PDF",
      size: "4.2 MB",
      category: "Study Guide",
      subject: "Biology",
      popularity: "Most Downloaded"
    },
    {
      id: 2,
      title: "Advanced Calculus Problem Set",
      description: "Collection of challenging calculus problems with step-by-step solutions and explanations",
      format: "PDF",
      size: "2.8 MB",
      category: "Practice Problems",
      subject: "Mathematics",
      popularity: "Featured"
    },
    {
      id: 3,
      title: "World History Timeline Interactive",
      description: "Interactive timeline covering major historical events from ancient civilizations to modern times",
      format: "Interactive",
      size: "Online",
      category: "Interactive Tool",
      subject: "History",
      popularity: "New"
    }
  ]

  const videoTutorials = [
    {
      id: 1,
      title: "Understanding Quantum Mechanics",
      author: "Dr. Sarah Chen",
      duration: "42:15",
      subject: "Physics",
      thumbnail: "🎬", // In a real app, this would be an image path
      views: "24K"
    },
    {
      id: 2,
      title: "Linear Algebra Fundamentals",
      author: "Prof. Michael Stevens",
      duration: "36:50",
      subject: "Mathematics",
      thumbnail: "🎬",
      views: "18K"
    },
    {
      id: 3,
      title: "The Renaissance Period Explained",
      author: "Dr. Emily Johnson",
      duration: "51:30",
      subject: "History",
      thumbnail: "🎬",
      views: "15K"
    },
    {
      id: 4,
      title: "Introduction to Python Programming",
      author: "Tech Academy",
      duration: "48:22",
      subject: "Computer Science",
      thumbnail: "🎬",
      views: "32K"
    }
  ]

  const externalResources = [
    {
      name: "Khan Academy",
      description: "Free world-class education for anyone, anywhere",
      url: "https://www.khanacademy.org",
      category: "Educational Platform",
      icon: "🌐"
    },
    {
      name: "MIT OpenCourseWare",
      description: "Free and open digital publication of MIT course content",
      url: "https://ocw.mit.edu",
      category: "University Courses",
      icon: "🎓"
    },
    {
      name: "Crash Course",
      description: "Educational YouTube channel covering various subjects",
      url: "https://www.youtube.com/user/crashcourse",
      category: "Video Tutorials",
      icon: "📺"
    },
    {
      name: "Project Gutenberg",
      description: "Free eBooks library with over 60,000 free eBooks",
      url: "https://www.gutenberg.org",
      category: "Digital Library",
      icon: "📚"
    }
  ]

  const resourcesBySubject = [
    { name: "Mathematics", count: 42, icon: "➗" },
    { name: "Science", count: 67, icon: "🧪" },
    { name: "History", count: 38, icon: "📜" },
    { name: "Language Arts", count: 45, icon: "📚" },
    { name: "Computer Science", count: 29, icon: "💻" },
    { name: "Foreign Languages", count: 24, icon: "🌍" },
    { name: "Art & Music", count: 18, icon: "🎨" },
    { name: "Economics", count: 21, icon: "📊" },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 container py-8">
        <div className="flex flex-col space-y-10">
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Learning Resources</h1>
                <p className="text-muted-foreground mt-1">Enhance your learning with our comprehensive collection of educational materials</p>
              </div>
              <div className="flex gap-2">
                <Link href="/resources/bookmarks">
                  <Button variant="outline" className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                      <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path>
                    </svg>
                    My Bookmarks
                  </Button>
                </Link>
                <Button className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                  Download Resources
                </Button>
              </div>
            </div>
            
            <div className="grid gap-4 grid-cols-1">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search for resources by subject, topic, or format" 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pr-10 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute top-1/2 right-3 -translate-y-1/2 h-4 w-4 text-muted-foreground">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </svg>
              </div>
            </div>
            
            <div className="flex overflow-x-auto pb-2 gap-2 scrollbar-hide">
              <Button variant="outline" size="sm" className="rounded-full">All Resources</Button>
              <Button variant="outline" size="sm" className="rounded-full">Study Guides</Button>
              <Button variant="outline" size="sm" className="rounded-full">Practice Problems</Button>
              <Button variant="outline" size="sm" className="rounded-full">Video Tutorials</Button>
              <Button variant="outline" size="sm" className="rounded-full">Interactive Tools</Button>
              <Button variant="outline" size="sm" className="rounded-full">External Links</Button>
              <Button variant="outline" size="sm" className="rounded-full">E-Books</Button>
              <Button variant="outline" size="sm" className="rounded-full">Flashcards</Button>
            </div>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Featured Resources</h2>
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {featuredResources.map((resource) => (
                <div key={resource.id} className="rounded-lg border bg-card text-card-foreground shadow-sm">
                  <div className="p-6 flex flex-col space-y-2">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <h3 className="font-bold text-lg">{resource.title}</h3>
                        <p className="text-sm text-muted-foreground">{resource.description}</p>
                      </div>
                      <div className="bg-primary/20 text-primary text-xs font-medium rounded-full px-2 py-1">
                        {resource.popularity}
                      </div>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold">
                        {resource.subject}
                      </div>
                      <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold">
                        {resource.category}
                      </div>
                      <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold">
                        {resource.format}
                      </div>
                    </div>
                    <div className="flex items-center mt-4 pt-4 border-t justify-between">
                      <span className="text-sm text-muted-foreground">{resource.size}</span>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                            <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path>
                          </svg>
                        </Button>
                        <Link href={`/resources/${resource.id}`}>
                          <Button size="sm">Access</Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Video Tutorials</h2>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {videoTutorials.map((video) => (
                <div key={video.id} className="rounded-lg border bg-card text-card-foreground shadow-sm">
                  <div className="aspect-video bg-muted flex items-center justify-center text-4xl">
                    {video.thumbnail}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-1 line-clamp-1">{video.title}</h3>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{video.author}</span>
                      <span>{video.duration}</span>
                    </div>
                    <div className="flex justify-between items-center mt-3">
                      <div className="inline-flex items-center rounded-md border px-2 py-0.5 text-xs">
                        {video.subject}
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                        {video.views} views
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-2">
              <Link href="/resources/videos">
                <Button variant="outline">View All Videos</Button>
              </Link>
            </div>
          </section>
          
          <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
            <section className="md:col-span-2 space-y-4">
              <h2 className="text-2xl font-bold">Resources by Subject</h2>
              <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
                {resourcesBySubject.map((subject) => (
                  <Link href={`/resources/subject/${subject.name.toLowerCase().replace(/\s+/g, '-')}`} key={subject.name}>
                    <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 flex flex-col items-center space-y-2 hover:bg-accent/50 transition-colors cursor-pointer text-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-2xl">
                        {subject.icon}
                      </div>
                      <div>
                        <h3 className="font-medium">{subject.name}</h3>
                        <p className="text-xs text-muted-foreground">{subject.count} resources</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
            
            <section className="space-y-4">
              <h2 className="text-2xl font-bold">External Resources</h2>
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="p-4 space-y-3">
                  {externalResources.map((resource, index) => (
                    <div key={resource.name} className={`flex items-center py-3 ${index !== externalResources.length - 1 ? "border-b" : ""}`}>
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xl mr-3">
                        {resource.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm truncate">{resource.name}</h3>
                        <p className="text-xs text-muted-foreground truncate">{resource.description}</p>
                      </div>
                      <Link href={resource.url} target="_blank" rel="noopener noreferrer">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 ml-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                            <polyline points="15 3 21 3 21 9"></polyline>
                            <line x1="10" y1="14" x2="21" y2="3"></line>
                          </svg>
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t">
                  <Link href="/resources/external">
                    <Button variant="outline" size="sm" className="w-full">View All External Resources</Button>
                  </Link>
                </div>
              </div>
              
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                <h3 className="text-lg font-medium mb-3">Request Resources</h3>
                <p className="text-sm text-muted-foreground mb-4">Can't find what you're looking for? Request specific learning materials.</p>
                <Button className="w-full">Submit Resource Request</Button>
              </div>
            </section>
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