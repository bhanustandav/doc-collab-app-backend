import mongoose, {Aggregate, DocumentQuery} from 'mongoose';
export interface IRead<T> {
  retrieve: (callback: (error: any, result: any) => void) => void;
  findById: (id: any | string | number,callback?: (err: any, res: T | null) => void) => DocumentQuery<mongoose.Document | null, mongoose.Document>
  findOne: (cond: Object, callback: (err: any, res: T) => void) => mongoose.DocumentQuery<mongoose.Document | null, mongoose.Document, object>;
  find: (cond: Object, fields: Object, options: Object, callback: (err: any, res: T[]) => void)=> mongoose.DocumentQuery<mongoose.Document[], mongoose.Document,object>
  aggregate : (aggregations: any[]) => Aggregate<any[]>
}
