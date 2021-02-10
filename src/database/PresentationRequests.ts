import mongoose from "mongoose";

const presentationRequestSchema = new mongoose.Schema({
  didAuth: String,
  bus: String,
  city: String,
  degree: String,
  employment: String,
  insurance: String,
  health: String,
});

const PRequests = mongoose.model("PR", presentationRequestSchema);

export default PRequests;
