import ticketModel from '../../model/ticket.model.js';

class Tickets {
    constructor() {} 

    get = async() => {
        try {
            return await ticketModel.find();
        } catch (error) {
            throw new Error("Error al obtener los tickets");
        }
    }

    async getById(id) {
        try {
            return await ticketModel.findById(id);
        } catch (error) {
            throw new Error("Error al obtener ticket por ID");
        }
    }

    async create(amount, email) {
        try {
            const code = this.generateTicketCode();
            return await ticketModel.create({ code, email, amount });
        } catch (error) {
            throw new Error("Error al agregar ticket");
        }
    }

    generateTicketCode() {
        // Obtenemos la fecha actual
        const currentDate = new Date();
    
        // Convertimos la fecha a una cadena con el formato deseado
        const dateString = currentDate.toISOString().replace(/[-T:]/g, '').slice(0, -5);
    
        // Generamos una parte aleatoria del código
        const randomPart = Math.random().toString(36).substr(2, 5).toUpperCase();
    
        // Combinamos la fecha y la parte aleatoria para obtener el código completo
        const code = dateString + randomPart;
    
        return code;
    }
}


export default Tickets;