# site-test

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### //////////////////////////////////////////////////////////////////////

### demarer le Back avec nodemon :
"npm start" ou si vous avez le fichier .env -"nodemon --exec 'node -r dotenv/config server.js'"

### lier votre base de donnée au back
dans le fichier 'config/db.config.js' ,entrés les informations de la base que vous voulez lié. 

### initier votre base de donnée
dans la base de votre application, inserer le code suivant :

 db.sequelize.sync({ force: true }).then(() => {
   console.log("Drop and re-sync db.");
 });

cela créera les tables necessaires via les models du back