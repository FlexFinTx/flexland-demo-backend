import axios from "axios";
import AccessToken from "../database/AccessToken";
import Credentials from "../database/Credentials";
import PRequests from "../database/PresentationRequests";
import PresentationRequestTemplates from "../database/PresentationRequestTemplates";
import Submissions from "../database/PresentationSubmissions";
import getAccessToken from "./getAccessToken";

export default async function initialize() {
  console.log("Initializing Backend...");

  await AccessToken.deleteMany({});
  await Credentials.deleteMany({});
  await PRequests.deleteMany({});
  await PresentationRequestTemplates.deleteMany({});
  await Submissions.deleteMany({});

  const access_token = await getAccessToken();

  const at = new AccessToken({
    access_token: access_token,
  });
  await at.save();

  // Create Presentation Request Template for DIDAuth
  const didAuthTemplateRequest = {
    name: "DID Auth",
    reason: "We need this to authenticate your FlexID",
    credentialType: "DIDAuthCredential",
    credentialIssuers: ["self"],
  };

  const didAuthResponse = await axios.post(
    process.env.FLEXHUB_URL + "/presentations/templates",
    didAuthTemplateRequest,
    {
      headers: {
        Authorization: "Bearer " + access_token,
      },
    }
  );

  const didAuthTemplateId = didAuthResponse.data.id;

  // Create Presentation Request Template for CityID
  const cityIdTemplateRequest = {
    name: "City ID Verification",
    reason: "We need this to verify you are a citizen of FlexLand",
    credentialType: "FlexLandCityIDCredential",
    credentialIssuers: [process.env.ORG_DID],
  };

  const cityResponse = await axios.post(
    process.env.FLEXHUB_URL + "/presentations/templates",
    cityIdTemplateRequest,
    {
      headers: {
        Authorization: "Bearer " + access_token,
      },
    }
  );

  const cityTemplateId = cityResponse.data.id;

  // Create Presentation Request Template for Degree
  const degreeIdTemplateRequest = {
    name: "Degree Verification",
    reason:
      "We need this to verify you are an alumni of the University of FlexLand",
    credentialType: "FlexLandUniversityDegreeCredential",
    credentialIssuers: [process.env.ORG_DID],
  };

  const degreeResponse = await axios.post(
    process.env.FLEXHUB_URL + "/presentations/templates",
    degreeIdTemplateRequest,
    {
      headers: {
        Authorization: "Bearer " + access_token,
      },
    }
  );

  const degreeTemplateId = degreeResponse.data.id;

  // Create Presentation Request Template for EmploymentVerification
  const employmentIdTemplateRequest = {
    name: "Employment Verification",
    reason: "We need this to verify you work at a FlexLand company",
    credentialType: "FlexLandEmploymentCredential",
    credentialIssuers: [process.env.ORG_DID],
  };

  const employmentResponse = await axios.post(
    process.env.FLEXHUB_URL + "/presentations/templates",
    employmentIdTemplateRequest,
    {
      headers: {
        Authorization: "Bearer " + access_token,
      },
    }
  );

  const employmentTemplateId = employmentResponse.data.id;

  // Create Presentation Request Template for Insurance
  const insuranceTemplateRequest = {
    name: "Insurance Coverage Verification",
    reason: "We need this to verify you're covered by insurance",
    credentialType: "FlexLandInsuranceCredential",
    credentialIssuers: [process.env.ORG_DID],
  };

  const insuranceResponse = await axios.post(
    process.env.FLEXHUB_URL + "/presentations/templates",
    insuranceTemplateRequest,
    {
      headers: {
        Authorization: "Bearer " + access_token,
      },
    }
  );

  const insuranceTemplateId = insuranceResponse.data.id;

  const prt = new PresentationRequestTemplates({
    didAuth: didAuthTemplateId,
    city: cityTemplateId,
    degree: degreeTemplateId,
    employment: employmentTemplateId,
    insurance: insuranceTemplateId,
  });
  await prt.save();

  console.log("Backend Initialized");
}
