import { Router } from 'express';
import controller from './controller.js';

const peliculaRoutes = Router();

peliculaRoutes.post('/pelicula', controller.handleInsertPeliculaRequest);
peliculaRoutes.get('/pelicula/:id', controller.handleGetPeliculaByIdRequest);
peliculaRoutes.get('/peliculas', controller.handleGetPeliculasRequest);
peliculaRoutes.put('/pelicula/:id', controller.handleUpdatePeliculaByIdRequest);
peliculaRoutes.delete('/pelicula/:id', controller.handleDeletePeliculaByIdRequest);


export default peliculaRoutes;
