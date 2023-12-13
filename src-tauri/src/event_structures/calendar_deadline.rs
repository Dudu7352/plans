use chrono::{naive::serde::ts_seconds, NaiveDateTime};
use serde::{Serialize, Deserialize};

use crate::color_structures::color::Color;

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq)]
#[serde(rename_all = "camelCase")]
pub struct CalendarDeadline {
    pub id: String,
    #[serde(with = "ts_seconds")]
    pub date_time: NaiveDateTime,
    pub name: String,
    pub color: Color
}

impl CalendarDeadline {
    pub fn new(id: String, date_time: NaiveDateTime, name: String, color: Color) -> Self { 
        Self { id, date_time, name, color } 
    }
}
