module.exports = (sequelize, Sequelize) => {

    const Coms = sequelize.define("Coms", {
      id: {
        allowNull:false,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      content: {
        allowNull:false,
        type: Sequelize.STRING
      },
      like: {
        allowNull:false,
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      createDate: {
        allowNull:false,
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
    }
    );
  
    return Coms;
  };