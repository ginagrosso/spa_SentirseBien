import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma'; // Asegurate de tener configurado Prisma en tu proyecto
import bcrypt from 'bcryptjs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Datos incompletos' });
  }

  try {
    // Buscar el usuario por email en la base de datos
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    // Comparar la contraseña ingresada con la almacenada (se asume que está hasheada)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }
    
    // Login exitoso
    return res.status(200).json({ mensaje: 'Inicio de sesión exitoso. ¡Bienvenido!' });
  } catch (error) {
    console.error('Error en login:', error);
    return res.status(500).json({ error: 'Error en el servidor' });
  }
}