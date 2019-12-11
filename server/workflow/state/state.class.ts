import State, {WorkflowProperties} from './state.interface'

export default class StateClass implements State{
  id: string;
  label: WorkflowProperties;


  constructor(id: string, label: WorkflowProperties) {
    this.id = id;
    this.label = label;
  }
}
