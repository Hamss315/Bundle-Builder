import "./QuantityStepper.css";

function QuantityStepper({
  quantity,
  onIncrease,
  onDecrease,
}) {
  return (
    <div className="quantity-stepper">
      <button
        type="button"
        className="stepper-btn minus-btn"
        onClick={onDecrease}
        disabled={quantity <= 0}
        aria-label="Decrease quantity"
      >
        −
      </button>

      <span className="quantity-value">{quantity}</span>

      <button
        type="button"
        className="stepper-btn plus-btn"
        onClick={onIncrease}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}

export default QuantityStepper;