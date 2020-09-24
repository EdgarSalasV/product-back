import { Request, Response } from "express";
import { Producto } from "../../entities/Producto";

async function getProducts(req: Request, res: Response) {
  let productoList: Producto[];
  try {
    productoList = await Producto.getRepository()
      .createQueryBuilder()
      .select("id, codigo, sku, descripcion, created_at, updated_at")
      .getRawMany();
  } catch (error) {}
  res.send({ code: 200, message: "pos todo bien", data: productoList });
}

async function getProductById(req: Request, res: Response) {
  const sku = req.query.sku ? req.query.sku.toString() : "";
  const codigo = req.query.codigo ? Number(req.query.codigo) : 0;
  let producto: Producto;
  try {
    let productoQuery = Producto.getRepository().createQueryBuilder("p");
    if (sku) productoQuery.where("p.sku = :sku", { sku });

    if (codigo) productoQuery.where("p.codigo = :codigo", { codigo });

    if (sku && codigo)
      productoQuery.where("p.codigo = :codigo OR p.sku = :sku", {
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
