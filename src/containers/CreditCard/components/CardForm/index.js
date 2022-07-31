import React, { useCallback, useState } from "react";
import { useCard } from "../../../../store";
import {
  createYearsListFromNum,
  listMonthsAsDigitStrings,
} from "../../../../utils/calendar";
import FormError from "./components/Error";
import { validateCardForm } from "./utils";

const CardForm = ({ render, handleOnFocus, handleOnBlur }) => {
  const { card, updateCard } = useCard();
  const [errors, setErrors] = useState({});

  const [cardNumber, setCardNumber] = useState("");
  const yearsList = createYearsListFromNum(9);
  const monthsList = listMonthsAsDigitStrings();

  const handleGeneralFormChange = (event) => {
    const { name, value } = event.target;
    updateCard(name, value);
  };

  const handleFormSubmit = (_event) => {
    const validationErrors = validateCardForm(card);

    setErrors(validationErrors);

    const isValid = Object.keys(validationErrors).every(
      (key) => validationErrors[key]?.length === 0
    );

    if (isValid) {
      console.log({
        state: card,
        /**
         * This should probably be encrypted in some way, maybe?
         *
         * I'm not sure if this is the best way to do this, but I'm thinking
         * stuff should be okay over SSL, and given that the fact this should
         * be a POST request instead of a GET which is easy to spoof.
         */
        payload: {
          cardInformation: {
            number: card.number.replace(/\s/g, ""),
            name: card.name,
            cvv: card.cvv,
            month: card.month,
            year: card.year,
          },
        },
      });
    } else {
      return;
    }
  };

  const onNumberChange = (event) => {
    const { value, name } = event.target;

    const number = value
      .replace(/\D/g, "")
      .replace(/(\d{4})/, "$1 ")
      .replace(/(\d{4}) (\d{4})/, "$1 $2 ")
      .replace(/(\d{4}) (\d{4}) (\d{4})/, "$1 $2 $3 ");

    setCardNumber(number.trimRight());
    updateCard(name, number);
  };

  const onCvvFieldFocus = useCallback(
    (_event) => updateCard("isFlipped", true),
    []
  );

  const onCvvFieldBlur = useCallback(
    (_event) => updateCard("isFlipped", false),
    []
  );

  /**
   * Attention:
   *
   * Most of these form inputs could be refactored to simple dumb components,
   * to promote reusability and make the coder cleaner.
   */

  return (
    <div className="card-form">
      <div className="card-list">{render && render({ card })}</div>
      <div className="card-form__inner">
        <div className="card-input">
          <label htmlFor="number" className="card-input__label">
            Card Number
          </label>
          <input
            type="tel"
            name="number"
            id="number"
            className={`card-input__input ${
              errors["number"]?.length ? "-error" : ""
            }`}
            autoComplete="off"
            onChange={onNumberChange}
            maxLength={19}
            onFocus={(e) => handleOnFocus("numberFieldRef")}
            onBlur={handleOnBlur}
            value={cardNumber}
          />
        </div>

        {!!errors["number"]?.length && <FormError errors={errors["number"]} />}

        <div className="card-input">
          <label htmlFor="name" className="card-input__label">
            Card Name
          </label>
          <input
            type="text"
            id="name"
            className={`card-input__input ${
              errors["name"]?.length ? "-error" : ""
            }`}
            autoComplete="off"
            name="name"
            maxLength={50}
            onChange={handleGeneralFormChange}
            onFocus={(_) => handleOnFocus("nameFieldRef")}
            onBlur={handleOnBlur}
          />
        </div>

        {!!errors["name"]?.length && <FormError errors={errors["name"]} />}

        <div className="card-form__row">
          <div className="card-form__col">
            <div className="card-form__group">
              <label htmlFor="month" className="card-input__label">
                Expiration Date
              </label>
              <select
                className={`card-input__input -select ${
                  errors["month"]?.length ? "-error" : ""
                }`}
                value={card.month}
                name="month"
                id="month"
                onChange={handleGeneralFormChange}
                onFocus={(_) => handleOnFocus("dateFieldRef")}
                onBlur={handleOnBlur}
              >
                <option value="" disabled>
                  Month
                </option>

                {monthsList.map((val, index) => (
                  <option key={index} value={val}>
                    {val}
                  </option>
                ))}
              </select>
              <select
                name="year"
                id="year"
                className={`card-input__input -select ${
                  errors["year"]?.length ? "-error" : ""
                }`}
                value={card.year}
                onChange={handleGeneralFormChange}
                onFocus={(_) => handleOnFocus("dateFieldRef")}
                onBlur={handleOnBlur}
              >
                <option value="" disabled>
                  Year
                </option>

                {yearsList.map((val, index) => (
                  <option key={index} value={val}>
                    {val}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="card-form__col -cvv">
            <div className="card-input">
              <label htmlFor="cvv" className="card-input__label">
                CVV
              </label>
              <input
                type="tel"
                className={`card-input__input ${
                  errors["cvv"]?.length ? "-error" : ""
                }`}
                maxLength={3}
                autoComplete="off"
                id="cvv"
                name="cvv"
                onChange={handleGeneralFormChange}
                onFocus={onCvvFieldFocus}
                onBlur={onCvvFieldBlur}
              />
            </div>
          </div>
        </div>

        {/**
         * Doing this because of form real estate but realistically, this could be made better.
         */}
        {!!errors["month"]?.length && <FormError errors={errors["month"]} />}
        {!!errors["year"]?.length && <FormError errors={errors["year"]} />}
        {!!errors["cvv"]?.length && <FormError errors={errors["cvv"]} />}

        <div className="card-input">
          <button onClick={handleFormSubmit} className="card-form__button">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardForm;
