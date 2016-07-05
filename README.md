## Express JS Boilerplate

Webpack enabled Express JS Boilerplate

### Structure

Front end: Editable files are located in __./app/__ and are served from memory in development using Webpack.

Back end: Editable files are located in __root__ (server.js, routes.js, etc)

Development: __webpack.config.js__
Production: __webpack.production.config.js__

### Setup

1. `npm install`
2. Create __./.env__ file and add environment variables if any (NODE_ENV)

### Development for frontend

1. `npm start` - starts the Webpack dev server with Hot Module Replacement enabled for __css__ and __js__ files
2. Open http://localhost:8080 in your browser

### Development for backend

1. Build with webpack before starting server, Node serves the files from __./build/__
2. `npm install -g nodemon`
3. `nodemon ./bin/www` - starts the server on http://localhost:5000 

### Production

1. `npm run build` - builds the project in __./build/__ with uglified js and caching ready js and css