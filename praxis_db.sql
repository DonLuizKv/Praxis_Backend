DROP DATABASE IF EXISTS praxis_db;
CREATE DATABASE praxis_db;
USE praxis_db;

DROP TABLE IF EXISTS binnacles;
DROP TABLE IF EXISTS documents;
DROP TABLE IF EXISTS computer_tools;
DROP TABLE IF EXISTS formations;
DROP TABLE IF EXISTS languages;
DROP TABLE IF EXISTS student_references;
DROP TABLE IF EXISTS work_experiences;
DROP TABLE IF EXISTS curriculums;
DROP TABLE IF EXISTS students;
DROP TABLE IF EXISTS admins;
DROP TABLE IF EXISTS scenary;

-- Tables

CREATE TABLE admins (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  role ENUM('admin','student') NOT NULL DEFAULT 'admin',
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE scenary (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(255) DEFAULT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE students (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin','student') NOT NULL DEFAULT 'student',
  state TINYINT(1) NOT NULL DEFAULT 1,
  document_id VARCHAR(20) NOT NULL UNIQUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  scenary_id INT,
  FOREIGN KEY (scenary_id) REFERENCES scenary (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE curriculums (
  id INT PRIMARY KEY AUTO_INCREMENT,
  student_id INT NOT NULL,
  civil_state VARCHAR(50) DEFAULT NULL,
  residence VARCHAR(150) DEFAULT NULL,
  residence_phone VARCHAR(20) DEFAULT NULL,
  tags TEXT NOT NULL DEFAULT '[]',
  photo TEXT NOT NULL,
  FOREIGN KEY (student_id) REFERENCES students (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE documents (
  id INT PRIMARY KEY AUTO_INCREMENT,
  student_id INT NOT NULL,
  document_type ENUM('arl','coverLetter') NOT NULL,
  state TINYINT(1) NOT NULL DEFAULT 0,
  file_path VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY unique_document_type_per_student (student_id,document_type),
  FOREIGN KEY (student_id) REFERENCES students (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE binnacles (
  id INT PRIMARY KEY AUTO_INCREMENT,
  student_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  date DATE NOT NULL,
  file_path VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (student_id) REFERENCES students (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE formations (
  id INT PRIMARY KEY AUTO_INCREMENT,
  curriculum_id INT NOT NULL,
  type ENUM('primaria','secundaria','universitaria','otra') NOT NULL,
  institution VARCHAR(150) DEFAULT NULL,
  FOREIGN KEY (curriculum_id) REFERENCES curriculums (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE languages (
  id INT PRIMARY KEY AUTO_INCREMENT,
  curriculum_id INT NOT NULL,
  idiom VARCHAR(50) DEFAULT NULL,
  read_level TINYINT(4) DEFAULT NULL,
  writing_level TINYINT(4) DEFAULT NULL,
  speak_level TINYINT(4) DEFAULT NULL,
  FOREIGN KEY (curriculum_id) REFERENCES curriculums (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE computer_tools (
  id INT PRIMARY KEY AUTO_INCREMENT,
  curriculum_id INT NOT NULL,
  tool VARCHAR(100) DEFAULT NULL,
  type ENUM('ofimatica','otra') DEFAULT NULL,
  tool_level TINYINT(4) DEFAULT NULL,
  FOREIGN KEY (curriculum_id) REFERENCES curriculums (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE student_references (
  id INT PRIMARY KEY AUTO_INCREMENT,
  curriculum_id INT NOT NULL,
  type ENUM('Personal','Profesional') DEFAULT NULL,
  name VARCHAR(100) DEFAULT NULL,
  phone VARCHAR(20) DEFAULT NULL,
  position VARCHAR(100) DEFAULT NULL,
  FOREIGN KEY (curriculum_id) REFERENCES curriculums (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE work_experiences (
  id INT PRIMARY KEY AUTO_INCREMENT,
  curriculum_id INT NOT NULL,
  company_name VARCHAR(150) DEFAULT NULL,
  position VARCHAR(100) DEFAULT NULL,
  direction VARCHAR(200) DEFAULT NULL,
  phone VARCHAR(20) DEFAULT NULL,
  FOREIGN KEY (curriculum_id) REFERENCES curriculums (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Inserts

INSERT INTO admins (id, name, email, role, password, created_at, updated_at) VALUES
(1, 'xibia', 'admin@praxis.com', 'admin', '$2a$10$SAucIuQ.0lkS.M2XfAnHSeIFFjCVzKaO37jJ2gZMlrbsKAamCYIrW', '2025-04-23 23:14:42', '2025-04-23 23:14:42');

INSERT INTO scenary (id, name, address, created_at) VALUES
(1, 'Escenario Principal', 'Calle Principal 123', NOW());

INSERT INTO students (id, name, email, password, role, state, document_id, created_at, updated_at, scenary_id) VALUES
(3, 'pick up', 'juasjuas@a.com', '$2a$10$Z/9cy8B1jNZJaUR2ElqPAOTcRQVHiUlNPHDgbjOni5NjKIV3VuOOO', 'student', 1, '123456789', '2025-04-27 22:23:28', '2025-04-27 22:23:28', 1);