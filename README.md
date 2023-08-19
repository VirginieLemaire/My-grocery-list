# 🛒 MA LISTE DE COURSES : GROCERY LIST 🛒

API REST affichant une liste d'articles pour préparer sa liste de courses.

Ce projet me permet de pratiquer diverses notions apprises en cours (code et organisation d'un projet). Il est en cours de développement.

***
<details>
<summary>Table des matières</summary>

- [🛒 MA LISTE DE COURSES : GROCERY LIST 🛒](#-ma-liste-de-courses--grocery-list-)
  - [Stack technique](#stack-technique)
  - [Fonctionnalités en place](#fonctionnalités-en-place)
    - [Articles](#articles)
      - [Détail des données retournées :](#détail-des-données-retournées-)
      - [Accéder aux données :](#accéder-aux-données-)
    - [Catégories perso](#catégories-perso)
      - [Détail des données retournées :](#détail-des-données-retournées--1)
      - [Accéder aux données :](#accéder-aux-données--1)
    - [Rayon (du magasin)](#rayon-du-magasin)
      - [Détail des données retournées :](#détail-des-données-retournées--2)
      - [Accéder aux données :](#accéder-aux-données--2)
    - [Marques](#marques)
      - [Détail des données retournées :](#détail-des-données-retournées--3)
      - [Accéder aux données :](#accéder-aux-données--3)
  - [Fonctionnalités à venir](#fonctionnalités-à-venir)
  - [Installation](#installation)
    - [Précisions pour le seed](#précisions-pour-le-seed)
  
</details>

***

## Stack technique

- [NodeJS](https://nodejs.org/en/download/) (v12 ou supérieure)
- [PostgreSQL](https://www.postgresql.org/download/) (v12 ou supérieure)
- [Sqitch](https://sqitch.org/download/) (v1 ou supérieure)
- [Git](https://git-scm.com/downloads)

## Fonctionnalités en place

Accès en lecture et écriture, uniquement en local pour l'instant (voir [installation](#installation)).

1. [Accès aux articles](#articles)
2. [Accès aux catégories](#catégories-perso)
3. [Accès aux rayons](#rayon-du-magasin)
4. [Accès aux marques](#marques)

Les données sont retournées au format *.json.

Ci-dessous le paramètre {{host}} représente l'URL que vous paramètrerez. Par exemple `localhost:3000/api` (le port étant paramétré dans votre fichier `.env` et le "api" dans index.js, ligne 18).

### Articles

#### Détail des données retournées :

- id,
- nom,
- détails (précisions personnelles à propos de l'article),
- id et nom de la [marque](#marques)
- id et nom de la [catégorie](#catégories-perso),
- id et nom du [rayon](#rayon-du-magasin).

#### Accéder aux données : 

- Liste de tous les articles de la base de données :

  ```
  GET {{host}}/items
  ``` 

- Accès à un article (en fonction de son id)
  ```
  GET {{host}}/items/:id
  ``` 

- Liste de tous les articles correspondant à un filtre par marque et/ou catégorie et/ou rayon. 
  ```
  GET {{host}}/items/filter?
  ```

  Exemple : pour obtenir la liste des articles concernant à la fois une catégorie précise, dans un rayon donné et pour une certaine marque : 
  
  ```
  GET {{host}}/items/filter?shelf=Epicerie sucrée&category=Friandises&brand=Lindt
  ```

### Catégories perso

Une catégorie représente la façon dont un utilisateur classe un article (dans sa tête ou dans son cellier), ne correspond pas forcément aux rayons du magasin.
Donnée facultative.

#### Détail des données retournées :

- id,
- nom

#### Accéder aux données : 

- Liste de toutes les catégories
  
  ```
  GET {{host}}/categories
  ``` 

- Accès à une catégorie via son id
    
  ```
  GET {{host}}/categories/:id
  ```

### Rayon (du magasin)

Un rayon représente le rayon du magasin où on peut trouver cet article.
Donnée facultative.

#### Détail des données retournées :

- id,
- nom

#### Accéder aux données : 

- Liste de tous les rayons
  
  ```
  GET {{host}}/shelves
  ``` 

- Accès à un rayon via son id
    
  ```
  GET {{host}}/shelves/:id
  ```

### Marques

La marque permet de préciser la marque voulue pour un article.
Donnée facultative.

#### Détail des données retournées :

- id,
- nom

#### Accéder aux données : 

- Liste de tous les rayons
  
  ```
  GET {{host}}/brands
  ``` 

- Accès à un rayon via son id
    
  ```
  GET {{host}}/brands/:id
  ```

## Fonctionnalités à venir

- Documentation
- Création d'articles, catégories, marques et rayons,
- Modification d'articles, catégories, marques et rayons,
- Suppression d'articles, catégories, marques et rayons.

## Installation

Vous pouvez cloner le repo en cliquant sur le bouton "code" en haut à droite de la page d'accueil du repo et choisir la méthode que vous préférez (HTTPS, SSH ou GithubCLI).

 ![code](doc/screenshots/cloner.png)

Sur votre terminal exécutez la commande suivante :

```bash
git clone <url du dépôt>
```

Dans le dossier local, installez les dépendances NPM

```bash
npm install
```

Enfin, créez une base de données PostgreSQL, votre fichier `.env` et `sqitch.conf` (des fichiers d'exemple sont fournis à la racine du projet) et déployez le projet sqitch.

```bash
createdb <nom de votre database>
sqitch deploy
```

💡 Configurez PostgreSQL (ou fournir les variables d'environnement nécessaires à la connexion) pour que les commandes `creatdb` et `sqitch` puissent s'éxécuter correctement.

Lancez le serveur avec la commande

```bash
npm run start
```

Vous pouvez accéder aux données avec le fichier `api.http` qui se trouve à la racine du projet.


### Précisions pour le seed

Un fichier de seed avec quelques données (rien de bien équilibré... 😅) est dispo dans le [dossier data](https://github.com/VirginieLemaire/My-grocery-list/tree/main/data).