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
        // unique: true,
        unique: {
          args: true,
          errMsg: 'Email address already in use!'
        },
        validate: {
          isEmail: true,
        }
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
      profilePic: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue :'http://localhost:3000/images/defaultPic/default.jpg'
      },
      bio: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    });
  
    return Users;
  };