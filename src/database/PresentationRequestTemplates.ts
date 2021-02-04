import mongoose from "mongoose";

const presentationRequestTemplateSchema = new mongoose.Schema({
  didAuth: String,
  city: String,
  degree: String,
  employment: String,
});

const PRTemplates = mongoose.model("PRT", presentationRequestTemplateSchema);

export default PRTemplates;
