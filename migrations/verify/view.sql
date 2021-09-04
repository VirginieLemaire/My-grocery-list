-- Verify grocery_list:view on pg

BEGIN;

SELECT * from item_with_everything WHERE false;

ROLLBACK;
