BEGIN;

--on commence par les tables ayant des champs qui se seront FK dans d'autres tables
INSERT INTO brand ("name") VALUES
    ('Charal'),
    ('Herta'),
    ('Lindt'),
    ('Milka'),
    ('St Hubert');

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
    ('Chats');

INSERT INTO item ("name", details, brand_id, category_id, shelf_id) VALUES
    ('beurre 1/2 sel',NULL,NULL,2,7),
    ('beurre 1/2 sel cholestérol',NULL,5,2,7),
    ('coca',NULL,NULL,3,3),
    ('monaco',NULL,NULL,3,3),
    ('bière',NULL,NULL,3,3),
    ('jambon blanc',NULL,NULL,12,7),
    ('jambon fumé',NULL,NULL,12,7),
    ('frites',NULL,NULL,1,13),
    ('steak hachés','PUR BŒUF',1,12,13),
    ('boisson soja','si possible de Grand Frais',NULL,10,2),
    ('œufs',NULL,NULL,12,15),
    ('cracottes',NULL,NULL,10,6),
    ('chocolat au lait',NULL,4,13,6),
    ('chocolat au lait avec noisettes',NULL,4,13,6),
    ('chocolat noir avec framboises',NULL,3,13,6),
    ('lardons',NULL,2,12,7),
    ('Croquettes chaton',NULL,NULL,14,1),
    ('Croquettes adulte',NULL,NULL,14,1),
    ('Perle de lait','amandes',NULL,4,7),
    ('Candy-up','chocolat',NULL,3,15);


COMMIT;