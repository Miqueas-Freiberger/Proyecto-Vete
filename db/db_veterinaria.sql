-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 22-02-2022 a las 17:32:21
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
-- Base de datos: `db_veterinaria`
--

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
(4, 'Omar Freiberger', 2147483647, 'omar1@mail.com', 'Burgos 881', 'Azul');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `observaciones`
--

CREATE TABLE `observaciones` (
  `id` int(11) NOT NULL,
  `Observacion` text NOT NULL,
  `id_mascota_fk` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
  `Observaciones` text NOT NULL,
  `FechaIngreso` date NOT NULL,
  `MotivoConsulta` text NOT NULL,
  `Tratamiento` text NOT NULL,
  `id_dueño_fk` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `paciente`
--

INSERT INTO `paciente` (`id`, `Nombre`, `Especie`, `Nacimiento`, `Sexo`, `Raza`, `Color`, `Tamano`, `Esterilizado`, `Complementarios`, `Observaciones`, `FechaIngreso`, `MotivoConsulta`, `Tratamiento`, `id_dueño_fk`) VALUES
(1, 'Blacky', 'Canino', 2014, 'Hembra', 'Border Collie', 'Negro y Blanco', 'Mediano', 'Si', 'Analisis-sangre / Radiografia / Ecografia', 'blablablabalbalblablabllaasdjoaisjdiwomoidamdaosdmawodimawdoa;sdjaw;odjawd;oiajwd;aowdjaw;odjadow\r\nblablablabalbalblablabllaasdjoaisjdiwomoidamdaosdmawodimawdoa;sdjaw;odjawd;oiajwd;aowdjaw;odjadow', '2022-02-22', 'se rasca mucho', 'vacuna', 2),
(2, 'Budin', 'Gatuno', 2015, 'Hembra', 'Gato', 'Marron', 'Chico', 'No', 'Analisis-sangre / Radiografia / Ecografia / Raspaje / Citologia', 'Ceborrea seca, Raspaje + Demodex y analisis de sangre(hemograma bien) (urea creatinina normal), hepatograma (fal =131,colest = 168,pret = 8,1)\r\nTSH = 0.64, T4Libre = 0,5', '2022-02-22', 'asdadsadsasd', 'dklasdhoiwuhi', 3),
(3, 'Potente', 'Canino', 2018, 'Macho', 'Pitbull', 'Negro', 'Mediano', 'No', 'Analisis-sangre / Radiografia / Ecografia', 'blablablablablablalbalblablablalblbalablblalb', '2022-02-22', 'sjdwoiqndmoasnd', 'asdjhwhuioduihaosiudh', 4),
(5, 'Pupi', 'Conejo', 2020, 'Hembra', 'Conejo', 'Blanco', 'chico', 'no', 'analisis-sangre / ecografia', 'el conejo tiene obesidad', '2022-02-22', 'Come mucho', 'dieta', 2),
(6, 'Verdura', 'Tortuga', 2017, 'Macho', 'Tortuga', 'Marron', 'chico', 'no', 'radiografia', 'Tiene quebrado el caparazon', '2022-02-22', 'Lo pise con el auto', 'reposo y diclofenac en gel', 4);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `observaciones`
--
ALTER TABLE `observaciones`
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `observaciones`
--
ALTER TABLE `observaciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `paciente`
--
ALTER TABLE `paciente`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `observaciones`
--
ALTER TABLE `observaciones`
  ADD CONSTRAINT `observaciones_ibfk_1` FOREIGN KEY (`id_mascota_fk`) REFERENCES `paciente` (`id`);

--
-- Filtros para la tabla `paciente`
--
ALTER TABLE `paciente`
  ADD CONSTRAINT `paciente_ibfk_1` FOREIGN KEY (`id_dueño_fk`) REFERENCES `clientes` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
