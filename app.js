const express = require('express');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts'); // Add this line
const app = express();
const PORT = 4000;

app.set('view engine', 'ejs');
app.use(expressLayouts); // Add this line
app.set('layout', 'layout'); // Set the default layout file
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Dummy data
let products = [
    { "id": 1, "name": "Apple iPhone 15", "category": "Mobile", "price": 1099 },
    { "id": 2, "name": "Samsung Galaxy S23", "category": "Mobile", "price": 999 },
    { "id": 3, "name": "Sony WH-1000XM4 Headphones", "category": "Audio", "price": 349 },
    { "id": 4, "name": "Dell XPS 15 Laptop", "category": "Computers", "price": 1599 },
    { "id": 5, "name": "Lenovo ThinkPad X1", "category": "Computers", "price": 1399 },
    { "id": 6, "name": "Apple AirPods Pro", "category": "Audio", "price": 249 },
    { "id": 7, "name": "Samsung QLED 55\" TV", "category": "Appliances", "price": 799 },
    { "id": 8, "name": "LG 27” 4K Monitor", "category": "Computers", "price": 499 },
    { "id": 9, "name": "Asus ROG Strix Gaming Laptop", "category": "Computers", "price": 1899 },
    { "id": 10, "name": "Bose QuietComfort 45", "category": "Audio", "price": 329 },
    { "id": 11, "name": "Amazon Echo Dot", "category": "Audio", "price": 49 },
    { "id": 12, "name": "iPad Pro 12.9\"", "category": "Mobile", "price": 1099 },
    { "id": 13, "name": "Google Pixel 8", "category": "Mobile", "price": 899 },
    { "id": 14, "name": "Canon EOS M50 Camera", "category": "Accessories", "price": 649 },
    { "id": 15, "name": "Apple MacBook Air M2", "category": "Computers", "price": 1199 },
    { "id": 16, "name": "HP Envy x360", "category": "Computers", "price": 899 },
    { "id": 17, "name": "Sony PlayStation 5", "category": "Accessories", "price": 499 },
    { "id": 18, "name": "Xbox Series X", "category": "Accessories", "price": 499 },
    { "id": 19, "name": "Apple Watch Series 9", "category": "Accessories", "price": 399 },
    { "id": 20, "name": "Samsung Galaxy Tab S8", "category": "Mobile", "price": 849 }
  ];
  

// Routes
app.get('/', (req, res) => {
  res.render('login', { title: 'Login' });
});

app.get('/register', (req, res) => {
  res.render('register', { title: 'Register' });
});

app.post('/register', (req, res) => {
  res.redirect('/login');
});

app.get('/login', (req, res) => {
  res.render('login', { title: 'Login' });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Check for invalid credentials
  if (username === 'invalidUser' || password === 'invalidPassword') {
    return res.render('login', { title: 'Login', error: 'Invalid username or password' });
  }

  res.redirect('/products');
});

app.get('/products', (req, res) => {
  const search = req.query.search || '';
  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );
  res.render('products', { products: filteredProducts, search, title: 'Products' });
});

// Add a logout route
app.get('/logout', (req, res) => {
  // Clear session or authentication (if implemented)
  res.redirect('/login');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
