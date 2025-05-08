import type { NextApiRequest, NextApiResponse } from 'next';
import { UserModel } from '../../models/User';
import dbConnect from '../../lib/dbConnect';
import bcrypt from 'bcryptjs';
import { generateToken } from '../../lib/jwt';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Datos incompletos' });
  }

  try {
    await dbConnect();
    const user = await UserModel.findOne({ email });

    // You can use your model's comparePassword method or bcrypt directly
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    const token = generateToken({ id: user._id, email: user.email });
    return res.status(200).json({
      mensaje: 'Inicio de sesión exitoso',
      token,
      user: {
        id: user._id,
        email: user.email,
        nombre: user.nombre,
        telefono: user.telefono,
        rol: user.rol  // Include the user's role in the response
      }
    });
  } catch (error) {
    console.error('Error en login:', error);
    return res.status(500).json({ error: 'Error en el servidor' });
  }
}