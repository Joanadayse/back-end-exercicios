-- Active: 1683652129610@@127.0.0.1@3306

CREATE TABLE curso(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    quantity INTEGER NOT NULL
);

INSERT INTO curso(id, name, quantity)VALUES
("s001", "JavaScript", 200),
("s002", "React", 100),
("s003", "Python", 80);

CREATE TABLE alunos(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    curso_id TEXT NOT NULL,
    create_at TEXT DEFAULT(DATETIME()) 
    -- FOREIGN KEY (curso_id) REFERENCES curso(id) ON UPDATE CASCADE
);

INSERT INTO alunos(id, name, curso_id) VALUES
("p001", "Joana", "s001"),
("p002", "Matheus", "s001"),
("p003", "Maria", "s002"),
("p004", "joao", "s003");

DROP TABLE alunos;
DROP TABLE curso;