# Colombian Coffee Huila

## Project Overview
E-commerce web app for a Colombian coffee export business based in the Netherlands. Sells specialty coffee from Finca El Jardín, El Gigante – Huila, Colombia to retail and wholesale customers across all 12 Dutch provinces.

## Tech Stack
- **React 19** + **TypeScript** + **Vite 6**
- **Tailwind CSS 4** (Vite plugin)
- **Framer Motion** (motion library) for animations
- **Lucide React** for icons
- No backend yet – all data hardcoded, localStorage for persistence

## Key Commands
- `npm run dev` – Start dev server on port 3000
- `npm run build` – Production build
- `npm run preview` – Preview production build

## Project Structure
```
src/
├── App.tsx              # Main app with routing, state, catalog, modals
├── main.tsx             # React entry point
├── index.css            # Tailwind imports + custom theme (coffee/gold/cream)
├── types.ts             # TypeScript interfaces (Product, User, CartItem, Order)
├── constants.ts         # Product data, company info (COMPANY object), provinces
├── i18n.ts              # Internationalization (EN, NL, DE, FR, SV)
└── components/
    ├── Navbar.tsx        # Navigation with language selector + brand logo
    ├── HeroCarousel.tsx  # 4-slide hero (beans, Colombia map, landscape, logo)
    ├── ProductCard.tsx   # Product display with wholesale pricing
    ├── Cart.tsx          # Shopping cart sidebar
    ├── AuthModal.tsx     # Login/Register (retail vs wholesale)
    ├── UserProfile.tsx   # User profile + order history
    ├── AdminPanel.tsx    # Admin dashboard (products, orders, clients)
    └── Footer.tsx        # Footer with contact, delivery, social
public/
├── products/            # Product images (real packaging photos)
├── hero/                # Hero carousel images
├── logo-cafe.png        # Brand logo (cup + mountains)
└── coffee-icon.svg      # Favicon
```

## Products (5 items, all from Huila at 1,750 masl)
1. Castillo Medium Roast – €12.50 / 125g
2. Castillo Medium-High Roast – €13.50 / 125g
3. Bourbon Papayo (Honey process) – €18.90 / 125g
4. Decaf Colombian Coffee – €14.50 / 125g
5. Green Coffee Beans – €8.90 / 500g

## User Types
- **Retail**: Regular pricing
- **Wholesale**: 18% automatic discount, requires company name + KVK number
- **Admin**: Access via email `admin@huilacoffee.nl`

## Brand Info
- **Name**: Colombian Coffee Huila
- **Farm**: Finca El Jardín, El Gigante – Huila, Colombia
- **Tagline**: "We are farming families"
- **Slogan**: "From our farm directly to your coffee cup"
- **Certification**: INVIMA – Registro Sanitario NSA – 0006451-2019
- **Roaster**: AyP Tostadores
- **Contact**: Juan David Solorza, The Hague, Netherlands

## Theme Colors
- Coffee browns: coffee-50 through coffee-900
- Gold accents: gold-300, gold-400, gold-500
- Background: cream (#FDF6EC)
- Fonts: Playfair Display (headings), Inter (body)

## Repository
- GitHub: https://github.com/Dramirez18/ColombianCoffee.git
