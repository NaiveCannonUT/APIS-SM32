const { json } = require("express");
const connection = require("../database");

const obtenerProductos = (req, res) => {
  connection.query("SELECT * FROM productos", (error, results) => {
    if (error) {
      console.error("Error al obtener productos", error);
      res.status(500).json({
        error: "Error al obtener productos",
      });
    } else {
      res.json(results);
    }
  });
};

const obtenerProductosPorId = (req, res) => {
  const id = req.params.id_producto

  connection.query('SELECT*FROM prodcutos WHERE id_productos = ?', [id],(error,results)=> {
    if(error) {
      console.error("Error al obtener productos", error);
      res.status(500),json({error:"Ocurrio un error al obtener los productos"})
    }else if(results.length === 0){
      res.status(500).json({error:"el prodcuto no fue encontrado"})
    }else{
      res.json(results[0])
    }
  })
    
}



const crearProductos = (req,res) => {
    const {nombre, descripcion, precio, imagen} = req.body 
    connection.query('INSERT INTO productos (nombre, descripcion, precio, imagen) VALUES (? ? ? ?)', [nombre, descripcion, precio, imagen], (error, results) => {
      if (error) {
        console.error("Error al agregar el producto", error)
        res.status(500).json({
          error:"Error al agregar productos"
        })
      }else{
        res.json({menssage: "producto agregado"})
      }
    })
}

const actualizarProductosPorId = (req,res) => {
  const id = req.params.id_producto
  const {nombre, descripcion, precio, imagen} = req.body

  connection.query('UPDATE productos SET nombre = ? descripcion = ? precio = ? imagen = ? WHERE id_categoria = ?', [nombre, descripcion, precio, imagen, id], (error,results) => {
    if(error) {
      console.error("Error al actualizar productos", error);
      res.status(500).json({error:"Hubo un error al actualizar los productos"})
    }else{
      res.json({message:"el producto fue actualizada correctamente"})
    }
  })
}

const elimninarCategoriasPorId = (req, res) => {
  const id = req.params.id_producto

  connection.query('DELETE FROM productos WHERE id_producto = ?', [id],(error,results)=> {
    if(error) {
      console.error("Error al eliminar el producto", error);
      res.status(500),json({error:"Ocurrio un error eliminar el producto"})
    }else if(results.length === 0){
      res.status(500).json({error:"el producto no fue eliminar"})
    }else{
      res.json({message:"el producto fue eliminada correctamente"})
    }
  })
    
}

module.exports = {
  obtenerProductos,
  obtenerProductosPorId,
  crearProductos,
  actualizarProductosPorId,
  elimninarCategoriasPorId,
}