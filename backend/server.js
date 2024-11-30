const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { google } = require("googleapis");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Load Google Sheets credentials
const credentials = {
  type: "service_account",
  project_id: process.env.GOOGLE_PROJECT_ID,
  private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
  private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email: process.env.GOOGLE_CLIENT_EMAIL,
  client_id: process.env.GOOGLE_CLIENT_ID,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: `https://www.googleapis.com/robot/v1/metadata/x509/${process.env.GOOGLE_CLIENT_EMAIL.replace('@', '%40')}`,
};

// Google Sheets setup
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
const auth = new google.auth.JWT(
  credentials.client_email,
  null,
  credentials.private_key,
  SCOPES
);
const sheets = google.sheets({ version: "v4", auth });

// Google Sheet ID and range
const SPREADSHEET_ID = process.env.SPREADSHEET_ID;
const RANGE = "Sheet1!A1:N1";

// API to handle form submission
app.post("/submit", async (req, res) => {
  const { childFormData, parentFormData } = req.body;

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
    res.status(200).json({ message: "Form submitted successfully!" });
  } catch (err) {
    const googleError = err.response?.data?.error?.message || err.message;
    console.error("Error saving data to Google Sheets:", googleError);
    res.status(500).json({ message: `Google Sheets Error: ${googleError}` });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
