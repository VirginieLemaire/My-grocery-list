# MA LISTE DE COURSES : GROCERY LIST

API REST affichant une liste d'articles pour préparer sa liste de courses.

Ce projet me permet de pratiquer diverses notions apprises en cours (code et organisation d'un projet).

***
<details>
<summary>Table des matières</summary>

- [MA LISTE DE COURSES : GROCERY LIST](#ma-liste-de-courses--grocery-list)
  - [Stack technique](#stack-technique)
  - [Fonctionnalités en place](#fonctionnalités-en-place)
    - [Articles](#articles)
    - [Catégories perso](#catégories-perso)
    - [Rayon (du magasin)](#rayon-du-magasin)
    - [Marques](#marques)
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

Uniquement en lecture et en local pour l'instant (voir [installation](#installation)).

1. [Accès aux articles](#articles)
2. [Accès aux catégories](#catégories-perso)
3. [Accès aux rayons](#rayon-du-magasin)
4. [Accès aux marques](#marques)

### Articles

Détail des données retournées :

- id,
- nom,
- détails (précisions personnelles à propos de l'article),
- id et nom de la [marque](#marques)
- id et nom de la [catégorie](#catégories-perso),
- id et nom du [rayon](#rayon-du-magasin).

Retourne:

- tous les articles de la base de données
- un article (en fonction de son id)
- tous les articles pour une catégorie (en fonction de son id)
- tous les articles pour une marque (en fonction de son id)
- tous les articles pour un rayon (en fonction de son id)

### Catégories perso

Une catégorie représente la façon dont un utilisateur classe un article (dans sa tête ou dans son cellier), ne correspond pas forcément aux rayons du magasin.
Donnée facultative.

Retourne:

- toutes les catégories
- 1 catégorie via son id

### Rayon (du magasin)

Un rayon représente le rayon du magasin où on peut trouver cet article.
Donnée facultative.

Retourne:

- tous les rayons
- 1 rayon via son id

### Marques

La marque permet de préciser la marque voulue pour un article.
Donnée facultative.

Retourne:

- toutes les marques
- 1 marque via son id

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

Un fichier de seed avec quelques données (rien de bien équilibré... :face_with_rolling_eyes:) est dispo dans le [dossier data](https://github.com/VirginieLemaire/My-grocery-list/tree/main/data).

Les accès aux articles (items) sont basés sur une vue qui **a besoin des id** de marque, catégorie et rayon. Or ces données sont facultatives pour l'utilisateur (s'il a envie d'ajouter un article sans se prendre la tête).

Pour cette raison :

- la 1ère entrée des tables marque, catégorie et rayon est "", ce qui lui attribue l'id 1
- pour les entrées sans ces données dans la table item, la valeur par défaut est 1 (voir le [deploy init](https://github.com/VirginieLemaire/My-grocery-list/blob/main/migrations/deploy/init.sql))