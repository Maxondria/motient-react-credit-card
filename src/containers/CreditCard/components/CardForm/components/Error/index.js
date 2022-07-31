import React from "react";

const FormError = ({ errors }) => {
  if (!errors) {
    return null;
  }

  return (
    <div className="card-input__error">
      {errors.map((error, index) => (
        <p key={index}>* {error}</p>
      ))}
    </div>
  );
};

export default FormError;
