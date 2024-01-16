# Introduction 
Bienvenue dans notre projet JHipster dédié à la gestion des terrains ! Notre application vise à simplifier la gestion et la réservation de terrains de sport, en offrant une plateforme conviviale et efficace pour les clients, les clubs sportifs et les administrateurs.Elle s'agit d'une application monolithique, cela signifie que toutes les fonctionnalités et composants de l'application sont regroupés en un seul ensemble.

# Les entités clés du projet :
- Client : Représente les utilisateurs de l'application avec des informations telles que le nom, prénom, email et mot de passe.

- Club : Décrit les clubs sportifs avec leur nom respectif.

- Pack : Représente les différents types de forfaits proposés, comprenant le nom du pack, le tarif, et le nombre de matches inclus.

- PackClient : Établit une relation entre les clients et les packs, enregistrant la date d'adhésion.

- Photo : Stocke des images, associées aux terrains .

- Reservation : Enregistre les réservations des clients, avec la date et l'état de la réservation.

- ReservationTerrain : Associe les réservations à des terrains spécifiques, avec des informations sur l'heure et la date de la réservation.

- Terrain : Détaille les caractéristiques des terrains, telles que le nom, l'adresse, la localisation géographique, le rang, le type, l'état, la description, le tarif, etc.

- Ville et Zone : Structurent les terrains en fonction de la géographie, avec la ville contenant des zones, et chaque zone comprenant plusieurs terrains.

# Les technologies utilisées :
- JHipster
- Spring Boot : Utilisé pour développer le backend du projet.
- React : Utilisé pour développer le frontend du projet.
- Hibernate : Pour la gestion des bases de données.
- Base de données : H2.
- Maven : Pour la gestion des dépendances et la construction du projet.
- Docker : Pour la conteneurisation des applications.
- SonarCloud : Outil d'analyse du code dans notre projet JHipster.
# Les commandes utilisées :
- mvn clean install : Pour nettoyer, compiler et installer le projet .
- ./mvnw : Pour lancer l'application en mode développement.
- npm start : Pour le démarrage du serveur de développement pour la partie frontend de l'application.

## Pour tirer (pull) l'image Docker depuis le registre, vous pouvez utiliser la commande suivante:

```bash
docker pull ghitabaghdad12670/gestiondesterrains:latest
```
# Diagramme de classe (jhipster-jdl):
<img width="500" alt="image" src="https://github.com/ghita-baghdad/projet-gestion-des-terrains-v/assets/147450314/552727ce-b72b-4963-a4c4-991edef9b057">

# certains champs doivent être remplis pour soumettre le formulaire avec succès

![image](https://github.com/ghita-baghdad/projet-gestion-des-terrains-v/assets/147449053/91f51629-830e-4280-a375-c771147be007)
# Authentification  :
Vous pouvez utiliser : 
-username : admin@admin
-password : admin@admin

https://github.com/ghita-baghdad/projet-gestion-des-terrains-v/assets/147450314/00e144ba-a78f-4f03-8ddf-7fef22a0cc7f

# Map

https://github.com/ghita-baghdad/projet-gestion-des-terrains-v/assets/147449053/a128e9f0-8daa-4a7c-94d4-d9eebdf4f5a4

# Filtrage par date et par Nom du client :

https://github.com/ghita-baghdad/projet-gestion-des-terrains-v/assets/147449053/999c2cfa-b83c-4ad7-a455-f99579e404f6

# CRUD :

https://github.com/ghita-baghdad/projet-gestion-des-terrains-v/assets/147449053/6a355e77-b652-4952-a5a8-c17378fccef1

# Login-Logout et traduction : 

https://github.com/ghita-baghdad/projet-gestion-des-terrains-v/assets/147449053/5b40eaec-e378-4cc6-86a8-cc0c4f2a64e7

# Accees a l'interface via docker :

![Capture d’écran (1235)](https://github.com/ghita-baghdad/projet-gestion-des-terrains-v/assets/147449053/b8ecba31-4106-46b8-91f1-54f97b5880fa)






