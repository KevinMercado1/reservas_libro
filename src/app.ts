import express from 'express';
import 'dotenv/config';
import db from './config/database.js';
import RouterBooks from './routes/libro.js';
import RouterReserva from './routes/ reserva.js';
import RouterUser from './routes/user.js';
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;
// Registrar las rutas
app.use('/libros', RouterBooks);
app.use('/reservas', RouterReserva);
app.use('/usuarios', RouterUser);
async function startServer() {
  try {
    await db.authenticate();
    console.log('DB Online');
    await db.sync({ alter: true });
    console.log('DB sincronizada');

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor o conectar la DB:', error);
  }
}
startServer();
