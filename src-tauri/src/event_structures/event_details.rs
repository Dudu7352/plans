use chrono::{naive::serde::ts_seconds, NaiveDateTime};
use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize)]
pub struct EventDetails {
    #[serde(with = "ts_seconds")]
    pub date_time: NaiveDateTime,
    pub duration_seconds: u32,
    pub name: String,
}

impl EventDetails {
    pub fn new(date_time: NaiveDateTime, duration_seconds: u32, name: String) -> Self {
        Self {
            date_time,
            duration_seconds,
            name,
        }
    }
}
