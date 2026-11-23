import {BSONType, ObjectId} from 'mongodb';

export const PELICULA = {
  _id: ObjectId,
  nombre: BSONType.string,
  generos: BSONType.array,
  anioEstreno: BSONType.int
}