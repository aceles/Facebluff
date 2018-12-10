

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Base de datos: `facebluff`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `amigo`
--

CREATE TABLE `amigo` (
  `idUsuario` int(11) NOT NULL,
  `idAmigo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pregunta`
--

CREATE TABLE `pregunta` (
  `id` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `text` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `respuesta`
--

CREATE TABLE `respuesta` (
  `id` int(11) NOT NULL,
  `idPregunta` int(11) NOT NULL,
  `text` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `decision`
--

CREATE TABLE `decision` (
  `idUsuario` int(11) NOT NULL,
  `idPregunta` int(11) NOT NULL,
  `idRespuesta` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL UNIQUE,
  `password` varchar(100) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `sexo` varchar(20) NOT NULL,
  `nacimiento` date DEFAULT NULL,
  `img` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `amigo`
--
ALTER TABLE `amigo`
  ADD PRIMARY KEY (`idUsuario`,`idAmigo`);

--
-- Indices de la tabla `pregunta`
--
ALTER TABLE `pregunta`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `amigo`
--
ALTER TABLE `respuesta`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `amigo`
--
ALTER TABLE `decision`
  ADD PRIMARY KEY (`idUsuario`,`idPregunta`,`idRespuesta`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `pregunta`
--
ALTER TABLE `pregunta`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT de la tabla `pregunta`
--
ALTER TABLE `respuesta`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `amigo`
--
ALTER TABLE `amigo`
  ADD CONSTRAINT `amigo_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `amigo`
--
ALTER TABLE `amigo`
  ADD CONSTRAINT `amigo_ibfk_2` FOREIGN KEY (`idAmigo`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `pregunta`
--
ALTER TABLE `pregunta`
  ADD CONSTRAINT `pregunta_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `respuesta`
--
ALTER TABLE `respuesta`
  ADD CONSTRAINT `respuesta_ibfk_1` FOREIGN KEY (`idPregunta`) REFERENCES `pregunta` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `decision`
--
ALTER TABLE `decision`
  ADD CONSTRAINT `decision_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `decision`
--
ALTER TABLE `decision`
  ADD CONSTRAINT `decision_ibfk_2` FOREIGN KEY (`idPregunta`) REFERENCES `pregunta` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `decision`
--
ALTER TABLE `decision`
  ADD CONSTRAINT `decision_ibfk_3` FOREIGN KEY (`idRespuesta`) REFERENCES `respuesta` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;
