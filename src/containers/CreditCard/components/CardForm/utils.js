/**
 * Attention:
 *
 * This function could be refactored to something better, maybe?
 * Looks to me like a code smell. The function gets the job done but
 * it's insanely long.
 *
 * At some point, we could the form to use a more reknowned library, like Formik.
 * We then could use that library to handle the form validation using a validation
 * schema (Yup?, maybe?).
 */
const validateCardForm = (card) => {
  const errors = {
    number: [],
    name: [],
    cvv: [],
    month: [],
    year: [],
  };

  const { name, cvv, number, month, year } = card;

  if (!name || name === "FULL NAME") {
    errors["name"] = [...errors["name"], "Name is required"];
  }

  if (name.length < 2 || name.length > 50) {
    errors["name"] = [
      ...errors["name"],
      "Name must be between 2 and 50 characters",
    ];
  }

  const numberRegex = /^\d{16}$/;

  if (!number || !numberRegex.test(number.replace(/\s/g, ""))) {
    errors["number"] = [
      ...errors["number"],
      "Card number must be 16 digits long",
    ];
  }

  if (!cvv) {
    errors["cvv"] = [...errors["cvv"], "CVV is required"];
  }

  if (cvv.length !== 3) {
    errors["cvv"] = [...errors["cvv"], "CVV must be 3 digits long"];
  }

  if (!month) {
    errors["month"] = [...errors["month"], "Month is required"];
  }

  if (!year) {
    errors["year"] = [...errors["year"], "Year is required"];
  }

  return errors;
};

export { validateCardForm };
