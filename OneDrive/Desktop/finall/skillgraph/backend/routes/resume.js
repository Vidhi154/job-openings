const express = require('express');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const fs = require('fs').promises;

const router = express.Router();

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF, DOC, DOCX, and TXT files are allowed.'));
    }
  }
});

// Comprehensive skill database for extraction
const SKILL_DATABASE = {
  programmingLanguages: [
    'JavaScript', 'Python', 'Java', 'TypeScript', 'C++', 'C#', 'PHP', 'Ruby', 
    'Go', 'Rust', 'Swift', 'Kotlin', 'Scala', 'R', 'MATLAB', 'Perl', 'Lua',
    'Dart', 'Objective-C', 'F#', 'Haskell', 'Clojure', 'Erlang', 'Elixir'
  ],
  frontend: [
    'React', 'Vue.js', 'Angular', 'Next.js', 'Nuxt.js', 'Svelte', 'jQuery',
    'HTML', 'HTML5', 'CSS', 'CSS3', 'SCSS', 'SASS', 'Less', 'Tailwind CSS',
    'Bootstrap', 'Material-UI', 'Ant Design', 'Chakra UI', 'Semantic UI',
    'Styled Components', 'Emotion', 'Webpack', 'Vite', 'Parcel', 'Rollup'
  ],
  backend: [
    'Node.js', 'Express.js', 'Django', 'Flask', 'FastAPI', 'Spring Boot',
    'Spring Framework', 'Laravel', 'Symfony', 'Ruby on Rails', 'ASP.NET',
    '.NET Core', 'Gin', 'Echo', 'Fiber', 'Actix', 'Rocket', 'Koa.js',
    'Nest.js', 'Hapi.js', 'Sails.js', 'Meteor.js'
  ],
  databases: [
    'MySQL', 'PostgreSQL', 'MongoDB', 'SQLite', 'Redis', 'Cassandra',
    'DynamoDB', 'Neo4j', 'InfluxDB', 'CouchDB', 'MariaDB', 'Oracle',
    'SQL Server', 'Elasticsearch', 'Firebase', 'Supabase', 'PlanetScale',
    'Prisma', 'Sequelize', 'TypeORM', 'Mongoose', 'Knex.js'
  ],
  cloud: [
    'AWS', 'Azure', 'Google Cloud', 'GCP', 'DigitalOcean', 'Heroku',
    'Vercel', 'Netlify', 'Railway', 'PlanetScale', 'Cloudflare',
    'Lambda', 'EC2', 'S3', 'RDS', 'CloudFormation', 'Terraform'
  ],
  devops: [
    'Docker', 'Kubernetes', 'Jenkins', 'GitLab CI', 'GitHub Actions',
    'Circle CI', 'Travis CI', 'Ansible', 'Chef', 'Puppet', 'Vagrant',
    'Nginx', 'Apache', 'PM2', 'Supervisor', 'Systemd', 'Prometheus',
    'Grafana', 'ELK Stack', 'Datadog', 'New Relic'
  ],
  dataScience: [
    'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Plotly', 'Scikit-learn',
    'TensorFlow', 'PyTorch', 'Keras', 'OpenCV', 'NLTK', 'spaCy',
    'Jupyter', 'Anaconda', 'Apache Spark', 'Hadoop', 'Tableau',
    'Power BI', 'D3.js', 'Apache Kafka', 'Apache Airflow'
  ],
  tools: [
    'Git', 'GitHub', 'GitLab', 'Bitbucket', 'SVN', 'Jira', 'Trello',
    'Asana', 'Slack', 'Discord', 'Zoom', 'Figma', 'Adobe XD',
    'Sketch', 'InVision', 'Postman', 'Insomnia', 'VS Code',
    'IntelliJ IDEA', 'PyCharm', 'Sublime Text', 'Vim', 'Emacs'
  ],
  mobile: [
    'React Native', 'Flutter', 'Xamarin', 'Ionic', 'PhoneGap',
    'Cordova', 'NativeScript', 'Unity', 'Android Studio', 'Xcode',
    'Swift UI', 'Jetpack Compose'
  ],
  testing: [
    'Jest', 'Mocha', 'Chai', 'Cypress', 'Selenium', 'Puppeteer',
    'Playwright', 'TestCafe', 'Jasmine', 'Karma', 'Enzyme',
    'React Testing Library', 'pytest', 'unittest', 'JUnit',
    'Mockito', 'Sinon', 'Supertest'
  ]
};

// Flatten all skills for easier searching
const ALL_SKILLS = Object.values(SKILL_DATABASE).flat();

class ResumeAnalyzer {
  constructor() {
    this.skillPatterns = this.buildSkillPatterns();
  }

  buildSkillPatterns() {
    return ALL_SKILLS.map(skill => ({
      skill,
      pattern: new RegExp(`\\b${skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi')
    }));
  }

  // Extract text from different file types
  async extractTextFromFile(file) {
    try {
      switch (file.mimetype) {
        case 'application/pdf':
          return await this.extractFromPDF(file.buffer);
        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
          return await this.extractFromDOCX(file.buffer);
        case 'application/msword':
          return await this.extractFromDOC(file.buffer);
        case 'text/plain':
          return file.buffer.toString('utf8');
        default:
          throw new Error('Unsupported file type');
      }
    } catch (error) {
      throw new Error(`Text extraction failed: ${error.message}`);
    }
  }

  async extractFromPDF(buffer) {
    const data = await pdfParse(buffer);
    return data.text;
  }

  async extractFromDOCX(buffer) {
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  }

  async extractFromDOC(buffer) {
    // For older .doc files, you might need additional libraries
    // For now, we'll treat it as text
    return buffer.toString('utf8');
  }

  // Extract skills from text using NLP-like patterns
  extractSkills(text) {
    const foundSkills = new Set();
    const skillCounts = {};
    
    this.skillPatterns.forEach(({ skill, pattern }) => {
      const matches = text.match(pattern);
      if (matches) {
        foundSkills.add(skill);
        skillCounts[skill] = matches.length;
      }
    });

    return {
      skills: Array.from(foundSkills),
      skillCounts,
      totalSkills: foundSkills.size
    };
  }

  // Extract experience level
  extractExperience(text) {
    const experiencePatterns = [
      { pattern: /(\d+)\+?\s*years?\s*(of\s*)?experience/gi, multiplier: 1 },
      { pattern: /(\d+)\+?\s*yrs?\s*(of\s*)?experience/gi, multiplier: 1 },
      { pattern: /(\d+)\+?\s*years?\s*in/gi, multiplier: 1 },
      { pattern: /experience.*?(\d+)\+?\s*years?/gi, multiplier: 1 },
      { pattern: /senior/gi, multiplier: 5 },
      { pattern: /lead/gi, multiplier: 6 },
      { pattern: /principal/gi, multiplier: 8 },
      { pattern: /junior/gi, multiplier: 1 },
      { pattern: /entry.level/gi, multiplier: 0 },
      { pattern: /intern/gi, multiplier: 0 }
    ];

    let maxExperience = 0;
    let experienceIndicators = [];

    experiencePatterns.forEach(({ pattern, multiplier }) => {
      const matches = text.match(pattern);
      if (matches) {
        matches.forEach(match => {
          experienceIndicators.push(match);
          if (typeof multiplier === 'number') {
            const yearMatch = match.match(/\d+/);
            if (yearMatch) {
              maxExperience = Math.max(maxExperience, parseInt(yearMatch[0]));
            } else {
              maxExperience = Math.max(maxExperience, multiplier);
            }
          }
        });
      }
    });

    return {
      years: maxExperience,
      indicators: experienceIndicators,
      level: this.categorizeExperienceLevel(maxExperience)
    };
  }

  categorizeExperienceLevel(years) {
    if (years === 0) return 'Entry Level';
    if (years <= 2) return 'Junior';
    if (years <= 5) return 'Mid Level';
    if (years <= 8) return 'Senior';
    return 'Lead/Principal';
  }

  // Extract education information
  extractEducation(text) {
    const degreePatterns = [
      /bachelor'?s?\s*(of\s*)?(arts|science|engineering|computer science|information technology)/gi,
      /master'?s?\s*(of\s*)?(arts|science|engineering|computer science|information technology)/gi,
      /phd|ph\.d\.?|doctorate/gi,
      /associate'?s?\s*degree/gi,
      /diploma/gi,
      /certificate/gi
    ];

    const foundDegrees = [];
    degreePatterns.forEach(pattern => {
      const matches = text.match(pattern);
      if (matches) {
        foundDegrees.push(...matches);
      }
    });

    const universityPattern = /university|college|institute|school/gi;
    const universities = text.match(universityPattern) || [];

    return {
      degrees: foundDegrees,
      institutions: universities.slice(0, 3), // Limit to 3
      hasHigherEducation: foundDegrees.length > 0
    };
  }

  // Extract contact information
  extractContactInfo(text) {
    const emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
    const phonePattern = /(\+?\d{1,3}[-.\s]?)?\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}/g;
    const linkedinPattern = /linkedin\.com\/in\/[\w\-]+/gi;
    const githubPattern = /github\.com\/[\w\-]+/gi;

    return {
      emails: text.match(emailPattern) || [],
      phones: text.match(phonePattern) || [],
      linkedin: text.match(linkedinPattern) || [],
      github: text.match(githubPattern) || []
    };
  }

  // Generate skill recommendations
  generateSkillRecommendations(currentSkills) {
    const skillCategories = {
      'Frontend Developer': ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
      'Backend Developer': ['Node.js', 'Express.js', 'PostgreSQL', 'Redis'],
      'Full Stack Developer': ['React', 'Node.js', 'TypeScript', 'MongoDB'],
      'Data Scientist': ['Python', 'Pandas', 'Scikit-learn', 'TensorFlow'],
      'DevOps Engineer': ['Docker', 'Kubernetes', 'AWS', 'Terraform'],
      'Mobile Developer': ['React Native', 'Flutter', 'Swift', 'Kotlin']
    };

    const recommendations = [];
    Object.entries(skillCategories).forEach(([role, skills]) => {
      const matchingSkills = skills.filter(skill => 
        currentSkills.some(current => current.toLowerCase().includes(skill.toLowerCase()))
      );
      
      if (matchingSkills.length > 0) {
        const missingSkills = skills.filter(skill => 
          !currentSkills.some(current => current.toLowerCase().includes(skill.toLowerCase()))
        );
        
        if (missingSkills.length > 0) {
          recommendations.push({
            role,
            currentMatch: matchingSkills,
            recommended: missingSkills.slice(0, 3), // Top 3 recommendations
            matchPercentage: Math.round((matchingSkills.length / skills.length) * 100)
          });
        }
      }
    });

    return recommendations.sort((a, b) => b.matchPercentage - a.matchPercentage);
  }

  // Perform comprehensive analysis
  async analyzeResume(text) {
    const skillsData = this.extractSkills(text);
    const experience = this.extractExperience(text);
    const education = this.extractEducation(text);
    const contact = this.extractContactInfo(text);
    const recommendations = this.generateSkillRecommendations(skillsData.skills);

    return {
      skills: skillsData.skills,
      skillCounts: skillsData.skillCounts,
      totalSkills: skillsData.totalSkills,
      experience,
      education,
      contact,
      recommendations,
      summary: {
        skillsFound: skillsData.totalSkills,
        experienceLevel: experience.level,
        hasEducation: education.hasHigherEducation,
        topSkills: skillsData.skills.slice(0, 10)
      }
    };
  }
}

// Initialize analyzer
const analyzer = new ResumeAnalyzer();

// Routes

// Analyze resume text
router.post('/analyze', async (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text || typeof text !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Resume text is required'
      });
    }

    console.log(`📝 Analyzing resume text (${text.length} characters)`);
    
    const analysis = await analyzer.analyzeResume(text);
    
    console.log(`✅ Found ${analysis.totalSkills} skills, ${analysis.experience.years} years experience`);
    
    res.json({
      success: true,
      analysis,
      processingTime: Date.now()
    });

  } catch (error) {
    console.error('Resume analysis error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to analyze resume',
      message: error.message
    });
  }
});

// Upload and analyze resume file
router.post('/upload', upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No file uploaded'
      });
    }

    console.log(`📄 Processing uploaded file: ${req.file.originalname} (${req.file.mimetype})`);
    
    // Extract text from file
    const text = await analyzer.extractTextFromFile(req.file);
    
    if (!text || text.trim().length < 50) {
      return res.status(400).json({
        success: false,
        error: 'Could not extract meaningful text from file'
      });
    }

    // Analyze the extracted text
    const analysis = await analyzer.analyzeResume(text);
    
    console.log(`✅ Processed ${req.file.originalname}: ${analysis.totalSkills} skills found`);
    
    res.json({
      success: true,
      filename: req.file.originalname,
      fileType: req.file.mimetype,
      fileSize: req.file.size,
      extractedText: text.substring(0, 1000) + (text.length > 1000 ? '...' : ''), // First 1000 chars
      analysis
    });

  } catch (error) {
    console.error('File upload error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to process uploaded file',
      message: error.message
    });
  }
});

// Get skill database
router.get('/skills', (req, res) => {
  res.json({
    success: true,
    skillDatabase: SKILL_DATABASE,
    totalSkills: ALL_SKILLS.length,
    categories: Object.keys(SKILL_DATABASE)
  });
});

// Extract skills from text (lightweight endpoint)
router.post('/skills', async (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text) {
      return res.status(400).json({
        success: false,
        error: 'Text is required'
      });
    }

    const skillsData = analyzer.extractSkills(text);
    
    res.json({
      success: true,
      skills: skillsData.skills,
      totalFound: skillsData.totalSkills,
      skillCounts: skillsData.skillCounts
    });

  } catch (error) {
    console.error('Skill extraction error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to extract skills',
      message: error.message
    });
  }
});

module.exports = router;