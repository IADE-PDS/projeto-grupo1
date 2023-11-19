require('dotenv').config();
var express = require('express');
var path = require('path');
var cookieSession = require('cookie-session');
var morgan = require('morgan');
var cors = require('cors');

var app = express();
app.use(cookieSession({ 
  name: 'session',
  keys: ['key1', 'key2'],
  secret: process.env.COOKIE_SECRET,
  // Cookie Options
  maxAge: 6 * 60 * 60 * 1000 // 6 hours
}))

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

const usersRouter = require("./routes/usersRoutes");
const produtoRouter = require("./routes/produtoRoutes");
const lojaRouter = require("./routes/lojaRoutes");
const productPageRouter = require("./routes/productPageRoute");
const shoplistRouter = require("./routes/shoplistsRoutes");
const stripe = require('./routes/stripe')

app.use("/api/users",usersRouter);
app.use("/api/produtos", produtoRouter);
app.use("/api/lojas", lojaRouter);
app.use("/api/shoplists", shoplistRouter);
app.use("/produto/:id", productPageRouter);
app.use("/api/stripe", stripe)


// when we don't find anything
app.use((req, res, next) => {
  res.status(404).send({msg:"No resource or page found."});
})

// When we find an error (means it was not treated previously)
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).send(err);
})

const port = parseInt(process.env.port || '8080');
app.listen(port,function() {
  console.log("Server running at http://localhost:"+port);
});