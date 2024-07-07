const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('./routes/index');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

async function connectDB() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/test', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Conectado a la base de datos');
  } catch (err) {
    console.error('Error al conectar con la base de datos:', err);
  }
}

connectDB();

// Configurar el motor de vistas y servir archivos estáticos
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views', 'pages'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
