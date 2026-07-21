import QuantityStepper from "./QuantityStepper";
import { useState } from "react";
import "./ProductCard.css";

function ProductCard({ product, selectedItems, onIncrease, onDecrease, getItemKey }) {
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants && product.variants.length > 0 ? product.variants[0] : null
  );

  const itemKey = getItemKey(product.id, selectedVariant?.id);
  const quantity = selectedItems[itemKey] || 0;

  const totalProductQuantity =
    product.variants && product.variants.length > 0
      ? product.variants.reduce(
          (sum, variant) => sum + (selectedItems[getItemKey(product.id, variant.id)] || 0),
          0
        )
      : selectedItems[getItemKey(product.id)] || 0;

  const isSelected = totalProductQuantity > 0;

  return (
    <div className={`product-card ${isSelected ? "is-selected" : ""}`}>
      {product.discountBadge && (
        <span className="discount-badge">{product.discountBadge}</span>
      )}

      <div className="product-card-top">
        <div className="product-image-container">
          <img
            src={selectedVariant?.image || product.image}
            alt={product.title}
            className="product-image"
          />
        </div>

        <div className="product-info-column">
          <div className="product-header-row">
            <h3 className="product-title">{product.title}</h3>
          </div>

          {product.description && (
            <p className="product-description">{product.description}</p>
          )}

          {product.learnMore && (
            <a
              href={product.learnMore}
              target="_blank"
              rel="noopener noreferrer"
              className="learn-more-link"
            >
              Learn More
            </a>
          )}

          {product.variants && product.variants.length > 0 && (
            <div className="variant-options">
              {product.variants.map((variant) => (
                <button
                  key={variant.id}
                  type="button"
                  className={`variant-pill ${
                    selectedVariant?.id === variant.id ? "active" : ""
                  }`}
                  onClick={() => setSelectedVariant(variant)}
                >
                  <span className={`variant-swatch swatch-${variant.name.toLowerCase()}`} />
                  {variant.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="product-card-bottom">
        <QuantityStepper
          quantity={quantity}
          onIncrease={() => onIncrease(product.id, selectedVariant?.id)}
          onDecrease={() => onDecrease(product.id, selectedVariant?.id)}
        />

        <div className="price-group">
          {product.comparePrice != null && product.comparePrice > 0 && (
            <span className="compare-price">
              ${product.comparePrice.toFixed(2)}
            </span>
          )}
          <span className="current-price">${product.price.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;