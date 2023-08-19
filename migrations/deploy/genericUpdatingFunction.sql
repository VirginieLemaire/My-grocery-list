-- Deploy grocery_list:genericUpdatingFunction to pg

BEGIN;

-- a generic function that allow to update any table given and only the columns that are passed in the json object
CREATE OR REPLACE FUNCTION update_table_dynamic(
    table_name text,
    column_data jsonb
) RETURNS jsonb AS $$
DECLARE
    updated_row jsonb;
    column_name text;
    column_value text;
BEGIN
    -- Initialize the updated_row as an empty JSON object
    updated_row := '{}'::jsonb;

    -- Loop through the JSON object to extract column names and values
    FOR column_name, column_value IN SELECT * FROM jsonb_each_text(column_data)
    LOOP
        -- Exclude the "id" column from the update statement
        IF column_name <> 'id' THEN
			IF column_value IS NULL THEN
				-- Construct and execute an UPDATE statement with NULL value
				EXECUTE format(
					'UPDATE %I SET %I = %L WHERE id = $1',
					table_name, column_name, NULL
				)
				USING (column_data->>'id')::integer; -- Cast "id" value to integer
			ELSE
				-- Construct and execute an UPDATE statement
				EXECUTE format(
					'UPDATE %I SET %I = %L WHERE id = $1',
					table_name, column_name, column_value
				)
				USING (column_data->>'id')::integer; -- Cast "id" value to integer
			END IF;
        END IF;
    END LOOP;

    -- Fetch the updated row using a SELECT statement
    EXECUTE format(
        'SELECT row_to_json(%I) FROM %I WHERE id = $1',
        table_name, table_name
    )
    INTO updated_row
    USING (column_data->>'id')::integer; -- Cast "id" value to integer

    RETURN updated_row; -- Return the updated row as JSONB
END;
$$ LANGUAGE plpgsql;



COMMIT;
