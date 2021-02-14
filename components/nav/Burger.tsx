import React, {
  Fragment,
  FC,
  useState,
  useCallback,
  useEffect,
  memo,
} from "react";
import { Motion, spring } from "react-motion";
import { noop } from "lodash";
import classNames from "classnames";
import Link from "./Link";
import { connect } from "react-redux";
import { Dispatch, iRootState } from "../../shared/store";
import { useRouter } from "next/router";
import { Apple } from "../footer/Apple";
import { Android } from "../footer/Android";
import { CityIdType } from "../utils/ChangeCity/interfaces";
import { useToggleState } from "../../utils/hooks/useToggleState";

type ButtonProps = { className: string; style: {}; onClick: () => void };

const Button: FC<ButtonProps> = (props) => (
  <button
    className={classNames("button", props.className)}
    style={props.style}
    onClick={props.onClick || noop}
  >
    {props.children}
  </button>
);

interface BurgerProps
  extends Partial<ReturnType<typeof mapState>>,
    Partial<ReturnType<typeof mapDispatch>> {
  city?: number;
  accountClicked?: boolean;
  setAccountClicked?: (prevState: any) => any;
}

const Burger: FC<BurgerProps> = ({ city, setAccountClicked }) => {
  const [active, setActive] = useToggleState(false);
  const [addClass, setAddClass] = useToggleState(false);
  const [activeHref, setActiveHref] = useState("/");
  const router = useRouter();
  const { pathname } = router;

  useEffect(() => {
    if (pathname === "/yeisk") {
      setActiveHref(pathname);
    }
    if (pathname === "/novorossiysk") {
      setActiveHref(pathname);
    }
  }, [city, pathname, setActiveHref]);

  const onBurgerClick = useCallback(() => {
    setActive();
    setAddClass();
  }, [active, addClass]);

  const onClick = useCallback(() => {
    scrollToTop();
  }, []);

  const scrollToTop = () => {
    let div;
    if (div !== null) {
      div = document.querySelector(".wrapper");
      div!.scrollTop = 0;
    }
  };

  let buttonClass = ["button--large"];
  let navClass = ["nav__toggle"];

  if (addClass) {
    buttonClass.push("active");
    navClass.push("active");
  }

  const renderPhoneByCity = (city: number) => {
    if (city === CityIdType.GELENDJIK) {
      return (
        <a href="tel:+78614155555" className="phone">
          +7 (861-41) 5-55-55
        </a>
      );
    } else if (city === CityIdType.NOVOROSSIYSK) {
      return (
        <a href="tel:+78617610111" className="phone">
          +7 (861-7) 610-111
        </a>
      );
    } else if (city === CityIdType.YEYSK) {
      return (
        <a href="tel:+78613235555" className="phone">
          +7 (861-32) 3-55-55
        </a>
      );
    }
  };

  console.log(city);

  return (
    <div className="center nav__bot">
      <Motion
        defaultStyle={{ s: 0.675 }}
        style={{
          s: spring(active ? 1 : 0.675, {
            stiffness: 330,
            damping: 14,
          }),
        }}
      >
        {(interpolatingStyles) => (
          <Fragment>
            <div className={navClass.join(" ")}>
              <div className="container__mob">
                <Link activeClassName="active" href="/">
                  <a className="logo__mob" />
                </Link>
                <Link activeClassName="active" href="/about">
                  <a className="nav-link">О нас</a>
                </Link>
                <Link activeClassName="active" href={activeHref}>
                  <a className="nav-link">Для клиентов</a>
                </Link>
                <Link activeClassName="active" href="/for-drivers">
                  <a className="nav-link">Для водителей</a>
                </Link>
                <Link activeClassName="active" href="/card-binding">
                  <a className="nav-link">Привязка карты</a>
                </Link>
                <Link activeClassName="active" href="/public-offer">
                  <a className="nav-link">Публичная оферта</a>
                </Link>
                <div className="appLinks">
                  <a
                    className="app-link"
                    href="https://apps.apple.com/ru/app/metra-%D1%82%D0%B0%D0%BA%D1%81%D0%B8/id1440419621"
                  >
                    <Apple />
                  </a>
                  <a
                    className="app-link"
                    href="https://play.google.com/store/apps/details?id=tools.taxi.pickup&hl=ru&gl=US"
                  >
                    <Android />
                  </a>
                </div>
              </div>
            </div>
            <Button
              className={buttonClass.join(" ")}
              onClick={() => onBurgerClick()}
              style={{
                transform: "scale(" + interpolatingStyles.s + ")",
              }}
            >
              <span
                className={active ? "icon__burger active" : "icon__burger"}
              />
            </Button>
          </Fragment>
        )}
      </Motion>
      <div className="rightNav">{renderPhoneByCity(city ?? 10)}</div>
    </div>
  );
};

const mapState = (state: iRootState) => ({
  city: state.city.city,
});

const mapDispatch = (dispatch: Dispatch) => ({});

export default connect(mapState as any, mapDispatch as any)(memo(Burger));
