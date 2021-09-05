-- Deploy grocery_list:init to pg

BEGIN;

--1) les tables dont les id seront FK d'autres tables
CREATE TABLE category (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL
);
CREATE TABLE shelf (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL
);
CREATE TABLE brand (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL
);
--2) les tables avec FK default 1 : l'utilisateur ne sera pas obligé de rensiegner ces données mais j'ai besoin d'un id pour la vue (ou pour des JOIN) sinon le résultat est tronqué
CREATE TABLE item (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL,
    details TEXT,
    brand_id INT REFERENCES brand(id) DEFAULT (1),
    category_id INT REFERENCES category(id) DEFAULT (1),
    shelf_id INT REFERENCES shelf(id) DEFAULT (1)
);


COMMIT;
