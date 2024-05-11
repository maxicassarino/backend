export const generateUserErrorInfo=(user)=>{    
    return `Una o más propiedades estaban incompletas o inválidas.
    Lista de propiedades requeridas:
    * Nombre: necesita un String, se recibió ${user.name}
    * Apellido: necesita un String, se recibió ${user.lastname}
    * Email: necesita un String, se recibió ${user.email}
    * Password: necesita un String, se recibió ${user.password}
    `;
}

export const generateProductErrorInfo=(product)=>{    
    return `Una o más propiedades estaban incompletas o inválidas.
    Lista de propiedades requeridas:
    * Titulo: necesita un String, se recibió ${product.title}
    * Categoria: necesita un String, se recibió ${product.category}
    * Precio: necesita un Number, se recibió ${product.price}
    * Stock: necesita un Number, se recibió ${product.stock}
    `;
}