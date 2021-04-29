import {Router, Request, Response, NextFunction} from 'express';
import * as beaconsController from '../controllers/beacons.controller';

const router = Router();

router.put('/:playerName/on', async (req: Request, res: Response, _next: NextFunction) => {
  try {
    await beaconsController.activateBeacon(req.params.playerName);
    res.sendStatus(204);
  } catch (err) {
    console.error(err.message);
    res.status(400).json({message: err.message});
  }
});

router.put('/:playerName/off', async (req: Request, res: Response, _next: NextFunction) => {
  try {
    await beaconsController.deactivateBeacon(req.params.playerName);
    res.sendStatus(204);
  } catch (err) {
    console.error(err.message);
    res.status(400).json({message: err.message});
  }
});

router.get('/:playerName', async (req: Request, res: Response, _next: NextFunction) => {
  try {
    const proximity = await beaconsController.getProximity(req.params.playerName);
    res.status(200).json(proximity);
  } catch (err) {
    console.error(err.message);
    res.status(400).json({message: err.message});
  }
});

module.exports = router;
