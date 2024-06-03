const express = require("express");
const morgan = require("morgan");
const exphbs = require("express-handlebars");
const path = require("path");
const flash = require("connect-flash");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const passport = require('passport');
const { database } = require("./keys");

// inicializaciones
const app = express();
require('./lib/passport');

// configuraciones
app.set("port", process.env.PORT || 4000);
app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  exphbs.engine({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
    helpers: require("./lib/handlebars"),
  })
);
app.set("view engine", ".hbs");

// middlewares
app.use(
  session({
    secret: "secretKey",
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
  })
);
app.use(flash());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());


// variables globales
app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null; // Asegúrate de pasar el usuario logueado
  next();
});

// rutas
app.use(require("./routes"));
app.use(require("./routes/cursos"));
app.use(require("./routes/autenticacion"));
app.use(require("./routes/usuario"));
app.use(require("./routes/administrador"));

// archivos públicos
app.use(express.static(path.join(__dirname, "public")));

// iniciar el servidor
app.listen(app.get("port"), () => {
  console.log(">>>> SERVIDOR CORRIENDO EN EL PUERTO:", app.get("port"));
});
