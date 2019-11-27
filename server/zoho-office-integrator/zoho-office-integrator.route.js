const express = require('express');
// eslint-disable-next-line import/newline-after-import
const multer = require('multer');
const upload = multer();
const officeintegratorCtrl = require('./zoho-office-integrator.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/create')
  /** POST /api/users - Create new user */
  .post(upload.none(), officeintegratorCtrl.create);

router.route('/edit')
/** POST /api/users - Create new user */
  .post(upload.none(), officeintegratorCtrl.edit);

router.route('/delete')
/** POST /api/users - Create new user */
  .post(upload.none(), officeintegratorCtrl.deleteDocument);


module.exports = router;
