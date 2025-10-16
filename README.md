# justify-api

API simple pour justifier du texte avec quota par token.

Prérequis
- Node.js (LTS) et npm

Installation

```powershell
npm install
```

Démarrer en développement

```powershell
npm run dev
```

Endpoints
- POST /api/token  -> { "email": "..." }
- POST /api/justify (header Authorization: Bearer <token>, body: texte)

Notes
- `tokens.json` est stocké à la racine et mis à jour automatiquement.
- Si `npm` n'est pas reconnu sur Windows, installez Node.js ou utilisez nvm-windows (https://github.com/coreybutler/nvm-windows).
