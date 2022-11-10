  const { DataTypes } = require('sequelize');
  // Exportamos una funcion que define el modelo
  // Luego le injectamos la conexion a sequelize.



  module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define("Characterr",{
      id: {type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, allowNull:false, primaryKey: true },// UUID → Te genera un numero randon con letras y numeros unico y no se puede repetir
      name: {type: DataTypes.STRING, allowNull: false,},
      nickname: {type: DataTypes.STRING},
      birthday: {type: DataTypes.STRING},
      status: {type: DataTypes.ENUM("Alive", "Deceased", "Presumed dead", "Unknown"), allowNull: false},
      image: {type: DataTypes.STRING},
      createInData: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true} //Hacer un llamado a solos los que estan creados en la base de datos 
    },{ timestamps:true , createdAt: false, updatedAt: "Ultima Actualizacion!"});
  };