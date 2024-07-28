import express from "express";
import bodyParser from "body-parser";
import methodOverride from "method-override";

var app = express();
var port = 3000;

var people = [];
var posting = [];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

// mendapat index.ejs
app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/edit", (req, res) => {
  res.render("edit.ejs");
});

// post di index.ejs
app.post("/post", (req, res) => {
  people.push(req.body["name"]);
  posting.push(req.body["write"]);
  res.render("post.ejs", {
    person: people,
    posts: posting,
  });
});

app.get("/post", (req, res) => {
  res.render("post.ejs", {
    person: people,
    posts: posting,
  });
});

app.use(methodOverride('_method'));
// memungkinkan kita menggunakan metode HTTP seperti PUT dan DELETE dalam formulir HTML yang hanya mendukung GET dan POST.

app.delete('/post/:index', (req, res) => {
  const index = req.params.index; // mendapatkan idx dari button yang user klik
  if (index >= 0 && index < people.length) {
    people.splice(index, 1); // saat posisi ke idx remove 1 item (yang berarti sama dgn remove item di posisi tersebut)
    posting.splice(index, 1); // saat posisi ke idx remove 1 item 
  }
  res.redirect('/post'); // mengarahkan kembali ke halaman post
});


app.get("/post/:index/edit", (req, res) => {
  const index = req.params.index;
  if (index >= 0 && index < posting.length) {
    res.render("edit.ejs", {
      index: index,
      person: people[index],
      post: posting[index]
    });
  } else {
    res.status(404).send('Post not found');
  }
});

app.put("/post/:index", (req, res) => {
  const index = req.params.index;
  if (index >= 0 && index < posting.length) {
    people[index] = req.body["name"];
    posting[index] = req.body["write"];
    res.redirect("/post");
  } else {
    res.status(404).send('Post not found');
  }
});


app.listen(port, () => {
  console.log("Server running on port", port);
});


