import { MONTHS } from "../consts";

export default function formatDate(date: Date, withYear: boolean = false): string {
  const day: number = date.getDate();

  let ending: string;
  if ((day % 10 === 1 && day > 20) || day === 1) ending = "st";
  else if ((day % 10 === 2 && day > 20) || day === 2) ending = "nd";
  else if ((day % 10 === 3 && day > 20) || day === 3) ending = "rd";
  else ending = "th";

  const month: number = date.getMonth();

  let dateString = `${day}${ending} ${MONTHS[month].substring(0, 3)}`;

  if (withYear) dateString += ` ${date.getFullYear()}`;

  return dateString;
}
