import { useState } from "react";
import ReviewItem from "./ReviewItem";
import "./ReviewPanel.css";

function ReviewPanel({
  products,
  selectedItems,
  onIncrease,
  onDecrease,
  getItemKey,
  onSaveSystem,
}) {
  const [saveNotification, setSaveNotification] = useState(false);

  const groupedItems = {
    cameras: [],
    sensors: [],
    accessories: [],
    plans: [],
  };

  let subtotal = 0;
  let originalSubtotal = 0;

  Object.entries(selectedItems).forEach(([key, quantity]) => {
    if (quantity <= 0) return;

    const [productId, variantId] = key.split("-");
    const product = products.find((p) => p.id === Number(productId));

    if (!product) return;

    subtotal += product.price * quantity;
    originalSubtotal += (product.comparePrice ?? product.price) * quantity;

    const variant = variantId
      ? product.variants.find((v) => v.id === Number(variantId))
      : null;

    if (groupedItems[product.category]) {
      groupedItems[product.category].push({
        product,
        variant,
        quantity,
      });
    }
  });

  const savings = Math.max(0, originalSubtotal - subtotal);

  const categoryTitles = {
    cameras: "CAMERAS",
    sensors: "SENSORS",
    accessories: "ACCESSORIES",
    plans: "PLAN",
  };

  const handleSaveLater = (e) => {
    e.preventDefault();
    if (onSaveSystem) {
      onSaveSystem();
    } else {
      localStorage.setItem("wyze_bundle_system", JSON.stringify(selectedItems));
    }
    setSaveNotification(true);
    setTimeout(() => setSaveNotification(false), 3000);
  };

  const hasItems = Object.values(groupedItems).some((arr) => arr.length > 0);
  const monthlyAffirm = (subtotal / 10).toFixed(2); // approximate monthly affirm calculation for display

  return (
    <div className="review-panel">
      <div className="review-panel-header">
        <span className="review-tag">REVIEW</span>
        <h2 className="review-panel-title">Your security system</h2>
        <p className="review-subtitle">
          Review your personalized protection system designed to keep what matters most safe.
        </p>
      </div>

      {!hasItems ? (
        <div className="empty-system">
          <p>Your system is currently empty. Select items to add them to your bundle.</p>
        </div>
      ) : (
        <div className="review-groups">
          {Object.entries(groupedItems).map(([category, items]) =>
            items.length > 0 ? (
              <div key={category} className="review-group">
                <h3 className="review-group-title">
                  {categoryTitles[category] || category}
                </h3>
                <div className="review-group-items">
                  {items.map((item) => (
                    <ReviewItem
                      key={getItemKey(item.product.id, item.variant?.id)}
                      product={item.product}
                      variant={item.variant}
                      quantity={item.quantity}
                      onIncrease={onIncrease}
                      onDecrease={onDecrease}
                    />
                  ))}
                </div>
              </div>
            ) : null
          )}
        </div>
      )}

      <div className="review-divider" />

      {/* Fast Shipping Row */}
      <div className="review-row-shipping">
        <div className="shipping-left">
          <svg className="shipping-truck-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00A389" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="1" y="3" width="15" height="13"></rect>
            <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
            <circle cx="5.5" cy="18.5" r="2.5"></circle>
            <circle cx="18.5" cy="18.5" r="2.5"></circle>
          </svg>
          <span className="shipping-text">Fast Shipping</span>
        </div>
        <div className="shipping-right">
          <span className="shipping-compare">$5.99</span>
          <span className="free-shipping-tag">FREE</span>
        </div>
      </div>

      <div className="review-divider" />

      {/* Guarantee Badge & Pricing Totals */}
      <div className="totals-container">
        <div className="totals-top-row">
          <div className="guarantee-seal-left">
            <img
              src="/assets/Satisfaction_Badge.png"
              alt="100% Wyze Satisfaction Guarantee"
              className="satisfaction-seal-img"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>

          <div className="totals-pricing-right">
            <span className="affirm-pill">as low as ${monthlyAffirm}/mo</span>
            <div className="final-totals-row">
              {savings > 0 && (
                <span className="original-total">${originalSubtotal.toFixed(2)}</span>
              )}
              <span className="final-total">${subtotal.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {savings > 0 && (
          <div className="savings-congrats-text">
            Congrats! You're saving ${savings.toFixed(2)} on your security bundle!
          </div>
        )}
      </div>

      <button
        type="button"
        className="checkout-btn"
        onClick={() => alert(`Proceeding to checkout! Total: $${subtotal.toFixed(2)}`)}
      >
        Checkout
      </button>

      <div className="save-later-container">
        <a href="#save" className="save-later-link" onClick={handleSaveLater}>
          Save my system for later
        </a>
        {saveNotification && (
          <span className="save-toast">✓ System configuration saved!</span>
        )}
      </div>
    </div>
  );
}

export default ReviewPanel;