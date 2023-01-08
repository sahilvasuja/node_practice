const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const staticpath = path.join(__dirname, "../public");
console.log(staticpath);
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.get("/", function (req, res) {
  fs.readFile("database.json", (err, data) => {
    if (err) throw err;
    let jsonData = JSON.parse(data);
    res.render("todo", { name: jsonData });
  });
});
app.post("/add_todo", (req, res) => {
  const result = req.body.todo;
  console.log(result, "14");
  fs.readFile("database.json", (err, data) => {
    if (err) throw err;
    console.log("19", result);
    let jsonData = JSON.parse(data);
    const todo = {
      task: result,
      iscompleted: false,
    };
    jsonData.push(todo);
    fs.writeFile("database.json", JSON.stringify(jsonData), (err) => {
      if (err) throw err;

      res.render("todo", { name: jsonData });
    });
  });
});
app.get("/check/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id,"39")
  fs.readFile("database.json", (err, data) => {
    if (err) throw err;
    const jsonData = JSON.parse(data);
    jsonData[id].iscompleted=!jsonData[id].iscompleted
    console.log()
    console.log(jsonData);
    fs.writeFile("database.json", JSON.stringify(jsonData), (err) => {
      if (err) throw err;
      console.log("checked is given");
    });
  });
  res.redirect("/");
});

app.get("/delete/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id, "37");
  // Retrieve the to-do list from local storage
    fs.readFile("database.json", (err, data) => {
        if (err) throw err;
            const jsonData = JSON.parse(data);
            jsonData.splice(id, 1);
            console.log(jsonData);
            fs.writeFile("database.json", JSON.stringify(jsonData), (err) => {
                if (err) throw err;
                console.log("Data written to file");
            });
    });
    console.log("Deleted Todo Successfully!");
    res.redirect("/");
});

app.get("/update/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id, "65");
  fs.readFile("database.json", (err, data) => {
    if (err) throw err;
    const result = req.body.todo;
    const jsonData = JSON.parse(data);
    jsonData[id].task = result;
    fs.writeFile("database.json", JSON.stringify(jsonData), (err) => {
      if (err) throw err;
      console.log("Data updated");
    });
  });
  res.redirect("/");
});
app.listen(8000, () => {
  console.log("sever connected");
});
