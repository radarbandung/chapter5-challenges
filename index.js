const express = require ("express");
const morgan = require ("morgan");
const ejs = require ("ejs");
const application = express();
const port = 3000;

//Content parser
application.use(express.json());
application.use(express.urlencoded({ extended: false }));

//View Engine for render file
application.set("view engine", "html");
application.engine("html", ejs.renderFile);

//Middleware Logger Morgan
application.use(morgan("tiny"));

//Render Mainscreen & Game
application.get("/", (req, res) => {
    return res.render("main/index");
})
application.get("/game", (req, res) => {
    return res.render("game/index");
})

//Express Static for rendering CSS and JavaScript files
application.use(express.static(__dirname + "/public/main"));
application.use(express.static(__dirname + "/public/game"));

//Port server
application.listen(port, () => {
    return console.log(`Server is on! at http://localhost:${port}`);
});