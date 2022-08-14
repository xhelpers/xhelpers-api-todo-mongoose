# Sample TODO Mongoose api xhelpers 3.1.1

Sample API 'todo' mongoose -> mongodb

## Main Dependencies and Requisites

- [xhelpers-api 3.1](https://github.com/wmkDev/xhelpers-api).
- [TypeScript 4.5.5](https://www.typescriptlang.org/).
- [Node.js 12+](https://nodejs.org/).
- [Mongoose 6.2](https://mongoosejs.com/).
  - [Mongodb](https://www.mongodb.com/).

## Option 1 - With Docker

### Before you Start
Install:
- [docker-compose](https://docs.docker.com/compose/install/).
- [docker](https://docs.docker.com/engine/install/).

### Set the environment variables

Create a file named `.env` with them in the project root folder. Following the provided `env.example`.

For a fast start you can just rename the `env.docker.example` file to `.env`

### Run the project

On the terminal:

```bash
docker-compose up
```

if you are using your own database, run the following command to start just the application
```bash
docker-compose up api
```

Go to http://localhost:3000/documentation

To stop just run
```bash
docker-compose down
```

## Option 2 - Without docker

### Before you Start
Install:
- [docker-compose](https://docs.docker.com/compose/install/).
- [docker](https://docs.docker.com/engine/install/).
- [Node.js 14+](https://nodejs.org/).
- [NPM](https://www.npmjs.com/get-npm).


### Set the environment variables

Set the environment variables on your context or create a file named `.env` with them in the project root folder. Following the provided `env.example`.

For a fast start you can just rename the `env.example` file to `.env`

Enviroment sample `env.example`:
```
# Server
NODE_ENV=dev
LOG_LEVEL=HIGH
PORT=3000
HOST=localhost
SSL=false

# JWT
JWT_SECRET=VeryHardC0d3GO3sHer3xhelpersDevs
JWT_ISSUER=xhelpersDevs@api
JWT_EXPIRE=8h

# Database
MONGODB_URI=mongodb://mongo:mongo@mongodb:27017/?authSource=admin
```

### Start the database
Run:
```bash
docker-compose up -d mongodb
```


### Run the project

Install the dependencies:
```bash
npm install
```

```bash
npm run dev
```

Go to http://localhost:3000/documentation

### Stop the database
To stop the database just run
```bash
docker-compose down
```


## Routes

```
Starting Xhelpers Hapi server API
Settings API: Mongoose enabled;
🆙  Connected to mongodb: 6.2.8/mongodb+srv://dbadmin:xxxxx@samplenosql.c3iy3.mongodb.net
Settings API: Sequelize disabled;
Settings API: SSL disabled;
Settings API: Sentry disabled;
Settings API: AppKey disabled;
Settings API: JWT enabled;
Settings API: SSO disabled;
====================================================================================================
🆙  Server api    : http://localhost:3000/
🆙  Server doc    : http://localhost:3000/documentation
====================================================================================================
Routing table:
        🔎  get -           /documentation
        🔎  get -           /health
        🔎  get -           /swagger.json
        🔎  get -           /api/todos
        📄  post -          /api/todos
        🔎  get -           /api/todos/{id}
        📝  patch -         /api/todos/{id}
        📄  put -           /api/todos/{id}
        🚩  delete -        /api/todos/{id}
        🔎  get -    🔑     /api/users/todos
        📄  post -   🔑     /api/users/todos     
        🔎  get -    🔑     /api/users/{id}/todos
        📝  patch -  🔑     /api/users/{id}/todos        
        📄  put -    🔑     /api/users/{id}/todos        
        🚩  delete - 🔑     /api/users/{id}/todos
====================================================================================================
```