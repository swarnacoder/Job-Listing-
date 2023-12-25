const JobPost = require("../models/jobModel");

// Logic for creating a new job post
const createJobPost = async (req, res) => {
  const {
    companyName,
    companyLogoURL,
    jobPosition,
    monthlySalary,
    jobType,
    remote,
    location,
    jobDescription,
    skillsRequired,
    aboutCompany,
  } = req.body;

  const recruiterName = req.body.name;


let skillsArray;
if (typeof skillsRequired === "string") {
  skillsArray = skillsRequired
    .split(",")
    .map((skill) => skill.trim());
} else {
  skillsArray = skillsRequired;
}


  const newJob = new JobPost({
    companyName,
    companyLogoURL,
    jobPosition,
    monthlySalary,
    jobType,
    remote,
    location,
    jobDescription,
    aboutCompany,
    skillsRequired: skillsArray,
    information: req.body.information,
  });

  try {
    await newJob.save();
    return res.json({
      message: "Job post created successfully",
      name: recruiterName,
    });
  } catch (err) {
    console.error(err);

    if (err.name === "ValidationError") {
      return res.status(400).json({ errors: err.errors });
    } else {
      return res
        .status(400)
        .json({ message: err.message || "Job post creation failed" });
    }
  }
};



// EDIT JOB POSTS
const editJobPost = async (req, res) => {
    try {
        
      const {
        companyName,
        companyLogoURL,
        jobPosition,
        monthlySalary,
        jobType,
        remote,
        location,
        jobDescription,
        skillsRequired,
        aboutCompany,
        information,
      } = req.body;
  
      const updatedJob = await JobPost.findByIdAndUpdate(req.params.id, {
        
        $set: {
          companyName,
          companyLogoURL,
          jobPosition,
          monthlySalary,
          jobType,
          remote,
          location,
          jobDescription,
          skillsRequired,
          aboutCompany,
          information,
        },
      }, { new: true });
     
      if (!updatedJob) {
        throw new Error('Job post not found');
      }
  
      res.json({ message: 'Job post updated successfully', jobPost: updatedJob });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error updating job post' });
    }
  };


  // Function to retrieve job posts based on query filters
const getJobPosts = async (req, res) => {
    let query = {};
  
    // Construct query based on filter parameters
    if (req.query.skills) {
      query.skillsRequired = { $in: req.query.skills.split(',') };
    }
  
    if (req.query.jobTitle) {
      query.jobPosition = { $regex: req.query.jobTitle, $options: 'i' };
    }
  
    try {
      const jobPosts = await JobPost.find(query);
      res.json(jobPosts);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error fetching job posts' });
    }
  };


module.exports = {
  createJobPost, editJobPost, getJobPosts
};
