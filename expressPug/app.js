import express from "express";

const app = express();

const server = app.listen(8080, () => {
  console.log("Listening in port 8080");
});

app.set("views", "./views");
app.set("view engine", "pug");
app.use(express.static("public"));

app.get("/helloPug", (req, res) => {
  res.render("hello", { message: "Hello, I am Pug, woof Universo" });
});

app.get("/datos", (req, res) => {
  let { min, nivel, max, titulo } = req.query;
  res.render("progress", { min: min, nivel: nivel, max: max, title: titulo });
});

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

app.get("/food", (req, res) => {
  let food = getAllFoods();
  res.render("restaurant", { foodArray: food });
});
