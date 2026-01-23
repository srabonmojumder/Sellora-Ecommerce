# Sellora Design System Guide

## Design Philosophy

Sellora's design is inspired by modern minimalist ecommerce principles, focusing on:
- **Clean & Minimal**: Ample white space and uncluttered layouts
- **Premium Feel**: Elegant typography and subtle shadows
- **User-Centric**: Intuitive navigation and clear call-to-actions
- **Responsive First**: Mobile-optimized for all screen sizes
- **Performance**: Fast loading with smooth animations

## Color System

### Primary Palette

**Brand Orange (Primary)**
```css
primary-50:  #fef6ee  /* Lightest tint */
primary-100: #fce8d6
primary-200: #f8ceac
primary-300: #f4aa77
primary-400: #ee7b40
primary-500: #ea5d1f  /* Main brand color */
primary-600: #db4215  /* Hover states */
primary-700: #b62f14
primary-800: #912618
primary-900: #752216
primary-950: #3f0e09  /* Darkest shade */
```

**Usage:**
- Buttons, links, CTAs
- Active states
- Brand accents
- Focus indicators

### Neutral Palette

**Gray Scale**
```css
neutral-50:  #fafafa  /* Page backgrounds */
neutral-100: #f5f5f5  /* Card backgrounds */
neutral-200: #e5e5e5  /* Borders */
neutral-300: #d4d4d4  /* Dividers */
neutral-400: #a3a3a3  /* Disabled text */
neutral-500: #737373  /* Secondary text */
neutral-600: #525252  /* Body text */
neutral-700: #404040  /* Headings */
neutral-800: #262626  /* Dark UI elements */
neutral-900: #171717  /* Primary text */
neutral-950: #0a0a0a  /* Darkest */
```

**Usage:**
- Text hierarchy
- Borders and dividers
- Backgrounds
- Shadows

### Accent Colors

**Gold** (Ratings & Premium features)
```css
accent-gold: #d4af37
```

**Rose** (Sale badges, errors, alerts)
```css
accent-rose: #e11d48
```

**Emerald** (New badges, success states)
```css
accent-emerald: #059669
```

## Typography

### Font Families

**Sans-Serif (Inter)** - Body text
```css
font-sans: 'Inter', system-ui, sans-serif
```
- Clean, modern, highly readable
- Used for: body text, buttons, forms, UI elements

**Display (Playfair Display)** - Headings
```css
font-display: 'Playfair Display', Georgia, serif
```
- Elegant, premium feel
- Used for: main headings, hero text, section titles

### Font Sizes & Line Heights

```css
text-xs:   0.75rem  (12px)  - line-height: 1rem
text-sm:   0.875rem (14px)  - line-height: 1.25rem
text-base: 1rem     (16px)  - line-height: 1.5rem   /* Default */
text-lg:   1.125rem (18px)  - line-height: 1.75rem
text-xl:   1.25rem  (20px)  - line-height: 1.75rem
text-2xl:  1.5rem   (24px)  - line-height: 2rem
text-3xl:  1.875rem (30px)  - line-height: 2.25rem
text-4xl:  2.25rem  (36px)  - line-height: 2.5rem
text-5xl:  3rem     (48px)  - line-height: 1
text-6xl:  3.75rem  (60px)  - line-height: 1
```

### Font Weights

```css
font-normal:    400  /* Body text */
font-medium:    500  /* Emphasized text, labels */
font-semibold:  600  /* Subheadings, buttons */
font-bold:      700  /* Headings, CTAs */
```

### Typography Scale Usage

```
Hero Titles:      text-4xl md:text-6xl font-display font-bold
Page Titles:      text-3xl md:text-4xl font-display font-bold
Section Titles:   text-2xl md:text-3xl font-display font-bold
Subsection:       text-xl font-semibold
Body Large:       text-lg
Body Default:     text-base
Body Small:       text-sm
Captions:         text-xs
```

## Spacing System

### Tailwind Default + Custom Extensions

```css
/* Tailwind defaults (0-96 in increments of 4px) */
0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 14, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 72, 80, 96

/* Custom additions */
18:  4.5rem   (72px)
88:  22rem    (352px)
100: 25rem    (400px)
112: 28rem    (448px)
128: 32rem    (512px)
```

### Spacing Patterns

**Component Padding:**
- Small: p-4 (16px)
- Medium: p-6 (24px)
- Large: p-8 (32px)
- Extra Large: p-12 (48px)

**Section Spacing:**
- Small: py-12 (48px)
- Medium: py-16 (64px)
- Large: py-20 (80px)
- Extra Large: py-32 (128px)

**Grid Gaps:**
- Tight: gap-4 (16px)
- Default: gap-6 (24px)
- Loose: gap-8 (32px)

## Layout Patterns

### Container

```tsx
<div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
  {/* Content */}
</div>
```

### Grid Layouts

**2 Columns:**
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
```

**3 Columns:**
```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
```

**4 Columns:**
```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
```

### Page Structure

```
┌─────────────────────────────────────┐
│ Navbar (Fixed, h-20)                │
├─────────────────────────────────────┤
│ Page Header (bg-white, py-12)       │
│ - Title                             │
│ - Breadcrumb / Description          │
├─────────────────────────────────────┤
│ Main Content (container, py-12)     │
│ - Flexible content area             │
│                                     │
├─────────────────────────────────────┤
│ Footer                              │
└─────────────────────────────────────┘
```

## Shadows

```css
shadow-soft:   0 2px 8px rgba(0, 0, 0, 0.04)   /* Subtle depth */
shadow-medium: 0 4px 16px rgba(0, 0, 0, 0.08)  /* Cards */
shadow-large:  0 8px 32px rgba(0, 0, 0, 0.12)  /* Modals */
shadow-hover:  0 8px 24px rgba(0, 0, 0, 0.15)  /* Hover state */
```

**Usage:**
- Cards: shadow-soft
- Product cards (hover): shadow-hover
- Modals/Drawers: shadow-large
- Sticky headers: shadow-medium

## Border Radius

```css
rounded-none: 0px
rounded-sm:   0.125rem (2px)
rounded:      0.25rem  (4px)
rounded-md:   0.375rem (6px)
rounded-lg:   0.5rem   (8px)   /* Default for cards */
rounded-xl:   0.75rem  (12px)  /* Large cards */
rounded-2xl:  1rem     (16px)
rounded-full: 9999px          /* Circles, pills */
```

**Usage:**
- Buttons: rounded-lg
- Cards: rounded-lg or rounded-xl
- Inputs: rounded-lg
- Badges: rounded or rounded-full
- Images: rounded-lg

## Animations & Transitions

### Built-in Animations

```css
animate-fade-in:   fadeIn 0.3s ease-in-out
animate-slide-up:  slideUp 0.4s ease-out
animate-slide-down: slideDown 0.4s ease-out
animate-scale-in:  scaleIn 0.2s ease-out
```

### Transition Patterns

**Default:**
```tsx
className="transition-all duration-200"
```

**Hover States:**
```tsx
className="transition-all duration-300 hover:scale-105"
```

**Color Transitions:**
```tsx
className="transition-colors duration-200"
```

**Transform Transitions:**
```tsx
className="transition-transform duration-500"
```

## Component Patterns

### Buttons

**Primary Button:**
```tsx
<Button variant="primary" size="md">
  Click Me
</Button>
```

**Secondary Button:**
```tsx
<Button variant="secondary" size="md">
  Learn More
</Button>
```

**Outline Button:**
```tsx
<Button variant="outline" size="md">
  Cancel
</Button>
```

### Cards

**Product Card:**
```tsx
<div className="bg-white rounded-lg overflow-hidden shadow-soft hover:shadow-hover transition-all">
  {/* Image */}
  {/* Content */}
</div>
```

**Content Card:**
```tsx
<div className="bg-white rounded-lg p-6 shadow-soft">
  {/* Content */}
</div>
```

### Badges

**Sale Badge:**
```tsx
<Badge variant="sale">Sale</Badge>
```

**New Badge:**
```tsx
<Badge variant="new">New</Badge>
```

### Forms

**Input Field:**
```tsx
<Input
  label="Email"
  type="email"
  placeholder="Enter your email"
  className="w-full"
/>
```

**Textarea:**
```tsx
<Textarea
  label="Message"
  rows={6}
  placeholder="Your message..."
/>
```

## Responsive Breakpoints

```css
sm:  640px   @media (min-width: 640px)
md:  768px   @media (min-width: 768px)
lg:  1024px  @media (min-width: 1024px)
xl:  1280px  @media (min-width: 1280px)
2xl: 1536px  @media (min-width: 1536px)
```

### Mobile-First Approach

Always style mobile first, then add breakpoint modifiers:

```tsx
<div className="text-2xl md:text-4xl lg:text-5xl">
  Responsive Heading
</div>
```

## Accessibility

### Color Contrast

All text meets WCAG AA standards:
- Normal text: 4.5:1 contrast ratio
- Large text: 3:1 contrast ratio
- Interactive elements: clear focus states

### Focus States

```tsx
className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
```

### Semantic HTML

- Use proper heading hierarchy (h1 → h6)
- Use semantic tags (nav, main, section, article)
- Add ARIA labels where needed
- Include alt text for images

## Icon Usage

Using Lucide React icons:

```tsx
import { ShoppingCart, Heart, User } from 'lucide-react'

<ShoppingCart className="w-5 h-5" />
<Heart className="w-6 h-6 text-primary-500" />
```

**Icon Sizes:**
- Small: w-4 h-4 (16px)
- Default: w-5 h-5 (20px)
- Medium: w-6 h-6 (24px)
- Large: w-8 h-8 (32px)

## Image Guidelines

### Aspect Ratios

- Product Cards: 3:4 (portrait)
- Category Cards: 1:1 (square)
- Hero Images: 16:9 (landscape)
- Blog Thumbnails: 16:10

### Optimization

```tsx
<Image
  src="/path/to/image.jpg"
  alt="Descriptive alt text"
  width={800}
  height={600}
  className="object-cover"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
```

## Design Dos and Don'ts

### ✅ Do:

- Use consistent spacing throughout
- Maintain visual hierarchy with typography
- Add hover states to interactive elements
- Use smooth transitions
- Optimize images before using
- Test on mobile devices
- Ensure sufficient color contrast
- Use semantic HTML

### ❌ Don't:

- Mix too many font families
- Use inconsistent spacing
- Forget mobile responsive design
- Skip loading states
- Ignore accessibility
- Overcomplicate layouts
- Use too many colors
- Forget empty states

## Example Compositions

### Hero Section

```tsx
<section className="py-20 md:py-32 bg-gradient-to-br from-neutral-50 to-neutral-100">
  <div className="container mx-auto px-4 text-center">
    <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
      Hero Title
    </h1>
    <p className="text-lg md:text-xl text-neutral-600 mb-8">
      Subtitle text goes here
    </p>
    <Button size="lg">Call to Action</Button>
  </div>
</section>
```

### Product Grid Section

```tsx
<section className="py-16 bg-neutral-50">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl font-display font-bold mb-8">
      Featured Products
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Product cards */}
    </div>
  </div>
</section>
```

### Content Card

```tsx
<div className="bg-white rounded-lg p-6 shadow-soft">
  <h3 className="text-xl font-semibold mb-4">Card Title</h3>
  <p className="text-neutral-600 mb-4">Card content...</p>
  <Button variant="outline">Learn More</Button>
</div>
```

---

This design system ensures consistency across the entire Sellora platform. Always refer to these guidelines when creating new components or pages.
