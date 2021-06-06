import { NextApiRequest, NextApiResponse } from "next";
import deezer from '../../services/deezer';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const { q } = req.query;

    const response = await deezer.get(`/search?q=${q}`);
    
    const data = response.data.data.map(result => {
      // For Test Middleware Validate Preview URL
      const isTestTitle = result.title.match('test');
      
      const indexAuxDuration = String(result.duration / 60).indexOf('.');
      const limit = String(result.title).indexOf(' ') === -1 ? 10 : 30;
      const titleValidated = result.title.length > limit ? 
        String(result.title).substring(0, limit) + '...' :
        result.title;
      return {
        id: result.id,
        title: titleValidated,
        artist: result.artist.name,
        duration: String(Number(
            String(result.duration / 60).substring(0, indexAuxDuration + 3)
          ).toFixed(2)
          ).replace('.', ':'),
        image_medium: result.album.cover_medium,
        image_big: result.album.cover_xl,
        preview: isTestTitle ? result.preview + 'test' : result.preview,
        link: result.link
      }
    });

    return res.status(200).json(data);
  } else {
    res.setHeader('Allow', 'GET')
    res.status(405).end('Method not allowed')
  }
}