-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 22-03-2022 a las 02:28:27
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
(4, 'Omar Freiberger', 2147483647, 'omar1@mail.com', 'Burgos 881', 'Azul'),
(5, 'Juan Gonzalez', 2147483647, 'juan@mail.com', 'caneva 332', 'Azul'),
(6, 'Juan Alberto Carlos 3', 2147483647, 'juanCarlo34@gmail.com', 'Calle Seca 230', 'Ayacucho'),
(7, 'Federico Freiberger', 2147483647, 'frei.federico@gmail.com', 'Lavalle 1378', 'Azul'),
(8, 'Brisa Caamaño', 2147483647, 'bricaam@gmail.com', 'belgrano 123', 'Azul'),
(9, 'Juan Rodriguez', 228132012, 'juan@mail.com', 'calle falsa 123', 'Azul'),
(11, 'Sebastian Freiberger', 2147483647, 'sebas@mail.com', 'calle 2 330', 'Azul'),
(16, 'Juancarlo', 2147483647, 'no tiene', 'calle 123', 'azul'),
(17, ' asd', 0, ' ', ' ', ' '),
(18, ' pepe el escamoso', 6486467, ' ksjfuwia', ' najdkfk', ' kakdjdj'),
(19, ' Aguirre Raúl', 228145358, 'omarfreibergerpas@gmail.com', 'Burgos 881', 'Azul');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historial`
--

CREATE TABLE `historial` (
  `id` int(11) NOT NULL,
  `Observacion` text NOT NULL,
  `MotivoConsulta` varchar(255) NOT NULL,
  `Tratamiento` text NOT NULL,
  `Complementarios` varchar(80) NOT NULL,
  `Fecha` date NOT NULL,
  `id_mascota_fk` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `historial`
--

INSERT INTO `historial` (`id`, `Observacion`, `MotivoConsulta`, `Tratamiento`, `Complementarios`, `Fecha`, `id_mascota_fk`) VALUES
(12, 'La gata es muy linda', 'Vomitos', 'Vacunas', '-', '2022-03-06', 1072),
(13, 'La gata mejoro', 'Revision', 'Ya esta curada', '-', '2022-03-13', 1072),
(16, 'En mal estado', 'asdasd', 'chapa y pintura', 'Radiografia / Ecografia / Raspaje', '2022-03-17', 1077),
(18, 'Tiene un hueso mas largo que el otro', 'Segundo chequeo, radiografia', 'Cirugia', '-', '2022-03-24', 1077),
(33, '', 'asdasdasd', '', '-', '2022-03-18', 1097),
(40, '', '', '', 'Analisis-sangre', '2022-03-20', 1104),
(41, '', '', '', '-', '2022-03-20', 1105),
(47, '', '', '', '-', '2022-03-07', 1077),
(48, 'Observaciones', 'Prueba', '', 'Analisis-sangre / Radiografia', '2022-03-21', 1106),
(49, 'Observaciones', 'Consulta', '', '-', '2022-03-21', 1106);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `imagenes`
--

CREATE TABLE `imagenes` (
  `id` int(11) NOT NULL,
  `ruta` varchar(50) NOT NULL,
  `id_historial_fk` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `imagenes`
--

INSERT INTO `imagenes` (`id`, `ruta`, `id_historial_fk`) VALUES
(11, 'images/historial/ 6239034db995a.jpg', 48),
(12, 'images/historial/ 62390bac8ecf4.jpg', 16),
(13, 'images/historial/ 62390bb1a6300.jpg', 16),
(14, 'images/historial/ 62390bb5c71bc.jpg', 16),
(15, 'images/historial/ 62390e01c4c30.jpg', 48),
(18, 'images/historial/ 62391506760cf.jpg', 48),
(19, 'images/historial/ 62391ad3cff0b.jpg', 48),
(20, 'images/historial/ 62391ade3a609.jpg', 48),
(21, 'images/historial/ 62391ae41f00b.jpg', 48);

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
  `FechaIngreso` date NOT NULL,
  `id_dueño_fk` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `paciente`
--

INSERT INTO `paciente` (`id`, `Nombre`, `Especie`, `Nacimiento`, `Sexo`, `Raza`, `Color`, `Tamano`, `Esterilizado`, `FechaIngreso`, `id_dueño_fk`) VALUES
(2, 'Carlos', 'Gatuno', 2015, 'Hembra', 'Gato', 'Marron', 'Chico', 'No', '2022-02-22', 3),
(3, 'Potente', 'Canino', 2018, 'Macho', 'Pitbull', 'Negro', 'Mediano', 'No', '2022-02-22', 4),
(1072, 'Mora', 'Felino', 2012, 'Hembra', 'Gato', 'Negro y Blanco', 'Chico', 'Si', '2022-03-06', 8),
(1077, 'Juancho', 'Reptil', 2020, 'Macho', 'Lagarto', 'Verde ', 'Chico', 'Si', '2022-03-16', 11),
(1097, 'Pepito', 'Felino', 2020, 'h', ' ', 'negro', 'Chico', 'No', '2022-03-18', 16),
(1104, 'carlitos', ' conejo', 2013, ' hembra', ' 8skfjf', ' negro', 'Chico', 'No', '2022-03-20', 18),
(1105, 'faert', ' Gato', 1969, ' Femenino', ' Ferty', ' Azul', 'Chico', 'No', '2022-03-20', 19),
(1106, 'Poncho', 'Perro', 2022, 'Macho', 'Raza', 'Rojo', 'Mediano', 'Si', '2022-03-21', 7);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `historial`
--
ALTER TABLE `historial`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT de la tabla `imagenes`
--
ALTER TABLE `imagenes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `paciente`
--
ALTER TABLE `paciente`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1107;

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
  ADD CONSTRAINT `paciente_ibfk_1` FOREIGN KEY (`id_dueño_fk`) REFERENCES `clientes` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
