import { Response, Router } from 'express';
import { LanguageService } from '../../service';
import { ExemplesQueryParams, TranslateQueryParams } from './types';
import { RequestWithQuery } from '../../../@types/express';

const router = Router();

router.get('/language/exemples', async (req: RequestWithQuery<ExemplesQueryParams>, res: Response) => {
  try {
    const params = req.query;

    const languageService = new LanguageService();
    const exemples = await languageService.generateExemples(params);

    const response = {
      text: params.text,
      exemples,
    };

    res.success({ data: response });
  } catch (error) {
    res.error({ error: error as Error, message: 'Error to generate exemples' });
  }
});

router.get('/language/translate', async (req: RequestWithQuery<TranslateQueryParams>, res: Response) => {
  try {
    const params = req.query;

    const languageService = new LanguageService();
    const translatedText = await languageService.translate(params);

    const response = {
      text: params.text,
      translatedText,
    };

    res.success({ data: response });
  } catch (error) {
    res.error({ error: error as Error, message: 'Error to translate' });
  }
});

export default router;
