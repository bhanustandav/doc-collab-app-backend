import {ObjectID} from 'mongodb'

const Promise = require("bluebird");
import Workflow from "./workflow.interface";
import EmployeeClass from "../employee/employee.class";
import StateClass from "./state/state.class";
import DocumentClass from "../document/document.class";
import {WorkflowDBModel} from './workflow.model'
import {WorkflowRepository} from './workflow.db'
import {DocumentRepository} from "../document/document.db";

export default class WorkflowClass implements Workflow {

  assignee: EmployeeClass;
  createdDate: Date;
  document: DocumentClass;
  modifiedDate: Date;
  reporter: EmployeeClass;
  state: StateClass;
  stateData: Array<any>;

  constructor(document: DocumentClass, assignee: EmployeeClass, reporter: EmployeeClass, state: StateClass, createdDate: Date, modifiedDate: Date) {
    this.assignee = assignee;
    this.createdDate = createdDate;
    this.document = document;
    this.modifiedDate = modifiedDate;
    this.reporter = reporter;
    this.state = state;
    this.stateData = [
      {
        "_id": "5dee1eabf2880e28d18f18cc",
        "label": "DRAFT_REQUEST"
      },
      {
        "_id": "5dee1fa5f2880e28d18f18cd",
        "label": "DRAFT_IN_PROGRESS"
      },
      {
        "_id": "5dee20b453f85841aa07aaa7",
        "label": "NEW_DRAFT"
      },
      {
        "_id": "5dee20b453f85841aa07aaa8",
        "label": "SENT_FOR_REVIEW"
      },
      {
        "_id": "5dee20b453f85841aa07aaa9",
        "label": "REVIEW_IN_PROGRESS"
      },
      {
        "_id": "5dee20b453f85841aa07aaaa",
        "label": "REVIEW_COMPLETED"
      },
      {
        "_id": "5dee20b453f85841aa07aaab",
        "label": "SENT_FOR_APPROVE"
      },
      {
        "_id": "5dee20b453f85841aa07aaac",
        "label": "APPROVAL_IN_PROGRESS"
      },
      {
        "_id": "5dee20b453f85841aa07aaad",
        "label": "APPROVAL_COMPLETED"
      },
      {
        "_id": "5dee20b453f85841aa07aaae",
        "label": "SENT_FOR_EXECUTION"
      },
      {
        "_id": "5dee20b453f85841aa07aaaf",
        "label": "EXECUTION_IN_PROGRESS"
      },
      {
        "_id": "5dee20b753f85841aa07aab0",
        "label": "EXECUTION_COMPLETED"
      }
    ]
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
    return workflowRepository.find({}, {}, {})
      .exec()
      .then(events => events)
  }

  getWorkflowEventsByReporter1 = (reporter: any) => {
    const workflowRepository = new WorkflowRepository()
    const aggregatations: any[] = [
      {$sort: {"createdDate": -1}},
      {$match: {reporter: reporter}},
      {
        $group: {
          _id: "$documentId", 'assignee': {$first: '$assignee'},
          'reporter': {$first: '$reporter'},
          'stateId': {$first: '$stateId'}, 'createdDate': {$first: '$createdDate'}
        }
      }
    ]
    return workflowRepository.aggregate(aggregatations).then(events => {
      console.log("events")
      return events
    })

  }

  getWorkflowEventsByReporter = (reporter: any) => {
    const workflowRepository = new WorkflowRepository()
    const aggregatations1: any[] = [
      {$sort: {"createdDate": -1}},
      {$match: {reporter: reporter}},
      {
        $group: {
          _id: "$documentId", 'assignee': {$first: '$assignee'},
          'reporter': {$first: '$reporter'},
          'stateId': {$first: '$stateId'}, 'createdDate': {$first: '$createdDate'}
        }
      }
    ]

    const aggregatations: any[] = [
      {$sort: {"createdDate": -1}},
      {$match: {reporter: reporter}},
      {
        $group: {
          _id: "$documentId", 'assignee': {$first: '$assignee'},
          'reporter': {$first: '$reporter'},
          'stateId': {$first: '$stateId'}, 'createdDate': {$first: '$createdDate'}
        }
      },
      {
        "$lookup": {
          "from": "workflowdbmodels",
          "localField": "_id",
          "foreignField": "documentId",
          "as": "document"
        }
      },
      {$project: {'document': 1, _id: 0}},
      {
        $unwind:
          {
            path: "$document"
          }
      },
      {$sort: {"document.createdDate": -1}},
      {
        $group: {
          _id: "$document.documentId", 'assignee': {$first: '$document.assignee'},
          'reporter': {$first: '$document.reporter'},
          'stateId': {$first: '$document.stateId'}, 'createdDate': {$first: '$document.createdDate'}
        }
      },

    ]

    const documentRepository = new DocumentRepository();
    const aggregations = workflowRepository.aggregate(aggregatations).then(aggregations => aggregations)

    return aggregations.then(events => {
      console.log("events")
      console.log(events)

      const result: any = []

      return Promise.mapSeries(events, (event: any) => {
        return documentRepository.findById(new ObjectID(event._id), (obj) => obj)
      }).then((documents: any) => {
        return events.map(eventData => {
          console.log("documents")
          console.log(documents)
          console.log(eventData)
          let data: any = {}
          data.reporter = eventData.reporter
          data.assignee = eventData.assignee
          data.document = documents.find((doc: any) => doc._id.toString() === eventData._id)
          data.state = this.stateData.find(state => state._id === eventData.stateId)
          return data
        })
      }).catch((error: any) => error)
    })
  }
}
