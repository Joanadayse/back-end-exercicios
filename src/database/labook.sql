-- Active: 1682462761859@@127.0.0.1@3306


CREATE TABLE videos(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    titulo TEXT NOT NULL,
    duracao INTEGER NOT NULL,
    create_at TEXT DEFAULT(DATETIME()) NOT NULL
) ;

INSERT INTO videos(id,titulo,duracao)VALUES
("c21","video de bichinhos", 5),
("c22","video de criança", 2);

DROP TABLE videos;