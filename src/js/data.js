// Foodie Hub - Coimbatore fast-food restaurant mock data

export const RESTAURANT_INFO = {
  name: "Foodie Hub",
  tagline: "Fresh Food, Great Taste!",
  city: "Coimbatore",
  state: "Tamil Nadu",
  address: "142, Cross Cut Road, Near Gandhipuram Signal, Coimbatore, Tamil Nadu - 641012",
  phone: "+91 98765 43210",
  email: "hello@foodiehubcbe.in",
  whatsapp: "+919876543210",
  openingHours: "Mon - Sun: 11:00 AM – 11:30 PM",
  deliveryTime: "25 - 35 mins",
  minOrder: 150,
  freeDeliveryThreshold: 399,
  deliveryFee: 40,
  taxRate: 0.05 // 5% GST
};

export const COIMBATORE_LOCALITIES = [
  "Gandhipuram",
  "RS Puram",
  "Peelamedu",
  "Saibaba Colony",
  "Saravanampatti",
  "Singanallur",
  "Ramanathapuram",
  "Race Course",
  "Town Hall",
  "Kovaipudur",
  "Vadavalli",
  "Kuniyamuthur",
  "Thudiyalur",
  "Ganapathy",
  "Kalapatti"
];

export const CATEGORIES = [
  { id: "all", name: "All Items", icon: "🍽️" },
  { id: "burgers", name: "Burgers", icon: "🍔" },
  { id: "pizza", name: "Pizza", icon: "🍕" },
  { id: "sandwiches", name: "Sandwiches", icon: "🥪" },
  { id: "fries-sides", name: "Fries & Sides", icon: "🍟" },
  { id: "south-indian", name: "South Indian Snacks", icon: "🍛" },
  { id: "beverages", name: "Beverages", icon: "🥤" }
];

export const MENU_ITEMS = [
  // BURGERS
  {
    id: "b1",
    name: "Kovai Crispy Chicken Burger",
    category: "burgers",
    price: 199,
    rating: 4.9,
    reviewsCount: 320,
    isVeg: false,
    spiceLevel: "Spicy",
    isBestseller: true,
    image: "/images/hero-burger.jpg",
    description: "Double crispy fried chicken fillet, melted cheddar cheese, Kovai spicy mayo slaw, pickled onions in a toasted brioche bun.",
    calories: "580 kcal",
    prepTime: "12 mins"
  },
  {
    id: "b2",
    name: "Maharaja Paneer Royale Burger",
    category: "burgers",
    price: 179,
    rating: 4.8,
    reviewsCount: 245,
    isVeg: true,
    spiceLevel: "Medium",
    isBestseller: true,
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=700&q=80",
    description: "Crispy herb-crusted paneer patty, tandoori relish, fresh lettuce, tomato slice, and rich cream cheese spread.",
    calories: "510 kcal",
    prepTime: "10 mins"
  },
  {
    id: "b3",
    name: "Smoky BBQ Bacon & Cheese Burger",
    category: "burgers",
    price: 249,
    rating: 4.7,
    reviewsCount: 180,
    isVeg: false,
    spiceLevel: "Medium",
    isBestseller: false,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=80",
    description: "Char-grilled patty with smoked barbecue glaze, caramelized onions, crispy chicken bacon rashers, and double Monterey Jack cheese.",
    calories: "640 kcal",
    prepTime: "15 mins"
  },
  {
    id: "b4",
    name: "Classic Cheesy Aloo Crunch",
    category: "burgers",
    price: 119,
    rating: 4.6,
    reviewsCount: 190,
    isVeg: true,
    spiceLevel: "Mild",
    isBestseller: false,
    image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=700&q=80",
    description: "Crispy seasoned potato and green pea patty topped with tangy mint-tamarind mayo, crunchy cucumbers, and cheddar melt.",
    calories: "420 kcal",
    prepTime: "8 mins"
  },

  // PIZZA
  {
    id: "p1",
    name: "Spicy Chicken Tikka Supreme Pizza",
    category: "pizza",
    price: 369,
    rating: 4.9,
    reviewsCount: 410,
    isVeg: false,
    spiceLevel: "Spicy",
    isBestseller: true,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=700&q=80",
    description: "Clay-oven marinated chicken tikka chunks, charred bell peppers, red onions, jalapeños, and 100% mozzarella on hand-tossed crust.",
    calories: "780 kcal",
    prepTime: "18 mins"
  },
  {
    id: "p2",
    name: "Kovai Peri-Peri Paneer Pizza",
    category: "pizza",
    price: 329,
    rating: 4.8,
    reviewsCount: 290,
    isVeg: true,
    spiceLevel: "Spicy",
    isBestseller: true,
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=700&q=80",
    description: "Spicy peri-peri seasoned malai paneer, sweet corn, roasted red paprika, fresh basil, and bubbling mozzarella cheese.",
    calories: "720 kcal",
    prepTime: "16 mins"
  },
  {
    id: "p3",
    name: "Farmhouse Garden Delight",
    category: "pizza",
    price: 299,
    rating: 4.7,
    reviewsCount: 220,
    isVeg: true,
    spiceLevel: "Mild",
    isBestseller: false,
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=700&q=80",
    description: "Loaded with fresh mushrooms, black olives, crisp bell peppers, sweet golden corn, and classic Italian tomato herb sauce.",
    calories: "680 kcal",
    prepTime: "15 mins"
  },
  {
    id: "p4",
    name: "Triple Cheese Margherita",
    category: "pizza",
    price: 259,
    rating: 4.8,
    reviewsCount: 310,
    isVeg: true,
    spiceLevel: "Mild",
    isBestseller: false,
    image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=700&q=80",
    description: "Classic Italian San Marzano marinara topped with shredded mozzarella, cheddar shreds, parmesan dust, and fresh basil leaves.",
    calories: "650 kcal",
    prepTime: "14 mins"
  },

  // SANDWICHES
  {
    id: "s1",
    name: "Bombay Club Grilled Sandwich",
    category: "sandwiches",
    price: 149,
    rating: 4.8,
    reviewsCount: 195,
    isVeg: true,
    spiceLevel: "Medium",
    isBestseller: true,
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=700&q=80",
    description: "Triple-layer toasted bread loaded with spiced potato masala, crunchy beets, cucumber, tomatoes, cheese, and spicy mint chutney.",
    calories: "440 kcal",
    prepTime: "10 mins"
  },
  {
    id: "s2",
    name: "Peri-Peri Chicken Melt Panini",
    category: "sandwiches",
    price: 189,
    rating: 4.9,
    reviewsCount: 260,
    isVeg: false,
    spiceLevel: "Spicy",
    isBestseller: true,
    image: "https://images.unsplash.com/photo-1553909489-cd47e0907980?auto=format&fit=crop&w=700&q=80",
    description: "Juicy shredded peri-peri chicken breast, sauteed bell peppers, chipotle drizzle, and melting mozzarella in grill-marked panini.",
    calories: "530 kcal",
    prepTime: "12 mins"
  },
  {
    id: "s3",
    name: "Tandoori Paneer Tikka Sub",
    category: "sandwiches",
    price: 169,
    rating: 4.7,
    reviewsCount: 165,
    isVeg: true,
    spiceLevel: "Medium",
    isBestseller: false,
    image: "https://images.unsplash.com/photo-1619860860774-1e2e17343432?auto=format&fit=crop&w=700&q=80",
    description: "Char-roasted paneer cubes infused with tandoori spices, fresh mint-mayo dressing, capsicum, and melted cheddar on multigrain sub.",
    calories: "490 kcal",
    prepTime: "11 mins"
  },

  // FRENCH FRIES & SIDES
  {
    id: "f1",
    name: "Loaded Cheesy Mexican Fries",
    category: "fries-sides",
    price: 169,
    rating: 4.9,
    reviewsCount: 380,
    isVeg: true,
    spiceLevel: "Medium",
    isBestseller: true,
    image: "https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=700&q=80",
    description: "Golden crispy skin-on fries drowned in warm cheese sauce, salsa criolla, chopped jalapeños, spring onion, and sour cream.",
    calories: "510 kcal",
    prepTime: "8 mins"
  },
  {
    id: "f2",
    name: "Peri-Peri Seasoned Fries",
    category: "fries-sides",
    price: 119,
    rating: 4.8,
    reviewsCount: 420,
    isVeg: true,
    spiceLevel: "Spicy",
    isBestseller: true,
    image: "https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=700&q=80",
    description: "Crispy crinkle-cut fries tossed with signature African bird's eye chili powder and aromatic garlic herb salt.",
    calories: "380 kcal",
    prepTime: "7 mins"
  },
  {
    id: "f3",
    name: "Golden Fried Chicken Wings (6 Pcs)",
    category: "fries-sides",
    price: 219,
    rating: 4.8,
    reviewsCount: 290,
    isVeg: false,
    spiceLevel: "Spicy",
    isBestseller: false,
    image: "https://images.unsplash.com/photo-1639024471283-03518883512d?auto=format&fit=crop&w=700&q=80",
    description: "Crispy batter-dipped chicken wings tossed in fiery sweet chili hot sauce and toasted sesame seeds.",
    calories: "620 kcal",
    prepTime: "14 mins"
  },

  // SOUTH INDIAN SNACKS (FUSION)
  {
    id: "si1",
    name: "Kovai Fusion Snack Platter",
    category: "south-indian",
    price: 249,
    rating: 5.0,
    reviewsCount: 340,
    isVeg: true,
    spiceLevel: "Medium",
    isBestseller: true,
    image: "/images/south-indian-fusion.jpg",
    description: "Crispy Paneer 65 bites tossed with fragrant curry leaves and slit green chilies, served with mini Kari Dosa sliders and 3 chutneys.",
    calories: "520 kcal",
    prepTime: "12 mins"
  },
  {
    id: "si2",
    name: "Crispy Paneer 65 Bites",
    category: "south-indian",
    price: 189,
    rating: 4.8,
    reviewsCount: 210,
    isVeg: true,
    spiceLevel: "Spicy",
    isBestseller: false,
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=700&q=80",
    description: "Fresh cottage cheese cubes spiced with Coimbatore special masala, crisp fried with crunchy curry leaves and garlic slivers.",
    calories: "450 kcal",
    prepTime: "10 mins"
  },
  {
    id: "si3",
    name: "Chettinad Spiced Chicken Pops",
    category: "south-indian",
    price: 219,
    rating: 4.9,
    reviewsCount: 310,
    isVeg: false,
    spiceLevel: "Spicy",
    isBestseller: true,
    image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=700&q=80",
    description: "Bite-sized chicken pops marinated in stone-ground Chettinad black pepper & fennel spices, fried to crunch perfection.",
    calories: "490 kcal",
    prepTime: "11 mins"
  },
  {
    id: "si4",
    name: "Crispy Masala Vada Sliders",
    category: "south-indian",
    price: 139,
    rating: 4.6,
    reviewsCount: 140,
    isVeg: true,
    spiceLevel: "Medium",
    isBestseller: false,
    image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=700&q=80",
    description: "Traditional crunchy chana dal masala vada served inside warm buttered mini buns with spiced peanut podi and coconut chutney.",
    calories: "390 kcal",
    prepTime: "9 mins"
  },

  // BEVERAGES
  {
    id: "bv1",
    name: "Madras Filter Coffee Frappe",
    category: "beverages",
    price: 139,
    rating: 4.9,
    reviewsCount: 280,
    isVeg: true,
    spiceLevel: "None",
    isBestseller: true,
    image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=700&q=80",
    description: "Authentic strong Kumbakonam degree decoction blended with creamy milk, vanilla bean gelato, and whipped topping.",
    calories: "280 kcal",
    prepTime: "5 mins"
  },
  {
    id: "bv2",
    name: "Nutella Hazelnut Freakshake",
    category: "beverages",
    price: 179,
    rating: 4.9,
    reviewsCount: 350,
    isVeg: true,
    spiceLevel: "None",
    isBestseller: true,
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=700&q=80",
    description: "Rich Italian hazelnut Nutella shake topped with chocolate drizzle, brownie crumble, choco chips, and wafer stick.",
    calories: "460 kcal",
    prepTime: "6 mins"
  },
  {
    id: "bv3",
    name: "Alphonso Mango Thick Shake",
    category: "beverages",
    price: 159,
    rating: 4.8,
    reviewsCount: 220,
    isVeg: true,
    spiceLevel: "None",
    isBestseller: false,
    image: "https://images.unsplash.com/photo-1553787499-6f9133860278?auto=format&fit=crop&w=700&q=80",
    description: "Real Alphonso mango pulp blended with rich condensed dairy, topped with pistachio flakes and dried cranberries.",
    calories: "340 kcal",
    prepTime: "5 mins"
  },
  {
    id: "bv4",
    name: "Blue Ocean Mint Sparkler",
    category: "beverages",
    price: 119,
    rating: 4.7,
    reviewsCount: 190,
    isVeg: true,
    spiceLevel: "None",
    isBestseller: false,
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=700&q=80",
    description: "Refreshing fizzy mocktail with curaçao citrus notes, crushed mint leaves, fresh lime juice, and sparkling soda.",
    calories: "140 kcal",
    prepTime: "4 mins"
  }
];

export const SPECIAL_OFFERS = [
  {
    id: "combo-1",
    title: "Kovai Crunch Box",
    subtitle: "The Ultimate Solo Fast Food Feast",
    badge: "SAVE 25%",
    originalPrice: 399,
    offerPrice: 299,
    image: "/images/hero-burger.jpg",
    items: [
      "1x Kovai Crispy Chicken Burger (or Paneer)",
      "1x Peri-Peri Seasoned Fries",
      "1x Madras Filter Coffee Frappe / Soft Drink",
      "1x Signature Garlic Dip"
    ],
    highlight: "Most Ordered Lunch Combo"
  },
  {
    id: "combo-2",
    title: "Weekend Grand Feast Combo",
    subtitle: "Designed for Family & Friends (Serves 3-4)",
    badge: "SAVE 35%",
    originalPrice: 1150,
    offerPrice: 749,
    image: "/images/special-combo.jpg",
    items: [
      "1x Spicy Chicken Tikka / Peri-Peri Pizza (Medium)",
      "1x Double Cheese Burger",
      "1x Loaded Cheesy Mexican Fries",
      "2x Shakes / Sparkler Mocktails"
    ],
    highlight: "Chef's Weekend Special"
  },
  {
    id: "combo-3",
    title: "Kovai Fusion Snack Trio",
    subtitle: "Authentic Spice Meets Western Crunch",
    badge: "HOT DEAL",
    originalPrice: 349,
    offerPrice: 249,
    image: "/images/south-indian-fusion.jpg",
    items: [
      "1x Kovai Fusion Snack Platter",
      "1x Bombay Club Grilled Sandwich",
      "1x Blue Ocean Mint Sparkler"
    ],
    highlight: "Best Evening Tea-Time Combo"
  }
];

export const COUPONS = [
  {
    code: "FOODIE100",
    discount: 100,
    minOrder: 499,
    type: "flat",
    description: "Flat ₹100 OFF on orders above ₹499"
  },
  {
    code: "KOVAI50",
    discount: 50,
    minOrder: 299,
    type: "flat",
    description: "Flat ₹50 OFF on orders above ₹299"
  },
  {
    code: "FREESHIP",
    discount: 40,
    minOrder: 250,
    type: "shipping",
    description: "Free Delivery across Coimbatore on ₹250+"
  }
];

export const REVIEWS = [
  {
    id: "rev-1",
    name: "Karthik Subramanian",
    location: "Peelamedu, Coimbatore",
    rating: 5,
    date: "2 days ago",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
    text: "The Kovai Crispy Chicken Burger is easily the best burger in Coimbatore! The chicken was super juicy with that distinct South Indian pepper punch. Delivered hot to Peelamedu in just 26 minutes.",
    tag: "Verified Order"
  },
  {
    id: "rev-2",
    name: "Priya Ramakrishnan",
    location: "RS Puram, Coimbatore",
    rating: 5,
    date: "4 days ago",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    text: "Loved the fusion snack platter! Combining Paneer 65 with mini sliders was genius. Their Cross Cut Road branch ambiance is cozy, clean and buzzing with great music.",
    tag: "Verified Dine-in"
  },
  {
    id: "rev-3",
    name: "Arun Praveen",
    location: "Gandhipuram, Coimbatore",
    rating: 5,
    date: "1 week ago",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80",
    text: "Ordered the Weekend Grand Feast for our PSG Tech project group. The pizza cheese pull was incredible, fries remained crispy, and the Nutella shake was heavenly. 10/10 recommendation!",
    tag: "Verified Order"
  },
  {
    id: "rev-4",
    name: "Sneha Soundararajan",
    location: "Saibaba Colony, Coimbatore",
    rating: 5,
    date: "1 week ago",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80",
    text: "Being a vegetarian, finding great burgers in Kovai used to be tough until Foodie Hub. The Maharaja Paneer Royale is rich, fresh, and not greasy at all. Packaging is completely eco-friendly too.",
    tag: "Verified Order"
  },
  {
    id: "rev-5",
    name: "Dinesh Kumar",
    location: "Saravanampatti, Coimbatore",
    rating: 4,
    date: "2 weeks ago",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    text: "Fast delivery to IT corridor in Saravanampatti. Mexican loaded fries are generous in portion. The Madras Filter Coffee Frappe is an absolute must-try refresher.",
    tag: "Verified Order"
  }
];

export const GALLERY_ITEMS = [
  {
    id: "g1",
    title: "Signature Kovai Burger",
    category: "burgers",
    image: "/images/hero-burger.jpg",
    description: "Crafted with house-spiced marinade, fresh veggies & dripping melted cheddar."
  },
  {
    id: "g2",
    title: "Weekend Grand Combo Platter",
    category: "combos",
    image: "/images/special-combo.jpg",
    description: "Stone-baked pizza, glazed hot wings, curly fries & artisan mocktails."
  },
  {
    id: "g3",
    title: "South Indian Fusion Platter",
    category: "fusion",
    image: "/images/south-indian-fusion.jpg",
    description: "Crispy Paneer 65 bites with Kari Dosa sliders & trio of chutneys."
  },
  {
    id: "g4",
    title: "Coimbatore Restaurant Dining Hall",
    category: "interior",
    image: "/images/restaurant-interior.jpg",
    description: "Warm brick aesthetics, neon lighting, and cozy family booth seating."
  },
  {
    id: "g5",
    title: "Artisan Woodfired Pizza",
    category: "pizza",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
    description: "Fresh dough made daily, slow-simmered tomato sauce & stringy mozzarella."
  },
  {
    id: "g6",
    title: "Chipotle & Peri-Peri Loaded Fries",
    category: "fries",
    image: "https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=800&q=80",
    description: "Crisp golden fries drenched in hot cheese sauce, jalapeños and herbs."
  },
  {
    id: "g7",
    title: "Nutella & Thick Shake Bar",
    category: "beverages",
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80",
    description: "Handcrafted milkshakes with authentic confectionery drizzles & waffle cones."
  },
  {
    id: "g8",
    title: "Chef Prepping in Kitchen",
    category: "interior",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
    description: "Hygiene first: 100% sanitized open kitchen and transparent preparation."
  }
];

export const SERVICES = [
  {
    id: "dine-in",
    title: "Dine-In Experience",
    icon: "🍽️",
    badge: "Cozy & Air Conditioned",
    description: "Relax in our modern, warmly lit restaurant on Cross Cut Road. Enjoy friendly table service, relaxing music, and fresh food served sizzling hot straight from the kitchen.",
    features: ["Air conditioned comfort", "High-speed free Wi-Fi", "Dedicated family booths", "Clean sanitized washrooms"]
  },
  {
    id: "takeaway",
    title: "Express Takeaway",
    icon: "🛍️",
    badge: "Ready in 10-15 Mins",
    description: "In a hurry? Order ahead on our website, skip the queue at Gandhipuram, and pick up your hot packed food in eco-friendly spill-proof packaging.",
    features: ["Express pickup counter", "Insulated steam-release packaging", "Zero waiting line", "Pre-order scheduling"]
  },
  {
    id: "delivery",
    title: "30-Min Home Delivery",
    icon: "🛵",
    badge: "Hot & Contactless",
    description: "Our dedicated Coimbatore rider fleet delivers your orders fresh and piping hot across RS Puram, Gandhipuram, Peelamedu, Saibaba Colony & beyond.",
    features: ["Average 28 mins delivery", "Live rider simulation", "Free delivery above ₹399", "Tamper-proof sealed bags"]
  },
  {
    id: "catering",
    title: "Party & Bulk Catering",
    icon: "🎉",
    badge: "Custom Boxes",
    description: "Hosting a college party, tech park meetup, or birthday bash in Coimbatore? We curate custom mini-burger boxes, snack platters and drink dispensaries.",
    features: ["Special bulk discounts", "Custom branded packaging", "Vegetarian & non-veg separation", "Scheduled on-dot delivery"]
  }
];
