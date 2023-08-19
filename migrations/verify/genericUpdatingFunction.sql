-- Verify grocery_list:genericUpdatingFunction on pg

BEGIN;

-- XXX Add verifications here.
SELECT update_table_dynamic('item', '{
  "id": 1,
  "name": "test",
  "details": "juste un test",
  "category_id": null
}');


ROLLBACK;
