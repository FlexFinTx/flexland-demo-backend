import axios from "axios";
import AccessToken from "../database/AccessToken";

export default async function createCredential(unsigned: any): Promise<any> {
  const at = await AccessToken.findOne({});
  const access_token = (at as any).access_token as string;

  const response = await axios.post(
    process.env.FLEXHUB_URL + "/credentials",
    unsigned,
    {
      headers: {
        Authorization: "Bearer " + access_token,
      },
    }
  );

  return response.data;
}
