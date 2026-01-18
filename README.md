# LizzyTracker

A lightweight, self-hosted pregnancy and early childhood tracking Progressive Web App (PWA) designed for iPhone and mobile devices.

## Features

### Pregnancy Tracker (Conception through Birth)
- **Prenatal Visit Schedule**: Organized around standard visit schedule (8, 12, 16, 20, 24, 28, 32, 36, 37, 38, 39, 40 weeks)
- **Doctor Questions Checklist**: Prepared questions for each appointment
- **Task Management**: Administrative tasks to complete before each visit
- **Visit Notes**: Record measurements, test results, and notes
- **Week-by-Week Information**: Current week pregnancy info and baby development milestones
- **Baby Size Tracker**: Fun fruit/vegetable size comparisons for each week

### Early Childhood Tracker (Birth through 6 months)
- **Feeding Log**: Track breastfeeding (left/right/both), bottle feeding, and solid foods with duration and amounts
- **Sleep Tracking**: Log naps and night sleep with duration
- **Diaper Changes**: Track wet, dirty, and combination diapers
- **Growth Measurements**: Weight, length, and head circumference
- **Developmental Milestones**: Pre-loaded milestone checklist with ability to add custom milestones
- **Special Moments**: Log memorable moments and firsts
- **Pediatric Visits**: Structured around standard schedule (3-5 days, 2 weeks, 1 month, 2 months, 4 months, 6 months)

### Technical Features
- **Progressive Web App**: Install on iPhone home screen for app-like experience
- **Offline Support**: Works without internet connection
- **Local Storage**: All data stays on your device (IndexedDB with localStorage fallback)
- **Data Export**: Export to JSON or CSV for backups
- **Data Import**: Restore from JSON backup files
- **Mobile-First Design**: Optimized for iPhone and mobile devices
- **No Server Required**: Completely self-hosted, no backend needed

## Quick Start

### Option 1: GitHub Pages (Recommended)

1. Fork this repository
2. Go to Settings > Pages
3. Select "Deploy from a branch" and choose `main` branch
4. Your app will be available at `https://yourusername.github.io/LizzyTracking`

### Option 2: Local Development Server

```bash
# Clone the repository
git clone https://github.com/yourusername/LizzyTracking.git
cd LizzyTracking

# Option A: Python (built into macOS/Linux)
python3 -m http.server 8000

# Option B: Node.js
npx serve .

# Option C: PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

### Option 3: Deploy to a Web Server

Upload all files to any static web hosting service:
- Netlify
- Vercel
- Cloudflare Pages
- AWS S3 + CloudFront
- Any web server (Apache, Nginx)

**Important**: The app must be served over HTTPS for PWA features to work (except localhost).

## Generating PWA Icons

The app needs PNG icons for the PWA manifest. Two options:

### Option A: Browser-based Generator
1. Open `generate-icons.html` in your browser
2. Click "Generate All Icons"
3. Click "Download All" to download the icons
4. Place the downloaded icons in the `/icons` folder

### Option B: Node.js Script
```bash
# Install sharp
npm install sharp

# Generate icons
node setup-icons.js
```

## Installing on iPhone

1. Open the app URL in Safari on your iPhone
2. Tap the Share button (square with arrow)
3. Scroll down and tap "Add to Home Screen"
4. Name it "LizzyTracker" and tap "Add"
5. The app icon will appear on your home screen

**Note**: The app must be served over HTTPS for the "Add to Home Screen" option to appear.

## Usage Guide

### Initial Setup

1. **Go to Settings** (gear icon or bottom nav)
2. **For Pregnancy Tracking**:
   - Enter your due date
   - Optionally enter conception date
3. **For Baby Tracking**:
   - Enter baby's name (optional)
   - Enter birth date
   - Enter birth weight and length

### Pregnancy Tracking

1. **Overview Tab**: See current week info, baby development, and common symptoms
2. **Visits Tab**: View and track prenatal appointments
   - Tap a visit to see questions and tasks
   - Check off items as you complete them
   - Add notes from your appointment
3. **Tasks Tab**: Add custom tasks and to-dos
4. **Notes Tab**: Keep a pregnancy journal

### Baby Tracking

1. **Today Tab**: Quick overview and one-tap logging
   - Tap "Log Feeding", "Log Sleep", "Log Diaper", or "Log Moment"
2. **Feeding Tab**: Detailed feeding history and statistics
3. **Sleep Tab**: Sleep logs and daily totals
4. **Diapers Tab**: Diaper change history and daily counts
5. **Growth Tab**: Track weight, length, and head circumference
6. **Milestones Tab**: Track developmental milestones
7. **Visits Tab**: Pediatric appointment checklists

### Data Management

- **Export Data**: Menu > Export Data (or Settings > Export as JSON/CSV)
- **Import Data**: Menu > Import Data
- **Clear Data**: Settings > Clear All Data (use with caution!)

## File Structure

```
LizzyTracking/
├── index.html          # Main HTML file
├── manifest.json       # PWA manifest
├── sw.js              # Service worker for offline support
├── css/
│   └── styles.css     # All styles
├── js/
│   ├── data.js        # Default data (visits, milestones, etc.)
│   ├── storage.js     # IndexedDB storage layer
│   └── app.js         # Main application logic
├── icons/
│   ├── icon.svg       # Source SVG icon
│   └── icon-*.png     # Generated PNG icons
├── generate-icons.html # Browser-based icon generator
├── setup-icons.js     # Node.js icon generator
└── README.md          # This file
```

## Customization

### Adding Custom Questions/Tasks

Edit `js/data.js` to customize:
- Prenatal visit questions and tasks
- Pediatric visit questions and tasks
- Developmental milestones
- Baby size comparisons

### Changing Colors

Edit the CSS variables in `css/styles.css`:

```css
:root {
    --color-primary: #7c9885;      /* Main green color */
    --color-secondary: #c4a98a;    /* Warm accent */
    --color-accent: #d4a5a5;       /* Pink accent */
    --color-bg: #f8f5f2;           /* Background */
}
```

## Privacy

- **All data is stored locally** on your device
- **No data is sent to any server**
- **No analytics or tracking**
- **Your data stays private**

To ensure your data is backed up:
1. Regularly export your data (Menu > Export Data)
2. Store the JSON file in a safe location (iCloud, Google Drive, etc.)

## Browser Support

- Safari (iOS) - Full support including PWA installation
- Chrome (Android) - Full support including PWA installation
- Chrome (Desktop) - Full support
- Firefox - Full support (limited PWA features)
- Edge - Full support

## Troubleshooting

### App not installing as PWA
- Ensure the site is served over HTTPS
- Check that all icon files exist in `/icons`
- Try clearing browser cache and reloading

### Data not saving
- Check that JavaScript is enabled
- Try using a different browser
- Check browser console for errors

### Offline mode not working
- Ensure service worker is registered (check console)
- Visit all pages once while online to cache them
- Close and reopen the app

## License

MIT License - Feel free to use, modify, and distribute.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
