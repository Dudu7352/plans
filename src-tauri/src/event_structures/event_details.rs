use chrono::{naive::serde::ts_seconds, NaiveDateTime};
use serde::{Serialize, Deserialize};

#[serde(rename_all = "camelCase")]
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq)]
pub struct EventDetails {
    #[serde(with = "ts_seconds")]
    pub date_time: NaiveDateTime,
    pub duration_seconds: u32,
    pub name: String,
}