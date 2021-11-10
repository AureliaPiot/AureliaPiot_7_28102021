const dbConfig = require("../config/db.config");
const Sequelize = require("sequelize");
// info de la bdd
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: 0,  
    define: {
      timestamps: false
  }
  });



const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user.model.js")(sequelize, Sequelize);
db.posts = require("./post.model.js")(sequelize, Sequelize);
db.coms = require("./coms.model.js")(sequelize, Sequelize);
db.likes = require("./likes.model.js")(sequelize, Sequelize);


db.posts.belongsTo(db.users);
db.posts.hasMany(db.likes);
db.posts.hasMany(db.coms);

db.coms.belongsTo(db.users);
db.coms.hasMany(db.likes);




db.likes.belongsTo(db.users);
db.likes.belongsTo(db.posts);



// sequelize.sync({alter:true})
module.exports = db;