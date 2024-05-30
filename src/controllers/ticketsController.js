import { Tickets } from '../dao/factory.js';

const ticketService = new Tickets();

const ticketsController = {
    getTickets: async (req, res) => {
        try {
            const tickets = await ticketService.get();
            res.json({ success: true, data: tickets });
        } catch (error) {
            req.logger.error(`Error, ${req.method} en ${req.url} - ${error.message}`);
        }
    },

    getTicketById: async (req, res) => {
        try {
            const { id } = req.params;
            const ticket = await ticketService.getById(id);
            if (!ticket) {
                res.status(404).json({ success: false, error: "Ticket no encontrado" });
            } else {
                res.json({ success: true, data: ticket });
            }
        } catch (error) {
            req.logger.error(`Error, ${req.method} en ${req.url} - ${error.message}`);
        }
    }
};

export default ticketsController;