import * as mongoose from "mongoose";
import {IRead} from "./IRead";
import {IWrite} from "./IWrite";
import {Aggregate, DocumentQuery, Promise, QueryFindOneAndUpdateOptions} from "mongoose";

export class RepositoryBase<T extends mongoose.Document> implements IRead<T>, IWrite<T> {

  private _model: mongoose.Model<mongoose.Document>;

  constructor(schemaModel: mongoose.Model<mongoose.Document>) {
    this._model = schemaModel;
  }

  create(item: T, callback: (error: any, result: T) => void) {
    this._model.create(item, callback);
  }

  retrieve(callback: (error: any, result: T) => void) {
    this._model.find({}, callback);
  }

  update(_id: mongoose.Types.ObjectId, item: T, callback: (error: any, result: any) => void) {
    this._model.update({ _id: _id }, item, callback);
  }

  delete(_id: string, callback: (error: any, result: any) => void) {
    this._model.remove({ _id: this.toObjectId(_id) }, (err) => callback(err, null));
  }

  findById(id: any | string | number,callback?: (err: any, res: T | null) => void): DocumentQuery<mongoose.Document | null, mongoose.Document> {
    return  this._model.findById(id, callback);
  }

  findOneAndUpdate(conditions: any, update: any, options: { upsert: true, new: true }): DocumentQuery<mongoose.Document, mongoose.Document> {
    return this._model.findOneAndUpdate(conditions, update, options);
  }

  findOne(cond?: Object, callback?: (err: any, res: T) => void): mongoose.DocumentQuery<mongoose.Document | null, mongoose.Document, object> {
    return this._model.findOne(cond, callback);
  }

  find(cond: any, fields: any, options: any, sortOptions?: any, callback?: (err: any, res: T[]) => void): mongoose.DocumentQuery<mongoose.Document[], mongoose.Document,object> {
    return this._model.find(cond, options, callback);
  }

  //aggregate(aggregations?: any[]): Aggregate<any[]>;
  aggregate(aggregations: any[]): Aggregate<any[]> {
    return this._model.aggregate(aggregations)
  }

  private toObjectId(_id: string): mongoose.Types.ObjectId {
    return mongoose.Types.ObjectId.createFromHexString(_id);
  }

}
