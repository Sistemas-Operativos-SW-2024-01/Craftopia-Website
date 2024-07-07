const mongoose = require('mongoose');

const reseniaSchema = new mongoose.Schema({
  productoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto', required: true },
  autor: { type: String, required: true },
  comentario: { type: String, required: true },
  calificacion: { type: Number, required: true, min: 1, max: 5 },
  fecha: { type: Date, default: Date.now }
});

const Resenia = mongoose.model('Resenia', reseniaSchema);

module.exports = Resenia;
