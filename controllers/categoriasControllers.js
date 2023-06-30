const { json } = require("express");
const connection = require("../database");

const obtenerCategorias = (req, res) => {
  connection.query("SELECT * FROM categorias", (error, results) => {
    if (error) {
      console.error("Error al obtener categorias", error);
      res.status(500).json({
        error: "Error al obtener categorias",
      });
    } else {
      res.json(results);
    }
  });
};

const obtenerCategoriasPorId = (req, res) => {
  const id = req.params.id_categoria

  connection.query('SELECT*FROM categorias WHERE id_categoria = ?', [id],(error,results)=> {
    if(error) {
      console.error("Error al obtener categorias", error);
      res.status(500),json({error:"Ocurrio un error al obtener la categorias"})
    }else if(results.length === 0){
      res.status(500).json({error:"la categoria no fue encontrada"})
    }else{
      res.json(results[0])
    }
  })
    
}



const crearCategorias = (req,res) => {
    const {nombre} = req.body 
    connection.query('INSERT INTO categorias (nombre) VALUES (?)', [nombre], (error, results) => {
      if (error) {
        console.error("Error al agregar categorias", error)
        res.status(500).json({
          error:"Error al agregar fabricantes"
        })
      }else{
        res.json({menssage: "categoria agregada"})
      }
    })
}

const actualizarCategoriasPorId = (req,res) => {
  const id = req.params.id_categoria
  const {nombre} = req.body

  connection.query('UPDATE categorias SET nombre = ? WHERE id_categoria = ?', [nombre, id], (error,results) => {
    if(error) {
      console.error("Error al actualizar categorias", error);
      res.status(500).json({error:"Hubo un error al actualizar la categoria"})
    }else{
      res.json({message:"La categoria fue actualizada correctamente"})
    }
  })
}

const elimninarCategoriasPorId = (req, res) => {
  const id = req.params.id_categoria

  connection.query('DELETE FROM categorias WHERE id_categoria = ?', [id],(error,results)=> {
    if(error) {
      console.error("Error al eliminar categorias", error);
      res.status(500),json({error:"Ocurrio un error eliminaer la categorias"})
    }else if(results.length === 0){
      res.status(500).json({error:"la categoria no fue eliminar"})
    }else{
      res.json({message:"La categoria fue eliminada correctamente"})
    }
  })
    
}

module.exports = {
  obtenerCategorias,
  obtenerCategoriasPorId,
  crearCategorias,
  actualizarCategoriasPorId,
  elimninarCategoriasPorId,
}

