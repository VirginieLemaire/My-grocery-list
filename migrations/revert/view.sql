-- Revert grocery_list:view from pg

BEGIN;

DROP VIEW item_with_everything;

COMMIT;
