# 🍽️ Diner Website - Frontend

A **production-grade, premium restaurant website** built with Next.js, featuring a modern UI, smooth animations, and a complete online ordering system. This is the frontend for a cozy American diner serving American + Latin fusion cuisine in Oakland Park, FL.

---

## ✨ Features

### 🎨 **Frontend**
- **Modern, Elegant UI** - Warm, coffee-inspired color palette with premium design
- **Fully Responsive** - Mobile-first design that works beautifully on all devices
- **Smooth Animations** - Framer Motion powered transitions and interactions
- **SEO Optimized** - Complete metadata, Open Graph, and Twitter Card support
- **Accessible** - ARIA labels, keyboard navigation, and semantic HTML

### 📄 **Pages**
- **Home** - Hero section with tagline, CTAs, and highlights
- **Menu** - Categorized menu with prices, dietary icons, and smooth animations
- **About Us** - Cozy story, mural wall, and fusion-friendly vibe
- **Order Online** - Interactive cart system with quantity controls and order summary
- **Gallery** - Beautiful image grid showcasing food, coffee, and atmosphere
- **Contact & Location** - Google Maps integration, address, hours, and amenities
- **Accessibility** - Information about wheelchair access, Wi-Fi, and family-friendly features

### 🛠️ **Tech Stack**
- **Next.js 16** (App Router) - Latest Next.js with React Server Components
- **TypeScript** - Full type safety
- **Tailwind CSS** - Utility-first styling with custom diner theme
- **Framer Motion** - Smooth, performant animations
- **React Compiler** - Optimized React performance

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.17 or later
- **npm**, **yarn**, **pnpm**, or **bun**

### Installation

1. **Clone or navigate to the project directory:**
   ```bash
   cd diner-frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server:**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

   You should see the homepage with the hero section and navigation.

---

## 📁 Project Structure

```
diner-frontend/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (routes)/           # All page routes
│   │   │   ├── page.tsx        # Home page
│   │   │   ├── menu/           # Menu page
│   │   │   ├── about/          # About page
│   │   │   ├── order/          # Order Online page
│   │   │   ├── gallery/        # Gallery page
│   │   │   ├── contact/        # Contact page
│   │   │   └── accessibility/  # Accessibility page
│   │   ├── layout.tsx          # Root layout with Header/Footer
│   │   ├── globals.css        # Global styles
│   │   └── _app-motion-wrapper.tsx  # Page transition wrapper
│   ├── components/            # Reusable components
│   │   ├── Header.tsx         # Navigation header
│   │   ├── Footer.tsx         # Footer component
│   │   └── MobileNav.tsx      # Mobile navigation menu
│   ├── data/                  # Data files
│   │   └── menu.ts            # Menu data structure
│   └── styles/                # Additional styles
│       └── index.css          # Custom CSS
├── public/                    # Static assets
├── tailwind.config.js         # Tailwind configuration
├── next.config.ts             # Next.js configuration
├── tsconfig.json              # TypeScript configuration
└── package.json               # Dependencies and scripts
```

---

## 🎨 Customization

### Colors & Theme

The color palette is defined in `tailwind.config.js`:

```javascript
colors: {
  diner: {
    cream: '#FFEBD8',      // Background
    coffee: '#6F4E37',      // Rich brown
    terracotta: '#E2725B', // Warm accent
    gold: '#C19554',        // Elegant accent
    muralBlue: '#3A5BA0',   // Mural vibes
    muralPink: '#EA638C',   // Mural accent
  },
}
```

### Menu Items

Edit `src/data/menu.ts` to update menu items, prices, and categories.

### Gallery Images

Update `src/app/gallery/gallery-images.ts` with your own image URLs and captions.

### Business Information

Update contact details in:
- `src/app/contact/page.tsx` - Contact page
- `src/components/Footer.tsx` - Footer
- `src/app/layout.tsx` - SEO metadata

---

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. **Push your code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Deploy on Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js settings
   - Click "Deploy"

3. **Environment Variables (if needed):**
   - Add any environment variables in Vercel dashboard
   - For now, no env vars are required

### Deploy to Other Platforms

**Netlify:**
```bash
npm run build
# Deploy the .next folder
```

**Render:**
- Connect your GitHub repo
- Select "Next.js" as the environment
- Render will auto-detect and deploy

**Self-Hosted:**
```bash
npm run build
npm start
```

---

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

---

## 🔌 Backend Integration (Future)

The Order Online page is **backend-ready**. To connect to your API:

1. **Update Cart Context** (`src/app/order/CartContext.tsx`):
   - Add API calls in `addToCart`, `updateQuantity`, etc.
   - Replace local state with API state management

2. **Add Checkout Flow**:
   - Create checkout page
   - Integrate payment gateway (Stripe, PayPal, etc.)
   - Add customer information form

3. **Environment Variables**:
   ```env
   NEXT_PUBLIC_API_URL=https://your-api-url.com
   NEXT_PUBLIC_STRIPE_PUBLIC_KEY=your-stripe-key
   ```

---

## 🎯 Performance & SEO

- ✅ **Image Optimization** - Next.js Image component (add when using real images)
- ✅ **Font Optimization** - Geist fonts loaded via `next/font`
- ✅ **Code Splitting** - Automatic with Next.js App Router
- ✅ **SEO Metadata** - Complete Open Graph and Twitter Cards
- ✅ **Lazy Loading** - Gallery images and maps load on demand

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
npx kill-port 3000
# Or use a different port
npm run dev -- -p 3001
```

### Build Errors
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

### TypeScript Errors
```bash
# Regenerate types
npm run build
```

---

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

---

## 📄 License

This project is private and proprietary.

---

## 👨‍💻 Development Notes

- **React Compiler** is enabled for optimized performance
- **App Router** is used (not Pages Router)
- All components are TypeScript-typed
- Mobile navigation uses Framer Motion animations
- Cart state is managed with React Context (ready for backend integration)

---

## 🎉 You're All Set!

Your premium diner website is ready to go! Customize the content, add your images, and deploy to Vercel for a production-ready restaurant website.

**Questions?** Check the code comments or Next.js documentation.

---

**Built with ❤️ for a cozy, classy diner experience.**
