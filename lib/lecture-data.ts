import { cache } from 'react'
import { SUBJECT_MAPPING } from './jee-data'

export interface Lecture {
  id: string;
  title: string;
  instructor: string;
  duration: string;
  subject: string;
  topics: string[];
  description: string;
  thumbnail?: string;
  videoUrl?: string;
  views?: string;
  rating?: number;
  publishedDate?: string;
  resource?: {
    type: string;
    url: string;
    size?: string;
  }[];
}

// Use a local variable to cache the lectures to avoid repeated network requests
let cachedLectures: Lecture[] | null = null;

// Cache the data fetch to avoid redundant network requests
export const fetchJEELectures = cache(async (): Promise<Lecture[]> => {
  // If we already have cached lectures, return them
  if (cachedLectures) {
    return cachedLectures;
  }
  
  try {
    // Set a timeout for the fetch to avoid hanging
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
    
    // Attempt to fetch data from a publicly available source with timeout
    const response = await fetch(
      'https://api.github.com/repos/pranjalaggarwal/JEE_HELPER/contents/JEEHELPER/lecture_meta.json',
      { 
        signal: controller.signal,
        headers: {
          'Accept': 'application/vnd.github.v3+json'
        }
      }
    ).catch(error => {
      console.error('GitHub API fetch failed for lectures:', error);
      return null;
    });
    
    clearTimeout(timeoutId);
    
    // If the fetch failed or returned non-OK status, use our comprehensive mock data
    if (!response || !response.ok) {
      console.log('Using mock lecture data due to GitHub API error or timeout');
      cachedLectures = getComprehensiveJEELectures();
      return cachedLectures;
    }
    
    try {
      const data = await response.json();
      
      if (data && data.content && typeof data.content === 'string') {
        try {
          // GitHub API returns base64 encoded content - use a safer approach to decode
          // Using TextDecoder is more reliable than atob in various environments
          let content;
          
          try {
            // Try the browser-safe approach first
            content = atob(data.content.replace(/\s/g, ''));
          } catch (e) {
            // Fall back to Node.js Buffer if atob is not available
            content = Buffer.from(data.content, 'base64').toString('utf-8');
          }
          
          if (!content) {
            throw new Error('Failed to decode base64 content');
          }
          
          const lectures = JSON.parse(content);
          
          if (Array.isArray(lectures) && lectures.length > 0) {
            const processedLectures = lectures.map((lecture: any, index: number) => ({
              id: lecture.id || `lecture-${index + 1}`,
              title: lecture.title || 'JEE Preparation Lecture',
              instructor: lecture.instructor || 'Expert Faculty',
              duration: lecture.duration || `${Math.floor(30 + Math.random() * 60)}:00`,
              subject: lecture.subject || 'General',
              topics: lecture.topics || ['General Concepts'],
              description: lecture.description || 'Comprehensive lecture for JEE preparation',
              thumbnail: lecture.thumbnail,
              videoUrl: lecture.videoUrl,
              views: lecture.views,
              rating: lecture.rating || 4.5,
              publishedDate: lecture.publishedDate || new Date().toISOString().split('T')[0],
              resource: lecture.resource
            }));
            
            cachedLectures = processedLectures;
            return processedLectures;
          }
        } catch (error) {
          console.error('Error processing lecture content:', error);
        }
      }
      
      // If we couldn't get data from the API, use our comprehensive mock data
      cachedLectures = getComprehensiveJEELectures();
      return cachedLectures;
    } catch (error) {
      console.error('Error processing GitHub API response for lectures:', error);
      cachedLectures = getComprehensiveJEELectures();
      return cachedLectures;
    }
  } catch (error) {
    console.error('Error fetching JEE lecture data:', error);
    cachedLectures = getComprehensiveJEELectures();
    return cachedLectures;
  }
});

// Helper function to get a single lecture by ID
export async function getLectureById(id: string): Promise<Lecture | undefined> {
  const lectures = await fetchJEELectures();
  return lectures.find(lecture => lecture.id === id);
}

// Helper function to get lectures by subject
export async function getLecturesBySubject(subject: string): Promise<Lecture[]> {
  const lectures = await fetchJEELectures();
  return lectures.filter(lecture => lecture.subject.toLowerCase() === subject.toLowerCase());
}

// Get lecture counts by subject
export async function getLectureCounts(): Promise<Record<string, number>> {
  const lectures = await fetchJEELectures();
  const counts: Record<string, number> = {};
  
  lectures.forEach(lecture => {
    const subject = lecture.subject || 'General';
    counts[subject] = (counts[subject] || 0) + 1;
  });
  
  return counts;
}

// Comprehensive mock data with real JEE topics
function getComprehensiveJEELectures(): Lecture[] {
  // Data structure for JEE topics by subject
  const subjectTopics = {
    Mathematics: [
      'Algebra: Complex Numbers',
      'Algebra: Matrices and Determinants',
      'Algebra: Permutation and Combination',
      'Calculus: Differential Calculus',
      'Calculus: Integral Calculus',
      'Calculus: Differential Equations',
      'Coordinate Geometry: 2D Geometry',
      'Coordinate Geometry: 3D Geometry',
      'Trigonometry: Basics and Identities',
      'Statistics and Probability'
    ],
    Physics: [
      'Mechanics: Kinematics',
      'Mechanics: Laws of Motion',
      'Mechanics: Work, Energy and Power',
      'Electrostatics: Electric Charges and Fields',
      'Electrodynamics: Current Electricity',
      'Magnetism: Moving Charges and Magnetism',
      'Optics: Ray Optics and Optical Instruments',
      'Optics: Wave Optics',
      'Modern Physics: Atoms and Nuclei',
      'Thermodynamics: Heat and Temperature'
    ],
    Chemistry: [
      'Physical Chemistry: Atomic Structure',
      'Physical Chemistry: Chemical Bonding',
      'Physical Chemistry: Thermodynamics',
      'Organic Chemistry: Basic Principles',
      'Organic Chemistry: Hydrocarbons',
      'Organic Chemistry: Reaction Mechanisms',
      'Inorganic Chemistry: Periodic Table',
      'Inorganic Chemistry: Coordination Compounds',
      'Inorganic Chemistry: Chemical Analysis',
      'Environmental Chemistry'
    ],
    General: [
      'Logical Reasoning',
      'General Knowledge',
      'Aptitude',
      'Language Comprehension'
    ]
  };

  const instructors = [
    'Dr. Amit Sharma', 'Prof. Neha Verma', 'Dr. Rajiv Singhal', 
    'Prof. Sunita Patel', 'Dr. Vikram Mehta', 'Prof. Anjali Gupta', 
    'Dr. Harish Chandra', 'Prof. Meena Iyer', 'Dr. Sanjay Joshi',
    'Prof. Deepa Khanna', 'Dr. Prakash Goyal', 'Prof. Leela Menon'
  ];

  const lecturesArray: Lecture[] = [];
  
  // Generate lectures for each subject (reduced number to improve performance)
  Object.entries(subjectTopics).forEach(([subject, topics]) => {
    // Only generate 5 lectures per subject instead of all topics
    const selectedTopics = topics.slice(0, 5);
    
    selectedTopics.forEach((topic, index) => {
      // Create basic lecture
      const baseLecture: Lecture = {
        id: `${subject.toLowerCase().replace(/\s+/g, '-')}-lecture-${index + 1}`,
        title: `${topic} - JEE ${subject} Preparation`,
        instructor: instructors[Math.floor(Math.random() * instructors.length)],
        duration: `${Math.floor(30 + Math.random() * 60)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
        subject,
        topics: [topic.split(':')[0].trim(), topic.split(':')[1]?.trim() || ''].filter(Boolean),
        description: `A comprehensive lecture on ${topic} for JEE Mains preparation. This lecture covers important concepts, formulas, and problem-solving techniques.`,
        thumbnail: `📚`, // Simplified placeholder
        views: `${Math.floor(1 + Math.random() * 100)}K`,
        rating: +(4 + Math.random()).toFixed(1),
        publishedDate: `2023-${(Math.floor(1 + Math.random() * 12)).toString().padStart(2, '0')}-${(Math.floor(1 + Math.random() * 28)).toString().padStart(2, '0')}`,
        resource: [
          {
            type: 'PDF',
            url: '#',
            size: `${Math.floor(1 + Math.random() * 10)}MB`
          }
        ]
      };
      
      // Add video URL for some lectures
      if (Math.random() > 0.2) {
        baseLecture.videoUrl = '#'; // Use a simple placeholder to avoid external requests
      }
      
      lecturesArray.push(baseLecture);
    });
  });
  
  return lecturesArray;
} 