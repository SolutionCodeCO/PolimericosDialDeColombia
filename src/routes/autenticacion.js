const express = require("express");
const router = express.Router();
const passport = require("passport");
const { estaLogueado, noEstaLogueado } = require('../lib/auth');

// Middleware para verificar si el usuario está autenticado
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      const user = req.user;
      let ruta;
      if (user.rol_id === 1) {
        ruta = "/administrador";
      } else if (user.rol_id === 2) {
        ruta = "/usuario";
      } else {
        ruta = "/autenticacion"; // Redirigir a la página principal en caso de un rol desconocido o no definido
      }
      req.flash("error", "Debes iniciar primero sesion.")
      return res.redirect(ruta);
    }
    next(); // Continuar si el usuario no está autenticado
  }

router.get("/autenticacion", noEstaLogueado, (req, res) => {
  res.render("login/login");
});


router.post('/autenticacion/login',  ensureAuthenticated ,(req, res, next) => {
    passport.authenticate('local.iniciarSesion', (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        req.flash('error', 'Usuario o contraseña incorrectos.');
        return res.redirect('/autenticacion');
      }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        req.flash('success', `Bienvenido nuevamente ${user.nombre}`);
        const ruta = user.rol_id === 1 ? '/administrador' : '/usuario';
        return res.redirect(ruta);
      });
    })(req, res, next);
  });

router.post("/autenticacion/registroUsuario", (req, res, next) => {
  function validarCampos(req) {
    const { nombre, email, password } = req.body;
    return nombre && email && password; // Devuelve true si todos los campos están llenos, false si no
  }
  // Validar campos antes de la autenticación
  if (!validarCampos(req)) {
    req.flash("error", "Ningún campo puede quedar vacío.");
    return res.redirect("/autenticacion");
  }

  // Usar passport.authenticate con la configuración
  passport.authenticate("local.registro", {
    successRedirect: "/autenticacion",
    failureRedirect: "/autenticacion",
    failureFlash: true,
  })(req, res, next);
});

// Ruta para manejar el cierre de sesión
router.get('/logout', (req, res, next) => {
    req.logOut((err) => {
      if (err) {
        return next(err);
      }
      req.flash('success', 'Nos vemos luego.');
      res.redirect('/autenticacion');
    });
  });

module.exports = router;
