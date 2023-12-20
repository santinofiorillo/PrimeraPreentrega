import  Express  from "express";


const app = Express();
const PORT= 8080;
/*
app.get('/', (req, res) => {
    res.send('Hola Mundo!');
});

app.get("/saludo", (req, res) => {
    res.send("Hola a todos");
})

app.get("/usuario", (req, res) => {
    const usuario ={
        nombre: "Juan",
        apellido: "Perez",
        edad: 25
    }
    res.json(usuario);
})
app.listen(PORT, () => {
    console.log(`Servidor Express escuchando en el puerto http://localhost:${PORT}`);
});
*/
const products = [
    {
        id: 1,
        nombre: "Camisa",
        precio: 200,
    },
    {
        id: 2,
        nombre: "Pantalon",
        precio: 300,
    },
    {
        id: 3,
        nombre: "Zapatos",
        precio: 400,
    }, 
    {
        id: 4,
        nombre: "Gafas",
        precio: 500,
    },
];

app.get("/", (req, res) => {
    res.json({
        msg: "Bienvenido a la api de productos",
        data: products,
    });
});

app.get("/producto/:id", (req, res) => {
    const {id} = req.params;

    if(!id) {
        res.status(404).json({
            msg: "No se encontro el id",
            data: null,
        });
    }
    const existProduct = products.findIndex((product) => product.id === +id);
    if (existProduct === -1) {
        res.status(404).json({
            msg: "No se encontro el id",
            data: null,
        });
    }
    res.json({
        msg: "Se encontro el id",
        data: products[existProduct],
    });
})

app.listen(PORT, () => {
    console.log(`Servidor Express escuchando en el puerto http://localhost:${PORT}`);
});