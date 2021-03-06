import express from "express";
import ContenedorProductos from "../classes/ContenedorProductos.js";
import upload from "../services/uploader.js";
const router = express.Router();
const contenedor = new ContenedorProductos();

//ver imports
//////////
/// GETS
router.get("/", (req, res) => {
  contenedor.getAllProducts().then((result) => {
    res.send(result);
  });
});

router.get("/:pid", (req, res) => {
  let id = parseInt(req.params.pid);
  contenedor.getProductById(id).then((result) => {
    res.send(result);
  });
});

/// POSTS
router.post("/", upload.single("image"), (req, res) => {
  let file = req.file;
  let product = req.body;
  product.thumbnail =
    req.protocol + "://" + req.hostname + ":8080" + "/images/" + file.filename;
  contenedor.registerProduct(product).then((result) => {
    res.send(result);
    if (result.status === "success") {
      contenedor.getAllProducts().then((result) => {
        //console.log(results)
        io.emit("deliverProducts", result);
      });
    }
  });
});

//PUTs
router.put("/:pid", (req, res) => {
  let body = req.body;
  let id = parseInt(req.params.pid);
  contenedor.updateProduct(id, body).then((result) => {
    res.send(result);
  });
});

//DELETEs
router.delete("/:pid", (req, res) => {
  let id = parseInt(req.params.pid);
  contenedor.deleteProduct(id).then((result) => {
    res.send(result);
  });
});

export default router;
