-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 01-06-2024 a las 16:59:15
-- Versión del servidor: 8.0.36
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `polimerico_dial`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contactos`
--

CREATE TABLE `contactos` (
  `id` int NOT NULL,
  `nombres_cont` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `apellidos_cont` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `email_cont` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `numero_tlf_cont` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `asunto_cont` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `contactos`
--

INSERT INTO `contactos` (`id`, `nombres_cont`, `apellidos_cont`, `email_cont`, `numero_tlf_cont`, `asunto_cont`, `fecha`) VALUES
(6, 'Luis', 'rendon', '1234@gmil.com', '1234', 'latas', '2024-05-31 20:59:22'),
(7, 'Marcelo', 'agachate', 'y@conocelo.com', '1234', 'jijija', '2024-05-31 21:01:16');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cursos`
--

CREATE TABLE `cursos` (
  `id` int NOT NULL,
  `titulo` varchar(100) NOT NULL,
  `descripcion` text,
  `precio_Curso` varchar(50) DEFAULT NULL,
  `fecha_publicacion` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `playlists`
--

CREATE TABLE `playlists` (
  `id` int NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `playlists`
--

INSERT INTO `playlists` (`id`, `nombre`, `descripcion`) VALUES
(5, 'Curso de tecnicas de pintura automotriz VOL.3', 'Aprende como aplicar PINTURA AUTOMOTRIZ o AUTOMOTIVA en sistema de alto relieve facil, rapido y sencillo.'),
(6, 'Curso de pintura automotriz VOL.2 / master painter celebrity.', 'En esta edición de nuestro curso de pintura automotriz 2021 queremos dar a conocer nuevas tecnicas para llevar tu negocio al siguiente nivel, así que prepárate para la evolución de la industria automotriz y participa por la certificación MASTER PAINTER CELEBRITY. Recuerda que en la edición del 2020 tuvimos un curso muy completo desde el alistamiento y aun estas a tiempo de aprender las tecnicas.'),
(7, 'Curso de pintura automotriz profesional paso a paso', 'En nuestro curso te enseñaremos paso a paso lo necesario para que puedas ser un PINTOR AUTOMOTRIZ, tendrás la oportunidad de certificarte totalmente gratis no te pierdas ninguno de nuestros vídeos y SUSCRIBETE.'),
(8, 'Curso online gratis y certificado de comunicación efectiva', 'En el primer vídeo encontraras como poder participar de este maravilloso curso, aquí comenzaremos a subir los tutoriales y dejar las respectivas tareas.'),
(9, 'Porcelanato liquido 3d curso practico', 'En nuestro curso de PORCELANATO LIQUIDO 3D paso a paso y en español, podrás aprender a realizar las tecnicas de MARMOLIZADO, PIGMENTADOS, METALIZADO, MIREYADOS Y PISOS 3D. Así que no te pierdas de esta CAPACITACIÓN GRATUITA de talla internacional.'),
(10, 'Pinturas especiales y efectos novedosos (auto motriz)', 'Estamos en vanguardia frente a las ultimas técnicas en pinturas, ejemplo el trabajo realizado en nuestro taller, un vehículo totalmente pintado en técnica holografía, si quiere aprender esta y muchas mas técnicas visita nutras redes sociales.'),
(11, 'Nuevos metodos para cromar sin costosas maquinas', 'Te gustaria ser parte del nuevo sistema que esta cambiando el mundo, te presentamos nuestro proximo estreno que se realizara el 14 y 15 de diciembre de 2019 y estara a la venta apartir del 1 de febrero de 2020 comunicate hoy mismo al 3115227755.'),
(14, 'Curso hidrocromo, cromo al agua o efecto espejo', 'Que este 2020 llegue la innovacion a tu negocio, nunca fue tan facil cromar y personalizar cualquier objeto, aprende con los mejores comunicate hoy mismo 3115227755'),
(15, 'Hidrografia o hidroimpresion curso.', 'estas listo para llevar tu negocio al siguiente nivel? ven y aprende con los mejores del continente, si compartes este vídeo recibe un 10% adicional de descuento en nuestros cursos totalmente prácticos.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `playlist_cursos`
--

CREATE TABLE `playlist_cursos` (
  `playlist_id` int NOT NULL,
  `curso_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id` int NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id`, `nombre`) VALUES
(1, 'admin'),
(2, 'usuario');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `testimonios`
--

CREATE TABLE `testimonios` (
  `id` int NOT NULL,
  `usuario_id` int DEFAULT NULL,
  `comentario` text NOT NULL,
  `fecha` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `testimonios`
--

INSERT INTO `testimonios` (`id`, `usuario_id`, `comentario`, `fecha`) VALUES
(2, 3, 'los mejores de bogota', '2024-05-31');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `rol_id` int DEFAULT '2'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `email`, `password`, `fecha_creacion`, `rol_id`) VALUES
(3, 'Jhoann Zamudio', 'sebastianzamudio2004@gmail.com', '1234467', '2024-05-31 20:58:25', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `contactos`
--
ALTER TABLE `contactos`
  ADD PRIMARY KEY (`id`) USING BTREE;

--
-- Indices de la tabla `cursos`
--
ALTER TABLE `cursos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `playlists`
--
ALTER TABLE `playlists`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `playlist_cursos`
--
ALTER TABLE `playlist_cursos`
  ADD PRIMARY KEY (`playlist_id`,`curso_id`),
  ADD KEY `curso_id` (`curso_id`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `testimonios`
--
ALTER TABLE `testimonios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `rol_id` (`rol_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `contactos`
--
ALTER TABLE `contactos`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `cursos`
--
ALTER TABLE `cursos`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `playlists`
--
ALTER TABLE `playlists`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `testimonios`
--
ALTER TABLE `testimonios`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `playlist_cursos`
--
ALTER TABLE `playlist_cursos`
  ADD CONSTRAINT `playlist_cursos_ibfk_1` FOREIGN KEY (`playlist_id`) REFERENCES `playlists` (`id`),
  ADD CONSTRAINT `playlist_cursos_ibfk_2` FOREIGN KEY (`curso_id`) REFERENCES `cursos` (`id`);

--
-- Filtros para la tabla `testimonios`
--
ALTER TABLE `testimonios`
  ADD CONSTRAINT `testimonios_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`rol_id`) REFERENCES `roles` (`id`);

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
