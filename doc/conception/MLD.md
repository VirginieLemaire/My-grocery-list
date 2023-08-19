# MLD

## Tables

### Commencer par les tables dont les id seront FK d'autres tables

category(id, name)
shelf(id, name)
brand(id,name)

### tables avec FK

item(id, name, details, #brand(id), #category(id), #shelf(id))