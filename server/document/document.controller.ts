import {DocumentDBModel as Document} from './document.model';
import {DocumentRepository} from './document.db';
import DocumentClass from './document.class';
import Promise from "bluebird";

export default class DocumentCtrl {
  // eslint-disable-next-line consistent-return
  uploadDocument(req: any, res:  any, next: any) {
    // console.log(JSON.stringify(req.file))
    const file = req.file;
    console.log('#########');
    console.log(file);
    console.log(req.body);

    const query = { 'fileInfo.document_info.document_id': req.body.id };
    const data = { fileMetada: req.file };

    const documentRepository = new DocumentRepository();
    documentRepository.findOneAndUpdate(query, data).then((document: any) => {
      if (document) {
        console.log(document)
        // return document;

        return res.send('Document saved  successfully')
      }
      console.log("error")
      // const err = new APIError('No such document exists!', httpStatus.NOT_FOUND);
      return Promise.reject({});
    });

    // const document = new Document();
    // // eslint-disable-next-line no-unused-vars
    // document.updateDocument(query, data).then(() => res.send('Document saved  successfully'))
    //   .catch((e: any) => next(e));

    // return this.findOneAndUpdate(query, data, { upsert: false }).then((document: any) => {
    //   if (document) {
    //     return document;
    //   }
    //   // const err = new APIError('No such document exists!', httpStatus.NOT_FOUND);
    //   return Promise.reject({});
    // });
  }

   loadDocumentsByClient(req: any, res: any, next: any) {
    console.log('req.query.pageNum ', req.query.pageNum);
    console.log('req.query.pageSize ', req.query.pageSize);

    // eslint-disable-next-line no-param-reassign
    res.documents = {};
    let data = {
      id: req.params.clientId,
      pageNum: req.query.pageNum,
      pageSize: req.query.pageSize
    }

    console.log("data" + JSON.stringify(data))
    try{
      const documentClass  = new DocumentClass('',{},{},{})
      return documentClass.loadDocumentsForClient(data).then(result => res.json(result));
    }catch (e) {
      console.log(e)
    }
  }

  /**
   * Load document and append to req.
   */
   load(req: any, res: any, next: { (): void; (arg0: any): void; }, id: any) {
    const document = new Document();
    document.get(id)
      .then((document: any) => {
        req.document = document; // eslint-disable-line no-param-reassign
        return next();
      })
      .catch((e: any) => next(e));
  }

  /**
   * Get document
   * @returns {Document}
   */
   get(req: any, res: any) {
    return res.json(req.document);
  }

   getDocumentsByClient(req: any, res: any) {
    return res.json(req.documents);
  }

  /**
   * Create new document
   * @property {string} req.body.username - The username of document.
   * @property {string} req.body.mobileNumber - The mobileNumber of document.
   * @returns {Document}
   */
   create(req: { body: { fileInfo: any; zohoDocumentResponse: any; }; }, res: { json: (arg0: import("mongoose").Document) => void; }, next: (arg0: any) => void) {
    const document = new Document({
      fileInfo: req.body.fileInfo,
      zohoDocumentResponse: req.body.zohoDocumentResponse
    });

    document.save()
      .then(savedDocument => res.json(savedDocument))
      .catch(e => next(e));
  }

  /**
   * Update existing document
   * @property {string} req.body.username - The username of document.
   * @property {string} req.body.mobileNumber - The mobileNumber of document.
   * @returns {Document}
   */
   update(req: any, res: any, next: any) {
    const document = req.document;
    document.clientId = req.body.clientId;
    document.documentName = req.body.documentName;
    document.documentFormat = req.body.documentFormat;
    document.document = req.body.document;

    document.save()
      .then((savedDocument: any) => res.json(savedDocument))
      .catch((e: any) => next(e));
  }

  /**
   * Get document list.
   * @property {number} req.query.skip - Number of users to be skipped.
   * @property {number} req.query.limit - Limit number of users to be returned.
   * @returns {Document[]}
   */
   listDocuments(req: any, res: any, next: any) {
     try {
       const { limit = 50, skip = 0 } = req.query;
       const document = new Document();
       const documentRepository = new DocumentRepository();
       documentRepository.find({},{},() => {})
         .sort({ createdAt: -1 })
         .skip(+skip)
         .limit(+limit)
         .exec()
         .then((documents: any) => res.json(documents))
     }catch (e) {
       console.log(e)
     }
    // document.list({ limit, skip })
    //   .then((documents: any) => res.json(documents))
    //   .catch((e: any) => next(e));
  }

  /**
   * Delete document.
   * @returns {Document}
   */
   remove(req: any, res: any, next: any) {
    const document = req.document;
    document.remove()
      .then((deletedDocument: any) => res.json(deletedDocument))
      .catch((e: any) => next(e));
  }
}



// eslint-disable-next-line max-len
// module.exports = { load, get, create, update, list, remove, getDocumentsByClient, loadDocumentsByClient, uploadDocument };
