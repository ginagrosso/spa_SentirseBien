import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../lib/dbConnect';
import mongoose from 'mongoose';
import { isAdmin } from '../../middleware/auth';

// Handler for HTTP methods
async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Connect to MongoDB
    await dbConnect();
    const db = mongoose.connection.db;
    if (!db) {
      return res.status(500).json({ error: 'Error de conexión a la base de datos' });
    }

    // GET all services
    if (req.method === 'GET') {
      // Check if there's an ID in the query to fetch a specific service
      if (req.query.id) {
        const servicio = await db.collection('servicios').findOne({
          _id: new mongoose.Types.ObjectId(req.query.id as string)
        });

        if (!servicio) {
          return res.status(404).json({ error: 'Servicio no encontrado' });
        }

        return res.status(200).json(servicio);
      }

      // Otherwise return all services
      const servicios = await db.collection('servicios').find({}).toArray();
      return res.status(200).json(servicios);
    }

    // POST - create new service (admin only)
    if (req.method === 'POST') {
      // Validate fields
      const { nombre, descripcion, precio, duracion, categoria } = req.body;

      if (!nombre || !precio || !duracion) {
        return res.status(400).json({
          error: 'Nombre, precio y duración son campos obligatorios'
        });
      }

      const newService = {
        nombre,
        descripcion: descripcion || '',
        precio: parseFloat(precio),
        duracion,
        categoria: categoria || 'general',
        created_at: new Date()
      };

      const result = await db.collection('servicios').insertOne(newService);
      return res.status(201).json({
        _id: result.insertedId,
        ...newService
      });
    }

    // PUT - update service (admin only)
    if (req.method === 'PUT') {
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ error: 'ID del servicio es requerido' });
      }

      const { nombre, descripcion, precio, duracion, categoria } = req.body;

      if (!nombre || !precio || !duracion) {
        return res.status(400).json({
          error: 'Nombre, precio y duración son campos obligatorios'
        });
      }

      const updateData = {
        nombre,
        descripcion: descripcion || '',
        precio: parseFloat(precio),
        duracion,
        categoria: categoria || 'general',
        updated_at: new Date()
      };

      const result = await db.collection('servicios').findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(id as string) },
        { $set: updateData },
        { returnDocument: 'after' }
      );

      if (!result) {
        return res.status(404).json({ error: 'Servicio no encontrado' });
      }

      return res.status(200).json(result);
    }

    // DELETE - remove service (admin only)
    if (req.method === 'DELETE') {
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ error: 'ID del servicio es requerido' });
      }

      const result = await db.collection('servicios').deleteOne({
        _id: new mongoose.Types.ObjectId(id as string)
      });

      if (result.deletedCount === 0) {
        return res.status(404).json({ error: 'Servicio no encontrado' });
      }

      return res.status(200).json({ message: 'Servicio eliminado correctamente' });
    }

    // Method not allowed
    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
    return res.status(405).json({ error: `Método ${req.method} no permitido` });
  } catch (error) {
    console.error('Error en API de servicios:', error);
    return res.status(500).json({ error: 'Error del servidor' });
  }
}

// Apply admin middleware only to modification operations
export default function serviciosEndpoint(req: NextApiRequest, res: NextApiResponse) {
  // Anyone can GET services, but only admins can modify
  if (req.method === 'GET') {
    return handler(req, res);
  } else {
    // For POST, PUT, DELETE - check admin rights
    return isAdmin(req, res, () => handler(req, res));
  }
}