const FormData = require('form-data');
// eslint-disable-next-line no-unused-vars
const fs = require('fs');
const request = require('request');

// eslint-disable-next-line no-unused-vars
function create(req, res, next) {
  // const user = new User({
  //   username: req.body.username,
  //   mobileNumber: req.body.mobileNumber
  // });
  //
  // user.save()
  //   .then(savedUser => res.json(savedUser))
  //   .catch(e => next(e));

  const inputData = JSON.parse(req.body);
  console.log('form data', inputData);


  const formData = new FormData();

  // eslint-disable-next-line guard-for-in,no-restricted-syntax
  for (const key in inputData) {
    formData.append(key, formData[key]);
  }

  // eslint-disable-next-line consistent-return
  request.post({ url: 'https://writer.zoho.com/writer/v1/officeapi/document?apikey=19232f09d016ec7d0cba5e057d7dd652', formData }, (err, httpResponse, body) => {
    if (err) {
      return console.error('upload failed:', err);
    }
    console.log('Upload successful!  Server responded with:', body);
    return res.send(body);
  });
}


// eslint-disable-next-line no-unused-vars
function createtest(req, res, next) {
  return res.send({ success: true });
}

module.exports = { create, createtest };
