# Deployment Guide

This template supports two static hosting platforms. Choose one and delete the other's workflow file.

---

## Cloudflare Pages (Recommended)

Cloudflare Pages offers a generous free tier, a fast global CDN, and the simplest setup for this template.

### First-time Setup

**1. Install Wrangler CLI:**

```bash
npm install -g wrangler
```

**2. Log in:**

```bash
wrangler login
```

**3. Create a Pages project:**

```bash
wrangler pages project create your-app-name
```

**4. Update `wrangler.toml`:**

```toml
name = "your-app-name"   # ← match the name you just created
```

**5. Set `deployTarget` in `src/config/app.ts`:**

```typescript
deployTarget: "cloudflare",
```

### Deploy

```bash
npm run deploy:cloudflare
```

This runs `npm run build && wrangler pages deploy dist`.

### Custom Domain

Set up a custom domain in the Cloudflare dashboard under your Pages project → Custom domains.

### GitHub Actions (Auto-deploy on Push)

The workflow at `.github/workflows/deploy-cloudflare.yml` deploys automatically on every push to `main`.

To enable it:

1. Create an API token at `dash.cloudflare.com/profile/api-tokens`
   - Template: "Edit Cloudflare Workers"
   - Add Cloudflare Pages permissions: `Account › Cloudflare Pages › Edit`
2. Find your Account ID on the Cloudflare dashboard homepage (right sidebar)
3. Add to GitHub repo → Settings → Secrets:
   - `CLOUDFLARE_API_TOKEN`
   - `CLOUDFLARE_ACCOUNT_ID`
4. Update the `--project-name` value in the workflow file

---

## Firebase Hosting

Firebase Hosting integrates well with the Google ecosystem.

### First-time Setup

**1. Install Firebase CLI:**

```bash
npm install -g firebase-tools
```

**2. Log in:**

```bash
firebase login
```

**3. Initialize hosting:**

```bash
firebase init hosting
```

- Select or create a Firebase project
- Public directory: `dist`
- Configure as single-page app: `No` (Astro emits a static page per route)
- Automatic builds with GitHub: `No` (we handle CI manually)

This creates `.firebaserc` with your project ID. Use `.firebaserc.example` as a reference.

**4. Set `deployTarget` in `src/config/app.ts`:**

```typescript
deployTarget: "firebase",
```

### Deploy

```bash
npm run deploy:firebase
```

This runs `npm run build && firebase deploy`.

### Custom Domain

Set up in Firebase console → Hosting → Add custom domain.

### GitHub Actions (Auto-deploy on Push)

The workflow at `.github/workflows/deploy-firebase.yml` deploys on push to `main`.

To enable it:

1. Firebase console → Project settings → Service accounts → Generate new private key
2. Add the entire JSON content as `FIREBASE_SERVICE_ACCOUNT` in GitHub Secrets
3. Update `projectId` in the workflow file to match your Firebase project

---

## Comparing the Two

|                | Cloudflare Pages                   | Firebase Hosting                    |
| -------------- | ---------------------------------- | ----------------------------------- |
| Free tier      | 500 builds/mo, unlimited bandwidth | 10 GB/mo bandwidth                  |
| Build speed    | Fast                               | Moderate                            |
| CDN            | 300+ global PoPs                   | Google CDN                          |
| Custom domains | Free + auto SSL                    | Free + auto SSL                     |
| Analytics      | Cloudflare Web Analytics (free)    | Requires Firebase Analytics setup   |
| Best for       | Speed + simplicity                 | Teams already using Google/Firebase |

Both deploy the same `dist/` folder. You can switch between them any time by updating `deployTarget` and following the other provider's setup.

---

## Environment Variables in Production

The showcase is a fully static Astro site and needs **no runtime environment variables** — all app configuration lives in `src/config/app.ts` and is baked into the HTML at build time.

The only secrets involved are the deploy credentials (the Cloudflare API token / Firebase service account), which belong in your CI provider's secret store, not in the repo. See the GitHub Actions setup above for each host.
