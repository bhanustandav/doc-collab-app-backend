const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

/**
 * User Schema
 */
const DocumentSchema = new mongoose.Schema({
  clientId: {
    type: String,
    required: true
  },
  document: {
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
});

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


  getDocumentsByClientId(id) {
    return this.find({ clientId: id })
      .exec()
      .then(documents => documents);
  },

  /**
   * Get user
   * @param {ObjectId} id - The objectId of document.
   * @returns {Promise<document, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((document) => {
        if (document) {
          return document;
        }
        const err = new APIError('No such document exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
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
module.exports = mongoose.model('Document', DocumentSchema);
