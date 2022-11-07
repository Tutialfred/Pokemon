const { DataTypes, Model } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

class Tipo extends Model {}

module.exports = (sequelize) => {
  // defino el modelo
  Tipo.init({
    id: {type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, allowNull:false, primaryKey: true },
    // UUID → Te genera un numero randon con letras y numeros unico y no se puede repetir

    name: {type: DataTypes.STRING, allowNull: false,},

    createInData: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true}
  });
}