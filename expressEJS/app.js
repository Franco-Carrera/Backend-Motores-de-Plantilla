import express from "express";
const app = express();
const server = app.listen(8080, () => {
  console.log("listening on 8080");
});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
let users = [];

app.get("/ulog", (req, res) => {
  let user_logueado = { name: "Sheng", last_name: "Ming" };
  let comida = [
    { name: "Tacos", price: 50 },
    { name: "Golosina", price: 15 },
    { name: "Emparedado", price: 30 },
    { name: "Pure", price: 60 },
  ];
  res.render("index", { user: user_logueado, food: comida });
});

app.get("/", (req, res) => {
  res.render("desafioIndex.ejs", { users });
});

app.get("/datos", (req, res) => {
  let { min, max, nivel, titulo } = req.query;
  res.render("medidor", {
    min: min,
    max: max,
    value: nivel,
    title: titulo,
  });
});
app.post("/personas", (req, res) => {
  console.log(users);
  let user = {
    name: req.body.name,
    last_name: req.body.last_name,
    age: req.body.age,
  };
  users.push(user);
  console.log(users);
  res.send({ message: "registered" });
});
