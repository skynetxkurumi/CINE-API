import {ObjectId} from 'mongodb';
import client from '../common/db.js';
import {PELICULA} from './pelicula.js';

const peliculaCollection = client.db('cine-db').collection('peliculas');

function armarPelicula(body) {
  const pelicula = {};
  for (const campo of Object.keys(PELICULA)) {
    if (campo !== '_id' && body[campo] !== undefined) {
      pelicula[campo] = body[campo];
    }
  }
  return pelicula;
}

// Convierte el id; devuelve null si está mal formado
function convertirId(id) {
  try {
    return new ObjectId(id);
  } catch {
    return null;
  }
}

async function handleInsertPeliculaRequest(req, res) {
  const pelicula = armarPelicula(req.body);
  if (!pelicula.nombre || !Array.isArray(pelicula.generos) || !Number.isInteger(pelicula.anioEstreno)) {
    return res.status(400).json({ message: 'Faltan campos obligatorios o tienen un tipo inválido' });
  }

  return peliculaCollection.insertOne(pelicula)
    .then((result) => res.status(201).json({ message: 'Película guardada exitosamente', peliculaId: result.insertedId }))
    .catch((error) => res.status(500).json({ error: error.message }));
}

async function handleGetPeliculasRequest(req, res) {
  return peliculaCollection.find().toArray()
    .then((peliculas) => res.status(200).json(peliculas))
    .catch((error) => res.status(500).json({ error: error.message }));
}

async function handleGetPeliculaByIdRequest(req, res) {
  const _id = convertirId(req.params.id);
  if (!_id) return res.status(400).json({ message: 'Id mal formado' });

  return peliculaCollection.findOne({ _id })
    .then((pelicula) => {
      if (!pelicula) return res.status(404).json({ message: 'Película no encontrada' });
      return res.status(200).json(pelicula);
    })
    .catch((error) => res.status(500).json({ error: error.message }));
}

async function handleUpdatePeliculaByIdRequest(req, res) {
  const _id = convertirId(req.params.id);
  if (!_id) return res.status(400).json({ message: 'Id mal formado' });

  const cambios = armarPelicula(req.body);
  if (Object.keys(cambios).length === 0) {
    return res.status(400).json({ message: 'No se enviaron campos para actualizar' });
  }

  return peliculaCollection.updateOne({ _id }, { $set: cambios })
    .then((result) => {
      if (result.matchedCount === 0) return res.status(404).json({ message: 'Película no encontrada' });
      return res.status(200).json({ message: 'Película actualizada exitosamente' });
    })
    .catch((error) => res.status(500).json({ error: error.message }));
}

async function handleDeletePeliculaByIdRequest(req, res) {
  const _id = convertirId(req.params.id);
  if (!_id) return res.status(400).json({ message: 'Id mal formado' });

  return peliculaCollection.deleteOne({ _id })
    .then((result) => {
      if (result.deletedCount === 0) return res.status(404).json({ message: 'Película no encontrada' });
      return res.status(200).json({ message: 'Película eliminada exitosamente' });
    })
    .catch((error) => res.status(500).json({ error: error.message }));
}

export default {
  handleInsertPeliculaRequest,
  handleGetPeliculasRequest,
  handleGetPeliculaByIdRequest,
  handleUpdatePeliculaByIdRequest,
  handleDeletePeliculaByIdRequest
};