import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../../lib/dbConnect';
import { ServiceModel } from '../../../../models/Service';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const services = await ServiceModel.find();
      return res.status(200).json(services);
    } catch (error) {
      return res.status(500).json({ error: 'Error fetching services' });
    }
  }

  if (req.method === 'POST') {
    try {
      const newService = new ServiceModel(req.body);
      const saved = await newService.save();
      return res.status(201).json(saved);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  return res.status(405).end();
}
