import express, { query } from "express";
import productsModel from '../model/products.model.js';

const router = express.Router()


router.use(express.json())
router.use(express.urlencoded({extended: true}))


router.get('/', async (req, res) => {
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

        res.render('home', { products, hasPrevPage: result.hasPrevPage, page, hasNextPage: result.hasNextPage, prevLink: result.prevLink, nextLink: result.nextLink });

        let responseObject = {
            status: 'success',
            payload: result.docs,
            totalPages: result.totalPages,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            page: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevLink: result.prevLink || null,
            nextLink: result.nextLink || null
        };

        // Imprimir el objeto en formato JSON por consola
        console.log(JSON.stringify(responseObject, null, 4));

    } catch (error) {
        console.error("Error al obtener productos en tiempo real: ", error);
        res.status(500).json({ error: 'Error al obtener productos en tiempo real.' });
    }
});




router.get('/realtimeproducts', async (req, res) => {
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
        console.error("Error al obtener productos en tiempo real: ", error);
        res.status(500).json({ error: 'Error al obtener productos en tiempo real.' });
    }
});

export default router