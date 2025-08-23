class TFIDFEngine {
  constructor() {
    this.stopWords = new Set(['the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by']);
  }

  scoreJobs(resumeSkills, jobs) {
    const scoredJobs = jobs.map(job => {
      const { score, matchedSkills } = this.calculateTFIDF(resumeSkills, job.skills);
      
      return {
        ...job,
        matchScore: Math.round(score * 100),
        matchedSkills,
        skillsMatch: Math.round((matchedSkills.length / job.skills.length) * 100)
      };
    });

    return scoredJobs.sort((a, b) => b.matchScore - a.matchScore);
  }

  calculateTFIDF(resumeSkills, jobSkills) {
    let score = 0;
    let matchedSkills = [];
    
    // Normalize skills for comparison
    const normalizedResumeSkills = resumeSkills.map(s => s.toLowerCase());
    const normalizedJobSkills = jobSkills.map(s => s.toLowerCase());
    
    normalizedResumeSkills.forEach(resumeSkill => {
      const matchingJobSkills = normalizedJobSkills.filter(jobSkill => 
        jobSkill.includes(resumeSkill) || resumeSkill.includes(jobSkill)
      );
      
      if (matchingJobSkills.length > 0) {
        // Term Frequency: how often skill appears in job
        const tf = matchingJobSkills.length / normalizedJobSkills.length;
        
        // Inverse Document Frequency: rarity of skill across all jobs
        const idf = Math.log(10 / (1 + matchingJobSkills.length)); // Simplified
        
        // TF-IDF Score
        const tfidf = tf * (1 + idf);
        score += tfidf;
        
        // Add original skill name to matched skills
        const originalSkill = resumeSkills.find(s => 
          s.toLowerCase() === resumeSkill
        );
        if (originalSkill && !matchedSkills.includes(originalSkill)) {
          matchedSkills.push(originalSkill);
        }
      }
    });
    
    return { score, matchedSkills };
  }
}

module.exports = TFIDFEngine;