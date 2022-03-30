-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 30-03-2022 a las 23:15:29
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
  `Dni` int(11) NOT NULL,
  `Telefono` varchar(100) NOT NULL,
  `Email` varchar(70) NOT NULL,
  `Direccion` varchar(1000) NOT NULL,
  `Localidad` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`id`, `NombreApellido`, `Dni`, `Telefono`, `Email`, `Direccion`, `Localidad`) VALUES
(1, ' Pepito', 32890172, '2291/23123', ' ', ' ', ' '),
(2, ' carlitos pqunecpunqec', 0, '2281978128 / 1281248124(2do cto)', ' ', ' bla 12345', 'blabla ');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historial`
--

CREATE TABLE `historial` (
  `id` int(11) NOT NULL,
  `Observacion` text NOT NULL,
  `MotivoConsulta` varchar(255) NOT NULL,
  `Tratamiento` text NOT NULL,
  `Complementarios` varchar(110) NOT NULL,
  `Fecha` date NOT NULL,
  `id_mascota_fk` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `historial`
--

INSERT INTO `historial` (`id`, `Observacion`, `MotivoConsulta`, `Tratamiento`, `Complementarios`, `Fecha`, `id_mascota_fk`) VALUES
(1, '', '', '', '-', '2022-03-23', 1),
(2, 'bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla ', 'bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla', 'bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla ', 'Analisis de sangre / Radiografia / Ecografia / Raspaje / Citologia / Analisis de orina', '2022-03-24', 2),
(3, '', '', '', 'Analisis-sangre / Ecografia / Raspaje', '2022-03-24', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `imagenes`
--

CREATE TABLE `imagenes` (
  `id` int(11) NOT NULL,
  `nombre` varchar(300) NOT NULL,
  `ruta` varchar(50) NOT NULL,
  `extension` varchar(70) NOT NULL,
  `booleanFlag` tinyint(1) NOT NULL,
  `id_historial_fk` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `imagenes`
--

INSERT INTO `imagenes` (`id`, `nombre`, `ruta`, `extension`, `booleanFlag`, `id_historial_fk`) VALUES
(39, 'Documento 1.docx', 'archivos/historial/ 6244bef4ba728.doc', 'application/octet-stream', 1, 2),
(40, 'BA_Olavarria_map.pdf', 'archivos/historial/ 6244bfec8033d.pdf', 'application/pdf', 1, 2),
(42, 'ajdvnqodhvbqvope.docx', 'images/historial/ 6244c815b4d5c.jpg', 'application/vnd.openxmlformats-officedocument.wordprocessingml.documen', 0, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `paciente`
--

CREATE TABLE `paciente` (
  `id` int(11) NOT NULL,
  `Nombre` varchar(30) NOT NULL,
  `Especie` varchar(30) NOT NULL,
  `Nacimiento` varchar(50) NOT NULL,
  `Sexo` varchar(30) NOT NULL,
  `Raza` varchar(50) NOT NULL,
  `Color` varchar(50) NOT NULL,
  `Tamano` varchar(10) NOT NULL,
  `Esterilizado` varchar(2) NOT NULL,
  `FechaIngreso` date NOT NULL,
  `id_dueño_fk` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `paciente`
--

INSERT INTO `paciente` (`id`, `Nombre`, `Especie`, `Nacimiento`, `Sexo`, `Raza`, `Color`, `Tamano`, `Esterilizado`, `FechaIngreso`, `id_dueño_fk`) VALUES
(1, 'pancho', ' canino', '2012', 'Hembra', ' caniche', 'blanco', 'Mediano', 'Si', '2022-03-23', 1),
(2, 'bla bla bla ', ' bla bla bla ', ' 12/03/2021', 'Hembra', ' bla bla ', ' bla bla ', 'Grande', 'No', '2022-03-24', 2),
(3, 'pupi', 'canino', '2020', 'Hembra', 'Hamster', 'Negro y Blanco', 'Chico', 'No', '2022-03-24', 1);

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
-- Indices de la tabla `imagenes`
--
ALTER TABLE `imagenes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_historial_fk` (`id_historial_fk`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `historial`
--
ALTER TABLE `historial`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `imagenes`
--
ALTER TABLE `imagenes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT de la tabla `paciente`
--
ALTER TABLE `paciente`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `historial`
--
ALTER TABLE `historial`
  ADD CONSTRAINT `historial_ibfk_1` FOREIGN KEY (`id_mascota_fk`) REFERENCES `paciente` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `imagenes`
--
ALTER TABLE `imagenes`
  ADD CONSTRAINT `imagenes_ibfk_1` FOREIGN KEY (`id_historial_fk`) REFERENCES `historial` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `paciente`
--
ALTER TABLE `paciente`
  ADD CONSTRAINT `paciente_ibfk_1` FOREIGN KEY (`id_dueño_fk`) REFERENCES `clientes` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
