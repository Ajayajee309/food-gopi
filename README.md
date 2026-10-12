# 🍔 Foodie Hub — Coimbatore Fast-Food Restaurant Website

A modern, responsive, high-performance web application designed for **"Foodie Hub"**, a fast-food restaurant based in **Coimbatore, Tamil Nadu, India**. Built with pure HTML5, modern vanilla CSS3 design system, and ES6 JavaScript, bundled with Vite for fast local preview and production builds.

---

## 🎨 Design & Theme
- **Color Palette:**
  - **Vibrant Fast-Food Orange:** `#FF6B00`, `#FF5100` (Call-to-action, buttons, accents)
  - **Deep Charcoal / Sleek Black:** `#111113`, `#19191D`, `#222228`
  - **Warm Cream & Off-White:** `#FFF9F2`, `#FAF2E6`, `#EEDECB`
  - **Crisp White:** `#FFFFFF`
  - **Dietary Indicators:** Herb Green `#16A34A` (Pure Veg) & Crimson Red `#DC2626` (Non-Veg)
- **Typography:**
  - Display & Headings: `Outfit` (Bold, geometric, modern branding)
  - Body & UI: `Plus Jakarta Sans` (Clean, highly legible)
- **Visual Assets:**
  - Flagship generated high-resolution assets:
    - `public/images/hero-burger.jpg` — Gourmet double patty crispy chicken burger
    - `public/images/special-combo.jpg` — Loaded pizza, wings, and curly fries feast
    - `public/images/south-indian-fusion.jpg` — Kovai Kari Dosa & Paneer 65 fusion platter
    - `public/images/restaurant-interior.jpg` — Coimbatore Cross Cut Road dining hall with glowing neon signage

---

## 🍽️ Website Features & Sections

1. **Home / Hero Section:**
   - Headline: *"Fresh Food, Great Taste!"*
   - Coimbatore tag: *"🔥 Coimbatore's #1 Rated Fast Food Hub"*
   - Stats counters: 15,000+ Happy Foodies, 4.9★ Google Rating, 28 Mins Avg. Delivery
   - Interactive CTAs: "Explore Menu" and "Order Now"
   - Floating live badges with subtle CSS floating animations

2. **Express Delivery Strip:**
   - Highlights 100% fresh produce, open hygienic kitchen, and 30-min express delivery in Coimbatore.

3. **About Us:**
   - The Foodie Hub story: combining international fast-food crunch with authentic Tamil Nadu spices.
   - The 4 core pillars: Master Chefs, Pure Dairy & Real Cheese, Fresh Kovai Spices, Customer Satisfaction.
   - 100% Fresh Taste Guarantee badge.

4. **Food Menu:**
   - 6 Categorized Food Sections:
     - 🍔 **Burgers** (Kovai Crispy Chicken Burger, Maharaja Paneer Royale, Smoky BBQ Burger, Cheesy Aloo Crunch)
     - 🍕 **Pizza** (Spicy Chicken Tikka Supreme, Kovai Peri-Peri Paneer, Farmhouse Delight, Triple Cheese Margherita)
     - 🥪 **Sandwiches** (Bombay Club Grilled, Peri-Peri Chicken Melt Panini, Tandoori Paneer Sub)
     - 🍟 **French Fries & Sides** (Loaded Mexican Fries, Peri-Peri Fries, Golden Fried Wings)
     - 🍛 **South Indian Snacks (Fusion)** (Kovai Fusion Platter, Crispy Paneer 65 Bites, Chettinad Chicken Pops, Masala Vada Sliders)
     - 🥤 **Beverages & Shakes** (Madras Filter Coffee Frappe, Nutella Hazelnut Freakshake, Alphonso Mango Shake, Blue Ocean Sparkler)
   - Real-time search by keyword
   - Category filter pills (All, Burgers, Pizza, Sandwiches, Fries, South Indian, Beverages)
   - Pure Veg Only switch filter
   - Sort dropdown (Featured, Price: Low to High, Price: High to Low, Top Rated)
   - Dynamic "+ Add to Cart" / "- [qty] +" quantity controls

5. **Our Services:**
   - **Dine-In Experience:** Air-conditioned seating, high-speed Wi-Fi, family booths at Cross Cut Road
   - **Express Takeaway:** 10-15 min pre-order pickup with insulated packaging
   - **30-Min Home Delivery:** Dedicated Coimbatore fleet covering RS Puram, Gandhipuram, Peelamedu, Saibaba Colony & beyond
   - **Party & Bulk Catering:** Custom event boxes and corporate meal packs

6. **Special Offers & Combos:**
   - Value Combos with savings badges (Kovai Crunch Box, Weekend Grand Feast, Snack Attack Trio)
   - Active Promo Coupons (`FOODIE100`, `KOVAI50`, `FREESHIP`) with instant 1-click apply
   - Today's Flash Deal live countdown timer

7. **Customer Reviews:**
   - Authentic Coimbatore customer testimonials with star ratings and neighborhood tags (RS Puram, Peelamedu, Gandhipuram, etc.)
   - "Write a Demo Review" interactive modal allowing users to post their own review dynamically

8. **Food Gallery:**
   - Interactive filter tabs (All, Burgers, Combos, Fusion, Dining Ambience)
   - Lightbox zoom modal with dish details and direct order link

9. **Online Ordering & Cart Drawer:**
   - Slide-over cart drawer with backdrop blur
   - Quantity adjustment, item deletion, item notes
   - Dynamic coupon discount calculator & 5% GST calculation
   - Free delivery auto-applied for orders above ₹399
   - Interactive Checkout Modal with customer name, 10-digit mobile number validation, Coimbatore locality dropdown, and address
   - Demo payment modes (UPI / GPay / PhonePe with simulated QR, Cash on Delivery, Card)
   - Clearly marked: *"DEMO CHECKOUT: For demonstration purposes only. No real payments collected."*
   - **Live Order Tracking Simulation:** Animated 4-step progress tracker (Order Received → Kitchen Cooking → Rider Out for Delivery → Delivered)

10. **Contact Us & Footer:**
    - Address: 142, Cross Cut Road, Near Gandhipuram Signal, Coimbatore, Tamil Nadu - 641012
    - Demo Phone: +91 98765 43210
    - Demo Email: hello@foodiehubcbe.in
    - Hours: Mon - Sun: 11:00 AM – 11:30 PM
    - Stylized interactive Coimbatore map card
    - Contact form with client-side validation
    - Newsletter signup form
    - Social media links and internship credits

---

## 🚀 How to Run Locally

### 1. Start Development Server
```bash
npm run dev
```
The server will start at: **`http://localhost:5173/`**

### 2. Build for Production
```bash
npm run build
```
Creates an optimized production bundle inside `dist/`.

### 3. Preview Production Build
```bash
npm run preview
```

---

## 🌐 How to Publish Online (Free Hosting)

- **Vercel / Netlify:**
  1. Push code to GitHub.
  2. Import repository on [Vercel](https://vercel.com) or [Netlify](https://netlify.com).
  3. Build Command: `npm run build`
  4. Output Directory: `dist`
- **GitHub Pages:**
  Deploy the contents of `dist/` directly or use the `gh-pages` npm package.
