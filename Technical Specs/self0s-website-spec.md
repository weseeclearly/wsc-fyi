# self0s Website Technical Specification

## Core Requirements

- Single page architecture
- Minimal JavaScript (vanilla JS only where necessary)
- No external UI frameworks
- System font stack
- Responsive design (mobile-first)
- Maximum content width: 800px
- Ample whitespace between sections (min 120px)

## Typography System

```css
/* Font Stack */
--font-system: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, sans-serif;

/* Type Scale (rem) */
--text-xs: 0.75rem;   /* 12px */
--text-sm: 0.875rem;  /* 14px */
--text-base: 1rem;    /* 16px */
--text-lg: 1.125rem;  /* 18px */
--text-xl: 1.25rem;   /* 20px */
--text-2xl: 1.5rem;   /* 24px */
--text-3xl: 2rem;     /* 32px */

/* Line Heights */
--leading-tight: 1.2;
--leading-normal: 1.5;
--leading-loose: 1.8;
```

## Color System

```css
/* Monochromatic Palette */
--color-black: #000000;
--color-gray-900: #1a1a1a;
--color-gray-800: #333333;
--color-gray-200: #eeeeee;
--color-white: #ffffff;
```

## Layout Structure

### 1. Hero Section
```html
<section class="hero">
  <h1>self0s</h1>
  <p class="mission-statement">
    A global system of interface signals, mirrors, designs, artifacts, tools, maps, living in service of a true human.
  </p>
</section>
```

### 2. Framework Diagram
```html
<section class="framework">
  <svg class="diagram" viewBox="0 0 400 300">
    <!-- Simple geometric shapes only -->
    <!-- Black strokes (1px) -->
    <!-- No fills -->
  </svg>
  <div class="diagram-labels">
    <!-- Minimal text labels -->
  </div>
</section>
```

### 3. Immersive Element
```html
<section class="immersive">
  <div class="pattern-demo">
    <!-- Simple canvas or SVG element -->
    <!-- Minimal interaction states -->
  </div>
</section>
```

### 4. Context Articles
```html
<section class="articles">
  <div class="article-grid">
    <!-- 2x2 or 1x4 grid (responsive) -->
    <!-- Each article: title + 2-line description -->
  </div>
</section>
```

### 5. Interaction Zone
```html
<section class="interaction">
  <form class="minimal-form">
    <!-- Simple input + button -->
    <!-- No complex validation -->
  </form>
</section>
```

### 6. External Links
```html
<section class="links">
  <ul class="link-list">
    <!-- Text-only links -->
    <!-- Minimal hover states -->
  </ul>
</section>
```

## Spacing System

```css
/* Space Scale (rem) */
--space-xs: 0.5rem;   /* 8px */
--space-sm: 1rem;     /* 16px */
--space-md: 1.5rem;   /* 24px */
--space-lg: 2rem;     /* 32px */
--space-xl: 3rem;     /* 48px */
--space-2xl: 4rem;    /* 64px */
--space-3xl: 6rem;    /* 96px */
```

## Animation Guidelines

- Use only opacity and transform properties
- Maximum duration: 300ms
- Timing function: cubic-bezier(0.4, 0, 0.2, 1)
- No animation on first page load
- Minimal hover states (opacity or underline only)

## Responsive Breakpoints

```css
--breakpoint-sm: 640px;
--breakpoint-md: 768px;
--breakpoint-lg: 1024px;
```

## Performance Requirements

- No external fonts
- No external images
- Maximum bundle size: 100KB
- No third-party scripts
- Perfect Lighthouse score target

## Accessibility Requirements

- WCAG 2.1 AA compliant
- Semantic HTML structure
- Keyboard navigation support
- High contrast text (minimum 4.5:1)
- Focus states visible
- aria-labels where necessary

## Build Requirements

- Static site generation
- No build frameworks
- Pure HTML/CSS/JS
- No preprocessing required
- Single HTML file output
- Inline critical CSS
- Deferred non-critical JS
