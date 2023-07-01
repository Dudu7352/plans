use chrono::{naive::serde::ts_seconds, NaiveDateTime};
use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq)]
#[serde(rename_all = "camelCase")]
pub struct EventDetails {
    #[serde(with = "ts_seconds")]
    pub date_time: NaiveDateTime,
    pub duration_seconds: u32,
    pub name: String,
}