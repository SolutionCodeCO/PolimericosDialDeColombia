const express = require('express')
const router = express.Router()
const pool = require('../database')
const { estaLogueado } = require('../lib/auth'); 



router.get('/usuario', async(req, res)=>{
    const [rows_playlist] = await pool.query('SELECT * FROM playlists')
    const playlist = rows_playlist

    const [rows_cursos] = await pool.query("SELECT COUNT(*) AS cantidad FROM cursos");
    const contador_cursos = rows_cursos[0].cantidad;

    res.render('user/usuario', {playlist, contador_cursos})
})

router.post('/usuario/testimonio-user',estaLogueado, async(req, res)=>{
    const { comentario } = req.body;
    const nuevoTestimonio = {
      comentario,
      usuario_id: req.user.id // Utiliza el ID del usuario logueado
    };
    await pool.query('INSERT INTO testimonios SET ?', [nuevoTestimonio]);
    req.flash('success', 'Testimonio creado exitosamente');
    res.redirect('/usuario');
})

// TRAER CURSOS
router.get('/aprendizaje/cursosUser/:id', async (req, res) => {
  const { id } = req.params;
  // Consulta para contar los cursos asociados a la playlist
  const [rows_cursos] = await pool.query(
      `SELECT COUNT(*) AS cantidad 
       FROM Cursos c
       JOIN Playlist_Cursos pc ON c.id = pc.curso_id
       WHERE pc.playlist_id = ?`, [id]
  );
  const cantidad_cursos = rows_cursos[0].cantidad;

  try {
      // Consulta para obtener los datos de la playlist
      const [playlistRows] = await pool.query('SELECT * FROM Playlists WHERE id = ?', [id]);
      const playlist = playlistRows[0];

      if (!playlist) {
          req.flash('error', 'Playlist no encontrada');
          return res.redirect('/usuario');
      }

      // Consulta para obtener los cursos asociados a la playlist
      const [cursoRows] = await pool.query(
          `SELECT c.* FROM Cursos c
           JOIN Playlist_Cursos pc ON c.id = pc.curso_id
           WHERE pc.playlist_id = ?`, [id]);

      // Renderizar la vista con los datos de la playlist y sus cursos
      res.render('user/cursosUser', { playlist, cursos: cursoRows, cantidad_cursos});

  } catch (error) {
      req.flash('error', 'Error al obtener la playlist y sus cursos');
      res.redirect('/cursos');
  }
})



module.exports = router