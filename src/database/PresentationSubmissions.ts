import mongoose from "mongoose";

const presentationSubmissionsSchema = new mongoose.Schema({
  didAuth: mongoose.SchemaTypes.Mixed,
  bus: mongoose.SchemaTypes.Mixed,
  degree: mongoose.SchemaTypes.Mixed,
  employment: mongoose.SchemaTypes.Mixed,
  insurance: mongoose.SchemaTypes.Mixed,
});

const Submissions = mongoose.model("Submission", presentationSubmissionsSchema);

export default Submissions;
