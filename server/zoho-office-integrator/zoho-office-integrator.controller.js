// eslint-disable-next-line no-unused-vars
const fs = require('fs');
const request = require('request');

// eslint-disable-next-line no-unused-vars
function create(req, res, next) {
  const inputData = req.body;
  const formData = {};

  // eslint-disable-next-line guard-for-in,no-restricted-syntax
  for (const key in inputData) {
    formData[key.toString()] = inputData[key];
  }


  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    url: 'https://writer.zoho.com/writer/v1/officeapi/document?apikey=19232f09d016ec7d0cba5e057d7dd652',
    formData
  };

  request(options, (err, httpResponse, body) => {
    if (err) console.log(err);
    console.log(body);
    return res.send(body);
  });
}

// eslint-disable-next-line no-unused-vars
function edit(req, res, next) {
  const inputData = req.body;
  const formData = {};

  // eslint-disable-next-line guard-for-in,no-restricted-syntax
  for (const key in inputData) {
    formData[key.toString()] = inputData[key];
  }


  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    url: 'https://writer.zoho.com/writer/v1/officeapi/document?apikey=19232f09d016ec7d0cba5e057d7dd652',
    formData
  };

  request(options, (err, httpResponse, body) => {
    if (err) console.log(err);
    console.log(body);
    return res.send(body);
  });
}

module.exports = { create, edit };
