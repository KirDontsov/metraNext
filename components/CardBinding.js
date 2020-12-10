import React, { memo } from "react";
import Tilt from "react-tilt";
import Link from "./nav/Link";
import { Card } from "./svg/Card";

const CardBinding = (props) => {
  const { title } = props;
  return (
    <div className="cardBindingWrapper">
      <div className="col">
        {title ? <h1>Привязка карты</h1> : <h2>Привязка карты</h2>}
        <p>
          Откройте меню приложения и нажмите Привязать карту (или Добавить
          карту).
        </p>
        {!title && (
          <Link activeClassName="active" href="/card-binding">
            <a className="nav-link">Подробнее</a>
          </Link>
        )}
      </div>
      <div className="col">
        <Tilt
          className="Tilt"
          options={{ max: 25 }}
          style={{ height: 250, width: 250 }}
        >
          <div className="Tilt-inner">
            {!title ? (
              <Link activeClassName="active" href="/card-binding">
                <a className="cardLink">
                  <Card />
                </a>
              </Link>
            ) : (
              <Card />
            )}
          </div>
        </Tilt>
      </div>
    </div>
  );
};

export default memo(CardBinding);
