import express from 'express';
import AppController from '../controllers/AppController';

const router = express.Router();

// check status and stats of db
router.get('/status', AppController.getStatus);
router.get('/stats', AppController.getStats);

// connect and disconnect user
router.get('/connect', AuthController.getConnect);
router.get('/disconnect', AuthController.getDisconnect);

// upload files
router.post('/files', FilesController.postUpload);
router.get('/files/:id', FilesController.getShow);
router.get('/files', FilesController.getIndex);

// publish and unpublish
router.put('/files/:id/publish', FilesController.putPublish);
router.put('/files/:id/unpublish', FilesController.putUnpublish);

// user
router.post('/users', UsersController.postNew);
router.get('/users/me', UsersController.getMe);

// file content
router.get('/files/:id/data', FilesController.getFile);

export default router;
