const config = {
  type: "service_account",
  project_id: "thelittlevoice-efc26",
  private_key_id: "fcc6dd43c35e7d6c231e12b3e42aae3ad063d0ab",
  private_key: process.env.PRIVATE_KEY.replace(/\\n/g, "\n"),
  client_email:
    "firebase-adminsdk-z20r1@thelittlevoice-efc26.iam.gserviceaccount.com",
  client_id: "106371725342753343318",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-z20r1%40thelittlevoice-efc26.iam.gserviceaccount.com",
};

module.exports = config;
