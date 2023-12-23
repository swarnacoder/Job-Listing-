const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    _id: { 
        type: mongoose.Schema.Types.ObjectId, 
        auto:true },
    companyName:{
        type:String,
        required:true
    },
    companyLogoURL:{
        type:String,
        required:true
    },
    jobPosition:{
        type:String,
        required:true
    },
    monthlySalary:{
        type:String,
        required:true
    },
    jobType:{
        type:String,
        enum:["Part-time","Full-time","Internship"],
        required:true
    },
    remote:{
        type:String,
        enum:["Office","Remote"],
        required:true
    },
    location:{
        type:String,
        required:true
    },
    jobDescription:{
        type:String,
        required:true
    },
    aboutCompany:{
        type:String,
        required:true
    },
    skillsRequired:{
        type:[String],
        required:true
    },
    information:{
        type:String,
        required:true
    },
    createdAt: {
        type: Date,
        default: () => Date.now()
    },
})

const Job = mongoose.model("Job",jobSchema);

module.exports = Job;