module.exports = (sequelize, Sequelize) => {

    const Users = sequelize.define("User", {
      id: {
        allowNull:false,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      nom: {
        type: Sequelize.STRING,
        allowNull: false
      },
      prenom: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      role: {
        allowNull:false,
        type: Sequelize.ENUM('mute','user','admin'),
        defaultValue: 'user'
      },
    });
  
    return Users;
  };