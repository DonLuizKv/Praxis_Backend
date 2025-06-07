DROP DATABASE IF EXISTS praxis_db;
CREATE DATABASE praxis_db;
USE praxis_db;

DROP TABLE IF EXISTS scenary;
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

CREATE TABLE students (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  identity_document VARCHAR(20) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin','student') NOT NULL DEFAULT 'student',
  state TINYINT(1) NOT NULL DEFAULT 1,
  profile_photo TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE scenary (
  id INT PRIMARY KEY AUTO_INCREMENT,
  student_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(255) DEFAULT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE curriculums (
  id INT PRIMARY KEY AUTO_INCREMENT,
  student_id INT NOT NULL,
  file_path TEXT NOT NULL,
  FOREIGN KEY (student_id) REFERENCES students(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE documents (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  student_id INT NOT NULL,
  document_type ENUM('arl','coverLetter') NOT NULL,
  file_path TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE binnacles (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  student_id INT NOT NULL,
  file_path TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Inserts

INSERT INTO admins (id, name, email, role, password, created_at, updated_at) VALUES
(1, 'xibia', 'admin@praxis.com', 'admin', '$2a$10$SAucIuQ.0lkS.M2XfAnHSeIFFjCVzKaO37jJ2gZMlrbsKAamCYIrW', '2025-04-23 23:14:42', '2025-04-23 23:14:42');

INSERT INTO students (id, name, identity_document, email, password, role, state, profile_photo, created_at, updated_at) VALUES
(1, 'pick up', '123456789', 'juasjuas@a.com', '$2a$10$Z/9cy8B1jNZJaUR2ElqPAOTcRQVHiUlNPHDgbjOni5NjKIV3VuOOO', 'student', 1, '', '2025-04-27 22:23:28', '2025-04-27 22:23:28');

INSERT INTO scenary (id, student_id, name, address) VALUES
(1, 1, 'Gobernacion', 'Calle 123');

