import {Router, Request, Response, NextFunction} from 'express';
import * as playersController from '../controllers/players.controller';

const router = Router();

router.get(
  '/online/town/:town',
  async (req: Request<any, any, {town: string}>, res: Response, _next: NextFunction) => {
    try {
      const inhabitants = await playersController.getConnectedTownInhabitants(req.params.town as string);
      res.status(200).json(inhabitants);
    } catch (err) {
      console.error(err.message);
      res.status(400).json({message: err.message});
    }
  },
);

module.exports = router;
