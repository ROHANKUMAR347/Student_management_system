const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  candidateName: String,
  candidateId: String,
  course : String,
  gender: String,
  contact: String,
  alternateMobile: String,
  aadhar: String,
  email: String,
  dob: String,
  fatherName: String,
  motherName: String,
  education: String,
  higherQualification: String,
  familyIncome: String,
  caste: String,
  maritalStatus: String,
  address: String,
  state: String,
  district: String,
  constituency: String,
  pincode: String,
  religion: String,
  identificationMarks: String,
  pancard: String,
  disability: String,
  trainingChoice: String,
  remark: String
});

module.exports = mongoose.model("Student", StudentSchema);