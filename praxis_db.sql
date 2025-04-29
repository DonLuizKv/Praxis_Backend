-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 28-04-2025 a las 17:39:38
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `praxis_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `role` enum('admin','student') NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `admins`
--

INSERT INTO `admins` (`id`, `name`, `email`, `role`, `password`, `created_at`, `updated_at`) VALUES
(1, 'xibia', 'admin@praxisss.com', 'admin', '$2a$10$SAucIuQ.0lkS.M2XfAnHSeIFFjCVzKaO37jJ2gZMlrbsKAamCYIrW', '2025-04-23 23:14:42', '2025-04-23 23:14:42');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `binnacles`
--

CREATE TABLE `binnacles` (
  `id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `date` date NOT NULL,
  `file_path` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `computer_tools`
--

CREATE TABLE `computer_tools` (
  `id` int(11) NOT NULL,
  `curriculum_id` int(11) NOT NULL,
  `tool` varchar(100) DEFAULT NULL,
  `type` enum('ofimatica','otra') DEFAULT NULL,
  `tool_level` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `curriculums`
--

CREATE TABLE `curriculums` (
  `id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `civil_state` varchar(50) DEFAULT NULL,
  `residence` varchar(150) DEFAULT NULL,
  `residence_phone` varchar(20) DEFAULT NULL,
  `tags` text NOT NULL DEFAULT '[]',
  `photo` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `documents`
--

CREATE TABLE `documents` (
  `id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `document_type` enum('arl','coverLetter') NOT NULL,
  `state` tinyint(1) NOT NULL DEFAULT 0,
  `file_path` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `formations`
--

CREATE TABLE `formations` (
  `id` int(11) NOT NULL,
  `curriculum_id` int(11) NOT NULL,
  `type` enum('primaria','secundaria','universitaria','otra') NOT NULL,
  `institution` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `languages`
--

CREATE TABLE `languages` (
  `id` int(11) NOT NULL,
  `curriculum_id` int(11) NOT NULL,
  `idiom` varchar(50) DEFAULT NULL,
  `read_level` tinyint(4) DEFAULT NULL,
  `writing_level` tinyint(4) DEFAULT NULL,
  `speak_level` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `scenary`
--

CREATE TABLE `scenary` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `students`
--

CREATE TABLE `students` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','student') NOT NULL,
  `state` tinyint(1) NOT NULL DEFAULT 1,
  `document_id` varchar(20) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `scenary_id` int(11)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `students`
--

INSERT INTO `students` (`id`, `name`, `email`, `password`, `role`, `state`, `document_id`, `created_at`, `updated_at`, `scenary_id`) VALUES
(3, 'pick up', 'juasjuas@a.com', '$2a$10$Z/9cy8B1jNZJaUR2ElqPAOTcRQVHiUlNPHDgbjOni5NjKIV3VuOOO', 'student', 1, '123456789', '2025-04-27 22:23:28', '2025-04-27 22:23:28', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `student_references`
--

CREATE TABLE `student_references` (
  `id` int(11) NOT NULL,
  `curriculum_id` int(11) NOT NULL,
  `type` enum('Personal','Profesional') DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `position` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `work_experiences`
--

CREATE TABLE `work_experiences` (
  `id` int(11) NOT NULL,
  `curriculum_id` int(11) NOT NULL,
  `company_name` varchar(150) DEFAULT NULL,
  `position` varchar(100) DEFAULT NULL,
  `direction` varchar(200) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indices de la tabla `binnacles`
--
ALTER TABLE `binnacles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `student_id` (`student_id`);

--
-- Indices de la tabla `computer_tools`
--
ALTER TABLE `computer_tools`
  ADD PRIMARY KEY (`id`),
  ADD KEY `curriculum_id` (`curriculum_id`);

--
-- Indices de la tabla `curriculums`
--
ALTER TABLE `curriculums`
  ADD PRIMARY KEY (`id`),
  ADD KEY `student_id` (`student_id`);

--
-- Indices de la tabla `documents`
--
ALTER TABLE `documents`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_document_type_per_student` (`student_id`,`document_type`);

--
-- Indices de la tabla `formations`
--
ALTER TABLE `formations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `curriculum_id` (`curriculum_id`);

--
-- Indices de la tabla `languages`
--
ALTER TABLE `languages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `curriculum_id` (`curriculum_id`);

--
-- Indices de la tabla `scenary`
--
ALTER TABLE `scenary`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `documentID` (`document_id`),
  ADD KEY `fk_students_scenary` (`scenary_id`);

--
-- Indices de la tabla `student_references`
--
ALTER TABLE `student_references`
  ADD PRIMARY KEY (`id`),
  ADD KEY `curriculum_id` (`curriculum_id`);

--
-- Indices de la tabla `work_experiences`
--
ALTER TABLE `work_experiences`
  ADD PRIMARY KEY (`id`),
  ADD KEY `curriculum_id` (`curriculum_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `binnacles`
--
ALTER TABLE `binnacles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `computer_tools`
--
ALTER TABLE `computer_tools`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `curriculums`
--
ALTER TABLE `curriculums`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `documents`
--
ALTER TABLE `documents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `formations`
--
ALTER TABLE `formations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `languages`
--
ALTER TABLE `languages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `scenary`
--
ALTER TABLE `scenary`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `students`
--
ALTER TABLE `students`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `student_references`
--
ALTER TABLE `student_references`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `work_experiences`
--
ALTER TABLE `work_experiences`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `binnacles`
--
ALTER TABLE `binnacles`
  ADD CONSTRAINT `binnacles_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `computer_tools`
--
ALTER TABLE `computer_tools`
  ADD CONSTRAINT `computer_tools_ibfk_1` FOREIGN KEY (`curriculum_id`) REFERENCES `curriculums` (`id`);

--
-- Filtros para la tabla `curriculums`
--
ALTER TABLE `curriculums`
  ADD CONSTRAINT `curriculums_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`);

--
-- Filtros para la tabla `documents`
--
ALTER TABLE `documents`
  ADD CONSTRAINT `documents_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `formations`
--
ALTER TABLE `formations`
  ADD CONSTRAINT `formations_ibfk_1` FOREIGN KEY (`curriculum_id`) REFERENCES `curriculums` (`id`);

--
-- Filtros para la tabla `languages`
--
ALTER TABLE `languages`
  ADD CONSTRAINT `languages_ibfk_1` FOREIGN KEY (`curriculum_id`) REFERENCES `curriculums` (`id`);

--
-- Filtros para la tabla `students`
--
ALTER TABLE `students`
  ADD CONSTRAINT `fk_students_scenary` FOREIGN KEY (`scenary_id`) REFERENCES `scenary` (`id`);

--
-- Filtros para la tabla `student_references`
--
ALTER TABLE `student_references`
  ADD CONSTRAINT `student_references_ibfk_1` FOREIGN KEY (`curriculum_id`) REFERENCES `curriculums` (`id`);

--
-- Filtros para la tabla `work_experiences`
--
ALTER TABLE `work_experiences`
  ADD CONSTRAINT `work_experiences_ibfk_1` FOREIGN KEY (`curriculum_id`) REFERENCES `curriculums` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
