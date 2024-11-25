const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const { google } = require("googleapis");
const fs = require("fs");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Load Google Sheets credentials
const credentials = JSON.parse(fs.readFileSync("google-service-account.json"));
const { client_email, private_key } = credentials;

// Google Sheets setup
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
const auth = new google.auth.JWT(client_email, null, private_key, SCOPES);
const sheets = google.sheets({ version: "v4", auth });

// Your Google Sheet ID and range
const SPREADSHEET_ID = "your_google_sheet_id"; // Replace with your sheet ID
const RANGE = "Sheet1!A1:N1"; // Replace with your range

// Google reCAPTCHA secret key
const RECAPTCHA_SECRET_KEY = "6Lexv4cqAAAAAAK_H1KnPlcxNjShbFsZJaP8E5gB";

// API to handle form submission
app.post("/submit", async (req, res) => {
  const { childFormData, parentFormData, captchaToken } = req.body;

  // Validate reCAPTCHA
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

  // Validate form fields (basic server-side validation)
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
      valueInputOption: "RAW",
      resource: {
        values: [rowData],
      },
    });

    res.status(200).json({ message: "Form submitted successfully" });
  } catch (err) {
    console.error("Error appending data to Google Sheets:", err);
    res.status(500).json({ message: "Error saving data to Google Sheets" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
