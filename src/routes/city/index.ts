import { Request, Response, Router } from "express";
import Credentials from "../../database/Credentials";
import qrcode from "qrcode";
import createCredential from "../../utils/createCredential";
import { sign } from "crypto";

const router = Router();

interface CitySubmitInfo {
  givenName: string;
  familyName: string;
  address: string;
  birthDate: string;
}

router.post("/cred", async (req: Request, res: Response) => {
  const body = req.body as CitySubmitInfo;

  const c = await Credentials.findOne({});
  const did = (c as any).did;

  const unsignedVC = {
    "@context": [
      "https://www.w3.org/2018/credentials/v1",
      "https://schema.org",
    ],
    name: "City ID",
    image: "https://www.pngrepo.com/png/9769/512/city-hall.png",
    type: ["VerifiableCredential", "FlexLandCityIDCredential"],
    credentialSubject: {
      id: did,
      givenName: body.givenName,
      familyName: body.familyName,
      address: body.address,
      birthDate: body.birthDate,
    },
    issuerOrganization: "Flex Land",
    issuer: process.env.ORG_DID,
    saveToBank: true,
    isRevocable: false,
  };

  console.log(unsignedVC);

  const signedVc = await createCredential(unsignedVC);

  console.log(signedVc);
  (c as any).cityId = signedVc;
  await c.save();

  const saveRequest = {
    requestType: "credentialSave",
    vc: signedVc,
  };

  const vcQR = await qrcode.toDataURL(JSON.stringify(saveRequest));
  return res.json({
    qrcode: vcQR,
  });
});

export default router;
