import express from 'express';
const documentRoutes = require('./server/document/document.route');
const workflowRoutes = require('./server/workflow/workflow.route');
const officeIntegratorRoutes = require('./server/zoho-office-integrator/zoho-office-integrator.route');

const router = express.Router(); // eslint-disable-line new-cap

// TODO: use glob to match *.route files

/** GET /health-check - Check service health */
router.get('/health-check', (req: any, res: { send: (arg0: string) => void; }) =>
  res.send('OK')
);

router.use('/documents', documentRoutes);

router.use('/workflow', workflowRoutes);

router.use('/officeIntegrator/files', officeIntegratorRoutes);

module.exports = router;
