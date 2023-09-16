CREATE DATABASE muebles;

USE muebles;

CREATE TABLE muebles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  descripcion TEXT,
  precio DECIMAL(10, 2) NOT NULL,
  Estado VARCHAR(255) NOT NULL
);
