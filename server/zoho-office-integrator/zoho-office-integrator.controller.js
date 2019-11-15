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
  console.log('form ', req.form);

  // eslint-disable-next-line consistent-return
  request.post({ url: 'https://writer.zoho.com/writer/v1/officeapi/document?apikey=19232f09d016ec7d0cba5e057d7dd652', formData: inputData }, (err, httpResponse, body) => {
    if (err) {
      return console.error('upload failed:', err);
    }
    console.log('Upload successful!  Server responded with:', body);
    return res.send(body);
  });
}

module.exports = { create };
