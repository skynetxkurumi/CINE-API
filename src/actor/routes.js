import {Router} from 'express';
import controller from './controller.js';

const actorRoutes = Router();

actorRoutes.post('/actor', controller.handleInsertActorRequest);

actorRoutes.get('/actor/:id', controller.handleGetActorByIdRequest);

actorRoutes.get('/actores', controller.handleGetActorsRequest);

actorRoutes.get('/actor/pelicula/:idPelicula', controller.handleGetActoresByPeliculaIdRequest);

export default actorRoutes;