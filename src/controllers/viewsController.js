import productsModel from '../model/products.model.js';

const renderHome = async (req, res) => {
    try {
        let { limit = 4, page = 1, sort } = req.query;
        limit = parseInt(limit);
        page = parseInt(page);

        // Construir el objeto de opciones de búsqueda
        let options = { page, limit };

        if (sort) {
            options.sort = sort === 'asc' ? { price: 1 } : { price: -1 };
        }

        let result = await productsModel.paginate({}, options);

        result.prevLink = result.hasPrevPage ? `/?limit=${limit}&page=${result.prevPage}&sort=${sort}` : '';
        result.nextLink = result.hasNextPage ? `/?limit=${limit}&page=${result.nextPage}&sort=${sort}` : '';
        result.isValid = !(page <= 0 || page > result.totalPages);

        // Estructurar los datos para pasar al motor de plantillas
        let products = result.docs.map(product => {
            return {
                title: product.title,
                category: product.category,
                price: product.price
            };
        });

        res.render('home', { products, hasPrevPage: result.hasPrevPage, page, hasNextPage: result.hasNextPage, prevLink: result.prevLink, nextLink: result.nextLink, user: req.session.user });

    } catch (error) {
        req.logger.error(`Error, ${req.method} en ${req.url} - ${error.message}`);
    }
};


const renderRealTimeProducts = async (req, res) => {
    try {
        let page = parseInt(req.query.page) || 1;
        let result = await productsModel.paginate({}, { page, limit: 5 });

        result.prevLink = result.hasPrevPage ? `http://localhost:8080/realtimeproducts?page=${result.prevPage}` : '';
        result.nextLink = result.hasNextPage ? `http://localhost:8080/realtimeproducts?page=${result.nextPage}` : '';
        result.isValid = !(page <= 0 || page > result.totalPages);

        // Estructurar los datos para pasar al motor de plantillas
        let products = result.docs.map(product => {
            return {
                title: product.title,
                category: product.category,
                price: product.price
            };
        });

        res.render('realTimeProducts', { products, hasPrevPage: result.hasPrevPage, page: page, hasNextPage: result.hasNextPage, prevLink: result.prevLink, nextLink: result.nextLink });
    
    } catch (error) {
        req.logger.error(`Error, ${req.method} en ${req.url} - ${error.message}`);
    }
};


export default { 
    renderHome,
    renderRealTimeProducts
};