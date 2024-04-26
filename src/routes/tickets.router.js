import express from 'express';
import ticketsController from '../controllers/ticketsController.js';

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));


// Endpoints

router.get('/tickets', ticketsController.getTickets);

router.get('/tickets/:id', ticketsController.getTicketById)


export default router;