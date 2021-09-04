-- Revert grocery_list:init from pg

BEGIN;

DROP TABLE
    item,
    brand,
    shelf,
    category
;

COMMIT;
