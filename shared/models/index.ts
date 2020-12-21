import { map } from "./map";
import { city } from "./city";
import { quiz } from "./quiz";
import { quizForDrivers } from "./quizForDrivers";
import { nav } from "./nav";

export interface RootModel {
  map: typeof map;
  city: typeof city;
  quiz: typeof quiz;
  quizForDrivers: typeof quizForDrivers;
  nav: typeof nav;
}

export const models: RootModel = { map, city, quiz, quizForDrivers, nav };
