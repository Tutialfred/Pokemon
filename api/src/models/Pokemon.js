const { DataTypes, Model } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

class pokemons extends Model {}

module.exports = (sequelize) => {
  // defino el modelo
  pokemon.init({
    id: {type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, allowNull:false, primaryKey: true },
    // UUID → Te genera un numero randon con letras y numeros unico y no se puede repetir

    name: {type: DataTypes.STRING, allowNull: false,},
    life: {type: DataTypes.STRING},
    attack: {type: DataTypes.STRING},
    defense: {type: DataTypes.STRING},
    speed: {type: DataTypes.STRING},
    height: {type: DataTypes.STRING},
    weight: {type: DataTypes.STRING},
    createInData: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true}
  });
};