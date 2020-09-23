// register routes
import { Express, Request, Response } from "express";

export const Routes = (app: Express) => {
  app.get("/", (req: Request, res: Response) => {
    res.send({
      hola: "Bienvenido",
      api: {
        "get all products": "http:127.0.0.1:8080/products",
        "get product by id": "http:127.0.0.1:8080/product/:sku/:codigo",
      },
    });
  });

 
};
