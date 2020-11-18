import React, { FC, useEffect, useState } from "react";
import Link from "./Link";
import { connect } from "react-redux";
import { iRootState } from "../../shared/store";

interface NavProps extends Partial<ReturnType<typeof mapState>> {
  city?: any;
}

const cityType = {
  gel: 10,
  novoros: 20,
  yeisk: 30,
};

const Nav: FC<NavProps> = (props) => {
  const { city } = props;
  const [currentCity, setCurrentCity] = useState(10);

  useEffect(() => {
    setCurrentCity(city || 10);
  }, [city]);

  console.log(props);

  const renderPhoneByCity = (currentCity: number) => {
    if (currentCity === cityType.gel) {
      return (
          <a href="tel:+78614155555" className="phone">
            +7 (861-41) 5-55-55
          </a>
      );
    } else if (currentCity === cityType.novoros) {
      return (
          <a href="tel:+78617610111" className="phone">
            +7 (861-7) 610-111
          </a>
      );
    } else if (currentCity === cityType.yeisk) {
      return (
          <a href="tel:+78613235555" className="phone">
            +7 (861-32) 3-55-55
          </a>

      );
    }
  };

  return (
    <div className="nav-wrapper">
      <div className="center nav__bot">
        <a className="nav-link logo" href="/" />
        <nav>
          <Link activeClassName="active" href="/">
            <a className="nav-link">Для клиентов</a>
          </Link>
          <Link activeClassName="active" href="/for-drivers">
            <a className="nav-link">Для водителей</a>
          </Link>
        </nav>
        <div className="rightNav">
          {renderPhoneByCity(currentCity)}
        </div>
      </div>
    </div>
  );
};

const mapState = (state: iRootState) => ({
  city: state.city.city,
});

export default connect(mapState as any)(Nav);
