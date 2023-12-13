use chrono::NaiveDate;
use serde::Serialize;

use crate::event_structures::calendar_entry::CalendarEntry;

#[derive(Serialize, Debug)]
#[serde(rename_all = "camelCase")]
pub struct DayDetails {
    pub date: NaiveDate,
    pub events: Vec<CalendarEntry>
}

impl DayDetails {
    pub fn new(date: NaiveDate, events: Vec<CalendarEntry>) -> Self { Self { date, events } }
}