const express = require('express');
const documentRoutes = require('./server/document/document.route');
const userRoutes = require('./server/user/user.route');
const authRoutes = require('./server/auth/auth.route');

const router = express.Router(); // eslint-disable-line new-cap

// TODO: use glob to match *.route files

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

router.use('/documents', documentRoutes);

// mount user routes at /users
router.use('/users', userRoutes);

// mount auth routes at /auth
router.use('/auth', authRoutes);

module.exports = router;
