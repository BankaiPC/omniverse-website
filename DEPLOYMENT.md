# Cloudflare Pages Deployment Guide

## Prerequisites
- Cloudflare account with a domain
- Git repository (GitHub, GitLab, or Bitbucket)
- Resend account (free tier available) - [Sign up at resend.com](https://resend.com)

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
     - **Variable name**: `RESEND_API_KEY`
       - **Value**: Your Resend API key (get it from [resend.com/api-keys](https://resend.com/api-keys))
     - **Variable name**: `EMAIL_FROM` (optional)
       - **Value**: Your verified domain email (e.g., `noreply@yourdomain.com`)
       - If not set, will use Resend's default `onboarding@resend.dev`
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
- Check that `RESEND_API_KEY` is set in Cloudflare Pages
- Verify Edge Runtime is configured (already set in the code)
- Review Cloudflare Pages function logs

### Email Not Sending
- Verify Resend API key is correct and active
- Check that `RESEND_API_KEY` environment variable is set in Cloudflare Pages
- Verify your domain in Resend dashboard (if using custom `EMAIL_FROM`)
- Review server logs in Cloudflare dashboard
- Check Resend dashboard for email delivery status

### DNS Issues
- Ensure CNAME record points to your Pages URL
- Check that proxy is enabled (orange cloud)
- Wait a few minutes for DNS propagation

## Resend Setup

1. **Create Resend Account**
   - Go to [resend.com](https://resend.com) and sign up (free tier available)
   - Verify your email address

2. **Get API Key**
   - Go to [API Keys](https://resend.com/api-keys) in Resend dashboard
   - Click **Create API Key**
   - Give it a name (e.g., "Cloudflare Pages")
   - Copy the API key (you'll only see it once!)

3. **Verify Domain (Optional but Recommended)**
   - Go to **Domains** in Resend dashboard
   - Add your domain
   - Follow DNS setup instructions
   - Once verified, you can use `noreply@yourdomain.com` as `EMAIL_FROM`

4. **Set Environment Variable**
   - Add `RESEND_API_KEY` in Cloudflare Pages environment variables
   - Optionally add `EMAIL_FROM` with your verified domain email

## Environment Variables Reference

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `RESEND_API_KEY` | Your Resend API key | Yes | `re_xxxxxxxxxxxxx` |
| `EMAIL_FROM` | Sender email address | No | `noreply@yourdomain.com` |

**Important**: 
- Never use `NEXT_PUBLIC_` prefix for these variables as they contain sensitive credentials
- The API route uses Edge Runtime for Cloudflare Pages compatibility
- Emails will be sent to `bankaipc@gmail.com` as configured in the code

