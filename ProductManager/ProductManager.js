class ProductManager {
    constructor() {
      this.products = [];
    }
  
    getProducts() {
      return this.products;
    }
  
    addProduct({ title, description, price, thumbnail, code, stock }) {
      // Verifica si el código ya está en uso
      const codeExists = this.products.some((product) => product.code === code);
      if (codeExists) {
        throw new Error("El código de producto ya está en uso.");
      }
  
      // Genera un id único
      const id = this.generateUniqueId();
  
      // Crea un nuevo producto
      const newProduct = {
        id,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };
  
      // Agregar el producto al array
      this.products.push(newProduct);
  
      // Devuelve el producto recién agregado
      return newProduct;
    }
  
    getProductById(id) {
      const product = this.products.find((product) => product.id === id);
  
      if (!product) {
        throw new Error("Producto no encontrado.");
      }
  
      return product;
    }
  
    // Método para generar un id único
    generateUniqueId() {
      return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
  }
  
  // Crea una instancia de ProductManager
  const productManager = new ProductManager();
  
  // Obtiene productos (debería ser un arreglo vacío [])
  console.log("Productos iniciales:", productManager.getProducts());
  
  // Agregar un nuevo producto
  const newProduct1 = productManager.addProduct({
    title: "Samsung Galaxy",
    description: "Ultima generacion de Samsung",
    price: 200,
    thumbnail: "Sin imagen",
    code: "abc123",
    stock: 25,
  });
  
  // Mostrar los productos después de agregar uno
  console.log("Productos después de agregar uno:", productManager.getProducts());
  
  // Intentar agregar un producto con el mismo código (debería arrojar un error)
  try {
    productManager.addProduct({
      title: "producto repetido",
      description: "Este es un producto repetido",
      price: 150,
      thumbnail: "Sin imagen",
      code: "abc123",
      stock: 10,
    });
  } catch (error) {
    console.error("Error al agregar producto repetido:", error.message);
  }
  
  // Obtener un producto por id (debería devolver el producto recién agregado)
  console.log("Producto por ID:", productManager.getProductById(newProduct1.id));
  
  // Intentar obtener un producto con un id inexistente (debería arrojar un error)
  try {
    productManager.getProductById("id_inexistente");
  } catch (error) {
    console.error("Error al obtener producto por ID inexistente:", error.message);
  }