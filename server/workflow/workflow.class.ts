import Workflow from "./workflow.interface";
import EmployeeClass from "../employee/employee.class";
import StateClass from "./state/state.class";
import DocumentClass from "../document/document.class";
import {WorkflowDBModel} from './workflow.model'
import {WorkflowRepository} from './workflow.db'

export default class WorkflowClass implements Workflow{

  assignee: EmployeeClass;
  createdDate: Date;
  document: DocumentClass;
  modifiedDate: Date;
  reporter: EmployeeClass;
  state: StateClass;

  constructor( document: DocumentClass, assignee: EmployeeClass, reporter: EmployeeClass, state: StateClass, createdDate: Date, modifiedDate: Date) {
    this.assignee = assignee;
    this.createdDate = createdDate;
    this.document = document;
    this.modifiedDate = modifiedDate;
    this.reporter = reporter;
    this.state = state;
  }

  addWorkFlowEvent = (workflow: WorkflowClass) => {
    console.log(workflow)
    const model = new WorkflowDBModel
    model.documentId = workflow.document.id
    model.assignee = workflow.assignee.id.toString()
    model.reporter = workflow.reporter.id.toString()
    model.stateId = workflow.state.id
    model.createdDate = workflow.createdDate
    model.modifiedDate = workflow.modifiedDate

    return model.save()
  }

  getWorkflowEvents = () => {
    const workflowRepository = new WorkflowRepository()
    return workflowRepository.find({},{},{})
      .exec()
      .then(events => events)
  }
}
