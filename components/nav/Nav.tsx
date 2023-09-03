import React, { FC, memo, useCallback, useEffect, useState } from "react";
import Link from "./Link";
import { connect } from "react-redux";
import { Dispatch, iRootState } from "../../shared/store";
import { Account } from "../svg/Accaount";
import { AccountClicked } from "../svg/AccountClicked";
import { useRouter } from "next/router";
import { CityIdType } from "../utils/ChangeCity/interfaces";

interface NavProps
  extends Partial<ReturnType<typeof mapState>>,
    Partial<ReturnType<typeof mapDispatch>> {
  city?: number;
  accountClicked?: boolean;
  setAccountClicked?: (prevState: any) => any;
}

const Nav: FC<NavProps> = ({ city, accountClicked, setAccountClicked }) => {
  const [activeHref, setActiveHref] = useState("/");
  const router = useRouter();
  const { pathname } = router;

  useEffect(() => {
    if (pathname !== "/login") {
      setAccountClicked!(false);
    }
    if (pathname === "/yeisk") {
      setActiveHref(pathname);
    }
    if (pathname === "/novorossiysk") {
      setActiveHref(pathname);
    }
    if (pathname === "/taganrog") {
      setActiveHref(pathname);
    }
  }, [city, pathname]);

  const onClick = useCallback(() => {
    // router.push("/login");
    // if (!accountClicked) {
    //   setAccountClicked!(!accountClicked);
    // }
    setAccountClicked!(!accountClicked);
  }, [setAccountClicked, accountClicked, router]);

  const renderPhoneByCity = (city: number) => {
    switch (city) {
      case CityIdType.GELENDJIK:
        return (
          <a href="tel:+78614155555" className="phone">
            +7 (861-41) 5-55-55
          </a>
        );
      case CityIdType.NOVOROSSIYSK:
        return (
          <a href="tel:+78617610111" className="phone">
            +7 (861-7) 610-111
          </a>
        );
      case CityIdType.YEYSK:
        return (
          <a href="tel:+78613235555" className="phone">
            +7 (861-32) 3-55-55
          </a>
        );
      case CityIdType.TAGANROG:
        return (
          <a href="tel:+78634333333" className="phone">
            +7 (863-4) 33-33-33
          </a>
        );
      default:
        return (
          <a href="tel:+78614155555" className="phone">
            +7 (861-41) 5-55-55
          </a>
        );
    }
  };

  return (
    <div className="nav-wrapper">
      <div className="center nav__bot">
        <Link activeClassName="active" href="/">
          <a className="logo">
            metra&nbsp;<span className="transfer">трансфер</span>
          </a>
        </Link>
        <nav>
          <Link activeClassName="active" href={activeHref}>
            <a className="nav-link">Для клиентов</a>
          </Link>
          <Link activeClassName="active" href="/for-drivers">
            <a className="nav-link">Для водителей</a>
          </Link>
        </nav>
        <div className="rightNav">
          {renderPhoneByCity(city ?? 10)}
          {accountClicked ? (
            <AccountClicked onClick={onClick} />
          ) : (
            <Account onClick={onClick} />
          )}
        </div>
      </div>
    </div>
  );
};

const mapState = (state: iRootState) => ({
  city: state.city.city,
  accountClicked: state.nav.accountClicked,
});

const mapDispatch = (dispatch: Dispatch) => ({
  setAccountClicked: dispatch.nav.setAccountClicked,
});

export default connect(mapState as any, mapDispatch as any)(memo(Nav));
