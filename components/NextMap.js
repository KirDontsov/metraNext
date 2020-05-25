import React, { Component } from "react";
import { connect } from "react-redux";
import { Map as LeafletMap, TileLayer, ZoomControl, Popup, Marker, GeoJSON } from "react-leaflet-universal";
import L from "leaflet";
import axios from "axios";
import update from "immutability-helper";
import { values } from "lodash";
import RotatedMarker from "./utils/RotatedMarker";
import { default as bezierSpline } from "@turf/bezier-spline";
import * as helpers from "@turf/helpers";

import carIcon from "../assets/img/car.png";

const markerIcon = L.icon({
	iconUrl: carIcon,
	shadowUrl: null,
	shadowSize: [0, 0],
	shadowAnchor: [0, 0],
	iconSize: [20, 40], // size of the icon
	iconAnchor: [15, 15], // point of the icon which will correspond to marker's location
	popupAnchor: [-3, -6]
});

class NextMap extends Component {
	// state = { cars: [] };

	request(that) {
		const { setItems } = that.props;
		axios.get("http://taxi.tools:8000/cabsformetrasite").then(({ data }) => {
			const cars = values(data.carsList);
			// this.setState(prevState => ({ cars: update(prevState.cars, { $set: cars }) }));

			const newCars = [];
			for (let i = 0; i < cars.length; i++) {
				const car = cars[i];
				if (car.CabSN === null) continue;
				const newCar = {
					id: car.CabSN,
					cabSN: car.CabSN,
					AllowSelect: car.AllowSelect,
					CarColor: car.CarColor,
					CarModel: car.CarModel,
					course: car.course,
					latitude: car.latitude,
					longitude: car.longitude
				};
				newCars.push(newCar);
			}
			console.log(newCars);
			setItems(newCars);
			setTimeout(() => {
				that.request(that);
				this.setPath();
			}, 3000);
		});
	}

	setPath() {
		const { res } = this.props;
		const points = res !== "" && res.OrderCalc.pointsway;
		const line = res !== "" && helpers.lineString(points);
		const curved = res !== "" && bezierSpline(line);

		return res !== "" && <GeoJSON data={curved} key={Math.random()} style={{ weight: 5 }} />;
	}

	componentDidMount() {
		this.request(this);
	}

	renderCars() {
		if (!this.props.isReady) {
			return "Загрузка...";
		} else {
			// console.log(this.state.cars);
			return this.props.items.map((item, i) => {
				let pos = [item.latitude, item.longitude];
				return (
					<RotatedMarker key={i} position={pos} icon={markerIcon} rotationAngle={item.course} rotationOrigin={"center"}>
						<Popup>
							<span>{item.CarModel}</span>
						</Popup>
					</RotatedMarker>
				);
			});
		}
	}

	render() {
		const {
			zoom,
			latitude,
			longitude,
			firstAddress,
			secondAddress,
			additionalAddress,
			didFetched1,
			didFetched2,
			didFetched3
		} = this.props;
		let position = [latitude, longitude];

		const pos1 =
			firstAddress !== "" && didFetched1 === true
				? firstAddress.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos
						.split(" ")
						.reverse()
						.map(value => parseFloat(value))
				: null;

		const pos2 =
			secondAddress !== "" && didFetched2 === true
				? secondAddress.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos
						.split(" ")
						.reverse()
						.map(value => parseFloat(value))
				: null;

		const pos3 =
			additionalAddress !== "" && didFetched3 === true
				? additionalAddress.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos
						.split(" ")
						.reverse()
						.map(value => parseFloat(value))
				: null;

		if (firstAddress !== "" && didFetched1 === true) {
			position = [this.props.latitude, this.props.longitude];
			this.props.setZoom(13);
		}

		return (
			<div>
				<LeafletMap center={position} zoom={zoom} zoomControl={false} maxZoom={20} minZoom={4}>
					<TileLayer url="http://taxi.tools:8000/tilesmass.{s}/{z}/{x}/{y}.png" />
					<ZoomControl position="bottomright" />
					{this.renderCars()}
					{this.setPath()}

					{pos1 ? (
						<Marker position={pos1}>
							<Popup>
								<span>Заберем Вас здесь</span>
							</Popup>
						</Marker>
					) : (
						""
					)}
					{pos2 ? (
						<Marker position={pos2}>
							<Popup>
								<span>Поедем сюда</span>
							</Popup>
						</Marker>
					) : (
						""
					)}
					{pos3 ? (
						<Marker position={pos3}>
							<Popup>
								<span>Заедем по пути сюда</span>
							</Popup>
						</Marker>
					) : (
						""
					)}
				</LeafletMap>
			</div>
		);
	}
}

const mapState = state => ({
	items: state.map.items,
	isReady: state.map.isReady,
	firstAddress: state.quiz.data1,
	secondAddress: state.quiz.data2,
	additionalAddress: state.quiz.data3,
	didFetched1: state.quiz.didFetched1,
	didFetched2: state.quiz.didFetched2,
	didFetched3: state.quiz.didFetched3,
	latitude: state.city.latitude,
	longitude: state.city.longitude,
	zoom: state.city.zoom,
	res: state.quiz.res
});
const mapDispatch = dispatch => ({
	setItems: dispatch.map.setItems,
	setCity: dispatch.city.setCity,
	setZoom: dispatch.city.setZoom
});

export default connect(
	mapState,
	mapDispatch
)(NextMap);
