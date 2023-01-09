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
    console.log(jsonData, "15")
    res.render("todo", { name: jsonData });
  });
});
app.post("/add_todo", (req, res) => {
    console.log(req.body,"20")

    
  const result = req.body.todos;
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
    console.log(jsonData,"45");
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

app.post("/update_todo", (req, res) => {
  const result = req.body;
  console.log(result, "14");
  fs.readFile("database.json", (err, data) => {
    if (err) throw err;
    console.log("19", result);
    let jsonData = JSON.parse(data);
    console.log(jsonData,"83")
   jsonData[result.index].task=result.todos;
    fs.writeFile("database.json", JSON.stringify(jsonData), (err) => {
      if (err) throw err;
      res.redirect("/");
    //   res.render("todo", { name: jsonData });
    });
});

  });
app.listen(8000, () => {
  console.log("sever connected");
});
