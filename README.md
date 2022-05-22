# API

## Installation 

### ENV

| Nom   |      Description      |
|----------|:-------------:|
| EXPIRESIN|  Temps d'expiration du token jwt |
| SECRETKEY  |  JWT secret key |
| DB_HOST | IP/ADDR de la base de données| 
| DB_PASSWORD | Mot de passe de la base de données | 

### Via Docker 

```bash
docker pull maximepizzolitto/polycodeapi

docker run -it -p <port>:<port> -e DB_HOST=<ip> -e DB_PASSWORD=<password>-e EXPIREIN=<time> -e SECRETKEY=<secretkey>  maximepizzolitto/polycodeapi

```
### CLI 

```bash
yarn install 

npm run build 

node dist/main.js
```

## Routes

| Route   |      Description      |
|----------|:-------------:|
| /auth/login|  Connexion, renvoie un JWT token |
| /auth/register  |   Création d'un nouvel utilisateur
| /challenge/:id | Récupère les infos du challenge d'id *:id* | 
| /challenge | Récupère tout les challenges | 



## Technologies utilisées    

### Nest

J'ai fait le choix d'utiliser Nest pour découvrir une nouvelle manière de réaliser une API. Premièrement je trouve très intéressant l'architecture de conception avec Nest , qui se base sur des modules , des controllers et des providers. C'était une approche que j'ai pu utiliser rapidement avec Angular et que je voulais approfondir. De plus je n'ai pas voulu refaire la même erreur qu'au premier projet, j'ai donc décidé d'utiliser un ORM avec Nest.


### TypeORM

L'ORM le plus utilisé sur Nest est TypeORM. C'était la première fois que j'en utilise un et j'ai pu gagner du temps.

### Passport 

J'ai utilisé Passport pour simplifier l'authentification avec JWT

## CI/CD 

La CI/CD permet de build une image docker à partir du code de l'API et du Dockerfile et de push cette image sur le DockerHub.

