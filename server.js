import express from 'express';
import AppController from './controllers/AppController';

const app = express();
const port = process.env.PORT || 5000;

app.get('/status', (req, res) => {
  const status = {
    redis: AppController.isRedisAlive(),
    db: AppController.isDBAlive(),
  };
  res.status(200).send(status);
});

app.get('/stats', async (req, res) => {
  const nbUsers = await AppController.getNbUsers();
  const nbFiles = await AppController.getNbFiles();
  const stats = {
    users: nbUsers,
    files: nbFiles,
  };
  res.status(200).send(stats);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
