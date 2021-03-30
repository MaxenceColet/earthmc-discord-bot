import {Router, Request, Response, NextFunction} from 'express';
import * as playersController from '../controllers/players.controller';

const router = Router();

router.get('/', async (_req: Request, res: Response, _next: NextFunction) => {
  try {
    const strangers = await playersController.getActiveStrangers();
    res.status(200).json(strangers);
  } catch (err) {
    console.error(err.message);
    res.status(400).json({message: err.message});
  }
});

module.exports = router;
