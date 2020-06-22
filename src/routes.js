const express = require("express");
const routes = express.Router();
const ProductController = require("./controlles/ProductController");
const UserController = require("./controlles/UserController");

routes.get("/products", ProductController.index);
routes.get("/products/:id", ProductController.show);
routes.post("/products", ProductController.store);
routes.put("/products/:id", ProductController.udpdate);
routes.delete("/products/:id", ProductController.destroy);

//USER

routes.get("/", UserController.index);
routes.get("/call/:id", UserController.show);
routes.post("/users", UserController.store);
routes.put("/users/:id", UserController.udpdate);
routes.delete("/users/:id", UserController.destroy);

module.exports = routes;
