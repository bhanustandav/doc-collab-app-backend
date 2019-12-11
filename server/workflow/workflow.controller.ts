import Workflow from './workflow.class'
import EmployeeClass from "../employee/employee.class";
import StateClass from "./state/state.class";
import DocumentClass from "../document/document.class";
import {WorkflowProperties} from "./state/state.interface";

export default class WorkflowController {
   create = (req: any, res: any) => {
    const document = new DocumentClass(req.body.documentId, {}, {}, {})
    const assignee = new EmployeeClass(req.body.assignee, '', '', '')
    const reporter = new EmployeeClass(req.body.reporter, '', '', '')
    const state = new StateClass(req.body.stateId, WorkflowProperties.NULL)
    const createdDate = req.body.createdDate
    const modifiedDate = req.body.createdDate

    const WorkflowObj = new Workflow(document, assignee, reporter, state, createdDate, modifiedDate);
    WorkflowObj.addWorkFlowEvent(WorkflowObj)

     return res.send(WorkflowObj)
  }

  get = (req: any, res: any) => {
    const document = new DocumentClass('', {}, {}, {})
    const assignee = new EmployeeClass(0, '', '', '')
    const reporter = new EmployeeClass(0, '', '', '')
    const state = new StateClass(req.body.stateId, WorkflowProperties.NULL)
    const createdDate = req.body.createdDate
    const modifiedDate = req.body.createdDate
    const WorkflowObj = new Workflow(document, assignee, reporter, state,createdDate, modifiedDate);
    return WorkflowObj.getWorkflowEvents().then(events => res.json(events))
  }
}
