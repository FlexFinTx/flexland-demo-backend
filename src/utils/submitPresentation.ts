import axios from "axios";
import AccessToken from "../database/AccessToken";

export default async function submitPresentation(
  submission: any
): Promise<boolean> {
  const at = await AccessToken.findOne({});
  const access_token = (at as any).access_token as string;

  const response = await axios.post(
    process.env.FLEXHUB_URL + "/presentations/submission",
    submission,
    {
      headers: {
        Authorization: "Bearer " + access_token,
      },
    }
  );

  return response.status === 200;
}
