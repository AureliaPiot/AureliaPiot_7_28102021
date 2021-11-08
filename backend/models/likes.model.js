module.exports = (sequelize, Sequelize) => {

    const likes = sequelize.define("likes", {
      id: {
        allowNull:false,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }
    });
  
    return likes;
  };