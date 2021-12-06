import express from "express";
import cors from "cors";
import ContenedorProductos from "./classes/ContenedorProductos.js";
import productsRouter from "./routes/productos.js";
import usersRouter from "./routes/users.js";
import upload from "./services/uploader.js";

const app = express();
const PORT = process.env.PORT || 8080;
const contenedor = new ContenedorProductos();

const server = app.listen(PORT, () => {
  console.log("Listening on port: ", PORT);
});

//ejs
app.set("view engine", "ejs");

//// use middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/api/products", productsRouter);
app.use("/api/users", usersRouter);

app.get("/", (req, res) => {
  res.render("desafioIndex.ejs", { users });
});

app.post(
  "/api/uploadfile",
  upload.fields([
    {
      name: "file",
      maxCount: 1,
    },
    {
      name: "documents",
      maxCount: 3,
    },
  ]),
  (req, res) => {
    const files = req.files;
    console.log(files);
    if (!files || files.length === 0) {
      res.status(500).send({ messsage: "No se subió archivo" });
    }
    res.send(files);
  }
);

/////Get all Products
app.get("/view/products", (req, res) => {
  contenedor.getAllProducts().then((result) => {
    let info = result.payload;
    let preparedObject = {
      users: info,
    };
    res.render("users", preparedObject);
  });
});
