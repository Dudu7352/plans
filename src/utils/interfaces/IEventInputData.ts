import { Time } from "../classes";

export default interface IEventInputData {
  name: string;
  color: string;
  start: Time;
  end: Time;
}