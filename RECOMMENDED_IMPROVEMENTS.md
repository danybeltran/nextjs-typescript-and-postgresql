# Recommended Improvements for the Next.js, TypeScript, & PostgreSQL Template

This document outlines key areas of improvement for the template, ranging from database schema safety to script typos, performance optimizations, and UI bug fixes.

---

## 1. Database Schema Constraints

### Issue
In [schema.prisma](file:///Users/dany/Documents/dev/templates/nextjs-typescript-and-postgresql/prisma/schema.prisma), the `Preferences` model is queried by `user_email` and validated for unique `username`, but neither field has a `@unique` constraint in the database.

```prisma
model Preferences {
  id                   Int    @id @default(autoincrement())
  user_email           String
  user_fullname        String
  user_profile_picture String
  username             String
  user_description     String
}
```

* **Risks:** 
  1. Race conditions during user login could insert multiple `Preferences` records for the same email.
  2. Duplicate usernames can be inserted at the database level despite application checks.
  3. Queries on these columns will perform slower table scans rather than index lookups.

### Recommendation
Add `@unique` constraints to `user_email` and `username`:

```diff
model Preferences {
  id                   Int    @id @default(autoincrement())
- user_email           String
+ user_email           String @unique
  user_fullname        String
  user_profile_picture String
- username             String
+ username             String @unique
  user_description     String
}
```

---

## 2. Prisma Query Optimizations

### Issue A: In-Memory Sorting
In [src/app/posts/page.tsx](file:///Users/dany/Documents/dev/templates/nextjs-typescript-and-postgresql/src/app/posts/page.tsx#L18), posts are fetched and sorted in-memory:
```typescript
const posts = (await prisma.post.findMany({})).reverse()
```
* **Why it's bad:** Reversing arrays in application memory does not scale and places unnecessary CPU strain on the server as the number of posts grows.

### Recommendation A
Perform ordering directly in the database query:
```diff
- const posts = (await prisma.post.findMany({})).reverse()
+ const posts = await prisma.post.findMany({
+   orderBy: {
+     date: 'desc'
+   }
+ })
```

### Issue B: Using `findFirst` instead of `findUnique`
In [src/app/posts/[id]/page.tsx](file:///Users/dany/Documents/dev/templates/nextjs-typescript-and-postgresql/src/app/posts/[id]/page.tsx#L48-L58) and [src/lib/server/preferences.ts](file:///Users/dany/Documents/dev/templates/nextjs-typescript-and-postgresql/src/lib/server/preferences.ts#L20), `findFirst` is used for lookup by unique identifiers.
* **Why it's bad:** Prisma can optimize `findUnique` queries much better because they target primary/unique index constraints directly.

### Recommendation B
Update those lookups to use `findUnique`:
```diff
// getPost in posts/[id]/page.tsx
- return prisma.post.findFirst({
-   where: {
-     id: parseInt(params.id)
-   }
- })
+ return prisma.post.findUnique({
+   where: {
+     id: parseInt(params.id)
+   }
+ })
```

---

## 3. Package.json Script Typos

### Issue
In [package.json](file:///Users/dany/Documents/dev/templates/nextjs-typescript-and-postgresql/package.json#L5-L10), the scripts contain invalid Prisma CLI arguments:
```json
"dev": "npx prisma generate dev --name init && npx prisma db push && next dev",
"build": "npx prisma generate init && npx prisma db push && next build",
"migrate:dev": "npx prisma generate dev --name init"
```
* **Why it's bad:** `prisma generate` does not accept `dev --name init` or `init`. The CLI silently ignores the unrecognized arguments, but this is highly misleading. Also, `"migrate:dev"` is supposed to run `prisma migrate dev`.

### Recommendation
Fix the commands to correctly run client generation, database pushing, or migrations:
```diff
  "scripts": {
-   "dev": "npx prisma generate dev --name init && npx prisma db push && next dev",
+   "dev": "npx prisma generate && npx prisma db push && next dev",
-   "build": "npx prisma generate init && npx prisma db push && next build",
+   "build": "npx prisma generate && npx prisma db push && next build",
-   "migrate:dev": "npx prisma generate dev --name init",
+   "migrate:dev": "npx prisma migrate dev"
  }
```

---

## 4. Package Manager Inconsistencies in Scripts

### Issue
The project contains [bun.lock](file:///Users/dany/Documents/dev/templates/nextjs-typescript-and-postgresql/bun.lock), indicating Bun is the primary package manager. However, [scripts/get-deps.js](file:///Users/dany/Documents/dev/templates/nextjs-typescript-and-postgresql/scripts/get-deps.js#L9-L31) hardcodes the update command to use `npm install`:
```javascript
const installDeps = 'npm install ' + ... + '@latest -f'
const installDevDeps = 'npm install -D ' + ... + '@latest -f'
```
* **Why it's bad:** Running `./scripts/update-deps.sh` will bypass Bun, create a duplicate `package-lock.json` file, and pollute the workspace with mixed package structures.

### Recommendation
Rewrite `scripts/get-deps.js` to dynamically detect the lockfile or use `bun add` when `bun.lock` exists.

```diff
+ const isBun = fs.existsSync(path.join(__dirname, '../bun.lock'))
+ const installCmd = isBun ? 'bun add ' : 'npm install '
+ const devFlag = isBun ? ' --dev' : ' -D'
+ const forceFlag = isBun ? '' : ' -f'

- const installDeps = 'npm install ' + Object.keys(dependencies)... + '@latest -f'
+ const installDeps = installCmd + Object.keys(dependencies).map(dep => `${dep}@latest`).join(' ') + forceFlag

- const installDevDeps = 'npm install -D ' + Object.keys(devDependencies)... + '@latest -f'
+ const installDevDeps = (isBun ? 'bun add -d ' : 'npm install -D ') + Object.keys(devDependencies).map(dep => `${dep}@latest`).join(' ') + forceFlag
```

---

## 5. Settings Profile Form Label Bug

### Issue
In [src/app/settings/update-profile-form.tsx](file:///Users/dany/Documents/dev/templates/nextjs-typescript-and-postgresql/src/app/settings/update-profile-form.tsx#L102), the HTML label above the **username** field is hardcoded as `"Full name"`:
```html
<div>
  <label>
    <small>Full name</small>
    <Input
      placeholder='Add a username'
      disabled={savingPreferences}
      value={editablePreferences.username}
      ...
```

### Recommendation
Change the label text to `"Username"`:
```diff
          <div>
            <label>
-             <small>Full name</small>
+             <small>Username</small>
              <Input
                placeholder='Add a username'
                disabled={savingPreferences}
                value={editablePreferences.username}
```

---

## 6. Landing Page Feature Out-of-Sync

### Issue
The landing page at [src/app/page.tsx](file:///Users/dany/Documents/dev/templates/nextjs-typescript-and-postgresql/src/app/page.tsx#L56) displays a feature card indicating the template uses **Next.js 15**. However, [package.json](file:///Users/dany/Documents/dev/templates/nextjs-typescript-and-postgresql/package.json#L62) has been upgraded to `"next": "^16.1.6"`.

### Recommendation
Update the feature description:
```diff
              <TbBrandNextjs size={40} />
              <div className='space-y-2'>
-               <h3 className='font-bold leading-normal'>Next.js 15</h3>
+               <h3 className='font-bold leading-normal'>Next.js 16</h3>
                <p className='text-sm text-muted-foreground'>Next.js</p>
              </div>
```

---

## 7. Preferences Zod Validation Schema

### Issue
While post data is validated using `postSchema` from Zod, user preferences payloads are handled using a plain TypeScript interface `UpdatePreferencesPayload` in [src/schemas/index.ts](file:///Users/dany/Documents/dev/templates/nextjs-typescript-and-postgresql/src/schemas/index.ts#L8) and validated manually using conditional statements in [src/app/settings/actions.ts](file:///Users/dany/Documents/dev/templates/nextjs-typescript-and-postgresql/src/app/settings/actions.ts#L11).

### Recommendation
Define a Zod validation schema for preferences, ensuring consistency and automatic parsing:

```typescript
// src/schemas/index.ts
export const preferencesSchema = z.object({
  user_fullname: z.string().min(1, "Name cannot be empty").trim(),
  username: z.string().min(3, "Username must be at least 3 characters").trim().toLowerCase(),
  user_description: z.string().optional()
})

export type UpdatePreferencesPayload = z.infer<typeof preferencesSchema>
```

Update the Server Action [src/app/settings/actions.ts](file:///Users/dany/Documents/dev/templates/nextjs-typescript-and-postgresql/src/app/settings/actions.ts) to parse using this schema.

---

## 8. Duplicate Hook File Cleanup

### Issue
Both [use-mobile.ts](file:///Users/dany/Documents/dev/templates/nextjs-typescript-and-postgresql/src/hooks/use-mobile.ts) and [use-mobile.tsx](file:///Users/dany/Documents/dev/templates/nextjs-typescript-and-postgresql/src/hooks/use-mobile.tsx) exist in the `src/hooks` folder with identical code.

### Recommendation
Delete `use-mobile.ts` and keep the standard React hook suffix `.tsx` version to maintain clean directories.

---

## 9. Code Cleanups

* **Unused imports:** In [src/components/layout/signin-dialog.tsx](file:///Users/dany/Documents/dev/templates/nextjs-typescript-and-postgresql/src/components/layout/signin-dialog.tsx#L14), `Icon` from `bs-icon` is imported but never used. It should be removed.
* **Spelling mistake:** In [src/app/posts/create-post-form.tsx](file:///Users/dany/Documents/dev/templates/nextjs-typescript-and-postgresql/src/app/posts/create-post-form.tsx#L89), the Alert title text has a typo: `"An error ocurred"` should be `"An error occurred"`.
* **Redundant Heading:** In [src/app/settings/update-profile-form.tsx](file:///Users/dany/Documents/dev/templates/nextjs-typescript-and-postgresql/src/app/settings/update-profile-form.tsx#L83), `<h3>Update preferences</h3>` is redundant because DialogTitle already specifies "Edit preferences".
