import { createContext, useCallback, useContext, useState } from "react";

const Card = createContext();

const CardProvider = ({ children }) => {
  const initialCard = {
    number: "#### #### #### ####",
    name: "FULL NAME",
    month: "",
    year: "",
    cvv: "",
    isFlipped: false,
  };

  const [card, setCardState] = useState(initialCard);

  const updateCard = useCallback(
    (key, value) => {
      setCardState((prevCard) => ({
        ...prevCard,
        [key]: value || initialCard[key],
      }));
    },
    [card]
  );

  return <Card.Provider value={{ card, updateCard }}>{children}</Card.Provider>;
};

const useCard = () => useContext(Card);

export { CardProvider, useCard };
