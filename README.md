# Sellora - Modern Ecommerce Website

A premium, modern ecommerce website built with Next.js 14, TypeScript, and Tailwind CSS. Inspired by minimalist design principles with a focus on user experience, performance, and SEO.

## Features

### Core Features
- **Modern UI/UX**: Clean, minimal design with smooth animations and transitions
- **Fully Responsive**: Mobile-first approach with perfect UX across all devices
- **Product Management**: Dynamic product listings with filtering, sorting, and search
- **Shopping Cart**: Full cart functionality with quantity management
- **Wishlist**: Save favorite products for later
- **Product Details**: Rich product pages with image gallery, variations, and reviews
- **Checkout Flow**: Complete checkout process with form validation
- **SEO Optimized**: Meta tags, Open Graph, structured data, and semantic HTML
- **Performance**: Optimized images, lazy loading, and fast page loads

### Technical Features
- Next.js 14 App Router
- TypeScript for type safety
- Tailwind CSS for styling
- Context API for state management
- Responsive design with mobile-first approach
- Image optimization with Next.js Image
- Custom reusable components
- Clean and maintainable code structure

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React Context API
- **Image Optimization**: Next.js Image
- **Fonts**: Google Fonts (Inter, Playfair Display)

## Project Structure

```
sellora-ecommerce/
├── src/
│   ├── app/                      # Next.js App Router pages
│   │   ├── layout.tsx           # Root layout with providers
│   │   ├── page.tsx             # Home page
│   │   ├── globals.css          # Global styles
│   │   ├── shop/                # Shop page
│   │   ├── products/[slug]/     # Product detail pages
│   │   ├── cart/                # Shopping cart
│   │   ├── checkout/            # Checkout page
│   │   ├── wishlist/            # Wishlist page
│   │   ├── blog/                # Blog listing
│   │   ├── about/               # About page
│   │   └── contact/             # Contact page
│   │
│   ├── components/              # React components
│   │   ├── ui/                  # Core UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Textarea.tsx
│   │   │   └── Select.tsx
│   │   ├── layout/              # Layout components
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   ├── products/            # Product components
│   │   │   ├── ProductCard.tsx
│   │   │   ├── ProductGrid.tsx
│   │   │   └── ProductFilters.tsx
│   │   └── home/                # Home page components
│   │       ├── Hero.tsx
│   │       └── CategoryCard.tsx
│   │
│   ├── context/                 # React Context providers
│   │   ├── CartContext.tsx
│   │   └── WishlistContext.tsx
│   │
│   ├── data/                    # Sample data
│   │   └── products.ts
│   │
│   ├── lib/                     # Utility functions
│   │   ├── utils.ts
│   │   └── constants.ts
│   │
│   └── types/                   # TypeScript types
│       └── index.ts
│
├── public/                      # Static assets
├── tailwind.config.ts          # Tailwind configuration
├── tsconfig.json               # TypeScript configuration
├── next.config.js              # Next.js configuration
└── package.json                # Dependencies
```

## Design System

### Color Palette

```css
Primary Colors:
- primary-500: #ea5d1f (Brand Orange)
- primary-600: #db4215 (Darker Orange)

Neutral Colors:
- neutral-50 to neutral-950 (Gray scale)

Accent Colors:
- accent-gold: #d4af37 (Gold for ratings)
- accent-rose: #e11d48 (Red for sale badges)
- accent-emerald: #059669 (Green for new badges)
```

### Typography

```
Font Families:
- Sans: Inter (body text)
- Display: Playfair Display (headings)

Font Sizes:
- xs: 0.75rem
- sm: 0.875rem
- base: 1rem
- lg: 1.125rem
- xl: 1.25rem
- 2xl: 1.5rem
- 3xl: 1.875rem
- 4xl: 2.25rem
- 5xl: 3rem
```

### Spacing

Uses Tailwind's default spacing scale with custom additions:
- 18: 4.5rem
- 88: 22rem
- 100: 25rem
- 112: 28rem
- 128: 32rem

### Components

All components are built with:
- Consistent padding and margins
- Smooth hover effects and transitions
- Proper focus states for accessibility
- Mobile-responsive design

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd sellora-ecommerce
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Pages

### Home Page
- Hero section with call-to-action
- Featured categories grid
- Featured products showcase
- New arrivals section
- Special offers banner
- Sale products section
- Key features highlights

### Shop Page
- Product grid with filtering
- Sort options (price, rating, popularity, etc.)
- Filter sidebar (categories, price range, sizes, etc.)
- Responsive product cards with hover effects
- Quick view and wishlist functionality

### Product Detail Page
- Image gallery with thumbnails
- Product information and description
- Size and color selection
- Quantity selector
- Add to cart and wishlist
- Product ratings and reviews
- Related products section

### Cart Page
- Cart items list with images
- Quantity management
- Remove items functionality
- Order summary with totals
- Shipping calculation
- Proceed to checkout

### Checkout Page
- Shipping information form
- Payment information form
- Order summary
- Secure payment indicators
- Form validation

### Wishlist Page
- Saved products grid
- Quick add to cart
- Remove from wishlist
- Empty state handling

### Blog Page
- Featured blog post
- Recent posts grid
- Category tags
- Read time estimates
- Author information

### About Page
- Company story
- Core values
- Team members
- Statistics and achievements

### Contact Page
- Contact form
- Contact information
- Business hours
- Location details

## SEO Features

- Meta tags for all pages
- Open Graph tags for social sharing
- Semantic HTML structure
- Optimized images with alt text
- Clean URL structure
- Fast loading times
- Mobile-friendly design
- Structured data ready

## Performance Optimizations

- Next.js Image optimization
- Lazy loading images
- Code splitting with App Router
- Optimized fonts with next/font
- Minimal bundle size
- Fast Time to Interactive (TTI)
- Lighthouse score optimized

## State Management

### Cart Context
- Add/remove products
- Update quantities
- Calculate totals (subtotal, tax, shipping)
- Persistent cart (localStorage)

### Wishlist Context
- Add/remove products
- Check if product is in wishlist
- Persistent wishlist (localStorage)

## Customization

### Changing Colors

Edit `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    // Your custom colors
  }
}
```

### Adding New Products

Edit `src/data/products.ts`:

```typescript
export const sampleProducts: Product[] = [
  // Add your products here
]
```

### Modifying Layout

Edit `src/app/layout.tsx` for global changes or individual page files for specific pages.

## Best Practices

- Component-based architecture
- Type-safe with TypeScript
- Reusable UI components
- Clean code organization
- Proper error handling
- Accessible design
- SEO-friendly structure
- Performance optimized

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Future Enhancements

Potential features to add:
- User authentication
- Product search functionality
- Customer reviews system
- Order history
- Payment integration
- Newsletter subscription
- Multi-language support
- Dark mode
- Product recommendations
- Live chat support

## Contributing

This is a demonstration project. Feel free to fork and customize for your needs.

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Acknowledgments

- Design inspired by modern ecommerce best practices
- Built with Next.js, React, and Tailwind CSS
- Icons from Lucide React
- Sample images from Unsplash

---

**Built with ❤️ by the Sellora Team**
