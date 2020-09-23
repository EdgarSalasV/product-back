import { Request, Response } from "express";
import { Producto } from "../../entities/Producto";

function getProducts(req: Request, res: Response) {
  res.send({ code: 200, message: "pos todo bien", data: [] });
}

async function getProductById(req: Request, res: Response) {
  const sku = req.query.sku ? req.query.sku.toString() : "";
  const codigo = req.query.codigo ? Number(req.query.codigo) : 0;
  let producto: Producto;
  try {
    let productoQuery = Producto.getRepository().createQueryBuilder("p");
    if (sku) productoQuery.where('p.sku = :sku', { sku });

    if (codigo) productoQuery.where('p.codigo = :codigo', { codigo });

    if (sku && codigo)
      productoQuery.where('p.codigo = :codigo OR p.sku = :sku', {
        codigo,
        sku,
      });

    producto = await productoQuery.getOne();
  } catch (error) {
    console.error(error);
  }
  res.send({ code: 200, message: "pos todo bien", data: producto });
}

export { getProducts, getProductById };
