### A TanStack Start Template

A full-stack TanStack Start application template that uses React 19, Vite, Shadcn UI, Prisma ORM, PostgreSQL, and Auth.js (`@auth/core` Google OAuth).

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fdanybeltran%2Fnextjs-typescript-and-postgresql)

---

### Key Features
- **Meta-framework:** TanStack Start (Vite-based architecture)
- **SSR/Hydration:** Full server-side rendering support with type-safe loaders
- **Styling:** Tailwind CSS v4 compiled natively via `@tailwindcss/vite`
- **ORM & Database:** Prisma + PostgreSQL (Supabase integration ready)
- **Authentication:** Framework-agnostic Auth.js (`@auth/core`) Google OAuth integration
- **State & Fetching:** `atomic-utils` for client-side state caching and data queries

---

### Development Setup

Create a `.env` file at the root of the project with the following environment variables:

```env
# Database Credentials (e.g., Supabase PostgreSQL)
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."

# Auth.js Secrets & OAuth Credentials
NEXTAUTH_SECRET="your-openssl-generated-secret-key"
GOOGLE_APP_CLIENT_ID="your-google-oauth-client-id"
GOOGLE_APP_CLIENT_SECRET="your-google-oauth-client-secret"
```

#### Starting the Dev Server
The development server will run by default on port `3000` (configured in `vite.config.ts`):

```bash
# Install dependencies
bun install

# Start the local development server (runs prisma generate/push internally)
bun run dev
```

#### Production Build & Start
To compile and test a production-ready build:

```bash
# Build the client and SSR environments
bun run build

# Preview the production application
bun run start
```

---

### Environment Variables & Credentials Guides

- **Supabase PostgreSQL Setup:** Visit the [Supabase Prisma Integration Docs](https://supabase.com/partners/integrations/prisma) to obtain your `DATABASE_URL` and `DIRECT_URL`.
- **Google OAuth Setup:** Visit the [Google OAuth2 Credentials Guide](https://developers.google.com/identity/oauth2/web/guides/get-google-api-clientid) to set up your OAuth credentials. 
  - *Authorized redirect URI for local development:* `http://localhost:3000/api/auth/callback/google`
- **Secret Key Generation:** Use one of the commands below to generate your `NEXTAUTH_SECRET` hash:
  - **OpenSSL:** `openssl rand -base64 32`
  - **Python:** `python3 -c "import secrets; print(secrets.token_urlsafe(32))"`

---

### Related Documentation
- [TanStack Start Documentation](https://tanstack.com/router/v1/docs/start/overview)
- [TanStack Router Documentation](https://tanstack.com/router/v1/docs/guide/introduction)
- [Auth.js Documentation](https://authjs.dev)
- [Prisma ORM Documentation](https://www.prisma.io/docs)
