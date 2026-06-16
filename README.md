# Internship — Plateforme de stages

Application full-stack : backend **NestJS + PostgreSQL**, frontend **React + Vite**.

## 🚀 Démarrer le backend (1 commande)

Le backend et sa base de données sont dockerisés. Tu n'as **rien à installer** côté
backend (ni Node, ni Postgres) — juste Docker.

```bash
docker compose up --build
```

- API disponible sur **http://localhost:3000**
- Base PostgreSQL sur le port hôte **5433** (port `5432` à l'intérieur du réseau Docker)

Pour arrêter : `Ctrl+C` puis `docker compose down`
(ajoute `-v` pour effacer aussi les données de la base).

## 💻 Développer le frontend

Le frontend se développe en local et tape sur le backend dockerisé.

```bash
cd frontend
cp .env.example .env      # configure VITE_API_URL (http://localhost:3000 par défaut)
npm install
npm run dev               # http://localhost:5173
```

Le backend autorise déjà le CORS depuis `http://localhost:5173`.

## 📡 Travailler avec l'API

Tu n'as **pas besoin de connaître NestJS**. Deux supports pour t'aider :

| Fichier | À quoi ça sert |
|---------|----------------|
| [`API.md`](./API.md) | Liste de **tous les endpoints** (méthode, rôle, body, réponse) |
| [`frontend/src/api/types.ts`](./frontend/src/api/types.ts) | **Types TypeScript** de toutes les données échangées |

> 🎓 La couche d'appel à l'API (le `fetch`, le token JWT, etc.), c'est **à toi de
> l'écrire** : c'est l'objectif de l'apprentissage. Le plan détaillé est dans
> [`sprints.md`](./sprints.md), avec des indices à chaque étape.

### Le minimum à savoir

- L'API est en JSON sur `http://localhost:3000`.
- Après login, tu reçois un `access_token` à renvoyer dans l'en-tête
  `Authorization: Bearer <token>` sur chaque requête protégée.
- Les types des bodies et des réponses sont déjà écrits dans `types.ts` :
  importe-les pour typer tes appels.

## 🗂️ Structure

```
backend/    API NestJS (auth, profils, entreprises, offres, candidatures)
frontend/   App React + Vite
API.md      Référence des endpoints
docker-compose.yml
```

## Variables d'environnement du backend

Définies dans `docker-compose.yml`. Pour un lancement hors Docker, copie
`backend/.env.example` vers `backend/.env`.

| Variable | Description |
|----------|-------------|
| `DATABASE_HOST/PORT/USER/PASSWORD/NAME` | Connexion PostgreSQL |
| `JWT_SECRET` | Secret de signature des tokens |
| `JWT_EXPIRATION` | Durée de validité (ex. `1d`) |
| `FRONTEND_URL` | Origine autorisée par le CORS |
