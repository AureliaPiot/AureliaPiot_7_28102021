module.exports = (sequelize, Sequelize) => {

    const Posts = sequelize.define("Posts", {
      id: {
        allowNull:false,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      // idUser: {
      //   allowNull:false,
      //   type: Sequelize.INTEGER,
      //   reference:{
      //       model:'Users',
      //       key:'id'
      //   }
      // },
      content: {
        allowNull:false,
        type: Sequelize.STRING
      },
      attachement: {
        allowNull:true,
        type: Sequelize.STRING
      },
      like: {
        allowNull:false,
        type: Sequelize.STRING,
        defaultValue: '{"userLike":[]}'
      },
      createDate: {
        allowNull:false,
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      comments: {
        allowNull:true,
        type: Sequelize.STRING,
      },
    }
    );
  
    return Posts;
  };