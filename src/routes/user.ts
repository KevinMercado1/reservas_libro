import express, { type Request, type Response } from 'express';
import user from '../models/user.js';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;
    const newUser = await user.create({ name, email });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el usuario' });
  }
});

router.get('/', async (_req: Request, res: Response) => {
  try {
    const usuarios = await user.findAll();
    return res.status(200).json(usuarios);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error al obtener los usuarios.', error });
  }
});

export default router;
