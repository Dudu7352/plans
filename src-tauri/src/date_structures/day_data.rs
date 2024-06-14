use chrono::NaiveDateTime;
use serde::{Deserialize, Serialize};

use crate::event_structures::entry::Entry;

#[derive(Serialize, Deserialize, Debug)]
#[serde(rename_all = "camelCase")]
pub struct DayData {
    pub date: NaiveDateTime,
    pub entries: Vec<Entry>
}

impl DayData {
    pub fn new(date: NaiveDateTime, entries: Vec<Entry>) -> Self { Self { date, entries } }
}