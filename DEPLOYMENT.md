# McEvoy Racing — Deployment Guide

Complete step-by-step instructions to get the site live.
Estimated time: 45–60 minutes.

---

## Prerequisites

You need free accounts at:
- **GitHub** — github.com
- **Sanity** — sanity.io (sign up with Google)
- **Vercel** — vercel.com (sign up with GitHub)

---

## Step 1 — Set Up Sanity

### 1.1 Create a Sanity project

```bash
npm create sanity@latest -- --project mcevoy-racing --dataset production --template clean
```

When prompted:
- Project name: `McEvoy Racing`
- Dataset: `production`
- Choose "No" for a new project output directory (we'll use the existing one)

Or create the project at **sanity.io/manage** manually:
1. Click "Create new project"
2. Name it "McEvoy Racing"
3. Select free plan
4. Note your **Project ID** (looks like `abc12def`)

### 1.2 Get your Project ID and Dataset

Go to **sanity.io/manage** → your project → **API** tab.
Note the **Project ID** and **Dataset name** (usually `production`).

### 1.3 Create an API token

In Sanity manage → **API** → **Tokens** → **Add API token**:
- Name: `Next.js Revalidation`
- Permissions: `Editor`
- Click **Save** and copy the token immediately (it only shows once)

---

## Step 2 — Push Code to GitHub

```bash
# From the mcevoy-cms folder
git init
git add .
git commit -m "Initial McEvoy Racing CMS"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/mcevoy-racing.git
git push -u origin main
```

---

## Step 3 — Deploy to Vercel

### 3.1 Import project

1. Go to **vercel.com** → **Add New Project**
2. Import from GitHub — select `mcevoy-racing`
3. Framework: **Next.js** (auto-detected)
4. Click **Environment Variables** and add:

```
NEXT_PUBLIC_SANITY_PROJECT_ID    = your_project_id
NEXT_PUBLIC_SANITY_DATASET       = production
NEXT_PUBLIC_SANITY_API_VERSION   = 2024-01-01
SANITY_API_TOKEN                 = your_api_token
SANITY_REVALIDATE_SECRET         = make_up_a_long_random_string
NEXT_PUBLIC_SITE_URL             = https://mcevoyracing.com.au
```

5. Click **Deploy**

### 3.2 Note your Vercel URL

After deploy, Vercel gives you a URL like `mcevoy-racing.vercel.app`.
Note it — you need it for the webhook.

---

## Step 4 — Configure Sanity Webhook

This makes the site update instantly when you publish content in Sanity.

1. Go to **sanity.io/manage** → your project → **API** → **Webhooks**
2. Click **Create webhook**
3. Fill in:
   - **Name**: `Vercel Revalidation`
   - **URL**: `https://mcevoy-racing.vercel.app/api/revalidate`
   - **Dataset**: `production`
   - **Trigger on**: Document published
   - **HTTP method**: POST
   - **HTTP Headers**: Add header `x-revalidate-secret` = the same value you set as `SANITY_REVALIDATE_SECRET`
4. Click **Save**

---

## Step 5 — Add Content to Sanity Studio

### 5.1 Open the Studio

Go to: `https://mcevoy-racing.vercel.app/studio`

Sign in with Google.

### 5.2 Invite team members

In **sanity.io/manage** → **Members** → **Invite member**
Add each person's email and give them `Editor` role.

### 5.3 Seed initial content

Add your initial content:
- Race results in **📊 Scoreboard**
- Upcoming races in **📅 Game Day**
- Syndicates in **🏇 Get In The Game**
- G1 winners in **🏆 G1 Honour Roll**
- Job listings in **👋 Careers**
- Contact details in **⚙️ Site Settings**

---

## Step 6 — Connect Your Domain

1. In Vercel → your project → **Settings** → **Domains**
2. Add `mcevoyracing.com.au`
3. Follow the DNS instructions (add a CNAME or A record at your domain registrar)
4. Update `NEXT_PUBLIC_SITE_URL` environment variable to your real domain
5. Redeploy

---

## Ongoing Deployment

Every time you push to the `main` branch on GitHub, Vercel automatically rebuilds and deploys. You never need to manually deploy.

Content changes in Sanity appear on the live site within 60 seconds via the webhook — no code push needed.

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Studio shows "Invalid project ID" | Check `NEXT_PUBLIC_SANITY_PROJECT_ID` in Vercel env vars |
| Content not updating on site | Check the webhook is configured and the secret matches |
| Images not loading | Make sure `cdn.sanity.io` is in `next.config.ts` remotePatterns |
| Build fails | Check all env vars are set in Vercel. Run `npm run build` locally to see errors |

---

## Cost Summary

| Service | Cost |
|---------|------|
| Sanity (free tier) | $0/month — up to 3 users, 10GB |
| Vercel (hobby tier) | $0/month |
| Domain | ~$20 AUD/year |
| **Total** | **~$20 AUD/year** |
