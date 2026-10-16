# Newmax Industries Pvt. Ltd. — MERN Website (No Database)

A recreation of the Newmax Industries Pvt. Ltd. site as a MERN-stack app.
**M**ongoDB is intentionally omitted — the app uses **E**xpress + **R**eact + **N**ode only. All content is served from static data files, and the "Get a Quote" form is handled by an Express endpoint that logs submissions to a JSON file and (optionally) emails them via Nodemailer.

## Structure
```
newmax/
├── server/        # Express API (Node) — quote form handler, no DB
│   ├── index.js
│   ├── quotes.json        # file-based storage (created at runtime)
│   └── package.json
└── client/        # React (Vite) frontend
    ├── src/
    └── package.json
```

## Run

### 1. Backend
```bash
cd server
npm install
npm start          # runs on http://localhost:5000
```

### 2. Frontend
```bash
cd client
npm install
npm run dev        # runs on http://localhost:5173
```

The Vite dev server proxies `/api` calls to the backend (see `client/vite.config.js`).

## Quote form storage
Submissions append to `server/quotes.json` (a plain file — no database).
To enable email delivery, set env vars before `npm start`:
```bash
export SMTP_HOST=smtp.gmail.com
export SMTP_USER=youraddress@gmail.com
export SMTP_PASS=your_app_password
export QUOTE_TO=newmaxinquiry@gmail.com
```
Without these, submissions are still saved to the JSON file.

## Build for production
```bash
cd client && npm run build      # outputs client/dist
```
Serve `client/dist` as static files (the Express server already serves it if present).
