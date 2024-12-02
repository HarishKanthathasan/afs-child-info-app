const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { google } = require('googleapis');
const fs = require('fs');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Load service account key
const SERVICE_ACCOUNT_FILE = 'afchelios-9ea4a470a859.json';
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const SPREADSHEET_ID = '1RdWnfpfY2A42DNxG-_D1Djany77_yMZmwiEgj2OYOOQ';
const RANGE = 'Sheet1!A2:P500';

const authorize = (callback) => {
  const auth = new google.auth.GoogleAuth({
    keyFile: SERVICE_ACCOUNT_FILE,
    scopes: SCOPES,
  });

  auth.getClient().then((authClient) => {
    callback(authClient);
  }).catch((err) => {
    console.error('Error creating auth client:', err);
  });
};

const appendData = (auth, data) => {
  const sheets = google.sheets({ version: 'v4', auth });
  const resource = {
    values: [data],
  };

  sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: RANGE,
    valueInputOption: 'USER_ENTERED',
    resource,
  }, (err, result) => {
    if (err) {
      console.error('Error appending data to Google Sheets:', err.message);
    } else {
      console.log(`${result.data.updates.updatedCells} cells appended.`);
    }
  });
};

// API to handle form submission
app.post('/submit', (req, res) => {
  const { childFormData, parentFormData } = req.body;

  // Validate form fields
  if (
    !childFormData.childName ||
    !parentFormData.parentName ||
    !childFormData.dob ||
    !parentFormData.nic
  ) {
    return res.status(400).json({ message: 'Form validation failed' });
  }

  const rowData = [
    childFormData.childName,
    childFormData.dob,
    childFormData.eighteenthBirthday, 
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
  

  authorize((auth) => {
    appendData(auth, rowData);
    res.send('Data submitted successfully');
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
