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
          {/*<Link activeClassName="active" href="/index">*/}
          {/*  <a className="nav-link">Для пользователей</a>*/}
          {/*</Link>*/}
          <a className="nav-link">Для пользователей</a>
          <Link activeClassName="active" href="/for-drivers">
            <a className="nav-link">Для водителей</a>
          </Link>
          <Link activeClassName="active" href="/public-offer">
            <a className="nav-link">Публичная оферта</a>
          </Link>
          <div className="appLinks">
            <a className="app-link">
              <Apple />
            </a>
            <a className="app-link">
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
