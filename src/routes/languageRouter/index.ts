import authMiddleware from '@middlewares/authMiddleware';
import { LanguageService } from '@services/languageService';
import { validationQueryParams } from '@utils/validationRequest';
import { Request, Response, Router } from 'express';
import { ExemplesQueryParams, TranslateQueryParams } from './types';
import { requestExempleSchema, requestTranslateSchema } from './validationSchemas';

const languageRouter = Router();

languageRouter.get('/language/exemples', authMiddleware, async (req: Request, res: Response) => {
  try {
    const params = await validationQueryParams<ExemplesQueryParams>(req, requestExempleSchema);

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

languageRouter.get('/language/translate', authMiddleware, async (req: Request, res: Response) => {
  try {
    const params = await validationQueryParams<TranslateQueryParams>(req, requestTranslateSchema);

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

export { languageRouter };
