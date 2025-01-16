const express = require("express");
const db = require("./database-mysql/index")
const app = express();
const PORT = 3000;
const productRouters = require('./routers/ProductRouters')
const cors = require("cors")

app.use(cors())
app.use(express.json())
app.use('/products', productRouters)
app.use(express.static(__dirname + "../react-client/index.jsx"));


app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
  });
  