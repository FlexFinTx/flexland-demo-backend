import { Request, Response, Router } from "express";
import qrcode from "qrcode";
import Credentials from "../../database/Credentials";
import PRequests from "../../database/PresentationRequests";
import PresentationRequestTemplates from "../../database/PresentationRequestTemplates";
import createPresentationRequest from "../../utils/createPresentationRequest";
import fetchSubmission from "../../utils/fetchSubmission";

const router = Router();

router.get("/pr", async (req: Request, res: Response) => {
  const prt = await PresentationRequestTemplates.findOne({});
  const didAuthTemplateId = (prt as any).didAuth as string;

  const templateIds = [didAuthTemplateId];

  const pr = await createPresentationRequest(templateIds);

  console.log(pr);

  const prequestmodel = new PRequests({
    didAuth: pr.id,
  });
  await prequestmodel.save();

  const prQR = await qrcode.toDataURL(JSON.stringify(pr));
  return res.json({
    qrcode: prQR,
  });
});

router.get("/poll", async (req: Request, res: Response) => {
  const prequestmodel = await PRequests.findOne({});

  const response = await fetchSubmission(
    (prequestmodel as any).didAuth as string,
    true
  );

  console.log("REs: ", response);

  if (response === "NA") {
    return res.sendStatus(400);
  } else {
    const cred = new Credentials({
      did: response,
    });
    await cred.save();
    return res.json({
      did: response,
    });
  }
});

export default router;
