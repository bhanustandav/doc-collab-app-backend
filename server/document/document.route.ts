import express from 'express';
import DocumentCtrl from './document.controller';

const multer = require('multer');
const documentCtrl = new DocumentCtrl()
// SET STORAGE
const storage = multer.diskStorage({
  destination(req: any, file: any, cb: (arg0: null, arg1: string) => void) {
    cb(null, 'uploads');
  },
  filename(req: { body: { filename: any; }; }, file: any, cb: (arg0: null, arg1: string) => void) {
    cb(null, `${req.body.filename}`);
  }
});

const upload = multer({ storage });

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/documents - Get list of documents */
  .get(documentCtrl.listDocuments)

  /** POST /api/documents - Create new document */
  .post(documentCtrl.create);


router.route('/upload')
/** GET /api/documents/:documentId - Get document */
  .post(upload.single('content'), documentCtrl.uploadDocument);

router.route('/clientId/:clientId')
/** GET /api/documents/:documentId - Get document */
  .get( documentCtrl.loadDocumentsByClient);

router.route('/:documentId')
  /** GET /api/documents/:documentId - Get document */
  .get(documentCtrl.get)

  /** PUT /api/documents/:documentId - Update document */
  .put(documentCtrl.update)

  /** DELETE /api/documents/:documentId - Delete document */
  .delete(documentCtrl.remove);

/** Load document when API with documentId route parameter is hit */
router.param('documentId', documentCtrl.load);

module.exports = router;
