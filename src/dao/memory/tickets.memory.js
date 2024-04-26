class Tickets {
    constructor() {
        this.data = [];
        this.nextId = 0;
    } 

    async get() {
        return this.data;
    }

    async getById(id) {
        return this.data.find(ticket => ticket.id === id);
    }

    async create(amount, email) {
        const newId = this.nextId++;
        const code = this.generateTicketCode(); 
        const currentDate = new Date();
        const newTicket = { id: newId, code, email, currentDate, amount };
        this.data.push(newTicket);
        return newTicket;
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