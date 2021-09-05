BEGIN;

--je commence par les tables ayant des champs qui se seront FK dans d'autres tables
--j'ajoute un champ vide pour qu'il y ait un id (nécessaire pour faire des JOIN alors que l'utilisateur ne les renseignera pas forcément...)
INSERT INTO brand ("name") VALUES
    (''),
    ('Charal'),
    ('Herta'),
    ('Lindt'),
    ('Milka');

INSERT INTO shelf ("name") VALUES
    (''),
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
    (''),
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
    ('beurre 1/2 sel',NULL,1,3,8),
    ('jus d''orange',NULL,1,4,4),
    ('bière',NULL,1,4,4),
    ('jambon blanc',NULL,1,13,8),
    ('jambon fumé',NULL,1,13,8),
    ('frites',NULL,1,2,14),
    ('steak haché','pur boeuf',2,13,14),
    ('boisson soja','si possible',1,11,3),
    ('œufs',NULL,1,13,16),
    ('cracottes',NULL,1,11,7),
    ('chocolat au lait',NULL,5,14,7),
    ('chocolat au lait avec noisettes',NULL,5,14,7),
    ('chocolat noir avec framboises',NULL,4,14,7),
    ('Croquettes chat',NULL,1,15,2),
    ('Croquettes chien',NULL,1,15,2),
    ('Yaourt','nature',1,5,8);


COMMIT;