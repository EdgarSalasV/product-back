// register routes
import { Express, Request, Response } from "express";
import { getProducts, getProductById } from "../controller/product";

export const Routes = (app: Express) => {
  //#region PRODUCTS
    // get
  app.get("/producto", getProductById);
  app.get("/productos", getProducts);

  //#endregion PRODUCTS
};
