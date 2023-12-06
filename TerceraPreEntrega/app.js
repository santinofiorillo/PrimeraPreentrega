const express = require('express');
const ProductManager = require('./ProductManager');

const app = express();
const port = 3000; // Puedes cambiar el puerto según tus necesidades

const ruta = './productos.json'; // Ruta al archivo de productos

const PM = new ProductManager(ruta);

// Middleware para parsear el cuerpo de las solicitudes como JSON
app.use(express.json());

// Endpoint para obtener todos los productos con posibilidad de limitar resultados
app.get('/products', async (req, res) => {
    try {
        const limit = req.query.limit;
        const productos = await PM.ObtenerPoductos();
        
        if (limit) {
            res.json(productos.slice(0, parseInt(limit)));
        } else {
            res.json(productos);
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener productos' });
    }
});

// Endpoint para obtener un producto por ID
app.get('/products/:pid', async (req, res) => {
    try {
        const pid = parseInt(req.params.pid);
        const producto = await PM.ObtenerProductoPorID(pid);
        
        if (typeof producto === 'object') {
            res.json(producto);
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el producto' });
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor Express escuchando en el puerto ${port}`);
});
