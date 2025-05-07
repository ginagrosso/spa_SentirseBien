import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../../lib/dbConnect';
import { ServiceModel } from '../../../../models/Service';
import formidable from 'formidable';
import { promises as fs } from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const services = await ServiceModel.find({ available: true });
      return res.status(200).json(services);
    } catch (error) {
      return res.status(500).json({ error: 'Error al cargar servicios' });
    }
  }

  if (req.method === 'POST') {
    try {
      const form = formidable({ multiples: false });
      const [fields, files] = await new Promise<[formidable.Fields, formidable.Files]>((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
          if (err) reject(err);
          resolve([fields, files]);
        });
      });

      console.log('Campos recibidos:', fields);
      console.log('Archivos recibidos:', files);

      const imagen = Array.isArray(files.image) ? files.image[0] : files.image;
      const name = Array.isArray(fields.name) ? fields.name[0] : fields.name;
      const description = Array.isArray(fields.description) ? fields.description[0] : fields.description;
      const price = Array.isArray(fields.price) ? fields.price[0] : fields.price;
      const category = Array.isArray(fields.category) ? fields.category[0] : fields.category;

      if (!name || !description || !price || !category || !imagen) {
        console.error('Faltan campos obligatorios:', { name, description, price, category, imagen });
        return res.status(400).json({ error: 'Todos los campos son obligatorios y la imagen debe estar presente.' });
      }

      const priceNumber = Number(price);
      if (isNaN(priceNumber)) {
        console.error('El precio no es un número válido:', price);
        return res.status(400).json({ error: 'El precio debe ser un número válido.' });
      }

      const imageBuffer = await fs.readFile(imagen.filepath);
      const contentType = imagen.mimetype || 'image/jpeg';

      const newService = new ServiceModel({
        name,
        description,
        price: priceNumber,
        category,
        image: {
          data: imageBuffer,
          contentType: contentType
        },
        available: true
      });

      const saved = await newService.save();
      return res.status(201).json(saved);
    } catch (error: any) {
      console.error('Error al crear servicio:', error);
      return res.status(400).json({ error: error.message });
    }
  }

  return res.status(405).end();
}
