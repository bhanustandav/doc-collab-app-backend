import { Document, Schema, Model, model} from 'mongoose';
import State from "./state/state.class";
import employee from '../employee/employee.class'
import DocumentCLM from "../document/document.class";

export default interface WorkflowInterface {
  document: DocumentCLM,
  state: State,
  assignee: employee,
  reporter: employee,
  createdDate: Date,
  modifiedDate: Date
}
