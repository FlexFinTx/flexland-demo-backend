import mongoose from "mongoose";

const credentialsSchema = new mongoose.Schema({
  did: String,
  cityId: mongoose.SchemaTypes.Mixed,
  degreeId: mongoose.SchemaTypes.Mixed,
  employmentId: mongoose.SchemaTypes.Mixed,
  busId: mongoose.SchemaTypes.Mixed,
  insuranceId: mongoose.SchemaTypes.Mixed,
});

const Credentials = mongoose.model("Credential", credentialsSchema);

export default Credentials;
