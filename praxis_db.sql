DROP DATABASE IF EXISTS praxis_db;
CREATE DATABASE praxis_db;

\c praxis_db;

-- Eliminación de tablas (orden correcto por dependencias)
DROP TABLE IF EXISTS scenary CASCADE;
DROP TABLE IF EXISTS binnacles CASCADE;
DROP TABLE IF EXISTS documents CASCADE;
DROP TABLE IF EXISTS computer_tools CASCADE;
DROP TABLE IF EXISTS formations CASCADE;
DROP TABLE IF EXISTS languages CASCADE;
DROP TABLE IF EXISTS student_references CASCADE;
DROP TABLE IF EXISTS work_experiences CASCADE;
DROP TABLE IF EXISTS curriculums CASCADE;
DROP TABLE IF EXISTS students CASCADE;
DROP TABLE IF EXISTS admins CASCADE;

-- =========================
-- Tablas principales
-- =========================

CREATE TYPE user_role AS ENUM ('admin', 'student');
CREATE TYPE document_type_enum AS ENUM ('arl', 'coverLetter');

CREATE TABLE admins (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  role user_role NOT NULL DEFAULT 'admin',
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  identity_document VARCHAR(20) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role user_role NOT NULL DEFAULT 'student',
  state BOOLEAN NOT NULL DEFAULT TRUE,
  profile_photo TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE scenary (
  id SERIAL PRIMARY KEY,
  student_id INT NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE curriculums (
  id SERIAL PRIMARY KEY,
  student_id INT NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  file_path TEXT NOT NULL
);

CREATE TABLE documents (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  student_id INT NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  document_type document_type_enum NOT NULL,
  file_path TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE binnacles (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  student_id INT NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  file_path TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- Inserciones iniciales
-- =========================

INSERT INTO admins (name, email, role, password, created_at, updated_at)
VALUES
('xibia', 'admin@praxis.com', 'admin',
 '$2a$10$SAucIuQ.0lkS.M2XfAnHSeIFFjCVzKaO37jJ2gZMlrbsKAamCYIrW',
 '2025-04-23 23:14:42', '2025-04-23 23:14:42');

INSERT INTO students (name, identity_document, email, password, role, state, profile_photo, created_at, updated_at)
VALUES
('pick up', '123456789', 'juasjuas@a.com',
 '$2a$10$Z/9cy8B1jNZJaUR2ElqPAOTcRQVHiUlNPHDgbjOni5NjKIV3VuOOO',
 'student', TRUE, '', '2025-04-27 22:23:28', '2025-04-27 22:23:28');

INSERT INTO scenary (student_id, name, address)
VALUES (1, 'Gobernacion', 'Calle 123');

-- =========================
-- Trigger opcional para updated_at automático
-- =========================

CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Agregar trigger a las tablas que requieren updated_at
DO $$
DECLARE
  tbl TEXT;
BEGIN
  FOREACH tbl IN ARRAY ARRAY['admins','students','documents','binnacles']
  LOOP
    EXECUTE format('
      CREATE TRIGGER trg_update_%I
      BEFORE UPDATE ON %I
      FOR EACH ROW
      EXECUTE FUNCTION update_timestamp();', tbl, tbl);
  END LOOP;
END;
$$;
