-- Deploy grocery_list:init to pg

BEGIN;

--1) les tables dont les id seront FK d'autres tables
CREATE TABLE category (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL UNIQUE
);
CREATE TABLE shelf (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL UNIQUE
);
CREATE TABLE brand (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL UNIQUE
);
--2) les tables avec FK 
CREATE TABLE item (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL,
    details TEXT,
    brand_id INT REFERENCES brand(id),
    category_id INT REFERENCES category(id),
    shelf_id INT REFERENCES shelf(id)
);


COMMIT;
