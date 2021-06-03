import { NextApiRequest, NextApiResponse } from "next";
import deezer from '../../services/deezer';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const { q } = req.query;
    const response = await deezer.get(`/search?q=${q}`);
    const data = response.data.data.map(result => {
      const indexAuxDuration = String(result.duration / 60).indexOf('.');
      const titleValidated = result.title.length > 30 ? 
        String(result.title).substring(0, 30) + '...' :
        result.title;
      return {
        id: result.id,
        title: titleValidated,
        artist: result.artist.name,
        duration: Number(
          String(result.duration / 60).substring(0, indexAuxDuration + 3)
        ).toFixed(2),
        image: result.album.cover_medium,
        preview: result.preview
      }
    });

    return res.status(200).json(data);
  } else {
    res.setHeader('Allow', 'GET')
    res.status(405).end('Method not allowed')
  }
}