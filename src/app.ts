import express, { type Request, type Response } from 'express';
import 'dotenv/config';
// import db from './config/db.js';
// import category from './models/category.js';
// import { Routerbooks, RouterUsers } from './routes';

const app = express();
app.use(express.json());

const { PORT } = process.env;

app.get('/', (req, res) => {
  res.send('¡Hola, el servidor está funcionando!');
});

app.listen(PORT, () => {
  console.log(`Server Running on http://localhost:${PORT}`);
});
