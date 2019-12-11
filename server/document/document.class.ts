import {DocumentDBModel as Document} from "./document.model";
import {DocumentRepository} from './document.db';
import * as mongoose from "mongoose";

export default class DocumentClass {
  id: string;
  fileInfo: object;
  metaData: object;
  zohoDocumentResponse: object


  constructor(id: string, fileInfo: object, metaData: object, zohoDocumentResponse: object) {
    this.id = id;
    this.fileInfo = fileInfo;
    this.metaData = metaData;
    this.zohoDocumentResponse = zohoDocumentResponse;
  }

  loadDocumentsForClient(data: any) {
    const result: any = {}
    const skips = data.pageSize * (data.pageNum - 1);
    const documentRepository = new DocumentRepository()
    return documentRepository.find({ 'fileInfo.user_info.user_id': data.id },{},{})
      .sort({ createdAt: -1 })
      .skip(skips).limit(data.pageSize)
      .exec()
      .then((documents: any) => {
        result.data = documents
        console.log("#" + documents)
        return documentRepository.find({},{},{})
          .count()
          .exec()
      }).then((data: any) => {
        result.length = data
        return result
      })
       .catch((e: any) => (e));
  }
}
