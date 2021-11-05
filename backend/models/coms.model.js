module.exports = (sequelize, Sequelize) => {

    const Coms = sequelize.define("Coms", {
      id: {
        allowNull:false,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
    //   idUser: {
    //     allowNull:false,
    //     type: Sequelize.INTEGER,
    //     reference:{
    //         model:'Users',
    //         key:'id'
    //     }
    //   },
    //   idPost: {
    //     allowNull:false,
    //     type: Sequelize.INTEGER,
    //     reference:{
    //         model:'Posts',
    //         key:'id'
    //     }
    //   },
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