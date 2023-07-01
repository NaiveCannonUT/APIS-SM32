const express = require("express");
const prodcutosControllers = require("../controllers/productosControllers");

const router = express.Router();

// !Rutas para las categorias
router.get('/', productosControllers.obtenerProductos);
router.get('/:id_producto', productosControllers.obtenerProductosPorId);
router.post('/', productosControllers.crearProductos);
router.delete('/:id_producto', productosControllers.elimninarProductosPorId)
router.put('/:id_producto', productosControllers.actualizarProductosPorId)


module.exports = router;