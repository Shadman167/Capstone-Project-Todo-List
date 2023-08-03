import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
 
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

let itemToday = [];
let itemWork = [];
let lastDate;

app.get("/", (req, res) => {
  const now = new Date();

  if (lastDate && now.getDate() != lastDate.getDate()) {
    // If it's a different day then reset the lists
    itemToday = [];
    itemWork = [];
  }

  //Else make the new Date and populate the list

  lastDate = new Date();
  const options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    

  }

 

  const day = now.toLocaleDateString("en-US", options);

  res.render('index.ejs', {
    newListItems: itemToday,
    listTitle: day,

  });

});

app.post('/', (req, res) => {
    const inputItem = req.body.newItem;
    if (req.body.list === 'Work'){
        itemWork.push(inputItem);
        res.redirect("/work");
    }

    else{

        itemToday.push(inputItem);
        res.redirect("/");
    }

    
});

app.get("/work", (req, res) => {

    res.render("index.ejs", {
        listTitle: "Work List",
        newListItems: itemWork,

    })
})

app.post("/work", (req, res) => {

    const item = req.body.newItem;
    itemWork.push(item);
    res.redirect("/work");
})

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
