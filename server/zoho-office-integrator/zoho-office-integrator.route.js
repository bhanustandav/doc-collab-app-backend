const express = require('express');
// eslint-disable-next-line import/newline-after-import
const multer = require('multer');
const upload = multer();
const officeintegratorCtrl = require('./zoho-office-integrator.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** POST /api/users - Create new user */
  .post(upload.none(), officeintegratorCtrl.create);


router.route('test')
/** POST /api/users - Create new user */
  .post(officeintegratorCtrl.createtest);


module.exports = router;
