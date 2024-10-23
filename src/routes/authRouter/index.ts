import { Response, Router } from 'express';
import { RequestWithQuery } from '../../../@types/express';
import { RefreshTokenQueryParams } from './types';
import { validationQueryParams } from '@utils/validationRequest';
import { requestRefreshTokenSchema } from './validationSchema';
import { AuthService } from '@services/authService';

const authRouter = Router();

authRouter.get(
  '/auth/refreshToken',
  async (req: RequestWithQuery<RefreshTokenQueryParams>, res: Response) => {
    try {
      const params = req.query;
      await validationQueryParams(params, requestRefreshTokenSchema);

      const authService = new AuthService();
      const token = await authService.refreshToken(params.refreshToken);

      const response = {
        token,
      };

      res.success({ data: response });
    } catch (error) {
      res.error({ error: error as Error, message: 'Error to refresh token' });
    }
  },
);

export { authRouter };
