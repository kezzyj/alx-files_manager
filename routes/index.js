import express from 'express';
import AppController from '../controllers/AppController';

const router = express.Router();

router.get('/status', (req, res) => {
  const status = {
    redis: AppController.isRedisAlive(),
    db: AppController.isDBAlive(),
  };
  res.status(200).send(status);
});

router.get('/stats', async (req, res) => {
  const nbUsers = await AppController.getNbUsers();
  const nbFiles = await AppController.getNbFiles();
  const stats = {
    users: nbUsers,
    files: nbFiles,
  };
  res.status(200).send(stats);
});

export default router;
