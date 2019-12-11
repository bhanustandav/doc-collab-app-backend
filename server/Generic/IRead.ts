import mongoose from 'mongoose';
export interface IRead<T> {
  retrieve: (callback: (error: any, result: any) => void) => void;
  findById: (id: string, callback: (error: any, result: T) => void) => void;
  findOne: (cond: Object, callback: (err: any, res: T) => void) => mongoose.DocumentQuery<mongoose.Document | null, mongoose.Document, object>;
  find: (cond: Object, fields: Object, options: Object, callback: (err: any, res: T[]) => void)=> mongoose.DocumentQuery<mongoose.Document[], mongoose.Document,object>
}
