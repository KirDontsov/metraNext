import { map } from "./map";
import { city } from "./city";
import { quiz } from "./quiz";
import { quizForDrivers } from "./quizForDrivers";

export interface RootModel {
  map: typeof map;
  city: typeof city;
  quiz: typeof quiz;
  quizForDrivers: typeof quizForDrivers;
}

export const models: RootModel = { map, city, quiz, quizForDrivers };
