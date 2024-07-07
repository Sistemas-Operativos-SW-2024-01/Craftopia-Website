const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  codigo: { type: Number, required: true },
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  precio: { type: Number, required: true },
  cantidad: { type: Number, required: true },
  artesanos_codigo: { type: Number, required: true },
  categorias_codigo: { type: Number, required: true },
  imagen: { type: String, default: '/images/default.png' },
  resenias: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Resenia' }]
});

const Producto = mongoose.model('Producto', productoSchema);

module.exports = Producto;
