-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 23-02-2022 a las 23:13:19
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
  `Fecha` date NOT NULL,
  `id_mascota_fk` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `historial`
--

INSERT INTO `historial` (`id`, `Observacion`, `MotivoConsulta`, `Tratamiento`, `Fecha`, `id_mascota_fk`) VALUES
(8, 'Tiene la pata quebrada', 'Lo piso un auto', 'Entablilado y reposo', '2022-02-23', 1),
(9, 'La pata no mejora', 'Sigue con dolor', 'Entablillado y reposo', '2022-03-02', 1);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

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
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
