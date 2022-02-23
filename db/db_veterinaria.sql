-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 23-02-2022 a las 22:06:17
-- Versión del servidor: 10.4.22-MariaDB
-- Versión de PHP: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `db_libros`
--
CREATE DATABASE IF NOT EXISTS `db_libros` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `db_libros`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `autor`
--

CREATE TABLE `autor` (
  `id_autor` int(10) NOT NULL,
  `nombre` varchar(60) NOT NULL,
  `nacimiento` date NOT NULL,
  `muerte` date NOT NULL,
  `nacionalidad` varchar(40) NOT NULL,
  `imagen` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `autor`
--

INSERT INTO `autor` (`id_autor`, `nombre`, `nacimiento`, `muerte`, `nacionalidad`, `imagen`) VALUES
(1, 'Stephen Edwing King', '1947-09-21', '0000-00-00', 'Estadounidense', 'img/author/ 619d85e1e5854.jpg'),
(2, 'J K Rowling', '1965-07-31', '0000-00-00', 'Britanica', ''),
(3, 'Gabriel García Marquez', '1927-03-06', '2014-04-17', 'Colombiano', ''),
(4, 'Ernesto Sábato', '1911-06-24', '2011-04-30', 'Argentino', ''),
(5, 'Florencia Bonelli', '1971-05-05', '0000-00-00', 'Argentina', ''),
(6, 'George R R Martin', '1948-09-20', '0000-00-00', 'Estadounidense', ''),
(7, 'Edgar Allan Poe', '1809-01-19', '1849-10-07', 'Estadounidense', ''),
(8, 'J R R Tolkien', '1892-01-03', '1973-09-02', 'Britanico', ''),
(9, 'Stieg Larsson', '1954-08-15', '2004-11-09', 'Sueco', ''),
(10, 'Paulo Coelho', '1947-08-24', '0000-00-00', 'Brasileño', ''),
(11, 'Dan Brown', '1964-06-22', '0000-00-00', 'Estadounidense', ''),
(13, 'Patrick Suskind', '1949-03-26', '0000-00-00', 'Aleman', ''),
(14, 'Oscar Wilde', '1854-10-16', '1900-11-30', 'Irlandes', 'img/author/ 619d848dd5f4bjpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentarios`
--

CREATE TABLE `comentarios` (
  `id` int(11) NOT NULL,
  `comentario` text NOT NULL,
  `puntuacion` tinyint(5) NOT NULL,
  `usuario` int(11) NOT NULL,
  `id_libro` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `comentarios`
--

INSERT INTO `comentarios` (`id`, `comentario`, `puntuacion`, `usuario`, `id_libro`) VALUES
(1, 'Muy bueno el libro', 4, 2, 20),
(2, 'Me resulto muy interesante pero es extenso', 3, 2, 33),
(5, 'No me gusto el libro, me resulto muy pesado y largo', 1, 2, 3),
(6, 'Interesante libro', 1, 2, 3),
(7, 'Muy buen libro, interesante y facil de leer', 4, 2, 5),
(8, 'Muy buen libro, interesante y tiene buenos personajes', 5, 2, 6),
(9, 'Me resulto aburrido y pesado de leer.', 1, 2, 19),
(10, 'muy buen libro.', 5, 6, 3),
(11, 'asdads', 2, 2, 3),
(12, 'asdads', 1, 2, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `libros`
--

CREATE TABLE `libros` (
  `id_libros` int(10) NOT NULL,
  `nombre` text NOT NULL,
  `genero` varchar(40) NOT NULL,
  `capitulos` int(4) NOT NULL,
  `editorial` varchar(40) NOT NULL,
  `anio` int(10) NOT NULL,
  `id_autor_fk` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `libros`
--

INSERT INTO `libros` (`id_libros`, `nombre`, `genero`, `capitulos`, `editorial`, `anio`, `id_autor_fk`) VALUES
(3, 'Eso', 'Terror', 1504, 'DEBOLSILLO', 1986, 1),
(4, 'La niebla', 'Terror', 230, 'DEBOLSILLO', 2007, 1),
(5, 'La cúpula', 'Terror', 1074, 'DEBOLSILLO', 2009, 1),
(6, 'Harry Potter y la piedra filosofal', 'Literatura fantástica', 288, 'Salamandra', 1997, 2),
(7, 'Harry Potter y la cámara secreta', 'Literatura fantástica', 320, 'Salamandra', 1998, 2),
(8, 'Harry Potter y el prisionero de Azkaban', 'Literatura fantástica', 384, 'Salamandra', 1999, 2),
(9, 'Harry Potter y el cáliz de fuego', 'Literatura fantástica', 672, 'Salamandra', 2000, 2),
(10, 'Harry Potter y la Orden del Fénix', 'Literatura fantástica', 928, 'Salamandra', 2003, 2),
(11, 'Harry Potter y el misterio del príncipe', 'Literatura fantástica', 576, 'Salamandra', 2005, 2),
(12, 'Harry Potter y las reliquias de la Muerte', 'Literatura fantástica', 880, 'Salamandra', 2007, 2),
(13, 'Cien años de soledad', 'Novela', 496, 'DEBOLSILLO', 1967, 3),
(14, 'Crónica de una muerte anunciada', 'Novela', 144, 'DEBOLSILLO', 1981, 3),
(15, 'El amor en los tiempos del cólera', 'Novela', 442, 'DEBOLSILLO', 1985, 3),
(16, 'Del amor y otros demonios', 'Novela', 176, 'DEBOLSILLO', 1994, 3),
(17, 'La mala hora', 'Novela', 208, 'DEBOLSILLO', 1962, 3),
(18, 'El túnel', 'Novela', 158, 'Sur', 1948, 4),
(19, 'Sobre héroes y tumbas', 'Novela', 417, 'Sur', 1961, 4),
(20, 'Abaddón el exterminador', 'Novela', 528, 'Sur', 1974, 4),
(21, 'Almanegra', 'Novela', 254, 'Suma de letras', 2015, 5),
(22, 'Indias blancas', 'Novela', 356, 'Suma de letras', 2005, 5),
(23, 'El cuarto arcano', 'Novela', 520, 'Suma de letras', 2007, 5),
(24, 'Caballo de fuego', 'Novela', 480, 'Suma de letras', 2011, 5),
(25, 'Jasy', 'Novela', 640, 'Suma de letras', 2014, 5),
(29, 'La caída de la Casa Usher', 'Terror', 136, ' Burton\'s Gentleman\'s Magazine', 1839, 7),
(30, 'El gato negro', 'Terror', 224, 'Edgar Allan Poe', 1843, 7),
(31, 'El señor de los anillos: la comunidad del anillo', 'Literatura fantástica', 398, 'Minotauro', 1958, 8),
(32, 'El señor de los anillos: las dos torres', 'Literatura fantástica', 423, 'Minotauro', 1962, 8),
(33, 'El señor de los anillos: el retorno del rey', 'Literatura fantástica', 542, 'Minotauro', 1968, 8),
(34, 'El Hobbit', 'Literatura fantástica', 652, 'Minotauro', 1937, 8),
(35, 'El Silmarillion', 'Literatura fantástica', 540, 'Minotauro', 1977, 8),
(36, 'Los hombres que no amaban a las mujeres', 'Novela', 665, 'Destino', 2005, 9),
(37, 'La chica que soñaba con una cerilla y un bidón de gasolina', 'Novela', 742, 'Destino', 2005, 9),
(38, 'La reina en el palacio de las corrientes de aire', 'Novela', 880, 'Destino', 2006, 9),
(39, 'El alquimista ', 'Novela', 192, 'Editorial Planeta', 1988, 10),
(40, 'Once minutos', 'Novela', 283, 'Editorial Planeta', 2003, 10),
(41, 'Verónika decide morir', 'Novela', 205, 'Editorial Planeta', 1998, 10),
(42, 'El Peregrino de Compostela', 'Novela', 256, 'Editorial Planeta', 1987, 10),
(43, 'Manual del Guerrero de la Luz', 'Novela', 152, 'Editorial Planeta', 1977, 10),
(44, 'Carrie', 'Terror', 199, 'DEBOLSILLO', 1974, 1),
(45, 'El código Da Vinci', 'Novela', 656, 'Doubleday', 2003, 11),
(46, 'Ángeles y demonios', 'Novela', 606, 'Doubleday', 2000, 11),
(47, 'Origen', 'Novela', 640, 'Doubleday', 2017, 11),
(48, 'El símbolo perdido', 'Novela', 618, 'Doubleday', 2009, 11),
(49, 'Inferno', 'Novela', 551, 'Doubleday', 2003, 11),
(54, 'Juego de tronos', 'Literatura fantástica', 800, 'PLAZA & JANES', 1996, 6),
(55, 'Choque de reyes', 'Literatura fantástica', 928, 'PLAZA & JANES', 1998, 6),
(56, 'Tormenta de espadas', 'Literatura fantástica', 1184, 'PLAZA & JANES', 2000, 6),
(57, 'Festín de cuervos', 'Literatura fantástica', 1133, 'PLAZA & JANES', 2005, 6),
(58, 'Danza de dragones', 'Literatura fantástica', 872, 'PLAZA & JANES', 2011, 6),
(60, 'El general en su laberinto', 'Novela Historica', 20, 'Alfred A. Knopf', 1989, 3),
(61, 'El fantasma de canterville', 'Ficcion Gotica', 7, 'The Court and Society Review', 1887, 14);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `email` varchar(70) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `rol` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `email`, `username`, `password`, `rol`) VALUES
(1, 'admin@mail.com', 'admin', '$2a$12$CG6n2o8hEfD/vTa/KC.T.enw/VuOsXm.JngiG94xm5oYFi.1hH22C', 1),
(2, 'mique@mail.com', 'mique5', '$2y$10$2v/2x3fPN1.sJV37onjD2eygqv.0Jor7b6m0a2zEAeV5VO8DAZldW', 0),
(6, 'prueba@mail.com', 'userPrueba', '$2y$10$7HSBqZSlP70twQH6kgM.v.y6UVNP3i9E63WfcElrrlfPSVuoX02Um', 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `autor`
--
ALTER TABLE `autor`
  ADD PRIMARY KEY (`id_autor`);

--
-- Indices de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario` (`usuario`),
  ADD KEY `id_libro` (`id_libro`);

--
-- Indices de la tabla `libros`
--
ALTER TABLE `libros`
  ADD PRIMARY KEY (`id_libros`),
  ADD KEY `id_autor_fk` (`id_autor_fk`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `autor`
--
ALTER TABLE `autor`
  MODIFY `id_autor` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `libros`
--
ALTER TABLE `libros`
  MODIFY `id_libros` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `comentarios`
--
ALTER TABLE `comentarios`
  ADD CONSTRAINT `comentarios_ibfk_1` FOREIGN KEY (`id_libro`) REFERENCES `libros` (`id_libros`),
  ADD CONSTRAINT `comentarios_ibfk_2` FOREIGN KEY (`usuario`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `libros`
--
ALTER TABLE `libros`
  ADD CONSTRAINT `libros_ibfk_1` FOREIGN KEY (`id_autor_fk`) REFERENCES `autor` (`id_autor`) ON DELETE CASCADE;
--
-- Base de datos: `db_veterinaria`
--
CREATE DATABASE IF NOT EXISTS `db_veterinaria` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `db_veterinaria`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `id` int(11) NOT NULL,
  `NombreApellido` varchar(50) NOT NULL,
  `Telefono` int(20) NOT NULL,
  `Email` varchar(70) NOT NULL,
  `Direccion` varchar(1000) NOT NULL,
  `Localidad` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`id`, `NombreApellido`, `Telefono`, `Email`, `Direccion`, `Localidad`) VALUES
(2, 'Miqueas Freiberger', 2147483647, 'miqueas@gmail.com', 'Burgos 221', 'Azul'),
(3, 'Pepe Flores', 2147483647, 'pepe@mail.com', 'Leyria 2391', 'Azul'),
(4, 'Omar Freiberger', 2147483647, 'omar1@mail.com', 'Burgos 881', 'Azul'),
(5, 'Juan Gonzalez', 2147483647, 'juan@mail.com', 'caneva 332', 'Azul'),
(6, 'Juan Alberto Seisdedos', 2147483647, 'juana6@gmail.com', 'Calle Oscuridad 2210', 'Azul');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historial`
--

CREATE TABLE `historial` (
  `id` int(11) NOT NULL,
  `Observacion` text NOT NULL,
  `MotivoConsulta` varchar(255) NOT NULL,
  `Tratamiento` text NOT NULL,
  `id_mascota_fk` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `historial`
--

INSERT INTO `historial` (`id`, `Observacion`, `MotivoConsulta`, `Tratamiento`, `id_mascota_fk`) VALUES
(1, 'El perro esta muy alterado y muerde', 'No quiere comer', 'Pastillas', 7),
(5, 'Tiene miedo', 'La pise con el auto', 'Cualquier cosa', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `paciente`
--

CREATE TABLE `paciente` (
  `id` int(11) NOT NULL,
  `Nombre` varchar(30) NOT NULL,
  `Especie` varchar(30) NOT NULL,
  `Nacimiento` int(10) NOT NULL,
  `Sexo` varchar(30) NOT NULL,
  `Raza` varchar(50) NOT NULL,
  `Color` varchar(50) NOT NULL,
  `Tamano` varchar(10) NOT NULL,
  `Esterilizado` varchar(2) NOT NULL,
  `Complementarios` text NOT NULL,
  `FechaIngreso` date NOT NULL,
  `id_dueño_fk` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `paciente`
--

INSERT INTO `paciente` (`id`, `Nombre`, `Especie`, `Nacimiento`, `Sexo`, `Raza`, `Color`, `Tamano`, `Esterilizado`, `Complementarios`, `FechaIngreso`, `id_dueño_fk`) VALUES
(1, 'Blacky', 'Canino', 2014, 'Hembra', 'Border Collie', 'Negro y Blanco', 'Mediano', 'Si', 'Analisis-sangre / Radiografia / Ecografia', '2022-02-22', 2),
(2, 'Budin', 'Gatuno', 2015, 'Hembra', 'Gato', 'Marron', 'Chico', 'No', 'Analisis-sangre / Radiografia / Ecografia / Raspaje / Citologia', '2022-02-22', 3),
(3, 'Potente', 'Canino', 2018, 'Macho', 'Pitbull', 'Negro', 'Mediano', 'No', 'Analisis-sangre / Radiografia / Ecografia', '2022-02-22', 4),
(7, 'Snow', 'Canino', 2015, 'Macho', 'Husky', 'Gris', 'Grande', 'No', 'Analisis-sangre / Ecografia / Citologia', '2022-02-23', 5);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `historial`
--
ALTER TABLE `historial`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_mascota_fk` (`id_mascota_fk`);

--
-- Indices de la tabla `paciente`
--
ALTER TABLE `paciente`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_dueño_fk` (`id_dueño_fk`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `historial`
--
ALTER TABLE `historial`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `paciente`
--
ALTER TABLE `paciente`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `historial`
--
ALTER TABLE `historial`
  ADD CONSTRAINT `historial_ibfk_1` FOREIGN KEY (`id_mascota_fk`) REFERENCES `paciente` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `paciente`
--
ALTER TABLE `paciente`
  ADD CONSTRAINT `paciente_ibfk_1` FOREIGN KEY (`id_dueño_fk`) REFERENCES `clientes` (`id`);
--
-- Base de datos: `phpmyadmin`
--
CREATE DATABASE IF NOT EXISTS `phpmyadmin` DEFAULT CHARACTER SET utf8 COLLATE utf8_bin;
USE `phpmyadmin`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pma__bookmark`
--

CREATE TABLE `pma__bookmark` (
  `id` int(10) UNSIGNED NOT NULL,
  `dbase` varchar(255) COLLATE utf8_bin NOT NULL DEFAULT '',
  `user` varchar(255) COLLATE utf8_bin NOT NULL DEFAULT '',
  `label` varchar(255) CHARACTER SET utf8 NOT NULL DEFAULT '',
  `query` text COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Bookmarks';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pma__central_columns`
--

CREATE TABLE `pma__central_columns` (
  `db_name` varchar(64) COLLATE utf8_bin NOT NULL,
  `col_name` varchar(64) COLLATE utf8_bin NOT NULL,
  `col_type` varchar(64) COLLATE utf8_bin NOT NULL,
  `col_length` text COLLATE utf8_bin DEFAULT NULL,
  `col_collation` varchar(64) COLLATE utf8_bin NOT NULL,
  `col_isNull` tinyint(1) NOT NULL,
  `col_extra` varchar(255) COLLATE utf8_bin DEFAULT '',
  `col_default` text COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Central list of columns';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pma__column_info`
--

CREATE TABLE `pma__column_info` (
  `id` int(5) UNSIGNED NOT NULL,
  `db_name` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `table_name` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `column_name` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `comment` varchar(255) CHARACTER SET utf8 NOT NULL DEFAULT '',
  `mimetype` varchar(255) CHARACTER SET utf8 NOT NULL DEFAULT '',
  `transformation` varchar(255) COLLATE utf8_bin NOT NULL DEFAULT '',
  `transformation_options` varchar(255) COLLATE utf8_bin NOT NULL DEFAULT '',
  `input_transformation` varchar(255) COLLATE utf8_bin NOT NULL DEFAULT '',
  `input_transformation_options` varchar(255) COLLATE utf8_bin NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Column information for phpMyAdmin';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pma__designer_settings`
--

CREATE TABLE `pma__designer_settings` (
  `username` varchar(64) COLLATE utf8_bin NOT NULL,
  `settings_data` text COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Settings related to Designer';

--
-- Volcado de datos para la tabla `pma__designer_settings`
--

INSERT INTO `pma__designer_settings` (`username`, `settings_data`) VALUES
('root', '{\"angular_direct\":\"direct\",\"snap_to_grid\":\"off\",\"relation_lines\":\"true\"}');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pma__export_templates`
--

CREATE TABLE `pma__export_templates` (
  `id` int(5) UNSIGNED NOT NULL,
  `username` varchar(64) COLLATE utf8_bin NOT NULL,
  `export_type` varchar(10) COLLATE utf8_bin NOT NULL,
  `template_name` varchar(64) COLLATE utf8_bin NOT NULL,
  `template_data` text COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Saved export templates';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pma__favorite`
--

CREATE TABLE `pma__favorite` (
  `username` varchar(64) COLLATE utf8_bin NOT NULL,
  `tables` text COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Favorite tables';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pma__history`
--

CREATE TABLE `pma__history` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `username` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `db` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `table` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `timevalue` timestamp NOT NULL DEFAULT current_timestamp(),
  `sqlquery` text COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='SQL history for phpMyAdmin';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pma__navigationhiding`
--

CREATE TABLE `pma__navigationhiding` (
  `username` varchar(64) COLLATE utf8_bin NOT NULL,
  `item_name` varchar(64) COLLATE utf8_bin NOT NULL,
  `item_type` varchar(64) COLLATE utf8_bin NOT NULL,
  `db_name` varchar(64) COLLATE utf8_bin NOT NULL,
  `table_name` varchar(64) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Hidden items of navigation tree';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pma__pdf_pages`
--

CREATE TABLE `pma__pdf_pages` (
  `db_name` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `page_nr` int(10) UNSIGNED NOT NULL,
  `page_descr` varchar(50) CHARACTER SET utf8 NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='PDF relation pages for phpMyAdmin';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pma__recent`
--

CREATE TABLE `pma__recent` (
  `username` varchar(64) COLLATE utf8_bin NOT NULL,
  `tables` text COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Recently accessed tables';

--
-- Volcado de datos para la tabla `pma__recent`
--

INSERT INTO `pma__recent` (`username`, `tables`) VALUES
('root', '[{\"db\":\"db_veterinaria\",\"table\":\"historial\"},{\"db\":\"db_veterinaria\",\"table\":\"paciente\"},{\"db\":\"db_veterinaria\",\"table\":\"clientes\"},{\"db\":\"db_veterinaria\",\"table\":\"observaciones\"},{\"db\":\"db_libros\",\"table\":\"autor\"},{\"db\":\"db_libros\",\"table\":\"usuarios\"}]');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pma__relation`
--

CREATE TABLE `pma__relation` (
  `master_db` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `master_table` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `master_field` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `foreign_db` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `foreign_table` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `foreign_field` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Relation table';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pma__savedsearches`
--

CREATE TABLE `pma__savedsearches` (
  `id` int(5) UNSIGNED NOT NULL,
  `username` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `db_name` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `search_name` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `search_data` text COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Saved searches';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pma__table_coords`
--

CREATE TABLE `pma__table_coords` (
  `db_name` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `table_name` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `pdf_page_number` int(11) NOT NULL DEFAULT 0,
  `x` float UNSIGNED NOT NULL DEFAULT 0,
  `y` float UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Table coordinates for phpMyAdmin PDF output';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pma__table_info`
--

CREATE TABLE `pma__table_info` (
  `db_name` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `table_name` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `display_field` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Table information for phpMyAdmin';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pma__table_uiprefs`
--

CREATE TABLE `pma__table_uiprefs` (
  `username` varchar(64) COLLATE utf8_bin NOT NULL,
  `db_name` varchar(64) COLLATE utf8_bin NOT NULL,
  `table_name` varchar(64) COLLATE utf8_bin NOT NULL,
  `prefs` text COLLATE utf8_bin NOT NULL,
  `last_update` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Tables'' UI preferences';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pma__tracking`
--

CREATE TABLE `pma__tracking` (
  `db_name` varchar(64) COLLATE utf8_bin NOT NULL,
  `table_name` varchar(64) COLLATE utf8_bin NOT NULL,
  `version` int(10) UNSIGNED NOT NULL,
  `date_created` datetime NOT NULL,
  `date_updated` datetime NOT NULL,
  `schema_snapshot` text COLLATE utf8_bin NOT NULL,
  `schema_sql` text COLLATE utf8_bin DEFAULT NULL,
  `data_sql` longtext COLLATE utf8_bin DEFAULT NULL,
  `tracking` set('UPDATE','REPLACE','INSERT','DELETE','TRUNCATE','CREATE DATABASE','ALTER DATABASE','DROP DATABASE','CREATE TABLE','ALTER TABLE','RENAME TABLE','DROP TABLE','CREATE INDEX','DROP INDEX','CREATE VIEW','ALTER VIEW','DROP VIEW') COLLATE utf8_bin DEFAULT NULL,
  `tracking_active` int(1) UNSIGNED NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Database changes tracking for phpMyAdmin';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pma__userconfig`
--

CREATE TABLE `pma__userconfig` (
  `username` varchar(64) COLLATE utf8_bin NOT NULL,
  `timevalue` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `config_data` text COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='User preferences storage for phpMyAdmin';

--
-- Volcado de datos para la tabla `pma__userconfig`
--

INSERT INTO `pma__userconfig` (`username`, `timevalue`, `config_data`) VALUES
('root', '2022-02-23 21:03:00', '{\"Console\\/Mode\":\"show\",\"lang\":\"es\",\"Console\\/Height\":0}');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pma__usergroups`
--

CREATE TABLE `pma__usergroups` (
  `usergroup` varchar(64) COLLATE utf8_bin NOT NULL,
  `tab` varchar(64) COLLATE utf8_bin NOT NULL,
  `allowed` enum('Y','N') COLLATE utf8_bin NOT NULL DEFAULT 'N'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='User groups with configured menu items';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pma__users`
--

CREATE TABLE `pma__users` (
  `username` varchar(64) COLLATE utf8_bin NOT NULL,
  `usergroup` varchar(64) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Users and their assignments to user groups';

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `pma__bookmark`
--
ALTER TABLE `pma__bookmark`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `pma__central_columns`
--
ALTER TABLE `pma__central_columns`
  ADD PRIMARY KEY (`db_name`,`col_name`);

--
-- Indices de la tabla `pma__column_info`
--
ALTER TABLE `pma__column_info`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `db_name` (`db_name`,`table_name`,`column_name`);

--
-- Indices de la tabla `pma__designer_settings`
--
ALTER TABLE `pma__designer_settings`
  ADD PRIMARY KEY (`username`);

--
-- Indices de la tabla `pma__export_templates`
--
ALTER TABLE `pma__export_templates`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `u_user_type_template` (`username`,`export_type`,`template_name`);

--
-- Indices de la tabla `pma__favorite`
--
ALTER TABLE `pma__favorite`
  ADD PRIMARY KEY (`username`);

--
-- Indices de la tabla `pma__history`
--
ALTER TABLE `pma__history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `username` (`username`,`db`,`table`,`timevalue`);

--
-- Indices de la tabla `pma__navigationhiding`
--
ALTER TABLE `pma__navigationhiding`
  ADD PRIMARY KEY (`username`,`item_name`,`item_type`,`db_name`,`table_name`);

--
-- Indices de la tabla `pma__pdf_pages`
--
ALTER TABLE `pma__pdf_pages`
  ADD PRIMARY KEY (`page_nr`),
  ADD KEY `db_name` (`db_name`);

--
-- Indices de la tabla `pma__recent`
--
ALTER TABLE `pma__recent`
  ADD PRIMARY KEY (`username`);

--
-- Indices de la tabla `pma__relation`
--
ALTER TABLE `pma__relation`
  ADD PRIMARY KEY (`master_db`,`master_table`,`master_field`),
  ADD KEY `foreign_field` (`foreign_db`,`foreign_table`);

--
-- Indices de la tabla `pma__savedsearches`
--
ALTER TABLE `pma__savedsearches`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `u_savedsearches_username_dbname` (`username`,`db_name`,`search_name`);

--
-- Indices de la tabla `pma__table_coords`
--
ALTER TABLE `pma__table_coords`
  ADD PRIMARY KEY (`db_name`,`table_name`,`pdf_page_number`);

--
-- Indices de la tabla `pma__table_info`
--
ALTER TABLE `pma__table_info`
  ADD PRIMARY KEY (`db_name`,`table_name`);

--
-- Indices de la tabla `pma__table_uiprefs`
--
ALTER TABLE `pma__table_uiprefs`
  ADD PRIMARY KEY (`username`,`db_name`,`table_name`);

--
-- Indices de la tabla `pma__tracking`
--
ALTER TABLE `pma__tracking`
  ADD PRIMARY KEY (`db_name`,`table_name`,`version`);

--
-- Indices de la tabla `pma__userconfig`
--
ALTER TABLE `pma__userconfig`
  ADD PRIMARY KEY (`username`);

--
-- Indices de la tabla `pma__usergroups`
--
ALTER TABLE `pma__usergroups`
  ADD PRIMARY KEY (`usergroup`,`tab`,`allowed`);

--
-- Indices de la tabla `pma__users`
--
ALTER TABLE `pma__users`
  ADD PRIMARY KEY (`username`,`usergroup`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `pma__bookmark`
--
ALTER TABLE `pma__bookmark`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `pma__column_info`
--
ALTER TABLE `pma__column_info`
  MODIFY `id` int(5) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `pma__export_templates`
--
ALTER TABLE `pma__export_templates`
  MODIFY `id` int(5) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `pma__history`
--
ALTER TABLE `pma__history`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `pma__pdf_pages`
--
ALTER TABLE `pma__pdf_pages`
  MODIFY `page_nr` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `pma__savedsearches`
--
ALTER TABLE `pma__savedsearches`
  MODIFY `id` int(5) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- Base de datos: `test`
--
CREATE DATABASE IF NOT EXISTS `test` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `test`;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
