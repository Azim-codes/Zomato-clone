# Zomato Clone - Premium Food Delivery Web Application

A premium, interactive, and high-fidelity Zomato clone built from scratch using pure static web technologies: **HTML5**, **Vanilla CSS3**, and **Vanilla JavaScript (ES6)**. 

Designed specifically for direct, zero-build deployment on **GitHub Pages**, this clone provides a high-fidelity visual experience mimicking Zomato's web interface, along with a client-side mock backend simulating search queries, cart subtotals, custom user reviews, and active courier tracking.

---

## 🚀 Live Demo & Deployment Readiness

Because this project consists of standard static files (`index.html`, `style.css`, `app.js`), you can host it for free on **GitHub Pages** in under 2 minutes:
1. Create a new repository on GitHub.
2. Push these files directly to the `main` branch.
3. In your GitHub repository settings, go to **Pages** (under Code and Automation).
4. Set the **Source** to "Deploy from a branch" and select `main` (root folder).
5. Click Save. Your Zomato clone will be live at `https://<your-username>.github.io/<repo-name>/`!

---

## ✨ Features Implemented

### 1. Interactive Landing Page (Home View)
* **Location Switcher**: Pre-loaded mock databases for cities like **Bengaluru**, **Delhi NCR**, and **Mumbai**. Changing the city dynamically adjusts the restaurant listings.
* **Global Search Bar**: Real-time filtering matching restaurant names, cuisine tags, or individual dish names (e.g. searching "Biryani" or "Pizza" filters down listings instantly).
* **Service Tabs Toggle**: Supports toggling between **Delivery**, **Dining**, and **Nightlife & Clubs** with active indicators, showing unique restaurant selections for each.
* **Advanced Multi-Filters**: Filter restaurants by **Rating 4.0+**, **Pure Veg** (toggles only veg venues), **Fast Delivery** (venues with <= 25m delivery times), and sort by price (**Low to High** or **High to Low**).
* **Premium Hover Animations**: Fluid hover lifts, image scaling, and overlays on restaurant cards.

### 2. High-Fidelity Restaurant Profiles
* **Collage Image Gallery**: Replicates Zomato's classic grid layout with custom overlays and interior food photos.
* **Bookmark/Favorites System**: Bookmark a restaurant on its profile page. The navbar bookmarks badge keeps count, and you can open your saved restaurants anytime from a dedicated drawer (persisted in `localStorage`).
* **Categorized Menu & Cart Adders**: Categorized sidebar navigation with smooth scroll-to-view. Food items feature customized "ADD" control buttons that transform into plus/minus quantity spinners.
* **Review Feed & Add Review System**: Submit reviews with names, comments, and star rating sliders. Submitted reviews are prepended to the feed and persisted in `localStorage`.

### 3. Shopping Cart Drawer & Checkout
* **Floating Bottom Bar**: Visual trigger that slides up when items are in the cart, summarizing items count and subtotal.
* **Checkout drawer**: Breakdown of subtotal, 5% GST, packaging fees, and delivery partner fees (free delivery on orders above ₹300).
* **Promo Code Code**: Input the mock promo code `ZOMATO50` to receive a 50% discount up to ₹150 in real-time.
* **Smart Cart Restrictor**: If you add items from a different restaurant, it alerts the user and asks for permission to discard the existing cart first.

### 4. Interactive Order Dispatched Tracker
* Clicking **Place Order** clears your cart, closes the drawer, and pops open the live tracking interface.
* **Live Step-by-Step Status Updates**: Tracks order milestones from *Placed* ➔ *Cooking* ➔ *Out for Delivery* ➔ *Delivered*.
* **Path-Traversing Motorcycle courier**: The motorcycle delivery icon drives along a winding road, and the route progress line highlights in Zomato Red in real-time, utilizing CSS `offset-path`.
* **Simulated Speed Countdown**: An active countdown clock counts down from 30 seconds to simulate a delivery speed-run.

---

## 🛠️ Technology Stack

* **Structure**: HTML5 Semantic markup (`<nav>`, `<main>`, `<aside>`, `<footer>`, `<svg>`)
* **Styling**: Vanilla CSS3
  * Responsive layout via CSS Grid & Flexbox
  * Modern Google Fonts Integration (`Inter` & `Outfit`)
  * Smooth transition vectors & timing-functions
  * CSS `offset-path` and `@keyframes` for path-traversing motorcycle animations
* **Logic**: Vanilla Javascript (ES6+)
  * Local state management for cart, city toggles, filters, and modals
  * `localStorage` API for bookmarks, review submissions, and cart caching

---

## 💻 Running the Project Locally

No compiling or installing packages is necessary. You can run it locally in any of the following ways:

### Option A: Direct Launch
Simply double-click the `index.html` file in your directory to open it directly in your web browser.

### Option B: Local Server (Recommended for asset loading)
If you have Node.js installed, launch a fast local web server using `npx`:
```bash
npx serve
```
Open `http://localhost:3000` (or the port specified) in your browser.
