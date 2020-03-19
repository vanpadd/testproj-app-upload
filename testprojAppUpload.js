require('isomorphic-fetch');
const fs = require('fs');

let newURL = '';

const appId = process.argv[2];
const projectId = process.argv[3];
const apiKey = process.argv[4];
const newFileName = process.argv[5];
const path = process.argv[6];

const appSize = fs.statSync(path).size;
let readStream = fs.createReadStream(path);
const apiUrl = 'https://api.testproject.io/';

const uploadUrlData = {
  headers: {
    Authorization: apiKey,
  },
  method: 'GET',
};

const uploadAPPData = {
  headers: {
    'cache-control': 'no-cache',
    'Content-length': appSize,
  },
  method: 'PUT',
  body: readStream,
};

// Get an upload URL for an application
fetch(
  apiUrl + `v2/projects/${projectId}/applications/${appId}/file/upload-link`,
  uploadUrlData,
)
  .then(result => {
    console.log('--> Got an upload URL for an application');
    return result.json();
  })
  .then(data => {
    newURL = data.url;
    uploadAPP();
  })
  .catch(error => {
    console.log(error);
  });

// Upload the new APP to AWS S3
async function uploadAPP() {
  fetch(newURL, uploadAPPData)
    .then(result => {
      console.log('--> Uploaded the new APP to AWS S3');
      confirmNewAPP();
    })
    .catch(error => {
      console.log(error);
    });
}

// Confirm the new file upload
async function confirmNewAPP() {
  const data = {
    headers: {
      accept: 'application/json',
      Authorization: apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      fileName: newFileName,
    }),
    method: 'POST',
  };

  fetch(apiUrl + `v2/projects/${projectId}/applications/${appId}/file`, data)
    .then(result => {
      console.log('--> Confirmed the new file upload');
    })
    .catch(error => {
      console.log(error);
    });
}
