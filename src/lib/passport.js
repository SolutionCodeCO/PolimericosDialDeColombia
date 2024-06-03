const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../database');
const helpers = require('./helpers');

passport.use('local.iniciarSesion', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, async (req, email, password, done) => {
    try {
      const [rows] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);
      if (rows.length > 0) {
        const user = rows[0];
        const validPassword = await helpers.matchPassword(password, user.password);
        if (validPassword) {
          return done(null, user);
        } else {
          return done(null, false, { error: 'Contraseña incorrecta' });
        }
      } else {
        return done(null, false, { error: 'El usuario no existe' });
      }
    } catch (err) {
      return done(err);
    }
  }));

//   passport.use('local.registro', new LocalStrategy({
//     usernameField: 'email',
//     passwordField: 'password',
//     passReqToCallback: true
//   }, async (req, email, password, done) => {
//     try {
//       const { nombre } = req.body;
//       const hashedPassword = await helpers.encryptPassword(password);
//       const newUser = {
//         email,
//         password: hashedPassword,
//         nombre
//       };
//       const result = await pool.query('INSERT INTO usuarios SET ?', [newUser]);
//       newUser.id = result.insertId; // Establece el ID del nuevo usuario
//       console.log(newUser);
//       return done(null, newUser); // Pasa el nuevo usuario con su ID
//     } catch (err) {
//       return done(err);
//     }
//   }));

  passport.use(
    "local.registro",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        const { nombre } = req.body;
        const newUser = {
          email,
          password,
          nombre,
        };

        newUser.password = await helpers.encryptPassword(password);
        const resultRaw = await pool.query("insert into usuarios set ?", [
          newUser,
        ]);
        const resultado = resultRaw[0];

        console.log(`>>> Se acaba de registrar el usuario: ${newUser.nombre} `);
        req.flash('success', `${newUser.nombre}, ya puedes iniciar sesion.`)
        newUser.id = resultado.insertId;
        return done(null, newUser[0]);
      }
    )
  );


  passport.serializeUser((user, done) => {
    console.log('Serializing user:', user); // Debugging
    done(null, user.id); // Guarda el ID del usuario en la sesión
  });

  passport.deserializeUser(async (id, done) => {
    try {
      console.log('Deserializing user ID:', id); // Debugging
      const [rows] = await pool.query('SELECT * FROM usuarios WHERE id = ?', [id]);
      if (rows.length > 0) {
        done(null, rows[0]); // Recupera el usuario completo
      } else {
        done(new Error('Usuario no encontrado'));
      }
    } catch (err) {
      done(err);
    }
  });