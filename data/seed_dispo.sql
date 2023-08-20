BEGIN;

-- on supprime toutes les données présentes dans les tables en faisant repartir les id à zéro (au cas où)
TRUNCATE TABLE category, brand, shelf, item RESTART IDENTITY CASCADE;

--je commence par les tables ayant des champs qui se seront FK dans d'autres tables
INSERT INTO brand ("name") VALUES 
    ('Bjorg'),
	('Charal'),
    ('Herta'),
    ('Lindt'),
    ('Milka');

INSERT INTO shelf ("name") VALUES
    ('Animalerie'),
    ('Bio'),
    ('Boissons'),
    ('Entretien Nettoyage'),
    ('Epicerie salée'),
    ('Epicerie sucrée'),
    ('Frais'),
    ('Fruits - légumes'),
    ('Hygiène Beauté'),
    ('Loisirs'),
    ('Pain- pâtisseries'),
    ('Produits du monde'),
    ('Surgelés'),
    ('Viande - poisson'),
    ('Lait-œufs');

INSERT INTO category ("name") VALUES
    ('Accompagnements'),
    ('Assaisonnement'),
    ('Boissons'),
    ('Dessert'),
    ('Entrée'),
    ('Goûter'),
    ('Jus de fruits'),
    ('Lait et boisson végétalisée'),
    ('Légumes'),
    ('Petit-dej'),
    ('Plat unique'),
    ('Viande - poisson - jambon etc'),
    ('Friandises'),
    ('Animaux');

INSERT INTO item ("name", details, brand_id, category_id, shelf_id) VALUES
    ('beurre 1/2 sel',NULL,NULL,2,7),
    ('jus d’orange',NULL,NULL,7,3),
    ('bière',NULL,NULL,3,3),
    ('jambon blanc',NULL,3,12,7),
    ('jambon fumé',NULL,NULL,12,7),
    ('frites',NULL,NULL,1,13),
    ('steak hachés','PUR BŒUF',2,12,13),
    ('boisson soja','si possible',1,8,2),
    ('œufs',NULL,NULL,12,15),
    ('cracottes',NULL,NULL,10,6),
    ('chocolat au lait',NULL,4,13,6),
    ('chocolat au lait avec noisettes',NULL,4,13,6),
    ('chocolat noir avec framboises',NULL,4,13,6),
    ('croquettes chat',NULL,NULL,14,1),
    ('croquettes chien',NULL,NULL,14,1),
    ('yaourt','nature',NULL,4,7);


COMMIT;