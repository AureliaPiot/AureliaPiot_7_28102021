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

      createDate: {
        allowNull:false,
        type: Sequelize.DATE,
      },
    }
    );
  
    return Coms;
  };