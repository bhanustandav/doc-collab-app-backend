const request = require('request');
// eslint-disable-next-line no-unused-vars
const fs = require('fs');

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

  const inputData = req.body;
  console.log('form data', inputData);

  // eslint-disable-next-line consistent-return
  request.post({ url: 'https://writer.zoho.com/writer/v1/officeapi/document?apikey=79bcc142bb724eb0a8e22ab5a63d4bd8', formData: inputData }, (err, httpResponse, body) => {
    if (err) {
      return console.error('upload failed:', err);
    }
    console.log('Upload successful!  Server responded with:', body);
    return res.send(body);
  });
}

module.exports = { create };
