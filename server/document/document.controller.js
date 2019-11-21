const Document = require('./document.model');

// eslint-disable-next-line consistent-return
function uploadDocument(req, res, next) {
  // console.log(JSON.stringify(req.file))
  const file = req.file;
  console.log('#########');
  console.log(file);
  console.log(req.body);

  const query = { 'fileInfo.document_info.document_id': req.body.id };
  const data = { fileMetada: req.file };


  // eslint-disable-next-line no-unused-vars
  Document.updateDocument(query, data).then(savedDocument => res.send('Document saved  successfully'))
    .catch(e => next(e));

  // return res.json(Document.updateDocument(query, data));
}


function loadDocumentsByClient(req, res, next, id) {
  console.log('req.query.pageNum ', req.query.pageNum);
  console.log('req.query.pageSize ', req.query.pageSize);

  Document.getDocumentsByClientId(id, parseInt(req.query.pageNum), parseInt(req.query.pageSize))
    .then((documents) => {
      req.documents = documents; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Load document and append to req.
 */
function load(req, res, next, id) {
  Document.get(id)
    .then((document) => {
      req.document = document; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get document
 * @returns {Document}
 */
function get(req, res) {
  return res.json(req.document);
}

function getDocumentsByClient(req, res) {
  return res.json(req.documents);
}

/**
 * Create new document
 * @property {string} req.body.username - The username of document.
 * @property {string} req.body.mobileNumber - The mobileNumber of document.
 * @returns {Document}
 */
function create(req, res, next) {
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
function update(req, res, next) {
  const document = req.document;
  document.clientId = req.body.clientId;
  document.documentName = req.body.documentName;
  document.documentFormat = req.body.documentFormat;
  document.document = req.body.document;

  document.save()
    .then(savedDocument => res.json(savedDocument))
    .catch(e => next(e));
}

/**
 * Get document list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {Document[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Document.list({ limit, skip })
    .then(documents => res.json(documents))
    .catch(e => next(e));
}

/**
 * Delete document.
 * @returns {Document}
 */
function remove(req, res, next) {
  const document = req.document;
  document.remove()
    .then(deletedDocument => res.json(deletedDocument))
    .catch(e => next(e));
}

// eslint-disable-next-line max-len
module.exports = { load, get, create, update, list, remove, getDocumentsByClient, loadDocumentsByClient, uploadDocument };
