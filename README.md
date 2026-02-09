# Valentines-2026

A Valentine's Day 2026 themed website hosted on GitHub Pages.

## 🌐 Live Site

This site is automatically deployed to GitHub Pages. Visit it at:
`https://rusheeld.github.io/Valentines-2026/`

## 🚀 Deployment

The site is automatically deployed to GitHub Pages using GitHub Actions whenever changes are pushed to the `main` branch.

The deployment workflow:
- Automatically builds and deploys on push to `main`
- Can be manually triggered from the Actions tab
- Uses the latest GitHub Pages actions for deployment

## 💝 Features

- **Interactive Multi-Section Layout**: Smooth scrolling experience with 6 distinct sections
- **Animated Hearts**: Floating hearts background animation throughout the page
- **Progressive Reveal**: Sections fade in beautifully as you scroll
- **Photo Placeholders**: Ready-to-fill spots for your photos:
  - Section 2: One large photo placeholder for a photo together
  - Section 3: Grid of 4 smaller memory photo placeholders
  - Section 5: One large photo placeholder for a special photo
- **The Big Question**: Beautifully styled "Will You Be My Valentine?" with pulsing animation
- **Interactive Buttons**: 
  - "Yes" button triggers a celebration screen with confetti hearts
  - "No" button playfully changes text and eventually moves away
- **Responsive Design**: Mobile-friendly layout that works on all devices
- **Beautiful Styling**: Pink gradient background, elegant typography, smooth animations

## 🛠️ Local Development

To run the site locally:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000` in your browser.

## 📸 Adding Your Photos

The page currently has placeholder sections for your photos. To add your photos:

1. Add your image files to the repository (e.g., in an `images` folder)
2. In `index.html`, replace the placeholder divs with `<img>` tags:
   - **Section 2** (line ~246): Replace `<div class="photo-placeholder">` with your photo together
   - **Section 3** (line ~258-261): Replace the 4 `<div class="memory-placeholder">` divs with your memory photos
   - **Section 5** (line ~285): Replace `<div class="photo-placeholder">` with a special photo

Example replacement:
```html
<!-- Replace this: -->
<div class="photo-placeholder">📸 Photo of us together</div>

<!-- With this: -->
<img src="images/your-photo.jpg" alt="Us together" style="width: 100%; max-width: 400px; border-radius: 15px;">
```

## 📝 Setup Instructions

To enable GitHub Pages for this repository:

1. Go to repository Settings
2. Navigate to Pages section
3. Under "Build and deployment", select "GitHub Actions" as the source
4. The site will be automatically deployed on the next push to `main`