# Boumiza — Plateforme de gestion de projets et d'équipes

<p align="center">
  <img alt="React" src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img alt="Vite" src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img alt="Radix UI" src="https://img.shields.io/badge/Radix_UI-161618?style=for-the-badge&logo=radixui&logoColor=white" />
  <img alt="React Router" src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white" />
  <img alt="React Hook Form" src="https://img.shields.io/badge/React_Hook_Form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white" />
  <img alt="Zod" src="https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white" />
  <img alt="MediaPipe" src="https://img.shields.io/badge/MediaPipe-0097A7?style=for-the-badge&logo=mediapipe&logoColor=white" />
  <img alt="pnpm" src="https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white" />
  <img alt="ESLint" src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white" />
</p>

Application web de gestion d'entreprise (ERP/projet) permettant de piloter **projets, tâches, équipes, employés et réclamations** à travers quatre espaces distincts selon le rôle de l'utilisateur : Super Admin, Admin, Chef de Projet et Employé.

Le projet est un frontend React + TypeScript propulsé par Vite, avec Tailwind CSS, Radix UI et des tableaux Kanban (drag & drop).

---

## Sommaire

- [Fonctionnalités](#fonctionnalités)
- [Stack technique](#stack-technique)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Scripts disponibles](#scripts-disponibles)
- [Structure du projet](#structure-du-projet)
- [Rôles et authentification](#rôles-et-authentification)
- [Couche API](#couche-api)
- [Contrôle par gestes de la main](#contrôle-par-gestes-de-la-main)
- [Remarques](#remarques)

---

## Fonctionnalités

### Espace Super Admin (`/superadmin`)

- Tableau de bord global
- Gestion des employés (liste, détails, formulaire, statistiques)
- Gestion des administrateurs
- Référentiels : départements, postes, niveaux, rôles
- Suivi des réclamations
- Profil utilisateur

### Espace Admin (`/app`)

- Tableau de bord
- Gestion des projets (création, affectation d'équipes)
- Tableau Kanban
- Gestion des réclamations
- Gestion des employés et des équipes
- Profil utilisateur

### Espace Chef de Projet (`/chef-projet`)

- Tableau de bord et statistiques
- Gestion des projets et des tâches
- Kanban (colonnes et cartes déplaçables)
- Suivi de l'équipe
- Traitement des réclamations
- Profil utilisateur

### Espace Employé (`/employee`)

- Tableau de bord personnel
- Mes tâches et mes projets
- Kanban
- Profil utilisateur

### Transverse

- Interface responsive (mobile/desktop)
- Composants réutilisables : pagination, cartes de statistiques, formulaires, confirmations de suppression
- Gestion d'erreurs via un `ErrorBoundary` global
- Contrôle du défilement par gestes de la main via la webcam (MediaPipe)

---

## Stack technique

| Catégorie | Technologie |
|---|---|
| Framework | React 18 + TypeScript |
| Build | Vite 6 |
| Routage | React Router 6 |
| Styles | Tailwind CSS 3, Tailwind Animate |
| Composants UI | Radix UI, shadcn/ui (config), Lucide React |
| Formulaires | React Hook Form + Zod |
| Drag & drop | dnd-kit |
| Graphiques | Recharts |
| Notifications | Sonner |
| Vision par ordinateur | MediaPipe Hands |
| Linting | ESLint 9 + TypeScript ESLint |

---

## Prérequis

- Node.js 18+ (20+ recommandé)
- [pnpm](https://pnpm.io/) (les scripts du projet l'utilisent en interne)

---

## Installation

```bash
git clone https://github.com/lotfi7021/boumiza.git
cd boumiza
pnpm install
pnpm dev
```

L'application est alors disponible sur [http://localhost:5173](http://localhost:5173).

> Une connexion internet peut être nécessaire au premier lancement pour le téléchargement des modèles MediaPipe (contrôle manuel).

---

## Scripts disponibles

| Commande | Description |
|---|---|
| `pnpm dev` | Démarre le serveur de développement Vite |
| `pnpm build` | Vérifie les types (`tsc -b`) puis construit la version de production |
| `pnpm build:prod` | Build de production avec `BUILD_MODE=prod` (désactive le plugin d'identification de source) |
| `pnpm preview` | Prévisualise le build de production |
| `pnpm lint` | Lance ESLint sur l'ensemble du projet |
| `pnpm install-deps` | Installe les dépendances avec `--prefer-offline` |
| `pnpm clean` | Supprime `node_modules`, le store pnpm et le lockfile |

> Les scripts `build`, `lint` et `preview` exécutent automatiquement `pnpm install --prefer-offline` avant de s'exécuter.

---

## Structure du projet

```
boumiza/
├── public/                  # Fichiers statiques
├── src/
│   ├── components/          # Composants par espace fonctionnel
│   │   ├── admin/           # Formulaires et détails (projets, équipes, plaintes…)
│   │   ├── chef_projet/     # Cartes Kanban, tâches, membres, statistiques
│   │   ├── superadmin/      # Employés, formulaires, statistiques, suppression
│   │   ├── ErrorBoundary.tsx
│   │   ├── HandScrollController.tsx
│   │   ├── Pagination.tsx
│   │   └── ProtectedRoute.tsx
│   ├── contexts/            # Contextes React (auth, employés, équipes, projets…)
│   ├── hooks/               # Hooks personnalisés (useAdmins, useTeams…)
│   ├── layouts/             # Layouts des 4 espaces
│   ├── lib/                 # Utilitaires (cn, etc.)
│   ├── pages/               # Pages par espace (admin, chef_projet, employee, superadmin)
│   ├── services/            # Couche d'accès API (ApiService + services métier)
│   ├── types/               # Types TypeScript du domaine
│   ├── utils/               # Constantes et helpers
│   ├── App.tsx              # Routage principal
│   └── main.tsx             # Point d'entrée
├── components.json          # Configuration shadcn/ui
├── tailwind.config.js
├── vite.config.ts           # Alias "@" -> src, plugin source-identifier
└── package.json
```

---

## Rôles et authentification

Les routes sont protégées par `ProtectedRoute`, qui compare le rôle courant à une hiérarchie définie dans `src/contexts/AuthContext.tsx` :

```
employee (1) < moderator (2) < project_manager (3) < admin (4) < super_admin (5)
```

L'authentification est actuellement **simulée** : un utilisateur mock (`super_admin`) est connecté au démarrage. Pour tester les autres espaces, modifiez la propriété `role` de `mockUser` dans `src/contexts/AuthContext.tsx`, puis accédez à l'espace correspondant :

| Rôle | URL |
|---|---|
| `super_admin` | `/superadmin` |
| `admin` | `/app` |
| `project_manager` | `/chef-projet` |
| `employee` | `/employee` |

> Aucun écran de connexion n'est encore branché : `login()` et `logout()` sont des stubs à remplacer par un appel au backend.

---

## Couche API

Les appels réseau passent par `ApiService` (`src/services/api.ts`) :

- URL de base par défaut : `/api`
- En-têtes : `Content-Type: application/json` et `Authorization: Bearer <token>` si un token est défini (`apiService.setToken(...)`)
- Méthodes : `get`, `post`, `put`, `delete`

Les services métier (`employeeService`, `teamService`, `complaintService`, `clientProjectService`, `adminService`, `userService`, `services/superadmin`) encapsulent les endpoints par domaine.

Aucun proxy n'est configuré dans `vite.config.ts` : pour le développement, il faut soit servir le frontend derrière un backend exposant `/api`, soit ajouter un `server.proxy` pointant vers le serveur d'API.

---

## Contrôle par gestes de la main

`src/components/HandScrollController.tsx` active un contrôle du défilement via la webcam (MediaPipe Hands) :

| Geste | Action |
|---|---|
| Index levé | Déplace le curseur virtuel |
| Pincement | Clique sur l'élément sous le curseur |
| Deux doigts levés | Met en pause / reprend |
| Tous les doigts levés | Défile la page |
| Poing fermé | Défilement par glisser (ancrage) |

Le modèle est chargé à la demande et les performances sont optimisées (résolution 480×360, pas de re-render React par frame).

---

## Remarques

- Le fichier `.npmrc` utilise des chemins POSIX (`/tmp/...`) pour le store pnpm. Sous Windows, adaptez ou supprimez ces lignes si `pnpm install` échoue.
- `components.json` est prêt pour shadcn/ui, mais les composants ne sont pas encore générés dans `src/components/ui`.
- Le plugin `vite-plugin-source-identifier` ajoute des attributs `data-matrix-*` en développement pour faciliter l'inspection des sources ; il est désactivé en mode production.

---

## Dépôt

GitHub : [https://github.com/lotfi7021/boumiza](https://github.com/lotfi7021/boumiza)
