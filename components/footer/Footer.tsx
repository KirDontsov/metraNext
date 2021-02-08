import React from "react";
import Link from "../nav/Link";
import { Apple } from "./Apple";
import { Android } from "./Android";
import { Mir } from "./Mir";
import { MasterCard } from "./MasterCard";
import { Visa } from "./Visa";
import { PayKeeper } from "./PayKeeper";

export const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className="leftLinks">
          <Link activeClassName="active" href="/about">
            <a className="nav-link">О компании</a>
          </Link>
          <Link activeClassName="active" href="/">
            <a className="nav-link">Для клиентов</a>
          </Link>
          <Link activeClassName="active" href="/for-drivers">
            <a className="nav-link">Для водителей</a>
          </Link>
          <Link activeClassName="active" href="/public-offer">
            <a className="nav-link">Публичная оферта</a>
          </Link>
          <div className="appLinks">
            <a className="app-link" href="https://apps.apple.com/ru/app/metra-%D1%82%D0%B0%D0%BA%D1%81%D0%B8/id1440419621">
              <Apple />
            </a>
            <a className="app-link" href="https://play.google.com/store/apps/details?id=tools.taxi.pickup&hl=ru&gl=US">
              <Android />
            </a>
          </div>
        </div>
        <div className="rightLinks">
          <div className="paymentLinks">
            <PayKeeper />
            <Visa />
            <MasterCard />
            <Mir />
          </div>
        </div>
      </div>
    </div>
  );
};
