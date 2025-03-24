import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SUBJECT_MAPPING, fetchJEETests, getFeaturedTests, getTestsBySubject, getTestCounts } from "@/lib/jee-data";

export const metadata: Metadata = {
  title: "Tests | AI Test & Learning Platform",
  description: "Explore and take tests to enhance your JEE preparation",
};

export default async function TestsPage() {
  // Use a try-catch block to handle potential fetch errors
  try {
    // Fetch only the data we need for the initial view to improve performance
    const featuredTests = await getFeaturedTests();
    const testCounts = await getTestCounts();
    
    // Convert subjects to array for rendering
    const subjects = Object.keys(testCounts).filter(subject => 
      subject !== 'PCM' && subject !== 'General'
    );

    return (
      <div className="container py-6">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold">Test Library</h1>
            <p className="text-muted-foreground">
              Find and take practice tests for JEE preparation
            </p>
          </div>
          
          <div className="relative">
            <Input 
              type="search" 
              placeholder="Search tests by subject or keywords..." 
              className="w-full max-w-lg"
            />
          </div>

          {/* Featured Tests Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Featured Tests</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {featuredTests.map((test) => (
                <Card key={test.id} className="overflow-hidden">
                  <CardHeader className="p-4">
                    <CardTitle>{test.title}</CardTitle>
                    <CardDescription>
                      {test.description.length > 100
                        ? test.description.substring(0, 100) + "..."
                        : test.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="flex flex-col gap-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Subject:</span>
                        <span className="font-medium">{test.subject}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Questions:</span>
                        <span className="font-medium">{test.questions.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Duration:</span>
                        <span className="font-medium">{test.duration} mins</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-end">
                    <Button asChild>
                      <Link href={`/tests/${test.id}`}>Start Test</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </section>

          {/* Test Categories Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Test Categories</h2>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All Subjects</TabsTrigger>
                {subjects.map((subject) => (
                  <TabsTrigger key={subject} value={subject.toLowerCase()}>
                    {subject} ({testCounts[subject] || 0})
                  </TabsTrigger>
                ))}
              </TabsList>
              
              <TabsContent value="all" className="space-y-4">
                <SubjectTestList subjects={subjects} />
              </TabsContent>
              
              {subjects.map((subject) => (
                <TabsContent key={subject} value={subject.toLowerCase()} className="space-y-4">
                  <DynamicTestList subject={subject} />
                </TabsContent>
              ))}
            </Tabs>
          </section>

          {/* Create Test CTA */}
          <section className="bg-muted p-6 rounded-lg mt-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <h2 className="text-xl font-semibold">Create Your Own Test</h2>
                <p className="text-muted-foreground mt-1">
                  Build a custom test tailored to your specific learning needs
                </p>
              </div>
              <Button asChild size="lg" className="md:w-auto w-full">
                <Link href="/tests/builder">Test Builder</Link>
              </Button>
            </div>
          </section>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error loading tests page:", error);
    return (
      <div className="container py-6">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold">Test Library</h1>
            <p className="text-muted-foreground">
              Find and take practice tests for JEE preparation
            </p>
          </div>
          
          <div className="bg-destructive/10 border border-destructive/30 p-4 rounded-md">
            <h2 className="text-lg font-medium mb-2">Unable to load tests</h2>
            <p>There was an error loading the test data. Please try refreshing the page.</p>
            <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
              Refresh Page
            </Button>
          </div>
          
          {/* Create Test CTA */}
          <section className="bg-muted p-6 rounded-lg mt-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <h2 className="text-xl font-semibold">Create Your Own Test</h2>
                <p className="text-muted-foreground mt-1">
                  Build a custom test tailored to your specific learning needs
                </p>
              </div>
              <Button asChild size="lg" className="md:w-auto w-full">
                <Link href="/tests/builder">Test Builder</Link>
              </Button>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

// This component loads test data for a specific subject
function DynamicTestList({ subject }: { subject: string }) {
  return (
    <div>
      <TestListFallback subject={subject} />
    </div>
  );
}

// This component displays subject cards with count info
function SubjectTestList({ subjects }: { subjects: string[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {subjects.map((subject) => (
        <Link key={subject} href={`/tests?subject=${subject.toLowerCase()}`}>
          <Card className="h-full hover:bg-muted/50 transition-colors">
            <CardHeader>
              <CardTitle>{subject}</CardTitle>
              <CardDescription>
                JEE {subject} practice tests
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button variant="secondary" className="w-full">View Tests</Button>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  );
}

// Fallback component when test data is loading or has errors
function TestListFallback({ subject }: { subject: string }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">{subject} Tests</h3>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="overflow-hidden">
            <CardHeader className="p-4">
              <CardTitle>{subject} Practice Test {i}</CardTitle>
              <CardDescription>
                Practice test for JEE Mains {subject} preparation
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="flex flex-col gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subject:</span>
                  <span className="font-medium">{subject}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Questions:</span>
                  <span className="font-medium">20</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duration:</span>
                  <span className="font-medium">60 mins</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-end">
              <Button asChild>
                <Link href={`/tests/jee-test-${i}`}>Start Test</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
} 