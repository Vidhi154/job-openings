const express = require('express');
const JobScraper = require('../services/jobScraper');
const TFIDFEngine = require('../services/tfidfEngine');

const router = express.Router();
const jobScraper = new JobScraper();
const tfidfEngine = new TFIDFEngine();

router.post('/search', async (req, res) => {
  try {
    const { skills, location, limit = 10 } = req.body;
    
    console.log(`🔍 Searching jobs for skills: ${skills.join(', ')}`);
    
    // Search multiple job boards
    const jobs = await jobScraper.searchMultipleSources(skills, location, limit);
    
    // Calculate TF-IDF scores
    const scoredJobs = tfidfEngine.scoreJobs(skills, jobs);
    
    res.json({
      success: true,
      jobs: scoredJobs,
      totalFound: jobs.length,
      searchQuery: skills.join(' ')
    });
    
  } catch (error) {
    console.error('Job search error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to search jobs',
      message: error.message
    });
  }
});

module.exports = router;