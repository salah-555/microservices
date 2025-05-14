const express =  require ('express');
const mongoose   = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());

// Connexio monoodb
mongoose.connect(process.env.MONGO_URI)
       .then(() => console.log('MongoDb connected'))
       .catch(err => console.error('Erreur MongoDB : ', err))

// Routes 
app.use('/api/articles', require('./routes/articleRoutes'));

//Demarrage serveur 
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Microservice articles sur le port ${PORT}`));