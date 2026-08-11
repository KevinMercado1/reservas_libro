import express, { type Request, type Response } from 'express';
import Book from '../models/book.js';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  try {
    const { titulo, autor, disponibilidad } = req.body;

    if (!titulo || !autor) {
      return res.status(400).json({
        message: 'El título y el autor son obligatorios.',
      });
    }

    const nuevoLibro = await Book.create({
      title: titulo,
      author: autor,
      disponibilidad,
    });

    return res.status(201).json(nuevoLibro);
  } catch (error) {
    return res.status(500).json({
      message: 'Error al crear el libro.',
      error,
    });
  }
});

router.get('/', async (_req: Request, res: Response) => {
  try {
    const libros = await Book.findAll();

    return res.status(200).json(libros);
  } catch (error) {
    return res.status(500).json({
      message: 'Error al obtener los libros.',
      error,
    });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const libro = await Book.findByPk(id);

    if (!libro) {
      return res.status(404).json({
        message: 'Libro no encontrado.',
      });
    }

    return res.status(200).json(libro);
  } catch (error) {
    return res.status(500).json({
      message: 'Error al obtener el libro.',
      error,
    });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { titulo, autor, disponibilidad } = req.body;

    const libro = await Book.findByPk(id);

    if (!libro) {
      return res.status(404).json({
        message: 'Libro no encontrado para actualizar.',
      });
    }

    await libro.update({
      title: titulo,
      author: autor,
      disponibilidad,
    });

    return res.status(200).json({
      message: 'Libro actualizado con éxito.',
      libro,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error al actualizar el libro.',
      error,
    });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const libro = await Book.findByPk(id);

    if (!libro) {
      return res.status(404).json({
        message: 'Libro no encontrado para eliminar.',
      });
    }

    await libro.destroy();

    return res.status(200).json({
      message: 'Libro eliminado correctamente.',
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error al eliminar el libro.',
      error,
    });
  }
});

export default router;
