import express, {urlencoded} from 'express';
import cors from 'cors';
import client from './src/common/db.js';

import peliculaRoutes from './src/pelicula/routes.js';
import actorRoutes from './src/actor/routes.js';

const PREFERRED_PORT = Number(process.env.PORT) === 4000 ? 4000 : 3000;
const FALLBACK_PORT = PREFERRED_PORT === 3000 ? 4000 : 3000;
const app = express();

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
  res.send('Bienvenido al cine Iplacex');
});


app.use('/api', peliculaRoutes);
app.use('/api', actorRoutes);

function listen(port, fallbackPort) {
  const server = app.listen(port);

  server.once('listening', () => {
    setImmediate(() => {
      if (server.listening) {
        console.log(`Éxito: servidor Express corriendo en http://localhost:${port}`);
      }
    });
  });

  server.once('error', (error) => {
    if (error.code === 'EADDRINUSE' && fallbackPort) {
      server.close();
      console.log(`Port ${port} is in use. Listening on ${fallbackPort}`);
      listen(fallbackPort, null);
      return;
    }

    console.error('Error al levantar el servidor Express:', error.message);
    process.exit(1);
  });
}
await client.connect()
.then(() => {
  console.log('Éxito: conexión al clúster de Atlas establecida');
  listen(PREFERRED_PORT, FALLBACK_PORT);
})
.catch((err) => {
  console.error('Error al conectar con el clúster de Atlas:', err.message);
  process.exit(1);
});
