# Losode - Fashion E-Commerce Store

A modern, feature-rich e-commerce platform built with Next.js 16 and React 19. Losode offers a curated shopping experience for fashion and lifestyle products with advanced filtering, cart management, and secure payment integration. This is strictly for skill assessment purposes.

## Overview

Losode is a full-featured e-commerce application that showcases fashion products with an intuitive user interface. The platform integrates with an external free API to fetch product data and supports secure online payments through Paystack.

**Live Features:**
-  Browse thousands of products across multiple categories
-  Advanced search and filtering (by category, price range)
-  Wishlist/Favorites management
-  Shopping cart with persistent state
-  Secure checkout with Paystack payment integration
-  Fully responsive design (mobile, tablet, desktop)
-  Modern UI with Tailwind CSS and Ant Design
-  Cookie consent management
-  Newsletter subscription popup
-  Server-side rendering and static generation for performance

## Tech Stack

### Frontend
- **Framework**: [Next.js 16.2.4](https://nextjs.org/) - React meta-framework
- **React**: 19.2.4 - UI library
- **TypeScript**: Static typing for JavaScript
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) - Utility-first CSS framework
- **UI Components**: [Ant Design 6.3.6](https://ant.design/) - Enterprise UI library
- **Icons**: [@ant-design/icons](https://ant-design.com/components/icon/)

### State Management
- **Redux Toolkit**: 2.11.2 - Predictable state container
- **React-Redux**: 9.2.0 - React bindings for Redux
- **Redux-Persist**: 6.0.0 - Persist Redux state to localStorage

### Data Fetching & Server Communication
- **React Query**: @tanstack/react-query 5.100.1 - Server state management and caching
- **React Query DevTools**: @tanstack/react-query-devtools - Debugging tools
- **use-debounce**: 10.1.1 - Debounce hook for search optimization

### Payment Integration
- **react-paystack**: 6.0.0 - Paystack payment gateway integration

### SEO & Meta
- **next-seo**: 7.2.0 - SEO management for Next.js
- **robots.ts**
- **sitemap.ts**

### Development Tools
- **ESLint**: Code linting
- **Babel Plugin React Compiler**: React 19 compiler plugin

## Project Structure

```
losode-shop/
├── src/
│   ├── app/                          # Next.js app router
│   │   ├── layout.tsx                # Root layout with providers
│   │   ├── page.tsx                  # Home page
│   │   ├── globals.css               # Global styles
│   │   ├── cart/                     # Shopping cart page
│   │   ├── checkout/                 # Checkout page with payment
│   │   ├── favorites/                # Wishlist/favorites page
│   │   └── products/                 # Products listing and details
│   │       ├── page.tsx              # Products grid with filters
│   │       └── [id]/                 # Product detail page
│   ├── components/                   # React components
│   │   ├── Providers.tsx             # Redux + React Query providers
│   │   ├── layout/
│   │   │   └── Navbar.tsx            # Navigation header
│   │   │   └── Footer.tsx            # Navigation header
│   │   ├── products/
│   │   │   ├── page.tsx              # Products list component
│   │   │   ├── ProductCard.tsx       # Product card component
│   │   │   ├── ProductDetailClient.tsx # Product details component
│   │   │   ├── ProductFilters.tsx    # Category & price filters
│   │   │   ├── ProductSkeleton.tsx   # Loading skeleton
│   │   │   └── [id]/
│   │   │       └── page.tsx          # Product detail wrapper
│   │   ├── cart/
│   │   │   └── page.tsx              # Cart component
│   │   ├── checkout/                 # Checkout components
│   │   └── ui/
│   │       ├── CookieBanner.tsx      # Cookie consent banner
│   │       └── NewsletterPopup.tsx   # Newsletter subscription
│   │       └── ChatWidget.tsx        # Chatbot for fun
│   ├── hooks/
│   │   └── redux.ts                  # Redux typed hooks
│   ├── json/
│   │   └── navbar-data.json          # Data for navbar
│   ├── lib/
│   │   └── api.ts                    # API client functions
│   ├── store/
│   │   ├── index.ts                  # Redux store config
│   │   ├── cartSlice.ts              # Cart state & reducers
│   │   └── favoritesSlice.ts         # Favorites state & reducers
│   └── types/
│       └── index.ts                  # TypeScript interfaces
├── public/                           # Static assets
├── next.config.ts                    # Next.js configuration
├── tailwind.config.js                # Tailwind CSS config
├── tsconfig.json                     # TypeScript config
├── eslint.config.mjs                 # ESLint config
├── postcss.config.mjs                # PostCSS config
└── package.json                      # Dependencies & scripts
```

### Product
```typescript
interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
}
```

### Category
```typescript
interface Category {
  id: number;
  name: string;
  image: string;
}
```

### Cart Item
```typescript
interface CartItem {
  product: Product;
  quantity: number;
}
```

## API Integration

The application uses the **Escuelajs API** (`https://api.escuelajs.co/api/v1`) for product data.

### Main API Functions

**`fetchProducts(params?)`**
- Fetches products with optional filters
- Parameters: `title`, `categoryId`, `price_min`, `price_max`, `limit`
- Returns filtered products with valid images

**`fetchProductById(id)`**
- Fetches a single product by ID

**`fetchCategories()`**
- Fetches all available categories

### Remote Image Patterns

Configured in `next.config.ts` to optimize images from any source:
- https://**

## Getting Started

### Prerequisites
- Node.js 18+ (LTS recommended)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/3llack/losode-shop.git
   cd losode-shop
   ```

2. **Install dependencies**
   ```bash
   npm install or npm i
   ```

3. **Set up environment variables** (optional for Paystack)
   Create a `.env.local` file in the project root:
   ```env
   NEXT_PUBLIC_PAYSTACK_KEY=pk_test_your_paystack_key
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000] or [http://localhost:3001] in your browser.

## Available Scripts

- `npm run dev` - Start development server (with hot reload)
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint for code quality checks

## Design & Styling

### Color Scheme
- **Primary Accent**: `#C8A96E` (Gold)
- **Dark Background**: `#000000` (Charcoal)
- **Light Background**: `#FAFAF8` (Off-white)
- **Text**: Black, White, Gray variants

### Responsive Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1150px
- Desktop: > 1200px

The design uses Tailwind CSS utility classes with custom configurations and Ant Design components for consistency and accessibility.

## State Management Architecture

### Redux Store Structure
```
store/
├── cart
│   ├── items: CartItem[]
│   ├── Selectors: selectCartItems, selectCartCount, selectCartTotal
│   └── Actions: addToCart, removeFromCart, updateQuantity, clearCart
└── favorites
    ├── items: Product[]
    ├── Selectors: selectFavorites, selectFavoritesCount, selectIsFavorite
    └── Actions: toggleFavorite
```

### Persistence
- Cart and favorites are persisted to `localStorage` using redux-persist
- State rehydrates automatically on app startup

## Shopping Flow

1. **Browse**: User lands on home page with featured products and categories
2. **Explore**: Navigate to products page with advanced filtering options
3. **Filter**: Search by keyword, category, or price range
4. **Details**: Click on product for detailed view
5. **Cart**: Add products to cart (quantities managed in state)
6. **Favorites**: Add products to wishlist for later
7. **Checkout**: Review cart and proceed to payment
8. **Payment**: Secure payment via Paystack
9. **Confirmation**: Order success confirmation

## Payment Integration

### Paystack Configuration
- Payment gateway: [Paystack](https://paystack.com/)
- Integration: `react-paystack` library
- Supported currencies: NGN
- Reference format: `losode_[timestamp]`

Environment variable required:
```env
NEXT_PUBLIC_PAYSTACK_KEY=pk_test_xxxxxxxxxxxxx
```

## Pages & Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | HomePage | Landing page with featured products |
| `/products` | ProductsPage | Product catalog with filters |
| `/products/:id` | ProductDetailPage | Individual product details |
| `/cart` | CartPage | Shopping cart review |
| `/checkout` | CheckoutPage | Payment & order completion |
| `/favorites` | FavoritesPage | Wishlist/saved items |

## Key Features Explained

### Advanced Search
- Real-time search with 300ms debouncing
- Search across product titles, descriptions, and categories
- URL-based search parameters for bookmarking

### Filtering System
- **Category Filter**: Browse by Women, Men, Kids, etc.
- **Price Range Filter**: Slider-based price filtering
- Filters persist across pagination
- URL-based filters for shareable links

### Product Display
- Pagination: 12 products per page
- Responsive grid: 2 columns (mobile) → 3-4 columns (tablet) → 4 columns (desktop)
- Loading skeletons for better UX
- Error handling with user-friendly messages

### Cart Management
- Add/remove products
- Adjust quantities
- Real-time cart count in navbar
- Cart totals calculation
- Clear entire cart

### User Experience
- Cookie consent banner
- Newsletter subscription popup
- Smooth scrolling on pagination
- Mobile-responsive drawer menu
- Search bar with search icon toggle
- Loading states and error boundaries

## Performance Optimizations

- **Image Optimization**: Next.js Image component with remote pattern configuration
- **Caching**: React Query stale time configuration (categories cached indefinitely)
- **Code Splitting**: Automatic with Next.js
- **Debouncing**: Search input debounced to prevent excessive API calls
- **Pagination**: Lazy-load products instead of loading all at once
- **CSS**: Tailwind CSS with PostCSS purging

## Security Considerations

- Secure payment via Paystack (PCI compliant)
- CORS handled by Next.js API routes
- Environment variables for sensitive data
- Content Security Policy for image SVG handling
- Type-safe Redux and React code with TypeScript

## Known Limitations & TODOs

- Products data source is external API (Escuelajs) - test data
- Products details defaults to custom page (API returns product not found)
- Payment functionality requires Paystack account setup
- No authentication/user accounts (no backend/db setup)
- No order history tracking
- No review/rating system yet
- No privacy policy

## Dependencies Overview

### Core
- `next` - React meta-framework
- `react`, `react-dom` - UI library
- `typescript` - Type safety

### UI & Styling
- `tailwindcss` - Utility CSS framework
- `antd` - Component library
- `@ant-design/icons` - Icon set

### State & Data
- `@reduxjs/toolkit` - Redux state management
- `react-redux` - Redux React bindings
- `redux-persist` - State persistence
- `@tanstack/react-query` - Server state management

### Additional
- `react-paystack` - Payment integration
- `next-seo` - SEO optimization
- `use-debounce` - Debounce utility
- `npmrc` - Force dependecny on Netlify host

## Learning Resources

- [Next.js 16 Documentation](https://nextjs.org/docs)
- [React 19 Guide](https://react.dev)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [React Query Documentation](https://tanstack.com/query/latest)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Ant Design Documentation](https://ant.design/docs/react/introduce)

## License

This project is for an assessment and not intended to clone or fake as the official Losode company, sub companies or entity. 
Pay attention to the URL details (https://losode.netlify.app)

## Author

Built by 266labs

---

**Last Updated**: April 2026
**Next.js Version**: 16.2.4
**React Version**: 19.2.4
