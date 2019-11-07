const express = require('express');
// eslint-disable-next-line no-unused-vars
const validate = require('express-validation');
// eslint-disable-next-line import/newline-after-import
const multer = require('multer');
const upload = multer();
const paramValidation = require('../../config/param-validation');
const officeintegratorCtrl = require('./zoho-office-integrator.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** POST /api/users - Create new user */
  .post(officeintegratorCtrl.create);

// router.route('/:userId')
//   /** GET /api/users/:userId - Get user */
//   .get(officeintegratorCtrl.get)
//
//   /** PUT /api/users/:userId - Update user */
//   .put(validate(paramValidation.updateUser), officeintegratorCtrl.update)
//
//   /** DELETE /api/users/:userId - Delete user */
//   .delete(officeintegratorCtrl.remove);
//
// /** Load user when API with userId route parameter is hit */
// router.param('userId', officeintegratorCtrl.load);

module.exports = router;
