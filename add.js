const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://Grupo-09:grupo09@cursadanodejs.ls9ii.mongodb.net/Node-js',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
)
  .then(() => console.log('Conexión exitosa a MongoDB'))
  .catch(error => console.error('Error al conectar a MongoDB:', error));

  const superheroSchema = new mongoose.Schema({
    nombreSuperHeroe: {type: String, required: true},
    nombreReal: {type: String, required: true},
    edad: {type: Number, min: 0},
    planetaOrigen: {type: String, default: 'Desconocido'},
    debilidad: String,
    poderes: [String],
    aliados: [String],
    enemigos: [String],
    cratedAt: {type: Date, default: Date.now},
    Creador: {type: String, default: 'Sebastián Guaraz'}
  }, { collection: 'Grupo-09' });
  
  const SuperHero = mongoose.model('SuperHero', superheroSchema);
  
  async function insertSuperHero() {
    const hero = new SuperHero({
        nombreSuperHeroe: 'Spiderman',
        nombreReal: 'Peter Parker',
        edad : 25,
        planetaOrigen: 'Tierra',
        debilidad: 'radiactiva',
        poderes: ['Trapar Paredes', 'Sentido Arácnido', 'Super fuerza', 'Agilidad'],
        aliados: ['Iroman'],
        enemigos: ['Duende Verde']
    });
    await hero.save();
    console.log('Superheroe.insertado: ',hero );
  }
insertSuperHero();

async function updateSuperHero(nombreSuperHeroe)  {
    const result = await SuperHero.updateOne(
        {nombreSuperHeroe:nombreSuperHeroe },
        {$set:{edad:26}}
    );
    console.log('Resultado de la actualización: ',result)
}
updateSuperHero('Spiderman');

async function deleteSuperHero(NombreSuperHero){
    const result = await SuperHero.deleteOne({ nombreSuperHeroe:NombreSuperHero});
    console.log('Superhéroe Eliminado: ', result);
}
deleteSuperHero('Spiderman');

async function findSuperHeroes(){
    const heroes = await SuperHero.find({planetaOrigen:'Tierra'});
    console.log('Superhéroes encontrados: ', heroes);
} 
findSuperHeroes();

SuperHero.find()
  .then(heroes => console.log('Lista de héroes:', heroes))
  .catch(error => console.error('Error al obtener héroes:', error));

