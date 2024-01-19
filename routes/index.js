import express from 'express';
// eslint-disable-next-line import/no-unresolved
import AppController from '../controllers/AppController';
// eslint-disable-next-line import/no-cycle
import app from '../server';

const router = express.Router();
app.use('/', router);

// should return if Redis is alive and if the DB is alive
router.get('/status', (req, res) => {
  AppController.getStatus(req, res);
});

// should return the number of users and files in DB
router.get('/stats', (req, res) => {
  AppController.getStats(req, res);
});

export default router;
