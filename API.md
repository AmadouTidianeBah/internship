# API Backend — Référence des endpoints

Backend NestJS, base URL par défaut : **`http://localhost:3000`**

## Authentification

L'API utilise un **JWT Bearer token**. La plupart des routes nécessitent l'en-tête
`Authorization: Bearer <token>`.

**Routes publiques (sans token)** : `/auth/register`, `/auth/login`, et la consultation
des offres et entreprises en lecture (`GET /internships`, `GET /internships/:id`,
`GET /company`, `GET /company/:id`) — pour qu'un visiteur puisse parcourir le site
sans compte.

1. `POST /auth/register` pour créer un compte
2. `POST /auth/login` → récupère `access_token`
3. Ajoute `Authorization: Bearer <access_token>` sur les requêtes suivantes

Le client fourni (`src/api/client.ts`) gère tout ça automatiquement via `localStorage`.

### Rôles

| Rôle      | Peut faire                                                        |
|-----------|-------------------------------------------------------------------|
| `STUDENT` | gérer son profil, parcourir les offres, postuler                  |
| `COMPANY` | gérer son entreprise, publier des offres, gérer les candidatures  |
| `ADMIN`   | (non créable via l'API)                                           |

Une route refusée à cause du rôle renvoie **403 Forbidden**.

---

## Auth

| Méthode | Endpoint         | Auth | Rôle | Body | Réponse |
|---------|------------------|------|------|------|---------|
| POST | `/auth/register` | ❌ | — | `{ email, password, role }` | `User` (sans mot de passe) |
| POST | `/auth/login`    | ❌ | — | `{ email, password }` | `{ access_token }` |

## Profil (étudiant)

| Méthode | Endpoint          | Auth | Rôle | Body | Réponse |
|---------|-------------------|------|------|------|---------|
| GET  | `/users/profile`  | ✅ | STUDENT | — | `ProfileWithUser` |
| POST | `/users/profile`  | ✅ | STUDENT | `{ firstName, lastName, phone, bio?, linkdin?, github? }` | `ProfileWithUser` |
| PUT  | `/users/profile`  | ✅ | STUDENT | mêmes champs (tous optionnels) | `ProfileWithUser` |

## Entreprise

| Méthode | Endpoint        | Auth | Rôle | Body | Réponse |
|---------|-----------------|------|------|------|---------|
| GET  | `/company`      | ❌ | public | — | `Company[]` |
| GET  | `/company/me`   | ✅ | COMPANY | — | `Company` (avec `internships`) |
| GET  | `/company/:id`  | ❌ | public | — | `Company` (avec `internships`) |
| POST | `/company`      | ✅ | COMPANY | `{ name, description, website?, location }` | `Company` |
| PUT  | `/company`      | ✅ | COMPANY | mêmes champs (optionnels) | `Company` |

> Un compte COMPANY ne peut créer **qu'une seule** entreprise (sinon 409).

## Offres de stage

| Méthode | Endpoint            | Auth | Rôle | Body | Réponse |
|---------|---------------------|------|------|------|---------|
| GET    | `/internships`      | ❌ | public | — | `Internship[]` (avec `company`) |
| GET    | `/internships/:id`  | ❌ | public | — | `Internship` (avec `company`) |
| POST   | `/internships`      | ✅ | COMPANY | `{ title, description, requirements, location, duration }` | `Internship` |
| PUT    | `/internships/:id`  | ✅ | COMPANY (propriétaire) | mêmes champs (optionnels) | `Internship` |
| DELETE | `/internships/:id`  | ✅ | COMPANY (propriétaire) | — | `{ deleted: true }` |

> Il faut avoir créé une entreprise avant de publier une offre.
> On ne peut modifier/supprimer que ses propres offres (sinon 403).

## Candidatures

| Méthode | Endpoint                        | Auth | Rôle | Body | Réponse |
|---------|---------------------------------|------|------|------|---------|
| POST | `/applications`                    | ✅ | STUDENT | `{ internshipId, resume, coverLetter? }` | `Application` |
| GET  | `/applications/me`                 | ✅ | STUDENT | — | `Application[]` (avec `internship`) |
| GET  | `/applications/internship/:id`     | ✅ | COMPANY (propriétaire) | — | `Application[]` (avec `user`) |
| PUT  | `/applications/:id/status`         | ✅ | COMPANY (propriétaire) | `{ status }` | `Application` |

> `:id` dans `/applications/internship/:id` = id de l'**offre**.
> `:id` dans `/applications/:id/status` = id de la **candidature**.
> Un étudiant ne peut postuler qu'une fois par offre (sinon 409).
> `status` ∈ `PENDING` \| `ACCEPTED` \| `REJECTED`.

---

## Codes d'erreur

| Code | Signification |
|------|---------------|
| 400  | Validation échouée (champ manquant/invalide) |
| 401  | Non authentifié (token absent/invalide) |
| 403  | Rôle insuffisant ou ressource d'un autre utilisateur |
| 404  | Ressource introuvable |
| 409  | Conflit (email déjà pris, doublon de candidature, etc.) |

Les types TypeScript de toutes ces structures sont dans **`frontend/src/api/types.ts`**.
À toi d'écrire la couche d'appel (`fetch` + token) en suivant **`sprints.md`**.
