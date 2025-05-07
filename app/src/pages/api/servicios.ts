import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../lib/dbConnect';
import mongoose from 'mongoose';
import { isAdmin } from '../../middleware/auth';
import { ServiceModel } from '../../models/Service';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await dbConnect();
    
    if (req.method === 'GET') {
      if (req.query.id) {
        // Obtener un servicio específico
        const servicio = await ServiceModel.findById(req.query.id);
        
        if (!servicio) {
          return res.status(404).json({ error: 'Servicio no encontrado' });
        }
        
        return res.status(200).json(servicio);
      }
      
      // Obtener todos los servicios
      const servicios = await ServiceModel.find({ available: true });
      console.log('API servicios:', JSON.stringify(servicios));
      return res.status(200).json(servicios);
    }

    if (req.method === 'POST') {

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

export default function serviciosEndpoint(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return handler(req, res);
  } else {
    return isAdmin(req, res, () => handler(req, res));
  }
}