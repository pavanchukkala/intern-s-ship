import mongoose from "mongoose";

const InternshipSchema = new mongoose.Schema({
  organization: { type: String, required: true },
  applicantName: { type: String, required: true },
  designation: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.Internship || mongoose.model("Internship", InternshipSchema);
