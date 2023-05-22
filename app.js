const express = require("express");
const UserController = require("./controllers/userController");
const errHandler = require("./middlewares/errorHandler");
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post("/register", UserController.postRegister);
app.post("/login", UserController.postLogin);

app.use(errHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
