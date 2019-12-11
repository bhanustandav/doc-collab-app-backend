import express from 'express';
import WorkflowController from './workflow.controller'
import {get} from "mongoose";

const router = express.Router(); // eslint-disable-line new-cap
const workflowController = new WorkflowController();

router.get('/health-check', (req: any, res: { send: (arg0: string) => void; }) =>
  res.send('OK')
);

router.route('/')

  /** POST /api/users - Create new user */
  .post(workflowController.create)
  .get(workflowController.get);

module.exports = router;
