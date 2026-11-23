import {ObjectId} from 'mongodb';
import client from '../common/db.js';
import {ACTOR} from './actor.js';

const actorCollection = client.db('cine').collection('actores');
const peliculaCollection = client.db('cine').collection('peliculas');
function ingresarActor(body) {
  const actor = {};
  for (const campo of Object.keys(ACTOR)) {
    if (campo !== '_id' && body[campo] !== undefined) {
      actor[campo] = body[campo];
    }
  }
  return actor;
}


async function handleInsertActorRequest(req, res) {
    try {
        const actor = ingresarActor(req.body);
        if (!actor.nombre || !Number.isInteger(actor.edad) || !actor.idPelicula || typeof actor.estaRetirado !== 'boolean' || !Array.isArray(actor.premios)) {
            return res.status(400).json({ message: 'Faltan campos obligatorios' });
        }
        const pelicula = await peliculaCollection.findOne({ nombre: actor.idPelicula });
        if (!pelicula) {
            return res.status(400).json({ message: 'La película especificada no existe' });
        }
        const result = await actorCollection.insertOne(actor);
        return res.status(201).json({ message: 'Actor guardado exitosamente', actorId: result.insertedId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function handleGetActorsRequest(req, res) {
  try {
    const actores = await actorCollection.find().toArray();
    return res.status(200).json(actores);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function handleGetActorByIdRequest(req, res) {
  try {
    const { id } = req.params;
    const actor = await actorCollection.findOne({ _id: new ObjectId(id) });
    if (!actor) {
      return res.status(404).json({ message: 'Actor no encontrado' });
    }
    return res.status(200).json(actor);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function handleGetActoresByPeliculaIdRequest(req, res) {
  try {
    const { idPelicula } = req.params;

    const actores = await actorCollection.find({ idPelicula }).toArray();
    return res.status(200).json(actores);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export default {
    handleInsertActorRequest,
    handleGetActorsRequest,
    handleGetActorByIdRequest,
    handleGetActoresByPeliculaIdRequest
};
