-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 17-03-2022 a las 16:06:43
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
(11, 'Sebastian Freiberger', 2147483647, 'sebas@mail.com', 'calle 2 330', 'Azul');

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
(10, '-', 'Porque le dolia la panza', 'Inspeccion visual (?)', '', '2022-02-23', 14),
(12, 'La gata es muy linda', 'Vomitos', 'Vacunas', '', '2022-03-06', 1072),
(13, 'La gata mejoro', 'Revision', 'Ya esta curada', '', '2022-03-13', 1072),
(14, 'La perra esta debil', 'Comio crema corporal', 'Inyecciones y antibiotico', '', '2022-03-06', 1073),
(16, 'Esta en buen estado.', 'Se le cayo la cola', 'Ninguno', 'Analisis-sangre / Radiografia / Ecografia / Raspaje / Citologia', '2022-03-16', 1077),
(17, '-', 'Chequeo', '-', 'Analisis-sangre / Radiografia', '2022-03-16', 1082),
(18, 'Tiene un hueso mas largo que el otro', 'Segundo chequeo, radiografia', 'Cirugia', 'Radiografia', '2022-03-24', 1077);

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
(2, 'Budin', 'Gatuno', 2015, 'Hembra', 'Gato', 'Marron', 'Chico', 'No', '2022-02-22', 3),
(3, 'Potente', 'Canino', 2018, 'Macho', 'Pitbull', 'Negro', 'Mediano', 'No', '2022-02-22', 4),
(14, 'Poncho', 'Canino', 2017, 'Macho', 'Border Collie', 'Negro y blanco', 'Mediano', 'No', '2022-02-23', 7),
(1072, 'Mora', 'Felino', 2012, 'Hembra', 'Gato', 'Negro y Blanco', 'Chico', 'Si', '2022-03-06', 8),
(1073, 'India', 'Canino', 2018, 'Hembra', 'Beagle', 'Marron,Blanco,Negro', 'Mediano', 'No', '2022-03-06', 8),
(1077, 'Juancho', 'Reptil', 2020, 'Macho', 'Lagarto', 'Verde ', 'Chico', 'Si', '2022-03-16', 11),
(1082, 'Sancho', 'Oso', 2022, 'Macho', 'Panda', 'Negro y Blanco', 'Chico', 'No', '2022-03-16', 11);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `historial`
--
ALTER TABLE `historial`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `paciente`
--
ALTER TABLE `paciente`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1083;

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
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
