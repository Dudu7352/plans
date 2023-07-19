use chrono::{naive::serde::ts_seconds, NaiveDateTime};
use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq)]
#[serde(rename_all = "camelCase")]
pub struct DeadlineDetails {
    #[serde(with = "ts_seconds")]
    pub date_time: NaiveDateTime,
    pub name: String,
}
