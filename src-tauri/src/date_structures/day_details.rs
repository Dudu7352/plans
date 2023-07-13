use chrono::NaiveDate;
use serde::Serialize;

use crate::event_structures::event_details::EventType;

#[derive(Serialize, Debug)]
#[serde(rename_all = "camelCase")]
pub struct DayDetails {
    pub date: NaiveDate,
    pub events: Vec<EventType>
}

impl DayDetails {
    pub fn new(date: NaiveDate, events: Vec<EventType>) -> Self { Self { date, events } }
}