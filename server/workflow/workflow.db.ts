import {RepositoryBase} from "../Generic/RepositoryBase.class";
import {WorkflowDBModel, WorkflowSchemaInterface} from './workflow.model'

export class WorkflowRepository extends RepositoryBase<WorkflowSchemaInterface> {
  constructor() {
    super(WorkflowDBModel);
  }
}
