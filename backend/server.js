const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { google } = require('googleapis');
require('dotenv').config();

// Initialize Express app
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Google Sheets API setup
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });
const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;

// Endpoint to submit form data
app.post('/submit', async (req, res) => {
  const {
    childName,
    dob,
    placeOfBirth,
    eighteenthBirthday,
    birthCertificateNumber,
    dateOfIssue,
    nationality,
    address,
    school,
    guardianName,
    nic,
    contact,
    guardianAddress,
    email,
    occupation,
    relationship,
  } = req.body;

  // Validation for required fields
  if (
    !childName ||
    !dob ||
    !placeOfBirth ||
    !eighteenthBirthday ||
    !birthCertificateNumber ||
    !nationality ||
    !address ||
    !school ||
    !guardianName ||
    !nic ||
    !contact ||
    !guardianAddress ||
    !email ||
    !occupation ||
    !relationship
  ) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Append data to Google Sheets
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Sheet1!A1:Q1', // Adjust range as needed
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [
          [
            childName,
            dob,
            placeOfBirth,
            eighteenthBirthday,
            birthCertificateNumber,
            dateOfIssue,
            nationality,
            address,
            school,
            guardianName,
            nic,
            contact,
            guardianAddress,
            email,
            occupation,
            relationship,
          ],
        ],
      },
    });

    res.status(200).json({
      message: 'Data submitted successfully',
      spreadsheetResponse: response.data,
    });
  } catch (err) {
    console.error('Error writing to Google Sheets:', err);
    res.status(500).json({ error: 'Failed to write data to Google Sheets' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
