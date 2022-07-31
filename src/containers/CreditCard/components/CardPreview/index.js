import React, { useState, useEffect } from "react";
import {
  CSSTransition,
  TransitionGroup,
  SwitchTransition,
} from "react-transition-group";

const CardPreview = ({
  name,
  number,
  month,
  year,
  cvv,
  isFlipped,
  focusedField,
  numberFieldRef,
  nameFieldRef,
  dateFieldRef,
}) => {
  const [style, setStyle] = useState(null);

  /**
   * Attention:
   *
   * This outlineElement code could be refactored into a reusable custom hook.
   *
   * It clutters the component, unncessary, isolating it into a hook could
   * make it look cleaner.
   */

  const outlineElementStyle = (element) => {
    return element
      ? {
          width: `${element.offsetWidth}px`,
          height: `${element.offsetHeight}px`,
          transform: `translateX(${element.offsetLeft}px) translateY(${element.offsetTop}px)`,
        }
      : null;
  };

  useEffect(() => {
    if (focusedField) {
      const style = outlineElementStyle(focusedField.current);
      setStyle(style);
    }
  }, [focusedField]);

  const displayableCardNumber = (cardNumber) => {
    const numberAsArr = cardNumber.split("");

    numberAsArr.forEach((_, index) => {
      if (index >= 5 && index <= 13 && numberAsArr[index] !== " ") {
        numberAsArr[index] = "*";
      }
    });

    return numberAsArr;
  };

  return (
    <div className={"card-item " + (isFlipped ? "-active" : "")}>
      <div className="card-item__side -front">
        <div
          className={`card-item__focus ${focusedField ? `-active` : ``}`}
          style={style}
        />
        <div className="card-item__cover">
          <img
            alt="visa_img"
            src="/card-background/6.jpeg"
            className="card-item__bg"
          />
        </div>

        <div className="card-item__wrapper">
          <div className="card-item__top">
            <img src={"/chip.png"} alt="" className="card-item__chip" />
            <div className="card-item__type">
              <img
                alt="visa_chip"
                src="/card-type/visa.png"
                className="card-item__typeImg"
              />
            </div>
          </div>

          <label className="card-item__number" ref={numberFieldRef}>
            <TransitionGroup className="slide-fade-up" component="div">
              {number ? (
                displayableCardNumber(number).map((val, index) => (
                  <CSSTransition
                    classNames="slide-fade-up"
                    timeout={250}
                    key={index}
                  >
                    <div className="card-item__numberItem">{val}</div>
                  </CSSTransition>
                ))
              ) : (
                <CSSTransition classNames="slide-fade-up" timeout={250}>
                  <div className="card-item__numberItem">#</div>
                </CSSTransition>
              )}
            </TransitionGroup>
          </label>
          <div className="card-item__content">
            <label className="card-item__info" ref={nameFieldRef}>
              <div className="card-item__holder">Card Holder</div>
              <div className="card-item__name">
                <TransitionGroup component="div" className="slide-fade-up">
                  {name === "FULL NAME" ? (
                    <CSSTransition classNames="slide-fade-up" timeout={250}>
                      <div>FULL NAME</div>
                    </CSSTransition>
                  ) : (
                    name.split("").map((val, index) => (
                      <CSSTransition
                        timeout={250}
                        classNames="slide-fade-right"
                        key={index}
                      >
                        <span className="card-item__nameItem">{val}</span>
                      </CSSTransition>
                    ))
                  )}
                </TransitionGroup>
              </div>
            </label>
            <div className="card-item__date" ref={dateFieldRef}>
              <label className="card-item__dateTitle">Expires</label>
              <label className="card-item__dateItem">
                <SwitchTransition in-out>
                  <CSSTransition
                    classNames="slide-fade-up"
                    timeout={200}
                    key={month}
                  >
                    <span>{month ? month : "MM"} </span>
                  </CSSTransition>
                </SwitchTransition>
              </label>
              /
              <label htmlFor="cardYear" className="card-item__dateItem">
                <SwitchTransition out-in>
                  <CSSTransition
                    classNames="slide-fade-up"
                    timeout={250}
                    key={year}
                  >
                    <span>{year ? year.toString().substr(-2) : "YY"}</span>
                  </CSSTransition>
                </SwitchTransition>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="card-item__side -back">
        <div className="card-item__cover">
          <img alt="" src="/card-background/6.jpeg" className="card-item__bg" />
        </div>
        <div className="card-item__band" />
        <div className="card-item__cvv">
          <div className="card-item__cvvTitle">CVV</div>
          <div className="card-item__cvvBand">
            <TransitionGroup>
              {cvv.split("").map((_, index) => (
                <CSSTransition
                  classNames="zoom-in-out"
                  key={index}
                  timeout={250}
                >
                  <span>*</span>
                </CSSTransition>
              ))}
            </TransitionGroup>
          </div>
          <div className="card-item__type">
            <img
              alt="card-type"
              src={"/card-type/visa.png"}
              className="card-item__typeImg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardPreview;
