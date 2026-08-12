import express, { type Request, type Response } from 'express';
import Reserve from '../models/reserva.js';
import Book from '../models/book.js';
const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  try {
    const { userId, bookId } = req.body;
    if (!userId || !bookId) {
      return res.status(400).json({
        message: 'Todos los campos (userId, bookId) son obligatorios.',
      });
    }

    const libroExiste = await Book.findByPk(bookId);
    if (!libroExiste) {
      return res.status(404).json({
        message: 'El libro solicitado no existe en la base de datos.',
      });
    }

    const reservaActiva = await Reserve.findOne({
      where: { user_id: userId, status: 'pendiente' },
    });

    if (reservaActiva) {
      return res
        .status(400)
        .json({ message: 'El usuario ya tiene una reserva pendiente activa.' });
    }

    const nuevaReserva = await Reserve.create({
      user_id: userId,
      book_id: bookId,
    });

    return res.status(201).json(nuevaReserva);
  } catch (error) {
    console.error('Error detallado en la terminal:', error);
    return res.status(500).json({ message: 'Error al crear la reserva.' });
  }
});

router.post('/devolucion', async (req: Request, res: Response) => {
  try {
    const { userId, bookId } = req.body;
    if (!userId || !bookId) {
      return res.status(400).json({
        message:
          'Todos los campos (userId, bookId) son obligatorios para la devolución.',
      });
    }
    const reservaPendiente = await Reserve.findOne({
      where: { user_id: userId, book_id: bookId, status: 'pendiente' },
    });

    if (!reservaPendiente) {
      return res.status(404).json({
        message:
          'No existe una reserva pendiente asociada para este usuario y libro.',
      });
    }

    reservaPendiente.set({ status: 'completada' });
    await reservaPendiente.save();

    return res.status(200).json({
      message: 'Devolución registrada con éxito.',
      reserva: reservaPendiente,
    });
  } catch (error) {
    console.error('Error al procesar la devolución:', error);
    return res
      .status(500)
      .json({ message: 'Error interno al procesar la devolución.' });
  }
});
export default router;
