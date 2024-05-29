
-- Tabla de roles
CREATE TABLE Roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);

-- Tabla de usuarios
CREATE TABLE Usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    rol_id INT,
    FOREIGN KEY (rol_id) REFERENCES Roles(id)
);

-- Tabla de cursos
CREATE TABLE Cursos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio_Curso varchar(50),
    fecha_publicacion DATE
);

-- Tabla de testimonios
CREATE TABLE Testimonios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    comentario TEXT NOT NULL,
    fecha DATE NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(id)
);

-- Tabla de contactos
CREATE TABLE Contactos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombres VARCHAR(255) NOT NULL,
    apellidos VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    numero_tlf VARCHAR(255) NOT NULL,
    asunto TEXT NOT NULL,
    fecha DATE NOT NULL
);

-- Insertar roles iniciales
INSERT INTO Roles (nombre) VALUES ('admin'), ('user');

-- Ejemplo de inserción de datos iniciales
INSERT INTO Usuarios (nombre, email, password, rol_id) VALUES ('Sebas', 'admin@ejemplo.com', 'adminpassword', 1);
INSERT INTO Usuarios (nombre, email, password, rol_id) VALUES ('Diego', 'user@ejemplo.com', 'userpassword', 2);
