const express = require('express')
const router = express.Router()
const pool = require('../database')
const { estaLogueado, noEstaLogueado } = require("../lib/auth");

// INDEX
router.get('/administrador', estaLogueado,async (req, res) => {
    try {
        const [rows_play] = await pool.query("SELECT COUNT(*) AS cantidad FROM playlists");
        const contador_playlist = rows_play[0].cantidad;

        const [rows_users] = await pool.query("SELECT COUNT(*) AS cantidad FROM usuarios");
        const contador_usuarios = rows_users[0].cantidad;

        const [rows_comentarios] = await pool.query("SELECT COUNT(*) AS cantidad FROM testimonios");
        const contador_testimonios = rows_comentarios[0].cantidad;

        const [rows_contacto] = await pool.query("SELECT COUNT(*) AS cantidad FROM contactos");
        const contador_contactos = rows_contacto[0].cantidad;

        res.render('admin/index', { contador_playlist, contador_usuarios, contador_testimonios, contador_contactos });
    } catch (error) {
        console.error('Error fetching playlist count:', error);
        res.status(500).send('Error fetching playlist count');
    }
});

// TESTIMONIOS
// TRAER TESTIMONIOS
router.get('/administrador/testimonios', estaLogueado, async (req, res) => {
    const query = `
        SELECT testimonios.*, usuarios.nombre AS usuario_nombre 
        FROM testimonios 
        JOIN usuarios ON testimonios.usuario_id = usuarios.id
    `;
    const [rows_testimonios] = await pool.query(query);
    const testimonios = rows_testimonios;
    
    res.render('admin/testimonios', { testimonios });
});

// ELIMINAR TESTIMONIOS
router.get('/testimonios/:id', estaLogueado,async(req, res)=>{
    const {id} = req.params
    
    try {
        await pool.query('DELETE FROM testimonios WHERE id = ?', [id])
        req.flash('success', 'Testimonio eliminado con éxito!');
    } catch (error) {
        req.flash('error', 'Error al eliminar el testimonio:', [id]);
    }
    res.redirect("/administrador/testimonios")

})

// USUARIOS
// TRAER USUARIOS
router.get('/administrador/usuarios', estaLogueado ,async(req, res)=>{
    const [row_usuarios] = await pool.query('SELECT * FROM usuarios')
    const usuarios = row_usuarios

    res.render('admin/usuarios', {usuarios})
})

// ELIMINAR USUARIOS
router.get('/usuarios/:id', estaLogueado, async(req, res)=>{
    const {id} = req.params

    try {
        pool.query('DELETE FROM usuarios WHERE id = ?', [id])
        req.flash('success', 'Usuario eliminado con éxito!');
    } catch (error) {
        req.flash('error', 'Error al eliminar al usuario:', [id]);
    }
    res.redirect("/administrador/usuarios")

})


// CONTACTOS
// TRAER CONTACTOS
router.get('/administrador/contacto', estaLogueado,async (req, res)=>{
    try {
        const [row_contactos] = await pool.query('SELECT * FROM contactos')
        res.render('admin/contacto', { contactos: row_contactos });
    } catch (error) {
        req.flash('error', 'Error al obtener los contactos del index');
        res.redirect('/administrador/aprendizaje');
    }
})

// ELIMINAR CONTACTOS
router.get('/contacto/eliminar/:id', estaLogueado,async(req, res)=>{
    const {id} = req.params
    
    try {
        await pool.query('DELETE FROM contactos WHERE id = ?', [id])
        req.flash('success', 'Contacto eliminado con éxito!');
    } catch (error) {
        req.flash('error', 'Error al eliminar el contacto');
    }
    res.redirect("/administrador/contacto")

})

// APRENDIZAJE
// TRAER PLAY LIST
router.get('/administrador/aprendizaje', estaLogueado,async (req, res) => {
    try {
        const [rows_playlist] = await pool.query('SELECT * FROM playlists');
        res.render('admin/aprendizaje', { playlist: rows_playlist });
    } catch (error) {
        req.flash('error', 'Error al obtener las playlists');
        res.redirect('/administrador/aprendizaje');
    }
});

// CREAR PLAY LIST
router.post('/form_playlist', estaLogueado,async (req, res) => {
    const { nombre, descripcion } = req.body;
    const newPlaylist = { nombre, descripcion };

    try {
        await pool.query('INSERT INTO playlists set ?', [newPlaylist]);
        req.flash('success', '¡PlayList creada con éxito!');
    } catch (error) {
        req.flash('error', 'Error al crear la playlist');
    }
    res.redirect("/administrador/aprendizaje");
});

// ELIMINAR PLAYLIST
router.get('/aprendizaje/:id', estaLogueado,async (req, res) => {
    const { id } = req.params;
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    try {
        // Obtener los IDs de los cursos relacionados con la playlist
        const [cursoIds] = await connection.query('SELECT curso_id FROM Playlist_Cursos WHERE playlist_id = ?', [id]);

        // Eliminar las relaciones en la tabla Playlist_Cursos
        await connection.query('DELETE FROM Playlist_Cursos WHERE playlist_id = ?', [id]);

        // Eliminar los cursos relacionados de la tabla Cursos
        const cursoIdArray = cursoIds.map(row => row.curso_id);
        if (cursoIdArray.length > 0) {
            await connection.query('DELETE FROM Cursos WHERE id IN (?)', [cursoIdArray]);
        }

        // Finalmente, eliminar la playlist de la tabla Playlists
        await connection.query('DELETE FROM Playlists WHERE id = ?', [id]);

        await connection.commit();

        req.flash('success', '¡Playlist y sus cursos asociados eliminados con éxito!');
    } catch (error) {
        await connection.rollback();
        console.error('Error deleting playlist and its courses:', error);
        req.flash('error', 'Error al eliminar la playlist y sus cursos asociados');
    } finally {
        connection.release();
    }

    res.redirect("/administrador/aprendizaje");
});

// ACTUALIZAR PLAY LIST
router.get('/aprendizaje/editar/:id', estaLogueado,async (req, res) => {
    const { id } = req.params;
    try {
        const [row_playlists] = await pool.query('SELECT * FROM playlists WHERE id = ?', [id]);
        const playlist = row_playlists[0];
        res.render('admin/editar_playlist', { playlist });
    } catch (error) {
        req.flash('error', 'Error al obtener la playlist');
        res.redirect("/administrador/aprendizaje");
    }
});

router.post('/form_playlist/edit/:id', estaLogueado,async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;
    const updatePlaylist = { nombre, descripcion };

    try {
        await pool.query("UPDATE playlists set ? WHERE id = ?", [updatePlaylist, id]);
        req.flash('success', '¡PlayList actualizada con éxito!');
    } catch (error) {
        req.flash('error', 'Error al actualizar la playlist');
    }
    res.redirect('/administrador/aprendizaje');
});

// CURSOS
// TRAER CURSOS
router.get('/aprendizaje/cursos/:id', estaLogueado,async (req, res) => {
    const { id } = req.params;

    try {
        // Consulta para obtener los datos de la playlist
        const [playlistRows] = await pool.query('SELECT * FROM Playlists WHERE id = ?', [id]);
        const playlist = playlistRows[0];

        if (!playlist) {
            req.flash('error', 'Playlist no encontrada');
            return res.redirect('/administrador/aprendizaje');
        }

        // Consulta para obtener los cursos asociados a la playlist
        const [cursoRows] = await pool.query(
            `SELECT c.* FROM Cursos c
             JOIN Playlist_Cursos pc ON c.id = pc.curso_id
             WHERE pc.playlist_id = ?`, [id]);

        // Renderizar la vista con los datos de la playlist y sus cursos
        res.render('admin/cursos', { playlist, cursos: cursoRows });
    } catch (error) {
        req.flash('error', 'Error al obtener la playlist y sus cursos');
        res.redirect('/administrador/aprendizaje');
    }
})

router.post('/administrador/playlist/:id/add-curso', estaLogueado,async (req, res) => {
    const { id } = req.params;
    const { enlace, titulo, descripcion, precio_Curso } = req.body;

    const newCurso = {
        enlace,
        titulo,
        descripcion,
        precio_Curso
    };

    try {
        // Insertar el curso en la tabla de cursos
        const result = await pool.query('INSERT INTO cursos SET ?', [newCurso]);
        const newCursoId = result[0].insertId;

        // Asociar el curso con la playlist en la tabla intermedia
        await pool.query('INSERT INTO playlist_cursos (playlist_id, curso_id) VALUES (?, ?)', [id, newCursoId]);

        req.flash('success', '¡Curso agregado con éxito a la playlist!');
        res.redirect(`/aprendizaje/cursos/${id}`);
    } catch (error) {
        console.error('Error adding course to playlist:', error);
        req.flash('error', 'Error al agregar el curso a la playlist');
        res.redirect(`/administrador/playlist/${id}`);
    }
});

// Ruta para eliminar un curso de una playlist específica
router.get('/administrador/playlist/:playlist_id/delete-curso/:curso_id', estaLogueado,async (req, res) => {
    const { playlist_id, curso_id } = req.params;

    try {
        // Eliminar la relación en la tabla intermedia Playlist_Cursos
        await pool.query('DELETE FROM Playlist_Cursos WHERE playlist_id = ? AND curso_id = ?', [playlist_id, curso_id]);

        // Eliminar el curso de la tabla Cursos
        await pool.query('DELETE FROM Cursos WHERE id = ?', [curso_id]);

        req.flash('success', '¡Curso eliminado con éxito de la playlist!');
        res.redirect(`/aprendizaje/cursos/${playlist_id}`);
    } catch (error) {
        console.error('Error deleting course from playlist:', error);
        req.flash('error', 'Error al eliminar el curso de la playlist');
        res.redirect(`/aprendizaje/cursos/${playlist_id}`);
    }
});

// ACTUALIZAR PLAY LIST
router.get('/aprendizaje/editar/cursos/:id', estaLogueado,async (req, res) => {
    const { id } = req.params;
    try {
        const [row_curso] = await pool.query('SELECT * FROM cursos WHERE id = ?', [id]);
        const curso = row_curso[0];

        res.render('admin/editar_curso', { curso });
    } catch (error) {
        req.flash('error', 'Error al obtener el curso');
        res.redirect("/administrador/aprendizaje");
    }
});


router.post('/form_curso/edit/:id', estaLogueado,async (req, res) => {
    const { id } = req.params;
    const { enlace, titulo, descripcion, precio_Curso } = req.body;
    const updateCurso = { enlace, titulo, descripcion, precio_Curso};

    try {
        await pool.query("UPDATE cursos set ? WHERE id = ?", [updateCurso, id]);
        req.flash('success', '¡Curso actualizado con éxito!');
        res.redirect(`/administrador/aprendizaje`);


    } catch (error) {
        req.flash('error', 'Error al actualizar el curso');
        res.redirect(`/administrador/aprendizaje`);
    }
});
module.exports = router