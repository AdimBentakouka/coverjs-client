# CoverJS - Client

Application web qui permet de lire des ebooks qui dépends de l'application coverjs - server

## commande

---

    "start:dev": "react-app-rewired start" => démarre l'application avec l'environnement de dév

    "start:prod": "npx serve -s build" =>  démarre l'application dans l'environnement de prod nécessite de build l'application

    "build": "react-app-rewired build" => build l'application

## Patch note

---

### v1.0

-   Connexion

    -   [x] Ecran de connexion
    -   [x] Ecran de création de compte

-   Accueil

    -   [x] Voir les volumes en cours de lecture
    -   [x] Marquer les volumes en cours de lecture comme non lu ou lu
    -   [x] Voir toutes la bibliothèques
    -   [x] Marquer la collection de volume comme lu ou non lu

-   Menu de navigation

    -   [x] Gérer la luminosité de la page à lire
    -   [x] Possibilité de se déconnecter
    -   [x] Barre de recherche

-   Collection

    -   [x] Voir tous les volumes
    -   [x] Marquer un volume comme lu ou non lu

-   Lecteur

    -   [x] Afficher la page en cours
    -   [x] Changer de page et de volume via des listes
    -   [x] Cliquer a gauche ou a droite pour changer de page
    -   [x] Voir la progression du volume en cours

-   Administration
    -   [x] Valider les comptes

## Todo

-   Connexion
    -   [ ] Mot de passe oubliée
-   Menu de navigation
    -   [ ] Gérer son compte (changer de mdp, voir les connexions actives)
-   Administration
    -   [ ] Voir les volumes en cours d'analyse
    -   [ ] Rafraîchir les métadonnées des volumes
