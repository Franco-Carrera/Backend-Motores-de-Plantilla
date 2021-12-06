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

app.set("views", "./views");
app.set("view engine", "pug");

app.use(express.json());
app.use(cors());
app.use(express.static("public"));
app.use("/api/products", productsRouter);
app.use("/api/users", usersRouter);

app.get("/helloPug", (req, res) => {
  res.render("hello", { message: "Hello, I am Pug, woof Universo" });
});

app.get("/datos", (req, res) => {
  let { min, nivel, max, titulo } = req.query;
  res.render("progress", { min: min, nivel: nivel, max: max, title: titulo });
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
/*
const getAllFoods = () => [
  {
    id: 1,
    name: "pasta",
    price: 156,
  },
  {
    id: 2,
    name: "carne",
    price: 656,
  },
  {
    id: 3,
    name: "frutas",
    price: 96,
  },
];
/*/

app.get("/food", (req, res) => {
  let food = getAllProducts();
  res.render("restaurant", { foodArray: food });
});

// app.get("/view/products", (req, res) => {
//   contenedor.getAllProducts().then((result) => {
//     let info = result.payload;
//     let preparedObject = {
//       products: info,
//     };
//     res.render("products", { getAllProducts: preparedObject });
//   });
// });
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

app.get("/view/products", (req, res) => {
  contenedor.getAllProducts().then((result) => {
    let info = result.payload;
    let preparedObject = {
      products: info,
    };
    res.render("restaurant", { foodArray: preparedObject });
  });
});
