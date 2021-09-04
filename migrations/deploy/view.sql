-- Deploy grocery_list:view to pg

BEGIN;

CREATE VIEW item_with_everything AS
SELECT item.*, brand.name AS brand, category.name AS category, shelf.name AS shelf
FROM item
JOIN brand ON item.brand_id=brand.id
JOIN category ON item.category_id=category.id
JOIN shelf ON item.shelf_id=shelf.id;

COMMIT;
