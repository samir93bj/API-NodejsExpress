# API REST -Nodejs Express
API REST - Node js Express // Platzi

Server con ExpressJS
Este es un server hecho con ExpressJS.

Ejecución
npm run dev //Modo ejecución
npm start //Modo producción

--DOCKER
docker-compose up -d postgres
docker-compose up -d pgadmin

docker-compose up -d mysql
docker-compose up -d phpmyadmin

--Connect pgAdmin
docker ps => get 'CONTAINER ID'
docker inspect 'CONTAINER ID'


--CORRER MIGRACIONES EN HEROKU 
heroku run npx sequelize-cli db:migrate
heroku run npx sequelize-cli db:migrate:undo
