const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { google } = require("googleapis");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Load Google Sheets credentials
const credentials = {
  type: "service_account",
  project_id: "routesonar-289013",
  private_key_id: "a4f8421db0582f36ce9e6c743c78dc5bdb7c9c16",
  private_key: `-----BEGIN PRIVATE KEY-----\nMIIEvgIBADAN...PRIVATE_KEY_DATA...==\n-----END PRIVATE KEY-----\n`,
  client_email: "afchelios@routesonar-289013.iam.gserviceaccount.com",
  client_id: "112752145344337536508",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/afchelios%40routesonar-289013.iam.gserviceaccount.com",
};

// Google Sheets setup
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
const auth = new google.auth.JWT(credentials.client_email, null, credentials.private_key, SCOPES);
const sheets = google.sheets({ version: "v4", auth });

//Google Sheet ID and range
const SPREADSHEET_ID = " "; // Need to add Google Sheet ID
const RANGE = "Sheet1!A1:N1"; // specific sheet range

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "../build")));

// API to handle form submission
app.post("/submit", async (req, res) => {
  const { childFormData, parentFormData /*, captchaToken */ } = req.body;

  // Temporarily skip reCAPTCHA validation for testing
  /*
  try {
    const captchaVerification = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify`,
      null,
      {
        params: {
          secret: RECAPTCHA_SECRET_KEY,
          response: captchaToken,
        },
      }
    );

    if (!captchaVerification.data.success) {
      return res.status(400).json({ message: "reCAPTCHA validation failed" });
    }
  } catch (err) {
    console.error("Error verifying reCAPTCHA:", err);
    return res.status(500).json({ message: "reCAPTCHA validation error" });
  }
  */

  // Validate form fields
  if (
    !childFormData.childName ||
    !parentFormData.parentName ||
    !childFormData.dob ||
    !parentFormData.nic
  ) {
    return res.status(400).json({ message: "Form validation failed" });
  }

  // Prepare data for Google Sheets
  const rowData = [
    childFormData.childName,
    childFormData.dob,
    childFormData.placeOfBirth,
    childFormData.birthCertificateNumber,
    childFormData.dateOfIssue,
    childFormData.nationality,
    childFormData.address,
    childFormData.school,
    parentFormData.parentName,
    parentFormData.nic,
    parentFormData.contact,
    parentFormData.parentAddress,
    parentFormData.email,
    parentFormData.occupation,
    parentFormData.relationship,
  ];

  // Append data to Google Sheets
  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: RANGE,
      valueInputOption: "USER_ENTERED",
      resource: {
        values: [rowData],
      },
    });

    console.log("Google Sheets Response:", response.data);
    res.status(200).json({ message: "Form submitted successfully!" });
  } catch (err) {
    const googleError = err.response?.data?.error?.message || err.message;

    console.error("Error saving data to Google Sheets:", googleError);
    res.status(500).json({ message: `Google Sheets Error: ${googleError}` });
  }
});

// Catch-all handler for serving React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
