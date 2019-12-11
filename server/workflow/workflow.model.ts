import Promise from 'bluebird';
import mongoose from  'mongoose';

/**
 *  WorkflowSchema
 */

export interface WorkflowSchemaInterface extends mongoose.Document{
  documentId: string,
  assignee: string,
  reporter: string,
  stateId: string,
  createdDate: Date,
  modifiedDate: Date
}


const WorkflowSchema = new mongoose.Schema({
  documentId: {
    type: String,
    required: true
  },
  assignee: {
    type: String,
    required: true
  },
  reporter: {
    type: String,
    required: true
  },
  stateId: {
    type: String,
    required: true
  },
  createdDate: {
    type: Date
  },
  modifiedDate: {
    type: Date
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
WorkflowSchema.method({
});

/**
 * Statics
 */
WorkflowSchema.statics = {
  /**
   * Get user
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  get(id: string) {
    return this.findById(id)
      .exec()
      .then((user: any) => {
        if (user) {
          return user;
        }
        return Promise.reject({});
      });
  },

  /**
   * List users in descending order of 'createdAt' timestamp.
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
 * @typedef User
 */

export const WorkflowDBModel = mongoose.model<WorkflowSchemaInterface>('WorkflowDBModel', WorkflowSchema);

