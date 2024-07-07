const express = require('express');
const router = express.Router();
const Producto = require('../models/producto');
const Resenia = require('../models/resenias');

// Ruta para mostrar la página principal con los productos y sus reseñas
router.get('/productos', async (req, res) => {
  try {
    const productos = await Producto.find({}).populate('resenias');
    res.render('products', { productos });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los productos: ' + error.message });
  }
});

// Ruta para mostrar el formulario para añadir un nuevo producto
router.get('/productos/nuevo', (req, res) => {
  res.render('new-product');
});

// Ruta para manejar POST en /productos
router.post('/productos', async (req, res) => {
  try {
    const producto = new Producto(req.body);
    await producto.save();
    res.redirect('/productos');
  } catch (err) {
    res.status(400).send(err);
  }
});

// Ruta para eliminar un producto por ID
router.delete('/productos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Producto.findByIdAndDelete(id);
    if (result) {
      res.json({ message: 'Producto eliminado correctamente' });
    } else {
      res.status(404).json({ message: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el producto: ' + error.message });
  }
});

// Crear una nueva reseña (POST)
router.post('/resenias', async (req, res) => {
  try {
    const resenia = new Resenia(req.body);
    await resenia.save();
    // Añadir la reseña al producto correspondiente
    const producto = await Producto.findById(req.body.productoId);
    producto.resenias.push(resenia);
    await producto.save();
    res.status(201).json(resenia);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Obtener todas las reseñas (GET)
router.get('/resenias', async (req, res) => {
  try {
    const resenias = await Resenia.find({});
    res.json(resenias);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las reseñas: ' + error.message });
  }
});

// Actualizar una reseña por ID (PUT)
router.put('/resenias/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const resenia = await Resenia.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!resenia) {
      return res.status(404).json({ message: 'Reseña no encontrada' });
    }
    res.json(resenia);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar la reseña: ' + error.message });
  }
});

// Eliminar una reseña por ID (DELETE)
router.delete('/resenias/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const resenia = await Resenia.findByIdAndDelete(id);
    if (!resenia) {
      return res.status(404).json({ message: 'Reseña no encontrada' });
    }
    // Eliminar la reseña del producto correspondiente
    await Producto.findByIdAndUpdate(resenia.productoId, { $pull: { resenias: id } });
    res.json({ message: 'Reseña eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la reseña: ' + error.message });
  }
});

module.exports = router;
