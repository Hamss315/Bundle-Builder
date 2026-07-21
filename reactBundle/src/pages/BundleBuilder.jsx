import products from "../data/products.json";
import { useState } from "react";
import ProductCard from "../components/ProductCard/ProductCard";
import ReviewPanel from "../components/ReviewPanel/ReviewPanel";
import AccordionStep from "../components/Accordion/AccordionStep";
import "./BundleBuilder.css";

const INITIAL_SEEDED_ITEMS = {
  "1-1": 1,
  "2-1": 2,
  "6": 2,
  "7": 1,
  "8": 2,
  "9": 1,
};

function BundleBuilder() {
  const [openStep, setOpenStep] = useState(1);
  const [selectedItems, setSelectedItems] = useState(() => {
    try {
      const saved = localStorage.getItem("wyze_bundle_system");
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Failed to load saved configuration", e);
    }
    return INITIAL_SEEDED_ITEMS;
  });

  const getItemKey = (productId, variantId = null) => {
    return variantId ? `${productId}-${variantId}` : productId;
  };

  const increaseQuantity = (productId, variantId = null) => {
    const key = getItemKey(productId, variantId);
    setSelectedItems((previous) => ({
      ...previous,
      [key]: (previous[key] || 0) + 1,
    }));
  };

  const decreaseQuantity = (productId, variantId = null) => {
    const key = getItemKey(productId, variantId);
    setSelectedItems((previous) => ({
      ...previous,
      [key]: Math.max((previous[key] || 0) - 1, 0),
    }));
  };

  const saveSystem = () => {
    localStorage.setItem("wyze_bundle_system", JSON.stringify(selectedItems));
  };

  const getCategoryCount = (category) => {
    return products
      .filter((p) => p.category === category)
      .reduce((sum, p) => {
        if (p.variants && p.variants.length > 0) {
          return (
            sum +
            p.variants.reduce((vSum, v) => {
              const key = getItemKey(p.id, v.id);
              return vSum + (selectedItems[key] || 0);
            }, 0)
          );
        }
        const key = getItemKey(p.id);
        return sum + (selectedItems[key] || 0);
      }, 0);
  };

  return (
    <div className="bundle-builder">
      {/* Left Column */}
      <div className="builder-column">
        <AccordionStep
          step={1}
          title="Choose your cameras"
          icon="/assets/livestream.png"
          selectedCount={getCategoryCount("cameras")}
          isOpen={openStep === 1}
          onToggle={() => setOpenStep(openStep === 1 ? 0 : 1)}
          onNext={() => setOpenStep(2)}
          nextStepTitle="Choose your plan"
        >
          {products
            .filter((product) => product.category === "cameras")
            .map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                selectedItems={selectedItems}
                onIncrease={increaseQuantity}
                onDecrease={decreaseQuantity}
                getItemKey={getItemKey}
              />
            ))}
        </AccordionStep>

        <AccordionStep
          step={2}
          title="Choose your plan"
          icon="/assets/step2Logo.png"
          selectedCount={getCategoryCount("plans")}
          isOpen={openStep === 2}
          onToggle={() => setOpenStep(openStep === 2 ? 0 : 2)}
          onNext={() => setOpenStep(3)}
          nextStepTitle="Choose your sensors"
        >
          {products
            .filter((product) => product.category === "plans")
            .map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                selectedItems={selectedItems}
                onIncrease={increaseQuantity}
                onDecrease={decreaseQuantity}
                getItemKey={getItemKey}
              />
            ))}
        </AccordionStep>

        <AccordionStep
          step={3}
          title="Choose your sensors"
          icon="/assets/step3Logo.png"
          selectedCount={getCategoryCount("sensors")}
          isOpen={openStep === 3}
          onToggle={() => setOpenStep(openStep === 3 ? 0 : 3)}
          onNext={() => setOpenStep(4)}
          nextStepTitle="Add extra protection"
        >
          {products
            .filter((product) => product.category === "sensors")
            .map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                selectedItems={selectedItems}
                onIncrease={increaseQuantity}
                onDecrease={decreaseQuantity}
                getItemKey={getItemKey}
              />
            ))}
        </AccordionStep>

        <AccordionStep
          step={4}
          title="Add extra protection"
          icon="/assets/step4Logo.png"
          selectedCount={getCategoryCount("accessories")}
          isOpen={openStep === 4}
          onToggle={() => setOpenStep(openStep === 4 ? 0 : 4)}
        >
          {products
            .filter((product) => product.category === "accessories")
            .map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                selectedItems={selectedItems}
                onIncrease={increaseQuantity}
                onDecrease={decreaseQuantity}
                getItemKey={getItemKey}
              />
            ))}
        </AccordionStep>
      </div>

      {/* Right Column */}
      <div className="review-column">
        <ReviewPanel
          products={products}
          selectedItems={selectedItems}
          onIncrease={increaseQuantity}
          onDecrease={decreaseQuantity}
          getItemKey={getItemKey}
          onSaveSystem={saveSystem}
        />
      </div>
    </div>
  );
}

export default BundleBuilder;