import {Router, Request, Response, NextFunction} from 'express';
import * as playersController from '../controllers/players.controller'

const router = Router();

router.get(
  '/',
  async (_req: Request, res: Response, _next: NextFunction) => {
    try {
      const homeless = await playersController.getActiveHomeless();
      res.status(200).json(homeless);
    } catch (err) {
      console.error(err.message);
      res.status(400).json({message: err.message})
    }
  },
);
module.exports = router;
