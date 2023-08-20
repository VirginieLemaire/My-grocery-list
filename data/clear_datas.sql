-- clear datas from all tables
BEGIN;

TRUNCATE TABLE category, brand, shelf, item RESTART IDENTITY CASCADE;

COMMIT;