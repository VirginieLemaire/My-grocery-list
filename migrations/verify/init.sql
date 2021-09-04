-- Verify grocery_list:init on pg

BEGIN;

SELECT * FROM item WHERE false;
SELECT * FROM brand WHERE false;
SELECT * FROM shelf WHERE false;
SELECT * FROM category WHERE false;

ROLLBACK;
