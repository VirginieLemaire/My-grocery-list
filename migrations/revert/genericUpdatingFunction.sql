-- Revert grocery_list:genericUpdatingFunction from pg

BEGIN;

-- delete the function
DROP FUNCTION update_table_dynamic;

COMMIT;
