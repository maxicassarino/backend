import express from 'express';
import viewsController from '../controllers/viewsController.js';

const router = express.Router();

// Endpoints

router.get('/', viewsController.renderHome);

router.get('/realtimeproducts', viewsController.renderRealTimeProducts);

export default router;