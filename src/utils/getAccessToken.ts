import axios from "axios";

export default async function getAccessToken(): Promise<string> {
  const request = {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    audience: process.env.AUDIENCE,
    grant_type: process.env.GRANT_TYPE,
  };

  const response = await axios.post(process.env.AUTH_URL, request);

  const access_token = response.data.access_token;

  return access_token;
}
