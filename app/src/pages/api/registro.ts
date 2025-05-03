import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'lib/prisma';
import bcrypt from 'bcryptjs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido.' });
  }

  const { email, password, nombre, telefono } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email y contraseña son obligatorios.' });
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'El usuario ya existe.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        nombre,
        telefono
      },
    });

    return res.status(201).json({ mensaje: 'Usuario registrado con éxito.' });
  } catch (error) {
    console.error('Error en registro (detallado):', error instanceof Error ? error.message : error);
    return res.status(500).json({ error: 'Error en el servidor.' });
  }
}