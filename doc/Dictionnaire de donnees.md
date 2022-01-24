# My Grocery List - Dictionnaire de données

## Table category (catégorie)

| Champ | Type | Spécificités | Description |
| --- | --- | --- | --- |
| id | INT | GENERATED ALWAYS AS IDENTITY,PRIMARY KEY | identifiant |
| name | TEXT | NOT NULL | nom de la catégorie personnalisée : façon dont l'utilisateur "classe" ses articles. Ex. "goûters" |

## Table shelf (rayon)

| Champ | Type | Spécificités | Description |
| --- | --- | --- | --- |
| id | INT | GENERATED ALWAYS AS IDENTITY,PRIMARY KEY | identifiant |
| name | TEXT | NOT NULL | nom du rayon dans lequel trouver un article en magasin. Ex. "épicerie salée" |

## Table brand (marque)

| Champ | Type | Spécificités | Description |
| --- | --- | --- | --- |
| id | INT | GENERATED ALWAYS AS IDENTITY,PRIMARY KEY | identifiant |
| name | TEXT | NOT NULL | nom de la marque. Ex. "Paysan Breton" |

## Table item (article)

| Champ | Type | Spécificités | Description |
| --- | --- | --- | --- |
| id | INT | GENERATED ALWAYS AS IDENTITY,PRIMARY KEY | identifiant |
| name | TEXT | NOT NULL | nom de l'article. Ex. "beurre" |
| details | TEXT |  | détails ou commentaires écrits par l'utilisateur pour apporter un précision sur l'article à acheter. Ex. "bio de préférence" |
| brand_id | INT | REFERENCES ... | identifiant de la marque rattachée à l'article (clé étrangère) |
| category_id | INT | REFERENCES ... | identifiant de la catégorie rattachée à l'article (clé étrangère) |
| shelf_id | INT | REFERENCES ... | identifiant du rayon rattaché à l'article (clé étrangère) |