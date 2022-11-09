  const { DataTypes } = require('sequelize');
  // Exportamos una funcion que define el modelo
  // Luego le injectamos la conexion a sequelize.



  module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define("Pokemon",{
      id: {type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, allowNull:false, primaryKey: true },// UUID → Te genera un numero randon con letras y numeros unico y no se puede repetir
      name: {type: DataTypes.STRING, allowNull: false,},
      life: {type: DataTypes.STRING},
      attack: {type: DataTypes.STRING},
      defense: {type: DataTypes.STRING},
      speed: {type: DataTypes.STRING},
      height: {type: DataTypes.STRING},
      weight: {type: DataTypes.STRING},
      createInData: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true} //Hacer un llamado a solos los que estan creados en la base de datos 
    },{ timestamps:true , createdAt: false, updatedAt: "Ultima Actualizacion!"});
  };