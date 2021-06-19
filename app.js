const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const cookieParser = require("cookie-parser");
const csrf = require("csurf");
const csrfMiddleware = csrf({ cookie: true });
app.engine("html", require("ejs").renderFile);
app.use(express.static("static"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// app.use(cookieParser("secret"));
// app.use(csrfMiddleware);

// app.all("*", (req, res, next) => {
//   res.cookie("XSRF-TOKEN", req.csrfToken());
//   next();
// });

app.get("/", function (req, res) {
  res.render("index.html");
});
require("./routes/routes")(app);
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
