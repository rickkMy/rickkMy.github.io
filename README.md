<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1XoK0WV-Axuxmjv3YxtXXDcvp-x5XlvtO

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploy to GitHub Pages

1. Push this repo to GitHub (default branch: `main`)
2. In GitHub repo settings: `Settings` → `Pages` → `Build and deployment` → select `GitHub Actions`
3. The workflow at `.github/workflows/deploy.yml` builds with Vite and deploys `dist/` to Pages on every push to `main`.

Notes:
- Static files (e.g. CV PDF) should be placed in `public/` (example: `public/Myrick_Wang_CV.pdf`).
- Don’t put secrets (API keys) into a front-end app for GitHub Pages—anything shipped to the browser is public.
