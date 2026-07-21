import QuantityStepper from "../ProductCard/QuantityStepper";
import "./ReviewItem.css";

function ReviewItem({
  product,
  variant,
  quantity,
  onIncrease,
  onDecrease,
}) {
  const isFree = product.price === 0;
  const isPlan = product.category === "plans";
  const linePrice = isFree
    ? "FREE"
    : isPlan
    ? `$${(product.price * quantity).toFixed(2)}/mo`
    : `$${(product.price * quantity).toFixed(2)}`;

  const compareLinePrice =
    product.comparePrice != null && product.comparePrice > 0
      ? isPlan
        ? `$${(product.comparePrice * quantity).toFixed(2)}/mo`
        : `$${(product.comparePrice * quantity).toFixed(2)}`
      : null;

  const displayName = variant ? `${product.title} - ${variant.name}` : product.title;

  return (
    <div className="review-item">
      <div className="review-item-left">
        <img
          src={variant?.image || product.image}
          alt={displayName}
          className="review-item-img"
        />
        <h4 className="review-item-title">{displayName}</h4>
      </div>

      <div className="review-item-center">
        <QuantityStepper
          quantity={quantity}
          onIncrease={() => onIncrease(product.id, variant?.id)}
          onDecrease={() => onDecrease(product.id, variant?.id)}
        />
      </div>

      <div className="review-item-right">
        {compareLinePrice && (
          <span className="review-item-compare">{compareLinePrice}</span>
        )}
        <span className={`review-item-price ${isFree ? "is-free" : ""}`}>
          {linePrice}
        </span>
      </div>
    </div>
  );
}

export default ReviewItem;