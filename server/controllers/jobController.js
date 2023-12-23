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

  let skillsArray = skillsRequired;
  if (typeof skillsRequired === "string") {
    skillsArray = skillsRequired
      .split(",")
      .map((skillsRequired) => skillsRequired.trim());
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

module.exports = {
  createJobPost
};
