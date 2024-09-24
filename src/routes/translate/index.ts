import { Request, Response, Router } from 'express';
import { TranslateService } from '../../service';

const router = Router();

router.get('/translate', async (req: Request, res: Response) => {
  const text = req.query.text as string;

  const translateService = new TranslateService();
  const translatedText = await translateService.translate(text);

  const response = {
    text,
    translatedText,
  };

  res.success({ data: response });
});

export default router;
