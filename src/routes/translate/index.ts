import { Request, Response, Router } from 'express';
import { TranslateService } from '../../service/translateService';

const router = Router();

router.get('/api/translate', async (req: Request, res: Response) => {
  const text = req.params.text;

  const translateService = new TranslateService();
  const translatedText = await translateService.translateText(text);

  const response = {
    text,
    translatedText,
  };

  res.success({ data: response });
});

export default router;
