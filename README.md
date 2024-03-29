# APIrest-express

This is a RESTful API built with Node.js and Express. It uses a variety of dependencies including Sequelize, Passport, and Winston for logging. The API allows users to create, read, update, and delete records from a database.

## Getting Started


### Installation
1 . Clone the repository: git clone https://github.com/samir93bj/03-apirest-express.git

2 . Install dependencies: `npm install`

## Usage
---------------------------------------

To start the server, `run npm start` or `npm run start:dev` for development mode.


* To run the migrations, use the following commands:

`npm run migrations:generate <migration-name>` to generate a new migration.

`npm run migrations:run` to run all pending migrations.

`npm run migrations:revert` to revert the last migration.

`npm run migrations:delete` to revert all migrations.


* To seed the database, use the following commands:

`npm run seed:all` to seed the database with all seeders.

`npm run seed:undo` to undo all seeders.

---------------------------------------
## Lint

To run linting, use `npm run lint` or `npm run lint:fix` to automatically fix fixable linting issues.


## e2e
To run end-to-end tests, use `npm run e2e` or `npm run e2e:coverage` to generate a coverage report.

## Dependencies

This project uses the following dependencies:

* hapi/boom
* bcrypt
* cloudinary
* cors
* cross-env
* dotenv
* express
* express-fileupload
* faker
* joi
* jsonwebtoken
* mysql2
* nodemailer
* passport
* passport-jwt
* passport-local
* pg
* pg-hstore
* pm2
* sequelize
* sequelize-cli
* umzug
* uuid
* winston
* winston-mongodb
* xlsx

---------------------------------------


## Dev Dependencies

This project uses the following dev dependencies:

*@types/jest
* eslint
* eslint-config-prettier
* eslint-config-standard
* eslint-plugin-import
* eslint-plugin-n
* eslint-plugin-prettier
* eslint-plugin-promise
* husky
* jest
* nodemon
* prettier
* sequelize-cli
* supertest

--------------------------------------------------

##License


This project is licensed under the ISC License.
