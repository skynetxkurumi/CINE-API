import {BSONType, ObjectId} from 'mongodb';

export const ACTOR = {
  _id: ObjectId,
  idPelicula: BSONType.string,
  nombre: BSONType.string,
  edad: BSONType.int,
  estaRetirado:BSONType.bool,
  premios:BSONType.array,
}