import { Request, Response, Router } from "express";
import qrcode from "qrcode";
import Credentials from "../../database/Credentials";
import PRequests from "../../database/PresentationRequests";
import PresentationRequestTemplates from "../../database/PresentationRequestTemplates";
import Submissions from "../../database/PresentationSubmissions";
import createCredential from "../../utils/createCredential";
import createPresentationRequest from "../../utils/createPresentationRequest";
import fetchSubmission from "../../utils/fetchSubmission";
import generateRandomString from "../../utils/generateRandomString";

const router = Router();

router.get("/pr", async (req: Request, res: Response) => {
  const prt = await PresentationRequestTemplates.findOne({});
  const cityTemplateId = (prt as any).city as string;

  const templateIds = [cityTemplateId];

  const pr = await createPresentationRequest(templateIds);

  const show = {
    requestType: "presentationRequest",
    pr,
  }

  const prmodel = await PRequests.findOne({});
  (prmodel as any).degree = pr.id;
  await prmodel.save();

  const prQR = await qrcode.toDataURL(JSON.stringify(show));
  return res.json({
    qrcode: prQR,
  });
});

router.get("/poll", async (req: Request, res: Response) => {
  const prmodel = await PRequests.findOne({});

  const response = await fetchSubmission((prmodel as any).degree);

  if (response === "NA") {
    return res.sendStatus(400);
  } else {
    const submission = new Submissions({
      degree: response,
    });
    await submission.save();
    return res.sendStatus(200);
  }
});

router.post("/cred", async (req: Request, res: Response) => {
  const c = await Credentials.findOne({});
  const did = (c as any).did;

  const unsignedVC = {
    "@context": [
      "https://www.w3.org/2018/credentials/v1",
      "https://schema.org",
    ],
    type: ["VerifiableCredential", "FlexLandUniversityDegreeCredential"],
    credentialSubject: {
      id: did,
      alumniOf: "University of FlexLand",
      degree: "Bachelors of Science",
    },
    issuer: process.env.ORG_DID,
    saveToBank: true,
    isRevocable: false,
  };

  const signedVc = await createCredential(unsignedVC);
  (c as any).degree = signedVc;
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
