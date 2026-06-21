# MedQube — Full-Stack (Frontend + Backend + Auth + MongoDB)

This update adds real authentication and a MongoDB-backed backend on top of the
original MedQube React site: login, signup, and three roles — **patient**,
**doctor**, **admin** — each with role-specific access.

```
medqube-update/
├── frontend/      React app (Vite) — what you already had, plus auth pages
└── backend/       Express API + MongoDB (Mongoose) + JWT auth
```

## How auth works

- **One login page** (`/` → Log In) for everyone. The backend looks up the
  account by email and returns its role; the frontend then shows the right
  dashboard (Patient / Doctor / Admin) automatically. The frontend never
  decides the role — the database does.
- **Sign up** is public, but only ever creates a **patient** account.
- **Doctor and admin accounts** are created by an existing admin, from inside
  the Admin Dashboard ("Add Doctor / Admin" button). This matches how real
  hospital systems work — staff don't self-register.
- Sessions are stored as a JWT in the browser's `sessionStorage` and verified
  against the database on every protected request.

---

## 1. Set up the backend

```bash
cd backend
npm install
cp .env.example .env
```

Open `.env` and set:
- `MONGO_URI` — your MongoDB connection string (see below for options)
- `JWT_SECRET` — replace with any long random string

### Getting a MongoDB connection string

**Option A — MongoDB Atlas (free, cloud, no local install):**
1. Go to https://www.mongodb.com/cloud/atlas/register and create a free account
2. Create a free "M0" cluster
3. Under **Database Access**, create a database user with a password
4. Under **Network Access**, add `0.0.0.0/0` (allow from anywhere) for development
5. Click **Connect → Drivers**, copy the connection string, and replace
   `<username>`, `<password>`, and add `/medqube` before the `?` as the database name:
   ```
   mongodb+srv://myuser:mypassword@cluster0.xxxxx.mongodb.net/medqube?retryWrites=true&w=majority
   ```
6. Paste that into `MONGO_URI` in your `.env`

**Option B — Local MongoDB:**
Install MongoDB Community Server (https://www.mongodb.com/try/download/community),
start it, and use:
```
MONGO_URI=mongodb://127.0.0.1:27017/medqube
```

### Create your first admin account

Since admins can't sign up through the public form, run the seed script once:

```bash
npm run seed
```

This prints an admin email/password and a sample doctor email/password to
your terminal — use these to log in the first time, then change the password.

### Start the backend

```bash
npm run dev
```

You should see:
```
MongoDB connected: ...
MedQube API listening on port 5000
```

---

## 2. Set up the frontend

In a **new terminal**:

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Visit `http://localhost:3000`. Click **Log In**, use the admin or doctor
credentials printed by the seed script, or click **Sign Up** to create a
patient account.

---

## What each role sees after login

| Role    | Lands on        | Can do |
|---------|------------------|--------|
| Patient | Patient Home     | Book appointments, browse doctors, view dashboard |
| Doctor  | Doctor Home      | View their patient queue, dashboard |
| Admin   | Admin Home       | Create doctor/admin accounts, activate/deactivate any account, view all users |

## API summary

| Method | Route                       | Access          | Purpose |
|--------|------------------------------|-----------------|---------|
| POST   | `/api/auth/register`        | Public           | Patient signup |
| POST   | `/api/auth/login`            | Public           | Login (all roles) |
| GET    | `/api/auth/me`               | Logged in        | Restore session |
| POST   | `/api/auth/create-staff`    | Admin only        | Create doctor/admin |
| GET    | `/api/users`                  | Admin only        | List all accounts |
| GET    | `/api/users/doctors`        | Logged in        | List doctors (for booking) |
| PATCH  | `/api/users/:id/deactivate` | Admin only        | Disable an account |
| PATCH  | `/api/users/:id/activate`   | Admin only        | Re-enable an account |

## Security notes for production

- Change `JWT_SECRET` to a real random value, never commit `.env` files
- Passwords are hashed with bcrypt before storage — never stored in plain text
- Restrict MongoDB Atlas Network Access to specific IPs instead of `0.0.0.0/0`
- Consider HTTPS-only cookies instead of `sessionStorage` for production-grade session storage
- The seed script's default passwords are for first login only — change them immediately
