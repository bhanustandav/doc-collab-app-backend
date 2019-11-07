const express = require('express');
const officeintegratorCtrl = require('./zoho-office-integrator.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** POST /api/users - Create new user */
  .post(officeintegratorCtrl.create);

module.exports = router;
