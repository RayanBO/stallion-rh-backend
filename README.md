# deployer to 
its to [Glitch](https://glitch.com/edit/#!/butternut-lean-powder?path=database.js%3A3%3A0)

# url 
https://butternut-lean-powder.glitch.me/

https://butternut-lean-powder.glitch.me/intervenant/listes

 #url front end 
 stallion-rh-online.web.app

# etape 
1. dans package.json
``` json
{
  "name": "your-app-name",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "express": "^4.17.1",
    "sqlite3": "^5.0.0"
  },
  "engines": {
    "node": "14.x"
  }
}
```

2. add : database.sqlite dans le -ASSETS- de glitch
3. add : PORT dans .env
