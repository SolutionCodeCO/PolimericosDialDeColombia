const express = require('express')
const router = express.Router()
const pool = require('../database')


router.get('/cursos', async (req, res)=>{
    const [rows_playlist] = await pool.query('SELECT * FROM playlists')
    const playlist = rows_playlist

    const [rows_cursos] = await pool.query("SELECT COUNT(*) AS cantidad FROM cursos");
    const contador_cursos = rows_cursos[0].cantidad;

    
    res.render('aprendizaje/cursos', {playlist, contador_cursos})
})

// TRAER CURSOS
router.get('/aprendizaje/cursosIndex/:id', async (req, res) => {
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
        res.render('aprendizaje/cursosID', { playlist, cursos: cursoRows, cantidad_cursos});

    } catch (error) {
        req.flash('error', 'Error al obtener la playlist y sus cursos');
        res.redirect('/cursos');
    }
})

module.exports = router