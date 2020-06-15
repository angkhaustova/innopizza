# innopizza

Web application for online pizza ordering.

## Setup

### Server

`npm install`

#### Database

Update database credentials in `config/config.js` and `.env`.

`npx sequelize-cli db:create`

`npx sequelize-cli db:migrate`

`npx sequelize-cli db:seed:all`

### Client

`cd client/`

`npm install`

## Launch

### Server

`npm run server`

### Client

`npm start`
