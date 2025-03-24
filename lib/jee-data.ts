import { cache } from 'react'

export const SUBJECT_MAPPING: Record<string, string> = {
  'mathematics': 'Mathematics',
  'physics': 'Physics',
  'chemistry': 'Chemistry',
  'math': 'Mathematics',
  'maths': 'Mathematics',
  'phy': 'Physics',
  'chem': 'Chemistry',
  'pcm': 'PCM',
  'general': 'General'
};

export interface JEEQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  subject: string;
  difficulty: 'easy' | 'medium' | 'hard';
  marks: number;
  imageUrl?: string;
}

export interface JEETest {
  id: string;
  title: string;
  description: string;
  subject: string;
  questions: JEEQuestion[];
  duration: number; // in minutes
  totalMarks: number;
  imageUrl?: string;
  createdAt: string;
  featured?: boolean;
}

// Use a local variable to cache the tests to avoid repeated network requests
let cachedTests: JEETest[] | null = null;

// Cache the data fetch to avoid redundant network requests
export const fetchJEETests = cache(async (): Promise<JEETest[]> => {
  // If we already have cached tests, return them
  if (cachedTests) {
    return cachedTests;
  }
  
  try {
    // Set a timeout for the fetch to avoid hanging
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
    
    // Attempt to fetch data from a publicly available source with timeout
    const response = await fetch(
      'https://api.github.com/repos/DevParapalli/JEE-Mains-AnswerKeys/contents/keys.json',
      { 
        signal: controller.signal,
        headers: {
          'Accept': 'application/vnd.github.v3+json'
        }
      }
    ).catch(error => {
      console.error('GitHub API fetch failed:', error);
      return null;
    });
    
    clearTimeout(timeoutId);
    
    // If the fetch failed or returned non-OK status, use our comprehensive mock data
    if (!response || !response.ok) {
      console.log('Using mock JEE test data due to GitHub API error or timeout');
      cachedTests = generateMockTests();
      return cachedTests;
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
          
          const jsonData = JSON.parse(content);
          
          if (jsonData && typeof jsonData === 'object') {
            // Process the actual JEE data from GitHub
            const tests: JEETest[] = createJEETests(jsonData);
            
            // Add some featured tests
            tests.slice(0, 3).forEach(test => {
              test.featured = true;
            });
            
            cachedTests = tests;
            return tests;
          }
        } catch (error) {
          console.error('Error processing content:', error);
        }
      }
      
      // If we couldn't get data from the API, use our comprehensive mock data
      cachedTests = generateMockTests();
      return cachedTests;
    } catch (error) {
      console.error('Error processing GitHub API response:', error);
      cachedTests = generateMockTests();
      return cachedTests;
    }
  } catch (error) {
    console.error('Error fetching JEE test data:', error);
    cachedTests = generateMockTests();
    return cachedTests;
  }
});

// Helper function to create JEE tests from the GitHub data
function createJEETests(data: any): JEETest[] {
  const tests: JEETest[] = [];
  
  try {
    // Extract subjects
    const subjects = ['Mathematics', 'Physics', 'Chemistry', 'General'];
    
    // Create one test per subject with random questions
    subjects.forEach((subject, subjectIndex) => {
      const test: JEETest = {
        id: `jee-test-${subjectIndex + 1}`,
        title: `JEE ${subject} Practice Test`,
        description: `Comprehensive practice test for JEE Mains ${subject} section.`,
        subject,
        questions: [],
        duration: 60, // 1 hour
        totalMarks: 100,
        createdAt: new Date().toISOString()
      };
      
      // Create 20 questions for each test instead of 30 to improve performance
      for (let i = 0; i < 20; i++) {
        const questionId = `${test.id}-q${i + 1}`;
        
        let questionText;
        let options = [];
        let correctAnswer = 0;
        
        // Try to use real questions from the data if available
        if (data && Array.isArray(data.questions) && data.questions[i]) {
          const realQ = data.questions[i];
          questionText = realQ.question || `Question ${i + 1} for ${subject}`;
          
          // Check if options exist and are an array
          if (realQ.options && Array.isArray(realQ.options) && realQ.options.length === 4) {
            options = realQ.options.map((opt: any) => 
              typeof opt === 'string' ? opt : `Option ${i}`
            );
          } else {
            // Fallback options
            options = [
              `Option A for question ${i + 1}`,
              `Option B for question ${i + 1}`,
              `Option C for question ${i + 1}`,
              `Option D for question ${i + 1}`
            ];
          }
          
          // Use correct answer if it exists and is valid
          if (realQ.correct_answer !== undefined && 
              Number.isInteger(realQ.correct_answer) && 
              realQ.correct_answer >= 0 && 
              realQ.correct_answer < 4) {
            correctAnswer = realQ.correct_answer;
          } else {
            correctAnswer = Math.floor(Math.random() * 4);
          }
        } else {
          // Generate mock question data
          questionText = generateSubjectQuestion(subject, i);
          options = generateOptions(subject, i);
          correctAnswer = Math.floor(Math.random() * 4);
        }
        
        const question: JEEQuestion = {
          id: questionId,
          question: questionText,
          options,
          correctAnswer,
          subject,
          difficulty: ['easy', 'medium', 'hard'][Math.floor(Math.random() * 3)] as 'easy' | 'medium' | 'hard',
          marks: 4,
          explanation: `Explanation for ${questionText}`,
        };
        
        test.questions.push(question);
      }
      
      tests.push(test);
    });
    
    // Create combination test
    const combinationTest: JEETest = {
      id: 'jee-test-combined',
      title: 'JEE Full Mock Test',
      description: 'Complete JEE Mains Mock Test covering all subjects.',
      subject: 'PCM',
      questions: [],
      duration: 180, // 3 hours
      totalMarks: 300,
      createdAt: new Date().toISOString(),
      featured: true
    };
    
    // Add questions from all subjects
    let combinedQuestions: JEEQuestion[] = [];
    tests.forEach(test => {
      if (test.subject !== 'General') {
        combinedQuestions = combinedQuestions.concat(test.questions.slice(0, 5));
      }
    });
    
    combinationTest.questions = combinedQuestions;
    tests.push(combinationTest);
    
  } catch (error) {
    console.error('Error creating JEE tests from data:', error);
  }
  
  return tests;
}

// Helper function to get a single test by ID
export async function getTestById(id: string): Promise<JEETest | undefined> {
  const tests = await fetchJEETests();
  return tests.find(test => test.id === id);
}

// Helper function to get tests by subject
export async function getTestsBySubject(subject: string): Promise<JEETest[]> {
  const normalizedSubject = SUBJECT_MAPPING[subject.toLowerCase()] || subject;
  const tests = await fetchJEETests();
  return tests.filter(test => test.subject === normalizedSubject);
}

// Get featured tests
export async function getFeaturedTests(): Promise<JEETest[]> {
  const tests = await fetchJEETests();
  return tests.filter(test => test.featured);
}

// Get test counts by subject
export async function getTestCounts(): Promise<Record<string, number>> {
  const tests = await fetchJEETests();
  const counts: Record<string, number> = {};
  
  tests.forEach(test => {
    counts[test.subject] = (counts[test.subject] || 0) + 1;
  });
  
  return counts;
}

// Mock data generation helpers
function generateMockTests(): JEETest[] {
  const subjects = ['Mathematics', 'Physics', 'Chemistry', 'General'];
  const tests: JEETest[] = [];
  
  subjects.forEach((subject, index) => {
    const test: JEETest = {
      id: `jee-test-${index + 1}`,
      title: `JEE ${subject} Practice Test`,
      description: `Comprehensive practice test for JEE Mains ${subject} section.`,
      subject,
      questions: [],
      duration: 60, // 1 hour
      totalMarks: 100,
      createdAt: new Date().toISOString()
    };
    
    // Generate 20 questions instead of 30 to improve performance
    for (let i = 0; i < 20; i++) {
      const question: JEEQuestion = {
        id: `${test.id}-q${i + 1}`,
        question: generateSubjectQuestion(subject, i),
        options: generateOptions(subject, i),
        correctAnswer: Math.floor(Math.random() * 4),
        subject,
        difficulty: ['easy', 'medium', 'hard'][Math.floor(Math.random() * 3)] as 'easy' | 'medium' | 'hard',
        marks: 4,
        explanation: `Explanation for question ${i + 1} in ${subject}`,
      };
      
      test.questions.push(question);
    }
    
    if (index < 3) {
      test.featured = true; // Make the first few tests featured
    }
    
    tests.push(test);
  });
  
  // Add a combined test
  const combinedTest: JEETest = {
    id: 'jee-test-combined',
    title: 'JEE Full Mock Test',
    description: 'Complete JEE Mains Mock Test covering all subjects.',
    subject: 'PCM',
    questions: [],
    duration: 180, // 3 hours
    totalMarks: 300,
    createdAt: new Date().toISOString(),
    featured: true
  };
  
  // Add questions from all subjects
  let combinedQuestions: JEEQuestion[] = [];
  tests.forEach(test => {
    if (test.subject !== 'General') {
      combinedQuestions = combinedQuestions.concat(test.questions.slice(0, 5));
    }
  });
  
  combinedTest.questions = combinedQuestions;
  tests.push(combinedTest);
  
  return tests;
}

function generateSubjectQuestion(subject: string, index: number): string {
  const questions: Record<string, string[]> = {
    'Mathematics': [
      'If the sum of roots of the quadratic equation ax² + bx + c = 0 is equal to the product of its roots, then:',
      'The value of ∫(2x + 3)³ dx is:',
      'The equation of the tangent to the curve y = x² at the point (2, 4) is:',
      'If sin θ + cosec θ = 2, then the value of sin⁶θ + cosec⁶θ is:',
      'The number of ways to arrange the letters of the word "MATHEMATICS" such that no two identical letters are adjacent is:',
      'If the position vectors of three points A, B and C are 2i + 3j + 4k, 4i + j - 2k and 6i - j - 8k respectively, then the area of triangle ABC is:',
      'The locus of the point of intersection of perpendicular tangents to the ellipse x²/a² + y²/b² = 1 is:',
      'The number of real roots of the equation cos x = x in the interval [0, π/2] is:',
      'For what value of k will the following system of equations have infinite solutions? 2x + 3y = 7, 6x + ky = 21',
      'The probability of solving a specific problem by three students A, B and C are 1/2, 1/3 and 1/4 respectively. The probability that the problem is solved by at least one of them is:'
    ],
    'Physics': [
      'A body is projected from the ground with a speed of 50 m/s at an angle of 30° with the horizontal. The maximum height reached by the body is (g = 10 m/s²):',
      'Two spherical conductors of radii R and 2R are connected by a thin wire. If the system is given a charge Q, the ratio of electric field at the surfaces of the two conductors is:',
      'A current-carrying circular loop of radius R is placed in the x-y plane with center at origin. The magnetic field at a point on the z-axis at a distance z from the origin is:',
      'A monochromatic light of wavelength 500 nm is incident on a single slit of width 0.1 mm. The angular width of the central maximum on a screen placed at a large distance is:',
      'A gas expands from volume V₁ to V₂ against a constant external pressure p. The work done by the gas is:',
      'The moment of inertia of a thin uniform rod of mass M and length L about an axis passing through its center and perpendicular to its length is:',
      'A projectile is fired from the origin with velocity v at an angle θ with the horizontal. The equation of its trajectory is:',
      'Two identical charged particles are placed at a distance d apart. If the force between them is F, the electric field at the middle point between them has magnitude:',
      'In Young\'s double-slit experiment, the fringe width is β. If the entire apparatus is immersed in a medium of refractive index n, the new fringe width is:',
      'A particle of mass m is moving in a circular orbit of radius r under the influence of a central force F ∝ 1/r². The angular momentum of the particle is:'
    ],
    'Chemistry': [
      'The hybridization of the central atom in NH₃, BCl₃, and SF₆ are respectively:',
      'The IUPAC name of the compound CH₃-CH(OH)-CH₃ is:',
      'Which of the following has the highest lattice energy?',
      'The number of sigma and pi bonds in benzene (C₆H₆) are respectively:',
      'For a first-order reaction, the time taken for completion of 99.9% of the reaction is:',
      'Which quantum number determines the orientation of an orbital?',
      'The conjugate base of H₃O⁺ is:',
      'The compound that would react fastest with SN1 reaction is:',
      'In the periodic table, atomic radius generally:',
      'The type of isomerism exhibited by the complex [Pt(NH₃)₂Cl₂] is:'
    ],
    'General': [
      'Which among the following is NOT a scalar quantity?',
      'Which of the following is a renewable source of energy?',
      'The SI unit of electric current is:',
      'Which of the following is an example of a non-biodegradable pollutant?',
      'The scientist who discovered the law of conservation of mass was:',
      'Which of the following algorithms has the worst time complexity in the average case?',
      'The value of lim_{x→0} (sin x)/x is:',
      'In computer science, TCP stands for:',
      'The number of electrons in the valence shell of noble gases is:',
      'Which of the following statements about quantum mechanics is correct?'
    ]
  };
  
  // Use modulo to cycle through questions if index exceeds array length
  const questionsList = questions[subject] || questions['General'];
  return questionsList[index % questionsList.length];
}

function generateOptions(subject: string, index: number): string[] {
  const options: Record<string, string[][]> = {
    'Mathematics': [
      ['b = 0', 'a = c', 'b = a + c', 'a = 0'],
      ['(2x + 3)⁴/8 + C', '(2x + 3)⁴/2 + C', '(2x + 3)⁴/6 + C', '(2x + 3)⁴/4 + C'],
      ['y = 4x - 4', 'y = 4x + 4', 'y = 4x - 8', 'y = 4x'],
      ['2', '5', '6', '10'],
      ['31449600', '10497600', '30240', '113400'],
      ['√41', '2√41', '√34', '2√34'],
      ['x²/a² + y²/b² = 1', 'x²/a² - y²/b² = 1', 'x²/b² + y²/a² = 1', 'x²/b² - y²/a² = 1'],
      ['0', '1', '2', '3'],
      ['k = 9', 'k = 4.5', 'k = 18', 'k = -9'],
      ['3/4', '7/12', '2/3', '11/12']
    ],
    'Physics': [
      ['62.5 m', '31.25 m', '50 m', '25 m'],
      ['2:1', '1:2', '1:4', '4:1'],
      ['μ₀IR²/2(R² + z²)³/²', 'μ₀I/2R', 'μ₀IR²/2(R² + z²)¹/²', 'μ₀IR²/2(R² + z²)'],
      ['5 × 10⁻³ rad', '5 × 10⁻² rad', '10⁻³ rad', '10⁻² rad'],
      ['p(V₂ - V₁)', 'p(V₁ - V₂)', 'pV₂/V₁', 'pV₁/V₂'],
      ['ML²/12', 'ML²/3', 'ML²/2', 'ML²/6'],
      ['y = x tan θ - (g/2v²cos²θ)x²', 'y = x tan θ + (g/2v²cos²θ)x²', 'y = x tan θ - (g/2v²sin²θ)x²', 'y = x tan θ - (gx²/2v²cos²θ)'],
      ['2F/d', 'F/d', '2F', 'F/2d'],
      ['β/n', 'nβ', 'β', 'β/n²'],
      ['mv', 'mvr', 'mv²r', 'mv²']
    ],
    'Chemistry': [
      ['sp³, sp², sp³d²', 'sp³, sp², sp³', 'sp³, sp, sp³d²', 'sp², sp², sp³d²'],
      ['2-propanol', 'propan-2-ol', 'isopropyl alcohol', 'propanol'],
      ['NaCl', 'KCl', 'MgO', 'CsI'],
      ['12 sigma and 6 pi', '6 sigma and 3 pi', '12 sigma and 3 pi', '6 sigma and 6 pi'],
      ['6.93/k', '4.61/k', '2.303/k', '9.21/k'],
      ['Principal quantum number', 'Azimuthal quantum number', 'Magnetic quantum number', 'Spin quantum number'],
      ['H₂O', 'OH⁻', 'H₂', 'H⁺'],
      ['CH₃-CH₂-Cl', '(CH₃)₃C-Cl', 'CH₃-CHCl-CH₃', 'C₆H₅-Cl'],
      ['Increases down a group and decreases across a period', 'Decreases down a group and increases across a period', 'Increases both down a group and across a period', 'Decreases both down a group and across a period'],
      ['Geometrical isomerism', 'Optical isomerism', 'Ionization isomerism', 'Coordination isomerism']
    ],
    'General': [
      ['Mass', 'Temperature', 'Displacement', 'Speed'],
      ['Coal', 'Natural gas', 'Solar energy', 'Petroleum'],
      ['Volt', 'Watt', 'Ampere', 'Ohm'],
      ['Paper', 'Vegetable peels', 'Plastic', 'Cotton cloth'],
      ['Antoine Lavoisier', 'John Dalton', 'Dmitri Mendeleev', 'Ernest Rutherford'],
      ['Binary search', 'Merge sort', 'Bubble sort', 'Quick sort'],
      ['0', '1', 'Undefined', 'Infinity'],
      ['Transmission Control Protocol', 'Transport Control Protocol', 'Transfer Control Protocol', 'Text Control Protocol'],
      ['2', '4', '6', '8'],
      ['Energy is always conserved', 'Electrons have definite paths around the nucleus', 'The position and momentum of a particle can be simultaneously measured with high precision', 'Electrons can only have discrete energy values']
    ]
  };
  
  // Use modulo to cycle through options if index exceeds array length
  const optionsList = options[subject] || options['General'];
  return optionsList[index % optionsList.length];
} 