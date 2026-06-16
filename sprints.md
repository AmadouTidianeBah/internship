# Plan de sprints — Frontend de la plateforme de stages

Bienvenue ! 👋 Ce document est ta feuille de route pour construire le frontend, **pas à pas**.
Le backend est déjà fini et tourne dans Docker — toi, tu construis l'interface React qui
le consomme.

L'objectif n'est pas juste « que ça marche », c'est que **tu pratiques le React** que tu
viens d'apprendre : composants, props, state, hooks, routing, appels HTTP, formulaires.

## Comment travailler

- **Un sprint à la fois, dans l'ordre.** Chaque sprint s'appuie sur le précédent.
- Avant de coder un sprint, lis-le en entier.
- Coche les tâches au fur et à mesure (`- [ ]` → `- [x]`).
- À la fin d'un sprint, vérifie la **Definition of Done** (DoD) avant de passer à la suite.
- Bloquée plus de 30 min ? Relis les **indices** du sprint, puis demande de l'aide.
- Fais des commits courts et fréquents (un par tâche, c'est très bien).

## Ce qui est déjà à ta disposition

| Ressource | Où | Usage |
|-----------|-----|-------|
| Backend + base de données | `docker compose up --build` | API sur `http://localhost:3000` |
| Liste des endpoints | [`API.md`](./API.md) | quel appel pour quoi |
| Types TypeScript | `frontend/src/api/types.ts` | typer tes données |

> ⚠️ Il n'y a **pas** de client API tout fait : tu vas l'écrire toi-même (Sprint 1).
> C'est volontaire, c'est le cœur de l'exercice.

## Stack conseillée

- **React + Vite + TypeScript** (déjà en place)
- **react-router-dom** pour la navigation → `npm i react-router-dom`
- Le `fetch` natif du navigateur pour les appels HTTP (pas besoin d'axios)
- Le style : commence simple (CSS classique ou CSS Modules), le design viendra après

---

## Sprint 0 — Prise en main 🛠️

**Objectif :** lancer le projet et comprendre l'existant.

- [ ] Lancer le backend : `docker compose up --build`, vérifier `http://localhost:3000`
- [ ] Lancer le frontend : `cd frontend && npm install && npm run dev`
- [ ] Copier `frontend/.env.example` en `frontend/.env`
- [ ] Ouvrir `API.md` et `frontend/src/api/types.ts`, les survoler
- [ ] Faire un premier appel manuel à l'API pour voir une réponse (avec `curl`, Postman,
      ou l'onglet Réseau du navigateur) : `POST /auth/register` puis `POST /auth/login`
- [ ] Nettoyer `App.tsx` (enlever le contenu de démo Vite)

**Notions à réviser :** structure d'un projet Vite, `npm run dev`, variables `import.meta.env`.

**DoD :** les deux serveurs tournent, tu as vu une vraie réponse JSON de l'API.

---

## Sprint 1 — La couche API et l'authentification 🔐

**Objectif :** écrire ta fonction d'appel à l'API, puis t'inscrire / te connecter.

- [ ] Créer `src/api/http.ts` : une fonction `request(method, path, body?)` qui :
  - fait un `fetch` vers `import.meta.env.VITE_API_URL`
  - met l'en-tête `Content-Type: application/json` quand il y a un body
  - ajoute `Authorization: Bearer <token>` si un token est stocké
  - lève une erreur si la réponse n'est pas `ok`
  - renvoie le JSON typé
- [ ] Gérer le token dans `localStorage` (le stocker au login, le lire à chaque requête)
- [ ] Page **Inscription** : formulaire `email / password / role` → `POST /auth/register`
- [ ] Page **Connexion** : formulaire `email / password` → `POST /auth/login`,
      stocker `access_token`
- [ ] Bouton **Déconnexion** : supprimer le token

**Notions à réviser :** `fetch` + `async/await`, `useState`, formulaires contrôlés,
`localStorage`, gestion d'erreur avec `try/catch`, les génériques TypeScript (`request<T>`).

**Indices :**
- Importe tes types depuis `api/types.ts` (`RegisterPayload`, `LoginResponse`, etc.).
- `/auth/login` renvoie `{ access_token }`, pas l'utilisateur.
- Un formulaire contrôlé = une valeur dans le `state` + `onChange` qui la met à jour.

**DoD :** tu peux créer un compte, te connecter, et le token est bien stocké
(vérifie dans l'onglet Application → Local Storage du navigateur).

---

## Sprint 2 — Navigation et routes protégées 🧭

**Objectif :** structurer l'app avec des pages et protéger celles qui demandent un login.

- [ ] Installer et configurer `react-router-dom`
- [ ] Définir les routes : `/login`, `/register`, `/` (accueil), `/profile`, `/internships`…
- [ ] Créer un composant `ProtectedRoute` qui redirige vers `/login` si pas de token
- [ ] Créer un **layout** commun (barre de navigation avec liens + bouton déconnexion)
- [ ] Afficher des liens différents selon que l'utilisateur est connecté ou non

**Notions à réviser :** `BrowserRouter`, `Routes`/`Route`, `Link`, `useNavigate`,
`Navigate`, composition de composants (`children`).

**Indices :**
- Une route protégée, c'est un composant qui regarde le token et rend soit la page,
  soit `<Navigate to="/login" />`.
- Pense à décoder le rôle de l'utilisateur (il est dans le JWT, ou re-demande-le après login).

**DoD :** naviguer entre les pages fonctionne, une page protégée renvoie au login
si on n'est pas connecté.

---

## Sprint 3 — Profil étudiant 👤

**Objectif :** un étudiant peut créer, voir et modifier son profil.

- [ ] Page **Profil** : au chargement, `GET /users/profile`
      (gère le cas « profil pas encore créé » → 404)
- [ ] Formulaire de **création** de profil → `POST /users/profile`
- [ ] Formulaire de **modification** → `PUT /users/profile`
- [ ] Afficher un état de chargement et les messages d'erreur

**Notions à réviser :** `useEffect` pour charger des données au montage, état
`loading` / `error` / `data`, formulaires pré-remplis.

**Indices :**
- Le pattern classique : `useEffect(() => { charger() }, [])`.
- Réutilise un seul composant de formulaire pour création **et** édition.
- `phone` est un **nombre** côté backend (attention au `Number(...)`).

**DoD :** un étudiant connecté peut créer son profil, le recharger, et le modifier.

---

## Sprint 4 — Offres de stage (lecture) 📋

**Objectif :** lister et consulter les offres. Visible par tous les connectés.

- [ ] Page **Liste des offres** : `GET /internships`, afficher titre / entreprise / lieu
- [ ] Page **Détail d'une offre** : `GET /internships/:id`, route `/internships/:id`
- [ ] Lien depuis la liste vers le détail

**Notions à réviser :** rendu de listes avec `.map()` et la prop `key`, paramètres
d'URL avec `useParams`, composants réutilisables (une carte d'offre).

**Indices :**
- Le type `Internship` (dans `types.ts`) contient `company` quand le backend l'inclut.
- Sors la « carte d'offre » dans son propre composant qui reçoit l'offre en props.

**DoD :** la liste s'affiche, cliquer sur une offre ouvre sa page de détail.

---

## Sprint 5 — Espace entreprise 🏢

**Objectif :** un compte `COMPANY` gère son entreprise et ses offres.
(Crée un 2ᵉ compte avec `role: COMPANY` pour tester.)

- [ ] Page **Mon entreprise** : `GET /company/me`, formulaire création → `POST /company`,
      édition → `PUT /company`
- [ ] Page **Publier une offre** : formulaire → `POST /internships`
- [ ] **Modifier / supprimer** ses propres offres → `PUT` / `DELETE /internships/:id`
- [ ] Adapter la navigation selon le rôle (un étudiant ne voit pas « Publier une offre »)

**Notions à réviser :** affichage conditionnel selon le rôle, réutilisation des
formulaires, rafraîchir la liste après une création/suppression.

**Indices :**
- Il faut d'abord créer l'entreprise avant de pouvoir publier une offre (sinon 404).
- Après un `DELETE`, recharge la liste ou retire l'élément du state localement.

**DoD :** une entreprise peut se créer, publier une offre, la modifier et la supprimer.

---

## Sprint 6 — Candidatures 📨

**Objectif :** boucler le parcours métier des deux côtés.

Côté **étudiant** :
- [ ] Bouton **Postuler** sur le détail d'une offre → `POST /applications`
      (champ `resume`, `coverLetter` optionnel)
- [ ] Page **Mes candidatures** : `GET /applications/me` avec leur statut

Côté **entreprise** :
- [ ] Sur une offre, lister les candidatures reçues → `GET /applications/internship/:id`
- [ ] **Accepter / refuser** une candidature → `PUT /applications/:id/status`

**Notions à réviser :** enchaîner des appels, mettre à jour l'UI après une action,
afficher un statut (badge `PENDING` / `ACCEPTED` / `REJECTED`).

**Indices :**
- On ne peut postuler **qu'une fois** par offre (le backend renvoie 409 sinon → affiche un message clair).
- Attention : `/applications/internship/:id` = id de l'**offre** ;
  `/applications/:id/status` = id de la **candidature**.

**DoD :** un étudiant postule et voit ses candidatures ; une entreprise voit les
candidatures reçues et change leur statut.

---

## Sprint 7 — Finitions ✨

**Objectif :** rendre l'app agréable et robuste.

- [ ] États de chargement partout (spinners / messages)
- [ ] Messages d'erreur lisibles (utilise le `message` renvoyé par l'API)
- [ ] Validation des formulaires côté frontend (champs requis, email valide…)
- [ ] Un peu de style / mise en page responsive
- [ ] Gérer l'expiration du token (un 401 → déconnexion + retour au login)

**Notions à réviser :** composants réutilisables (Loader, Alert), factorisation,
expérience utilisateur.

**DoD :** plus aucun écran blanc en cas d'erreur, l'app est fluide et présentable.

---

## Pour aller plus loin (bonus)

- Notifications (`Notification` existe déjà côté entités — endpoints à ajouter au backend)
- Avis / notes sur les stages (`Review`)
- Recherche / filtres sur les offres
- Tests avec React Testing Library

Bon courage, et surtout : **comprends ce que tu écris** plutôt que de copier. 💪
