const fs = require('fs');

class ProductManager {
    constructor(ruta) {
        this.path = ruta;
        // Contador interno para asignar IDs únicos a los productos.
        this.idCounter = 1;
    }

    async ObtenerPoductos() {
        try {
            // Método asincrónico para obtener productos desde el archivo.
            if (fs.existsSync(this.path)) {
                // Verifica si el archivo existe.
                const ProductosGuardados = await fs.promises.readFile(this.path, 'utf-8');
                return JSON.parse(ProductosGuardados);
            } else {
                return [];
            }
        } catch (error) {
            console.error('Error al leer el archivo:', error);
            return [];
        }
    }

    async AgregarProducto(producto) {
        try {
            // Método asincrónico para agregar un nuevo producto al archivo.
            const ProductosGuardados = await this.ObtenerPoductos();
            const id = this.idCounter++;
            // Genera un nuevo ID único.
            ProductosGuardados.push({ id, ...producto });
            // Agrega el nuevo producto al array.
            await fs.promises.writeFile(this.path, JSON.stringify(ProductosGuardados));
            console.log('Producto cargado');
        } catch (error) {
            console.error('Error al agregar producto:', error);
        }
    }

    async EditarProducto(IDProducto, CampoAActualizar, NuevoDato) {
        try {
            const ProductosGuardados = await this.ObtenerPoductos();
            const ProductoAActualizar = ProductosGuardados.find(u => u.id === IDProducto);
            // Busca el producto con el ID especificado.
            if (ProductoAActualizar) {
                ProductoAActualizar[CampoAActualizar] = NuevoDato;
                await fs.promises.writeFile(this.path, JSON.stringify(ProductosGuardados));
            } else {
                console.error('Producto no encontrado');
            }
        } catch (error) {
            console.error('Error al editar producto:', error);
        }
    }

    async BorrarProductoPorID(IDProducto) {
        try {
            // borrar un producto por ID.
            const ProductosGuardados = await this.ObtenerPoductos();
            const ProductosGuardadosAux = ProductosGuardados.filter(u => u.id !== IDProducto);
            // Filtra los productos, eliminando el producto con el ID especificado.
            await fs.promises.writeFile(this.path, JSON.stringify(ProductosGuardadosAux));
        } catch (error) {
            console.error('Error al borrar producto:', error);
        }
    }

    async ObtenerProductoPorID(IDProducto) {
        try {
            // obtener un producto por ID.
            const ProductosGuardados = await this.ObtenerPoductos();
            const ProdAux = ProductosGuardados.find(u => u.id === IDProducto);
            if (ProdAux) {
                return ProdAux;
            } else {
                console.error('Producto no encontrado');
            }
        } catch (error) {
            console.error('Error al obtener producto por ID:', error);
        }
    }

    async BorrarArchivo() {
        try {
            // Borra el archivo.
            await fs.promises.unlink(this.path);
        } catch (error) {
            console.error('Error al borrar el archivo:', error);
        }
    }
}

// Instancio productos
const Producto1 = {
    titulo: "Samsung Galaxy S22",
    descripcion: "ultima tecnologia",
    precio: 10,
    imagen: "Sin imagen",
    codigo: "AAA001",
    stock: 10
};
const Producto2 = {
    titulo: "Tablet Lenovo IdeaPad",
    descripcion: "tablet de ultima generacion",
    precio: 15,
    imagen: "Sin imagen",
    codigo: "AAA002",
    stock: 15
};
const Producto3 = {
    titulo: "notebook HP Pavilion",
    descripcion: "notebook de ultima generacion",
    precio: 20,
    imagen: "Sin imagen",
    codigo: "AAA003",
    stock: 20
};
const Producto4 = {
    titulo: "Memoria RAM Corsair",
    descripcion: "memoria de ultima generacion",
    precio: 25,
    imagen: "Sin imagen",
    codigo: "AAA004",
    stock: 25
};

const ruta = './productos.json';

async function test() {
    // Función de prueba que instancia la clase y realiza diversas operaciones.
    const PM = new ProductManager(ruta);
    await PM.AgregarProducto(Producto1);
    await PM.AgregarProducto(Producto2);
    await PM.AgregarProducto(Producto3);
    await PM.AgregarProducto(Producto4);
    console.log('---------- Obtener productos ----------');
    const aux1 = await PM.ObtenerPoductos();
    console.log(aux1);
    console.log('---------- Obtener producto por ID, el 3 ----------');
    const aux2 = await PM.ObtenerProductoPorID(3);
    console.log(aux2);
    console.log('---------- Borrar un producto, el 2 ----------');
    await PM.BorrarProductoPorID(2);
    const aux3 = await PM.ObtenerPoductos();
    console.log(aux3);
    console.log('---------- Editar un producto, el 4 ----------');
    await PM.EditarProducto(4, 'codigo', 'pppppp');
    const aux4 = await PM.ObtenerPoductos();
    console.log(aux4);
    console.log('---------- Borro archivo ----------');
    await PM.BorrarArchivo();
}

test();