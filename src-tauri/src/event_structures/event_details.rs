use chrono::{naive::serde::ts_seconds, NaiveDateTime};
use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq)]
#[serde(rename_all = "camelCase")]
pub struct EventDetails {
    #[serde(with = "ts_seconds")]
    pub date_time: NaiveDateTime,
    pub name: String,
    pub duration_minutes: u32,
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq)]
#[serde(rename_all = "camelCase")]
pub struct DeadlineDetails {
    #[serde(with = "ts_seconds")]
    pub date_time: NaiveDateTime,
    pub name: String,
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq)]
#[serde(rename_all = "camelCase")]
pub enum EventType {
    EVENT(EventDetails),
    DEADLINE(DeadlineDetails)
}

impl EventType {
    pub fn get_date_time(&self) -> &NaiveDateTime {
        match self {
            EventType::EVENT(event) => &event.date_time,
            EventType::DEADLINE(deadline) => &deadline.date_time,
        }
    }
}