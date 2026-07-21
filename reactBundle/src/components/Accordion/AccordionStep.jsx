import "./AccordionStep.css";

function AccordionStep({
  step,
  title,
  isOpen,
  onToggle,
  icon,
  selectedCount = 0,
  onNext,
  nextStepTitle,
  children,
}) {
  return (
    <div className={`accordion ${isOpen ? "is-open" : "is-collapsed"}`}>
      <div className="accordion-header" onClick={onToggle}>
        <div className="accordion-header-left">
          <span className="step-tag">STEP {step} OF 4</span>
          <div className="accordion-title-group">
            {icon && (
              <span className="step-icon">
                {typeof icon === "string" ? (
                  <img src={icon} alt={`Step ${step} logo`} className="step-logo-img" />
                ) : (
                  icon
                )}
              </span>
            )}
            <h2 className="accordion-title">{title}</h2>
          </div>
        </div>

        <div className="accordion-header-right">
          {selectedCount > 0 && (
            <span className="selected-badge">
              {selectedCount} selected
            </span>
          )}
          <span className={`chevron ${isOpen ? "open" : ""}`}>
            {isOpen ? "▲" : "▼"}
          </span>
        </div>
      </div>

      {isOpen && (
        <div className="accordion-content">
          <div className="accordion-body">{children}</div>
          {onNext && nextStepTitle && (
            <div className="accordion-next-container">
              <button
                type="button"
                className="accordion-next-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  onNext();
                }}
              >
                Next: {nextStepTitle}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AccordionStep;