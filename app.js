const express = require('express')
const app = express()
const port = 3000

app.use(express.json());

//let products = [];
let products = [
  {
    id: 1,
    name: "Ivanhoe",
    author: "Sir Walter Scott",
  },
  {
    id: 2,
    name: "Colour Magic",
    author: "Terry Pratchett",
  },
  {
    id: 3,
    name: "The Bluest eye",
    author: "Toni Morrison",
  },
];


app.post('/products', function (req, res) {
  const newProduct = { ...req.body, id: products.length + 1 }
  products = [ ...products, newProduct]
  res.json(newProduct);
});

app.put('/products', function (req, res) {
  let updatedProduct;
  products = products.map(p => {
    if (p.id === req.body.id) {
      updatedProduct = { ...p, ...req.body };
      return updatedProduct;
    }
    return p;
  })
  res.json(updatedProduct);

});

app.delete('/products/:id', function (req, res) {
  const deletedProduct = products.find(p => p.id === +req.params.id);
  products = products.filter(p => p.id !== +req.params.id);
  res.json(deletedProduct);
});

app.get('/products/:id', function (req, res) {
  const getProductById = products.find(p => p.id === +req.params.id);
  //products = products.filter(p => p.id !== +req.params.id);
  res.json(getProductById);
});

app.get('/products', (req, res) => {
  res.json(products);
})

app.get('/', (req, res)=> {res.send("Hello Express")})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
  
