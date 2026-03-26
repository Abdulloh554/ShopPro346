const jsonServer = require('json-server');
const server = jsonServer.create();
const middlewares = jsonServer.defaults();
const fs = require('fs');
const path = require('path');

// Port to run the server
const PORT = 3000;

// Load all JSON data
const products = JSON.parse(fs.readFileSync(path.join(__dirname, 'product.json'), 'utf-8'));
const carusel = JSON.parse(fs.readFileSync(path.join(__dirname, 'carusel.json'), 'utf-8'));
const users = JSON.parse(fs.readFileSync(path.join(__dirname, 'users.json'), 'utf-8'));
const cart = JSON.parse(fs.readFileSync(path.join(__dirname, 'cart.json'), 'utf-8'));
const likes = JSON.parse(fs.readFileSync(path.join(__dirname, 'likes.json'), 'utf-8'));

// Combine into one database object
// Note: we use the keys that match the file names/frontend expectations
const db = {
  ...products, // contains 'products' key
  ...carusel,  // contains 'carusel' key
  ...users,    // contains 'users' key
  ...cart,     // contains 'cart' key
  ...likes     // contains 'likes' key
};

const router = jsonServer.router(db);

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Custom routes or middleware can be added here if needed

server.use(router);

server.listen(PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}`);
});
