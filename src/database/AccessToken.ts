import mongoose from "mongoose";

const accessTokenSchema = new mongoose.Schema({
  access_token: String,
});

const AccessToken = mongoose.model("AccessToken", accessTokenSchema);

export default AccessToken;
