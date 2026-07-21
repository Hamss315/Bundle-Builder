function VariantSelector({ variants, selectedVariant, onSelectVariant }) {
  if (!variants || variants.length === 0) return null;

  return (
    <div className="variant-options">
      {variants.map((variant) => (
        <button
          key={variant.id}
          type="button"
          className={`variant-pill ${
            selectedVariant?.id === variant.id ? "active" : ""
          }`}
          onClick={() => onSelectVariant(variant)}
        >
          {variant.name}
        </button>
      ))}
    </div>
  );
}

export default VariantSelector;
