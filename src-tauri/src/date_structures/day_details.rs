use chrono::NaiveDate;
use serde::Serialize;

use crate::event_structures::event_details::EventDetails;

#[derive(Serialize)]
pub struct DayDetails {
    pub date: NaiveDate,
    pub events: Vec<EventDetails>
}

impl DayDetails {
    pub fn new(date: NaiveDate, events: Vec<EventDetails>) -> Self { Self { date, events } }
}