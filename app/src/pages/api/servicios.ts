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
<<<<<<< HEAD
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
=======
        const servicio = await ServiceModel.findById(req.query.id);
        if (!servicio) {
          return res.status(404).json({ error: 'Servicio no encontrado' });
        }
        let imageUrl: string | null = null;
        if (servicio.image && servicio.image.data) {
          imageUrl = `/api/servicios/imagen/${servicio._id}`;
        }
        const obj = servicio.toObject();
        if (obj.image && obj.image.data) {
          delete obj.image.data;
        }
        console.log('Servicio:', obj.name, 'image:', obj.image, 'imageUrl:', obj.image && obj.image.contentType && obj._id && mongoose.Types.ObjectId.isValid(obj._id)
          ? `/api/servicios/imagen/${obj._id}`
          : null);
        return res.status(200).json({ ...obj, imageUrl });
      }
      const servicios = await ServiceModel.find({ available: true })
        .select('-image.data')
        .lean();

      const serviciosConImagen = servicios.map(s => ({
        ...s,
        imageUrl: `/api/admin/servicios/${s._id}/image`
      }));

      return res.status(200).json(serviciosConImagen);
>>>>>>> origin/feature/adminpage
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

<<<<<<< HEAD
      const result = await db.collection('servicios').insertOne(newService);
=======
      const result = await mongoose.connection.collection('servicios').insertOne(newService);
>>>>>>> origin/feature/adminpage
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

<<<<<<< HEAD
      const result = await db.collection('servicios').findOneAndUpdate(
=======
      const result = await mongoose.connection.collection('servicios').findOneAndUpdate(
>>>>>>> origin/feature/adminpage
        { _id: new mongoose.Types.ObjectId(id as string) },
        { $set: updateData },
        { returnDocument: 'after' }
      );

      if (!result) {
        return res.status(404).json({ error: 'Servicio no encontrado' });
      }

      return res.status(200).json(result);
    }

<<<<<<< HEAD
    // DELETE - remove service (admin only)
=======
>>>>>>> origin/feature/adminpage
    if (req.method === 'DELETE') {
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ error: 'ID del servicio es requerido' });
      }

<<<<<<< HEAD
      const result = await db.collection('servicios').deleteOne({
=======
      const result = await mongoose.connection.collection('servicios').deleteOne({
>>>>>>> origin/feature/adminpage
        _id: new mongoose.Types.ObjectId(id as string)
      });

      if (result.deletedCount === 0) {
        return res.status(404).json({ error: 'Servicio no encontrado' });
      }

      return res.status(200).json({ message: 'Servicio eliminado correctamente' });
    }

<<<<<<< HEAD
    // Method not allowed
=======

>>>>>>> origin/feature/adminpage
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
<<<<<<< HEAD
=======
}


export async function imagenHandler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  const { id } = req.query;
  const servicio = await ServiceModel.findById(id);
  if (!servicio || !servicio.image) {
    return res.status(404).json({ error: 'Imagen no encontrada' });
  }
  res.setHeader('Content-Type', servicio.image.contentType);
  res.setHeader('Cache-Control', 'public, max-age=31536000');
  return res.send(servicio.image.data);
>>>>>>> origin/feature/adminpage
}