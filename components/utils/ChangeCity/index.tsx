import React, { ChangeEvent, FC } from "react";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import { connect } from "react-redux";
import { Dispatch, iRootState } from "../../../shared/store";
import { CityIdType } from "./interfaces";

// @ts-ignore
interface ChangeCityProps
  extends Partial<ReturnType<typeof mapState>>,
    Partial<ReturnType<typeof mapDispatch>> {
  city?: number;
  latitude?: string;
  longitude?: string;
  zoom?: string;
  setCity?: (e: number) => number;
  setLatitude?: (e: number) => number;
  setLongitude?: (e: number) => number;
  setZoom?: (e: number) => number;
}

const ChangeCity: FC<ChangeCityProps> = (props) => {
  const {
    city,
    // latitude,
    // longitude,
    // zoom,
    setCity,
    setLatitude,
    setLongitude,
    setZoom,
  } = props;

  const handleChange = (e: ChangeEvent<{ name?: string; value: unknown }>) => {
    const cityId = e.target.value;
    setCity!(cityId as number);
    switch (cityId) {
      case CityIdType.GELENDJIK:
        setLatitude!(44.561141);
        setLongitude!(38.076809);
        setZoom!(14);
        // setQuery1("г. Геленджик,");
        // setQuery2("г. Геленджик,");
        // setQuery3("г. Геленджик,");
        break;
      case CityIdType.NOVOROSSISK:
        setLatitude!(44.723912);
        setLongitude!(37.768974);
        setZoom!(13);
        // setQuery1("г. Новороссийск,");
        // setQuery2("г. Новороссийск,");
        // setQuery3("г. Новороссийск,");
        break;
      case CityIdType.YEYSK:
        setLatitude!(46.711524);
        setLongitude!(38.276451);
        setZoom!(14);
        // setQuery1("г. Ейск,");
        // setQuery2("г. Ейск,");
        // setQuery3("г. Ейск,");
        break;
      default:
        throw new Error("Ошибка в выборе города");
    }
  };

  // const renderCityName = () => {
  //   switch (city) {
  //     case 10:
  //       return "Геленджик";
  //     case 20:
  //       return "Новороссийск";
  //     case 30:
  //       return "Ейск";
  //     default:
  //       break;
  //   }
  // };

  return (
    <FormControl variant="outlined" className="changeCity">
      <InputLabel id="demo-simple-select-outlined-label">Город</InputLabel>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={city}
        onChange={handleChange}
        labelWidth={20}
      >
        <MenuItem value={10}>Геленджик</MenuItem>
        <MenuItem value={20}>Новороссийск</MenuItem>
        <MenuItem value={30}>Ейск</MenuItem>
      </Select>
    </FormControl>
  );
};

const mapState = (state: iRootState) => ({
  city: state.city.city,
  latitude: state.city.latitude,
  longitude: state.city.longitude,
  zoom: state.city.zoom,
});

const mapDispatch = (dispatch: Dispatch) => ({
  setCity: dispatch.city.setCity,
  setLatitude: dispatch.city.setLatitude,
  setLongitude: dispatch.city.setLongitude,
  setZoom: dispatch.city.setZoom,
  setQuery1: dispatch.quiz.setQuery1,
  setQuery2: dispatch.quiz.setQuery2,
  setQuery3: dispatch.quiz.setQuery3,
});

export default connect(mapState as any, mapDispatch as any)(ChangeCity);
