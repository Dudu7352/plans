use chrono::NaiveDate;
use serde::Serialize;

use crate::event_structures::entry::Entry;

#[derive(Serialize, Debug)]
#[serde(rename_all = "camelCase")]
pub struct DayDetails {
    pub date: NaiveDate,
    pub events: Vec<Entry>
}

impl DayDetails {
    pub fn new(date: NaiveDate, events: Vec<Entry>) -> Self { Self { date, events } }
}