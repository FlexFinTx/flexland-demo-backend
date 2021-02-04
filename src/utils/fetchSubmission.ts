import axios from "axios";
import { access } from "fs";
import AccessToken from "../database/AccessToken";

export default async function fetchSubmission(
  requestId: string,
  returnDid = false
): Promise<any> {
  const at = await AccessToken.findOne({});
  const access_token = (at as any).access_token as string;

  try {
    const response = await axios.get(
      process.env.FLEXHUB_URL + "/presentations/submission/" + requestId,
      {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      }
    );
    if (response.status === 200 && returnDid) {
      return response.data.presentation.holder as string;
    } else if (response.status === 200) {
      return response.data;
    }
  } catch (e) {
    return "NA";
  }
}
