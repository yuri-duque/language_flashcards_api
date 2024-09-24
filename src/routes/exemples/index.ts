import { Request, Response, Router } from 'express';
import { GenerateExemples } from '../../service';

const router = Router();

router.get('/exemples', async (req: Request, res: Response) => {
  const text = req.query.text as string;

  const generateExemples = new GenerateExemples();
  const exemples = await generateExemples.generate(text);

  const response = {
    text,
    exemples,
  };

  res.success({ data: response });
});

export default router;
