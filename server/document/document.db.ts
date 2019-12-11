import {RepositoryBase} from "../Generic/RepositoryBase.class";
import {DocumentDBModel, DocumentSchemaInterface} from './document.model'

export class DocumentRepository extends RepositoryBase<DocumentSchemaInterface> {
  constructor() {
    super(DocumentDBModel);
  }
}
