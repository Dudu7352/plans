export class Time {
  hour: number;
  minute: number;

  constructor(timeString?: string) {
    this.hour = 0;
    this.minute = 0;
    if (!timeString) return;
    const splitted = timeString.split(":");
    if (splitted?.length != 2) return;
    this.hour = +splitted[0];
    this.minute = +splitted[1];
  }

  getHour(): number {
    return this.hour;
  }

  getMinute(): number {
    return this.minute;
  }

  setHour(hour: number) {
    if (0 <= hour) this.hour = hour % 24;
  }

  setMinute(minute: number) {
    if (0 <= minute && minute < 60) this.minute = minute;
  }

  getDayPercent(): number {
    return this.getHour()*60+this.getMinute() / (24 * 60);
  }

  static duration_seconds(t1: Time, t2: Time): number {
    return (
      (t1.getHour() - t2.getHour()) * 3600 +
      (t1.getMinute() - t2.getMinute()) * 60
    );
  }

  toString(): string {
    return `${this.hour.toString().padStart(2, "0")}:${this.minute
      .toString()
      .padStart(2, "0")}`;
  }
}
