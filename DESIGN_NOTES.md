# We See Clearly - Design Documentation

## Design Philosophy & Aesthetics

The site was designed with a sophisticated minimalist approach that draws inspiration from several key sources:

### Eastern Aesthetic Influences
- Traditional thangka art borders and composition
- Bhutanese architectural elements
- Japanese design principles of space and subtlety
- Mineral pigment color palette derived from traditional Eastern art

### Core Design Elements

#### Color System
- Background colors inspired by natural pigments:
  - Warm ivory (rgba(243, 239, 230, 0.7)) for links section
  - Celadon (rgba(230, 238, 236, 0.6)) for Spotify
  - Wisteria (rgba(238, 235, 240, 0.6)) for contact
  - Pale ochre (rgba(242, 238, 228, 0.6)) for newsletter

#### Border System
- Double-border design inspired by thangka art frames:
  - Outer border: Deep umber (rgba(121, 110, 88, 0.8))
  - Inner border: Warm grey (rgba(158, 144, 122, 0.6))
- Subtle spacing between borders creates depth and sophistication

#### Pattern Integration (Pending)
Specifications for upcoming pattern overlays:
- SVG patterns should be:
  - 100px × 100px base size
  - Under 10KB file size
  - Single color with transparency
  - Coverage: 10-15% of surface area
  - Line weight: 0.5px - 1px for fine details
  - Spacing: Minimum 10px between elements

Pattern suggestions:
1. Simplified thangka border elements
2. Abstract cloud forms
3. Geometric patterns inspired by traditional textiles
4. Very fine diagonal lines
5. Minimal dot matrices

## Technical Implementation

### Responsive Design
- Mobile-first approach with progressive enhancement
- Three breakpoint system:
  - Small mobile (≤ 360px)
  - Standard mobile/tablet (≤ 768px)
  - Desktop (> 768px)
- Fluid typography and spacing scales
- Optimized touch targets for mobile

### Repository Structure
- Main branch: Contains full Cloud Embassy documentation
- gh-pages branch: Contains only website files (index.html, styles.css, main.js)

### CSS Architecture
- Custom properties for consistent theming
- Mobile-first media queries
- Hardware-accelerated transitions
- Retina display optimizations for patterns

## Repository Setup

### Quick Start
1. Create a new directory for the website:
   ```bash
   mkdir wsc-fyi
   cd wsc-fyi
   ```

2. Clone the repository:
   ```bash
   git clone https://github.com/weseeclearly/wsc-fyi.git .
   ```

3. Switch to gh-pages branch for website development:
   ```bash
   git checkout gh-pages
   ```

4. Start local development server:
   ```bash
   python -m http.server 8000
   ```

5. Visit `http://localhost:8000` in your browser

### Repository Details
- Repository URL: https://github.com/weseeclearly/wsc-fyi
- Main branch: Full Cloud Embassy documentation
- gh-pages branch: Website files only
- Live site: https://weseeclearly.github.io/wsc-fyi/

### Common Git Commands
```bash
# Get latest changes
git pull origin gh-pages

# Make changes to website files
# Then commit and push:
git add .
git commit -m "Description of changes"
git push origin gh-pages

# Switch branches
git checkout main     # For full documentation
git checkout gh-pages # For website files
```

### File Structure
```
wsc-fyi/
├── index.html    # Main HTML structure
├── styles.css    # All styling and animations
└── main.js       # JavaScript functionality
```

### Important Notes
- Always work in a separate directory for website development
- Use gh-pages branch for website changes
- Main branch contains sensitive documentation - keep private
- GitHub Pages will automatically deploy changes from gh-pages branch

## Future Enhancements
1. Pattern Implementation
   - SVG patterns to be added as background overlays
   - Each section to have unique but cohesive pattern
   - Patterns must maintain subtle sophistication

2. Typography
   - Pending selection of appropriate Google Font
   - Must complement Eastern aesthetic
   - Consider font loading optimization

3. Interaction Refinements
   - Subtle hover states
   - Smooth transitions between states
   - Focus states for accessibility

## Development Workflow
1. Local development using Python's built-in server
2. Changes pushed to main branch for documentation
3. Website files synced to gh-pages branch
4. Deployed via GitHub Pages

## Important Notes
- Pattern implementation must maintain the sophisticated minimalist aesthetic
- Color and opacity values are carefully calibrated for layering
- Border system is integral to the design language
- Mobile responsiveness is a core requirement
