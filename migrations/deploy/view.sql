-- Deploy grocery_list:view to pg

BEGIN;

CREATE VIEW item_with_everything AS
SELECT item.*, brand.name AS brand, category.name AS category, shelf.name AS shelf
FROM item
LEFT JOIN brand ON item.brand_id=brand.id
LEFT JOIN category ON item.category_id=category.id
LEFT JOIN shelf ON item.shelf_id=shelf.id;

COMMIT;
