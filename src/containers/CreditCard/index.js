import React, { useState, useRef, useCallback } from "react";
import { CardProvider } from "../../store";
import CardForm from "./components/CardForm";
import CardPreview from "./components/CardPreview";

const CreditCard = () => {
  const [focusedField, setFocusedField] = useState(null);

  const CARD_FIELD_REFS = {
    numberFieldRef: useRef(null),
    nameFieldRef: useRef(null),
    dateFieldRef: useRef(null),
  };

  const handleOnFocus = (refKey) =>
    CARD_FIELD_REFS[refKey] && setFocusedField(CARD_FIELD_REFS[refKey]);

  const handleOnBlur = useCallback(() => setFocusedField(null), []);

  return (
    <CardProvider>
      <div className="wrapper">
        <CardForm
          handleOnBlur={handleOnBlur}
          handleOnFocus={handleOnFocus}
          render={({ card }) => (
            <CardPreview
              number={card.number}
              name={card.name}
              month={card.month}
              year={card.year}
              cvv={card.cvv}
              isFlipped={card.isFlipped}
              focusedField={focusedField}
              numberFieldRef={CARD_FIELD_REFS.numberFieldRef}
              nameFieldRef={CARD_FIELD_REFS.nameFieldRef}
              dateFieldRef={CARD_FIELD_REFS.dateFieldRef}
            />
          )}
        />
      </div>
    </CardProvider>
  );
};

export default CreditCard;
