import express from "express";
const routes = express.Router()
import User from "../Controller/User.js";
import Product from "../Controller/Product.js";
import upload from "../ImageUploader/ImageUploader.js"
routes.post("/registration", User.registration)
routes.post("/login", User.login)


routes.post("/products", upload.array('image', 5), Product.createproduct)
routes.get("/products", Product.AllProduct)
routes.get("/products/:id", Product.ProductByID)
routes.put("/products/:id",upload.array('image', 5), Product.ProductUpdate)
routes.delete("/products/:id",Product.ProductDelete)



export default routes 