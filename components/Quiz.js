import React, { Component, memo } from "react";
import DadataSuggestions from "react-dadata-suggestions";
import { connect } from "react-redux";
import ChangeCity from "./utils/ChangeCity";

// const isIE = /*@cc_on!@*/ false || !!document.documentMode;

const GEOCODE_LINK =
  "https://geocode-maps.yandex.ru/1.x/?format=json&apikey=c07c297b-ab06-495a-87e3-2627c9c225d8&geocode=";
const DADATA_TOKEN = "fc70bbc8effa9a5c8946b3fe83bb4fdebba8d11d";

export class Quiz extends Component {
  // генерация UID
  generateId() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    );
  }
  // получение координат и построение маршрута
  handleClick(e, that) {
    let firstAddress = JSON.stringify(that.props.firstAddress.value, 0, 2);
    let secondAddress = JSON.stringify(that.props.secondAddress.value, 0, 2);
    let additionalAddress = JSON.stringify(
      that.props.additionalAddress.value,
      0,
      2
    );

    if (firstAddress !== undefined || null || "") {
      fetch(`${GEOCODE_LINK}${firstAddress}`)
        .then((response) => response.json())
        .then((result) => that.props.setData1(result));
    }

    if (secondAddress !== undefined || null || "") {
      fetch(`${GEOCODE_LINK}${secondAddress}`)
        .then((response) => response.json())
        .then((result) => that.props.setData2(result));
    }
    if (additionalAddress !== undefined || null || "") {
      fetch(`${GEOCODE_LINK}${additionalAddress}`)
        .then((response) => response.json())
        .then((result) => {
          that.props.setData3(result);
        });
    }

    // отправка fetch (получение маршрута)

    setTimeout(() => {
      if (this.props.didFetched1 === true && this.props.didFetched2 === true) {
        // console.log(this.props.data1);
        // this.props.setLatitude(this.props.coords1[0]);
        // this.props.setLongitude(this.props.coords1[1]);
        let coords1 = this.props.data1.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos
          .split(" ")
          .map((c) => parseFloat(c));
        this.props.setLatitude(coords1[1]);
        this.props.setLongitude(coords1[0]);
        let coords2 = this.props.data2.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos
          .split(" ")
          .map((c) => parseFloat(c));
        let coords3 = "";
        if (this.props.data3 !== "" || null || undefined) {
          coords3 = this.props.data3.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos
            .split(" ")
            .map((c) => parseFloat(c));
        }

        let AddressA = this.props.data1.response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.Address.Components.filter(
          (word) => ["locality", "street", "house"].includes(word.kind)
        )
          .map((word) => word.name)
          .join(", ");

        let AddressB = this.props.data2.response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.Address.Components.filter(
          (word) => ["locality", "street", "house"].includes(word.kind)
        )
          .map((word) => word.name)
          .join(", ");

        let Address1 = "";
        if (this.props.data3 !== "" || null || undefined) {
          Address1 = this.props.data3.response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.Address.Components.filter(
            (word) => ["locality", "street", "house"].includes(word.kind)
          )
            .map((word) => word.name)
            .join(", ");
        }

        let formData = JSON.stringify({
          OUID: this.generateId(),
          Points: [AddressA, Address1, AddressB].filter((item) => item !== ""),
          phone: this.props.phone,
          comment: this.props.comment,
          roadway: [coords1, coords3, coords2].filter((item) => item !== ""),
        });
        fetch("https://website.eorum.ru:8020/metrasite", {
          // credentials: "same-origin",
          method: "POST",
          body: formData,
          // headers: new Headers({
          // 	"Content-Type": "application/json"
          // })
        }).then((response) => {
          response.json().then((data) => {
            console.log("Successful", data);
            this.props.setRes(data);
          });
        });
      }
    }, 1000);
  }

  // получение подсчета км, время, стоимость

  getDuration() {
    const rideDuration =
      this.props.res !== ""
        ? JSON.stringify(this.props.res.OrderCalc.duration, 0, 2)
        : 0;
    const d = new Date(rideDuration * 1000);
    const minutes = d.getMinutes();

    return " " + minutes + " мин.";
  }

  getCost() {
    const rideCost =
      this.props.res !== ""
        ? JSON.stringify(this.props.res.OrderCalc.RideCost, 0, 2) / 100
        : 0;

    return " " + rideCost + " руб.";
  }

  getDistance() {
    const rideDistance =
      this.props.res !== ""
        ? JSON.stringify(this.props.res.OrderCalc.distance, 0, 2)
        : 0;

    return " " + rideDistance / 1000 + " км";
  }

  onFocusOne() {
    this.props.setQuery1("");
  }
  onFocusTwo() {
    this.props.setQuery2("");
  }
  onFocusThree() {
    this.props.setQuery3("");
  }

  addInput() {
    this.props.setAdditionalInput(true);
  }

  button() {
    return (
      <div className="btn" onClick={(e) => this.handleClick(e, this)}>
        Рассчитать
      </div>
    );
  }

  render() {
    // console.log(this.props.city);
    const {
      // data1,
      // data2,
      // data3,
      query1,
      query2,
      query3,
      firstAddress,
      secondAddress,
      additionalAddress,
      phone,
      comment,
    } = this.props;
    const firstAddressQuery = firstAddress.value;
    const secondAddressQuery = secondAddress.value;
    const additionalAddressQuery = additionalAddress.value;

    return (
      <div className="Quiz">
        <h2 className="dark">
          Приятно, <br />
          когда вместе<span>!</span>
        </h2>
        <div className="quizForm">
          <p className="quizText">Рассчитайте стоимость поездки</p>
          <ChangeCity />
          <DadataSuggestions
            label="Откуда?"
            token={DADATA_TOKEN}
            onSelect={(suggestion) => {
              return this.props.setFirstAddress(suggestion);
            }}
            onFocus={() => this.onFocusOne()}
            geolocation={true}
            hint={"Выберите город, улицу и номер дома"}
            placeholder={"Откуда"}
            count={5}
            minChars={4}
            restrictValue={true}
            query={
              firstAddressQuery === undefined || null || ""
                ? query1
                : firstAddressQuery
            }
            eceivePropsBehaveLikeOnChange={true}
            deferRequestBy={300}
          />
          <DadataSuggestions
            token={DADATA_TOKEN}
            onSelect={(suggestion) => this.props.setSecondAddress(suggestion)}
            onFocus={() => this.onFocusTwo()}
            geolocation={true}
            hint={"Выберите город, улицу и номер дома"}
            placeholder={"Куда"}
            count={5}
            minChars={4}
            query={
              secondAddressQuery === undefined || null || ""
                ? query2
                : secondAddressQuery
            }
            eceivePropsBehaveLikeOnChange={true}
            deferRequestBy={300}
          />

          {this.props.additionalInput ? (
            <DadataSuggestions
              token={DADATA_TOKEN}
              onSelect={(suggestion) =>
                this.props.setAdditionalAddress(suggestion)
              }
              onFocus={() => this.onFocusThree()}
              geolocation={true}
              hint={"Выберите город, улицу и номер дома"}
              placeholder={"Дополнительный адрес"}
              count={5}
              minChars={4}
              query={
                additionalAddressQuery === undefined || null || ""
                  ? query3
                  : additionalAddressQuery
              }
              eceivePropsBehaveLikeOnChange={true}
              deferRequestBy={300}
            />
          ) : (
            <div className="addAddress" onClick={() => this.addInput()}>
              <div className="addButton" />
            </div>
          )}
          {this.button()}
        </div>

        {/* <MaskInput
          name="phone"
          mask="+7 (999) 999-99-99"
          component={MaskInput}
          type="text"
          label="Телефон"
          onChange={e => this.props.setPhone({ phone: e.target.value })}
        />
        <div className="form-group">
          <label className="comment">Комментарий водителю</label>
          <input
            name="comment"
            type="text"
            onChange={e => this.props.setComment({ comment: e.target.value })}
          />
        </div> */}

        {this.props.didFetched1 && (
          <ul className="coords">
            <li>
              Время в пути: <span>{this.getDuration()}</span>
            </li>
            <li>
              Стоимость поездки: <span>{this.getCost()}</span>
            </li>
            <li>
              Расстояние:
              <span>{this.getDistance()}</span>
            </li>
            <li>{JSON.stringify(phone.phone, 0, 2)}</li>
            <li>{JSON.stringify(comment.comment, 0, 2)}</li>
          </ul>
        )}
      </div>
    );
  }
}

const mapState = (state) => ({
  firstAddress: state.quiz.firstAddress,
  secondAddress: state.quiz.secondAddress,
  additionalAddress: state.quiz.additionalAddress,
  phone: state.quiz.phone,
  comment: state.quiz.comment,
  query1: state.quiz.query1,
  query2: state.quiz.query2,
  query3: state.quiz.query3,
  data1: state.quiz.data1,
  data2: state.quiz.data2,
  data3: state.quiz.data3,
  didFetched1: state.quiz.didFetched1,
  didFetched2: state.quiz.didFetched2,
  didFetched3: state.quiz.didFetched3,
  res: state.quiz.res,
  additionalInput: state.quiz.additionalInput,
  city: state.city.city,
});

const mapDispatch = (dispatch) => ({
  setFirstAddress: dispatch.quiz.setFirstAddress,
  setSecondAddress: dispatch.quiz.setSecondAddress,
  setAdditionalAddress: dispatch.quiz.setAdditionalAddress,
  setPhone: dispatch.quiz.setPhone,
  setComment: dispatch.quiz.setComment,
  setData1: dispatch.quiz.setData1,
  setData2: dispatch.quiz.setData2,
  setData3: dispatch.quiz.setData3,
  setRes: dispatch.quiz.setRes,
  setQuery1: dispatch.quiz.setQuery1,
  setQuery2: dispatch.quiz.setQuery2,
  setQuery3: dispatch.quiz.setQuery3,
  setLatitude: dispatch.city.setLatitude,
  setLongitude: dispatch.city.setLongitude,
  setAdditionalInput: dispatch.quiz.setAdditionalInput,
});

export default connect(mapState, mapDispatch)(memo(Quiz));
