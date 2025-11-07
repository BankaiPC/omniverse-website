# Cloudflare Pages Deployment Guide

## Prerequisites
- Cloudflare account with a domain
- Git repository (GitHub, GitLab, or Bitbucket)
- Gmail account with App Password set up

## Step 1: Push Code to Git Repository

Make sure your code is pushed to a Git repository:
```bash
git add .
git commit -m "Prepare for Cloudflare deployment"
git push origin main
```

## Step 2: Deploy via Cloudflare Dashboard

1. **Go to Cloudflare Dashboard**
   - Navigate to [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - Click on **Pages** in the sidebar
   - Click **Create a project**

2. **Connect Repository**
   - Choose your Git provider (GitHub, GitLab, or Bitbucket)
   - Authorize Cloudflare to access your repositories
   - Select your repository

3. **Configure Build Settings**
   - **Project name**: `omniverse-website` (or your preferred name)
   - **Framework preset**: `Next.js`
   - **Build command**: `npm run build`
   - **Build output directory**: `.next`
   - **Root directory**: `/` (leave empty if root)
   - **Node version**: `20` (or `18`)

4. **Set Environment Variables**
   - Click **Environment variables** section
   - Add the following variables:
     - **Variable name**: `EMAIL_USER`
       - **Value**: Your Gmail address (e.g., `your-email@gmail.com`)
     - **Variable name**: `EMAIL_PASSWORD`
       - **Value**: Your Gmail App Password (not your regular password)
   - Make sure to set these for **Production**, **Preview**, and **Development** environments

5. **Deploy**
   - Click **Save and Deploy**
   - Wait for the build to complete

## Step 3: Configure Custom Domain

1. **Add Custom Domain in Cloudflare Pages**
   - Go to your project → **Custom domains**
   - Click **Set up a custom domain**
   - Enter your domain name (e.g., `yourdomain.com`)

2. **Update DNS Records in Cloudflare**
   - Go to **DNS** → **Records**
   - Add or update the following records:
     - **Type**: `CNAME`
     - **Name**: `@` (for root domain) or `www` (for www subdomain)
     - **Target**: Your Cloudflare Pages URL (e.g., `your-project.pages.dev`)
     - **Proxy status**: Proxied (orange cloud) ✅
   - Save the record

3. **Wait for DNS Propagation**
   - DNS changes usually take a few minutes
   - SSL/TLS certificate will be automatically provisioned by Cloudflare

## Step 4: Verify Deployment

1. **Test Your Website**
   - Visit your custom domain
   - Check all pages load correctly
   - Test the contact form submission

2. **Check Email Functionality**
   - Submit a test message through the contact form
   - Verify you receive the email at `bankaipc@gmail.com`

## Troubleshooting

### Build Fails
- Check build logs in Cloudflare Pages dashboard
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility

### API Routes Not Working
- Ensure environment variables are set correctly
- Check that `EMAIL_USER` and `EMAIL_PASSWORD` are set (without `NEXT_PUBLIC_` prefix)
- Review Cloudflare Pages function logs

### Email Not Sending
- Verify Gmail App Password is correct (not regular password)
- Check that environment variables are set in Cloudflare Pages
- Review server logs in Cloudflare dashboard

### DNS Issues
- Ensure CNAME record points to your Pages URL
- Check that proxy is enabled (orange cloud)
- Wait a few minutes for DNS propagation

## Gmail App Password Setup

If you haven't set up a Gmail App Password:

1. Go to your [Google Account](https://myaccount.google.com/)
2. Navigate to **Security** → **2-Step Verification** (enable if not already)
3. Go to **App passwords**
4. Select **Mail** and **Other (Custom name)**
5. Enter a name like "Cloudflare Pages"
6. Copy the generated 16-character password
7. Use this password in `EMAIL_PASSWORD` environment variable

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `EMAIL_USER` | Your Gmail address | `your-email@gmail.com` |
| `EMAIL_PASSWORD` | Gmail App Password | `abcd efgh ijkl mnop` |

**Important**: Never use `NEXT_PUBLIC_` prefix for these variables as they contain sensitive credentials.

