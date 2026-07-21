# Wyze Security System Bundle Builder

A responsive, interactive e-commerce bundle builder built with **React** and **Vite**, designed to match the Wyze security system Figma prototype specifications.

![Wyze Bundle Builder](public/assets/hero.png)

## 🚀 Features

- **Pixel-Perfect Figma Design**: Matching layout, color tokens (`#4E2FD2`, `#EDF4FF`), typography (`Gilroy-Medium` / `Inter`), spacing, and custom assets.
- **Accordion Step Navigation**:
  - Step indicators (`STEP X OF 4`), category step logos (`livestream.png`, `step2Logo.png`, `step3Logo.png`, `step4Logo.png`), and triangle chevrons (`▲` / `▼`).
  - Active step highlight with background color `#EDF4FF`.
  - "Next: [Step Title]" button for step progression.
  - Category item selection counter (`N selected` at 14px/16px `Gilroy-Medium`).
- **Interactive Product Cards**:
  - 2-column grid layout for cards within steps.
  - Discount pills (`Save 22%`, `Save 12%` in `#4E2FD2`).
  - Color variant selectors (`White`, `Grey`, `Black`) with image swapping upon variant toggle.
  - Independent quantity steppers per variant (minus button disabled when `quantity === 0`).
  - Compare-at prices (`<s>$35.98</s>` strikethrough in red) next to current prices.
  - Active card border highlight (`2px solid #4E2FD2`).
- **Real-Time Review Panel**:
  - Grouped categories: `CAMERAS`, `SENSORS`, `ACCESSORIES`, and `PLAN`.
  - Live synchronized quantities and line item totals.
  - Fast Shipping row with delivery truck icon, compare price (`$5.99`), and `FREE` callout.
  - 100% Wyze Satisfaction Guarantee seal integration.
  - Affirm financing breakdown (`as low as $X/mo`).
  - Dynamic total calculation: Subtotal, original total, and savings callout (`Congrats! You're saving $X.XX on your security bundle!`).
  - Full-width `#4E2FD2` Checkout button.
- **Persistence (`localStorage`)**:
  - Seeded initial state matching baseline default configuration.
  - "Save my system for later" persists state to `localStorage` and restores quantities/variants upon reload.
- **Fully Responsive**: Side-by-side desktop layout and responsive single-column layout on tablet and mobile viewports.

---

## 🛠️ Technology Stack

- **Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Vanilla CSS (CSS Variables, Flexbox, CSS Grid)
- **State Management**: React `useState` (Pure React Hooks, zero third-party state libraries)

---

## 📁 Project Structure

```
reactBundle/
├── public/
│   └── assets/                  # Product images, badges, and step logos
├── src/
│   ├── components/
│   │   ├── Accordion/
│   │   │   ├── AccordionStep.jsx
│   │   │   └── AccordionStep.css
│   │   ├── ProductCard/
│   │   │   ├── ProductCard.jsx
│   │   │   ├── ProductCard.css
│   │   │   ├── QuantityStepper.jsx
│   │   │   ├── QuantityStepper.css
│   │   │   ├── VariantSelector.jsx
│   │   │   └── VariantSelector.css
│   │   ├── ReviewPanel/
│   │   │   ├── ReviewItem.jsx
│   │   │   ├── ReviewItem.css
│   │   │   ├── ReviewPanel.jsx
│   │   │   └── ReviewPanel.css
│   │   └── Layout/
│   │       └── Header.jsx
│   ├── data/
│   │   └── products.json         # Seeded product JSON data
│   ├── pages/
│   │   ├── BundleBuilder.jsx     # Main Bundle Builder page component
│   │   └── BundleBuilder.css
│   ├── App.jsx
│   ├── index.css                 # Global CSS tokens and base styles
│   └── main.jsx
├── package.json
└── README.md
```

---

## 🏃 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`.

---

## 📦 Production Build

To build the project for production:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

---

## 📝 License

This project is created for evaluation purposes as part of a Frontend Developer technical assignment.
