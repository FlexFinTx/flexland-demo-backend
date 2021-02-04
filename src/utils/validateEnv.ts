const requiredEnvVars = [
  "PORT",
  "DB_CONNECTION_STRING",
  "CLIENT_ID",
  "CLIENT_SECRET",
  "AUDIENCE",
  "GRANT_TYPE",
  "ORG_DID",
  "FLEXHUB_URL",
  "AUTH_URL",
];

const validateEnv = () => {
  const missingEnvVars = requiredEnvVars.filter(
    (env) => !(typeof process.env[env] !== "undefined")
  );

  if (missingEnvVars.length > 0) {
    throw new Error(
      `[ERROR] Required env variables are missing: [ ${missingEnvVars.join(
        ", "
      )} ]`
    );
  }
};

export default validateEnv;
