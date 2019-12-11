import Promise from 'bluebird';
import mongoose from 'mongoose';
// import httpStatus from 'http-status';
// import APIError from '../helpers/APIError';


export interface DocumentSchemaInterface extends mongoose.Document{
  fileInfo: object
  metaData: object
  zohoDocumentResponse: object
  updateDocument(query: any, data: any): any;
  getDocumentsByClientId(id: any, pageNum: any, pageSize: any): any
  getDocumentsLength(): any
  get(id: any): any
  list(data: object): any
}

/**
 * User Schema
 */
const DocumentSchema = new mongoose.Schema({
  fileInfo: {
    document_defaults: {
      font_size: {
        type: String,
        required: true
      },
      font_name: {
        type: String,
        required: true
      },
      orientation: {
        type: String,
        required: true
      },
      paper_size: {
        type: String,
        required: true
      },
      track_changes: {
        type: String,
        required: true
      },
    },
    editor_settings: {
      unit: {
        type: String,
        required: true
      },
      language: {
        type: String,
        required: true
      },
      view: {
        type: String,
        required: true
      },
    },
    permissions: {
      document: {
        export: {
          type: Boolean,
          required: true
        },
        print: {
          type: Boolean,
          required: true
        },
        edit: {
          type: Boolean,
          required: true
        } },
      review: {
        changes: {
          resolve: {
            type: Boolean,
            required: true
          } },
        comment: {
          type: Boolean,
          required: true
        }
      },
      collab: {
        chat: {
          type: Boolean,
          required: true
        }
      }
    },
    callback_settings: {
      save_format: {
        type: String,
        required: true
      },
      save_url: {
        type: String,
        required: true
      },
      context_info: {
        type: String,
        required: true
      }
    },
    document_info: {
      document_name: {
        type: String,
        required: true
      },
      document_id: {
        type: String,
        required: true
      }
    },
    user_info: {
      user_id: {
        type: String,
        required: true
      },
      display_name: {
        type: String,
        required: true
      }
    }

  },
  zohoDocumentResponse: {
    session_delete_url: {
      type: String,
      required: true
    },
    save_url: {
      type: String,
      required: true
    },
    session_id: {
      type: String,
      required: true
    },
    document_delete_url: {
      type: String,
      required: true
    },
    document_id: {
      type: String,
      required: true
    },
    document_url: {
      type: String,
      required: true
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { strict: false });

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
DocumentSchema.method({
});

/**
 * Statics
 */
DocumentSchema.statics = {


  updateDocument(query: any, data: any) {
    return this.findOneAndUpdate(query, data, { upsert: false }).then((document: any) => {
      if (document) {
        return document;
      }
      // const err = new APIError('No such document exists!', httpStatus.NOT_FOUND);
      return Promise.reject({});
    });
  },

  getDocumentByDocumentId(id: any) {
    return this.find({ fileInfo: { document_info: { document_id: id } } })
      .exec()
      .then((document: any) => document);
  },


  getDocumentsByClientId(id: any, pageNum: number, pageSize: number) {
    const skips = pageSize * (pageNum - 1);
    return this.find({ 'fileInfo.user_info.user_id': id })
      .sort({ createdAt: -1 })
      .skip(skips).limit(pageSize)
      .exec()
      .then((documents: any) => documents);
  },

  getDocumentsLength() {
    return this.find({})
      .count()
      .exec()
      .then((data: any) => data);
  },

  /**
   * Get user
   * @param {ObjectId} id - The objectId of document.
   * @returns {Promise<document, APIError>}
   */
  get(id: any) {
    return this.findById(id)
      .exec()
      .then((document: any) => {
        if (document) {
          return document;
        }
        // const err = new APIError('No such document exists!', httpStatus.NOT_FOUND);
        return Promise.reject({});
      });
  },

  /**
   * List documents in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<User[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  }
};

/**
 * @typedef Document
 */
// export default mongoose.model('Document', DocumentSchema);

export const DocumentDBModel: mongoose.Model<DocumentSchemaInterface> = mongoose.model<DocumentSchemaInterface>('DocumentDBModel', DocumentSchema);
