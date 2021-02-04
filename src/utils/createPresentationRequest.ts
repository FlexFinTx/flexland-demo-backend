import axios from "axios";
import AccessToken from "../database/AccessToken";

export default async function createPresentationRequest(
  templateIds: string[]
): Promise<any> {
  const at = await AccessToken.findOne({});
  const access_token = (at as any).access_token as string;

  const request = {
    templates: templateIds,
  };

  const response = await axios.post(
    process.env.FLEXHUB_URL + "/presentations/templates/request",
    request,
    {
      headers: {
        Authorization: "Bearer " + access_token,
      },
    }
  );

  return response.data;
}
