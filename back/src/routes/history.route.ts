import {Router, Request, Response, NextFunction} from 'express';
import * as playersController from '../controllers/players.controller';

const router = Router();

router.get('/', async (_req: Request, res: Response, _next: NextFunction) => {
  try {
    const history = await playersController.getHistory();
    res.status(200).json(history);
  } catch (err) {
    console.error(err.message);
    res.status(400).json({message: err.message});
  }
});
module.exports = router;
